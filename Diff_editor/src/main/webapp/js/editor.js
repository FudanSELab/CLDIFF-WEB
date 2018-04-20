var originalLines =  new Array();
var modifiedLines =  new Array();
var descriptions =  new Array();
var originalLinesCoordinate  =  new Array();
var modifiedLinesCoordinate  =  new Array();
var aMoveBlock = new Array();
var bMoveBlock = new Array();
var aChangeBlock = new Array();
var bChangeBlock = new Array();
var diff = new Array();
var inFilelink = new Array();
var otherFilelink = new Object();
var changeMove = new Array();
var ceCoordinate = new Object();
var commitId,fileName,fileId;

$(document).ready(function() {

})
function init() {
	descriptions.splice(0,descriptions.length);
	originalLinesCoordinate.splice(0,originalLinesCoordinate.length);
	modifiedLinesCoordinate.splice(0,modifiedLinesCoordinate.length);
	aMoveBlock.splice(0,aMoveBlock.length);
	bMoveBlock.splice(0,bMoveBlock.length);
	aChangeBlock.splice(0,aChangeBlock.length);
	bChangeBlock.splice(0,bChangeBlock.length);
	bubbleArray.splice(0,bubbleArray.length);
	diff.splice(0,diff.length);
	changeMove.splice(0,changeMove.length);
	document.querySelector(".original-in-monaco-diff-editor").innerHTML="";
	document.querySelector(".modified-in-monaco-diff-editor").innerHTML="";
	document.querySelector(".bubbleZone").innerHTML="";
	var myCanvas=document.getElementById("myCanvas3");
	cxt = myCanvas.getContext("2d");
    cxt.clearRect(0,0,myCanvas.width,myCanvas.height); 
    ceCoordinate = new Object();
}

function refreshPage(commitID,name) {	
	init();	
	clearPopoverTop();
	
	$.ajaxSettings.async = false;  
	var src = getFileFromServer("getfile",commitID,name,"src");
	var dst = getFileFromServer("getfile",commitID,name,"dst");

	if(src =="") {
		initLines(modifiedLines,dst);
		getLinkJson(commitID,1);
		generateContainer(1);
		return;
	}
	fileId = -1;
	initLines(originalLines,src);
	initLines(modifiedLines,dst);
	getLinkJson(commitID,2);

	var text = getFileFromServer("getfile",commitID,name,"diff.json");
	text = eval("("+text+")");		
	
	handleNesting(text);	
	parseDiff(diff,0,originalLines,modifiedLines);		
	generateContainer(2);
	
	for(var d = 0;d<descriptions.length;d++) {
		drawBubble(descriptions[d],0);
	}
//	
	for(var d = 0;d<descriptions.length;d++) {
		drawAllTagLine(descriptions[d]);
	}	
//	
////	clearPopover();
	drawLinkLine(aMoveBlock,bMoveBlock,"rgba(255, 140, 0, 0.2)",getColorByType("Move"));
	drawLinkLine(aChangeBlock,bChangeBlock,"rgba(0, 100, 255, 0.2)",getColorByType("Change"));
//	alert(JSON.stringify(ceCoordinate));
}
function handleNesting (data) {
	$.each(data,function(infoIndex,info){  
		insertOneToDiff(info,diff);	
	});
	for(var i=0;i<changeMove.length;i++) {
		diff.splice(diff.length, 0, changeMove[i]);
	}	
}

function insertOneToDiff(info,diffArray) {
	if(info["type2"] == "Change.Move") {
		changeMove.splice(0, 0, info);
		return;
	}

	var range,x2,y2;
	switch (true)
	{
	case info["file"] == "src" || info["file"] == "dst":
		if(info["parseRange"]==undefined)
			info.parsedRange = parseRange(info["range"],2);
		break;
	case info["file"] == "src-dst":
		if(info["parseRange"]==undefined)
			info.parsedRange = parseRange(info["range"],4);
		break;
	}
	range = info.parsedRange;
	var inserted = false;
	var i = 0;
	for (; i < diffArray.length; i++) {
		if(diffArray[i]["sub-range-code"] != undefined || diffArray[i]["type2"] =="Change.Move")
			continue;
		var position;
    	if(info["file"] != "src-dst" && (diffArray[i].file == info["file"]||diffArray[i].file == "src-dst")) {
    		x2= diffArray[i].parsedRange[0],y2 = diffArray[i].parsedRange[1];
    		if(diffArray[i].file == "src-dst" && info["file"] == "dst") {    			
    				x2= diffArray[i].parsedRange[2],y2 = diffArray[i].parsedRange[3];
    		}
    		position = positionRelationship(range[0],range[1],x2,y2);    	
    	}  
    	else if(info["file"] == "src-dst" && diffArray[i].file == "src-dst") {
    		var po1 = positionRelationship(range[0],range[1],diffArray[i].parsedRange[0],diffArray[i].parsedRange[1]);
    		var po2 = positionRelationship(range[2],range[3],diffArray[i].parsedRange[2],diffArray[i].parsedRange[3]);
    		if(po1 != po2) {
//    			alert("error src-dst : src-dst | "+range[0]+","+range[1]+","+diffArray[i].parsedRange[0]+","+diffArray[i].parsedRange[1]+"   "+range[2]+","+range[3]+","+diffArray[i].parsedRange[2]+","+diffArray[i].parsedRange[3]);
    			if(po1 == "prev" || po2 =="prev")
    				position= "prev";
    			else
    				position= "next";
    		}
    		else
    			position = po1;
    	}
    	else if(info["file"] == "src-dst") {
    		if(diffArray[i].file == "src")
    			position = positionRelationship(range[0],range[1],diffArray[i].parsedRange[0],diffArray[i].parsedRange[1]);   
    		else
    			position = positionRelationship(range[2],range[3],diffArray[i].parsedRange[0],diffArray[i].parsedRange[1]);   
    	}
    	if(position != undefined) {
			if(position == "prev") {
				diffArray.splice(i, 0, info);
				inserted = true;
				break;
			}
			if(position == "next") 
				continue;
			if(position == "child") {
				if(diffArray[i]["sub-range"] == undefined) {
					diffArray[i]["sub-range"] = new Array();
					diffArray[i]["sub-range"][0]=info;
				}
				else {
					insertOneToDiff(info,diffArray[i]["sub-range"]);
				}
				inserted = true;
				break;
			}
			if(position == "parent") {
				if(info["sub-range"] == undefined) {
					info["sub-range"] = new Array();
					info["sub-range"][0]=diffArray[i];
				}
				else {
					insertOneToDiff(diffArray[i],info["sub-range"]);
				}	    				
				diffArray.splice(i, 1);
				i--;
				continue;
			}
		}
    }
	if(!inserted)
		diffArray.splice(i, 0, info);
}

function parseDiff(data,sign,srcLines,dstLines,superDesc) {
	$.each(data,function(infoIndex,info){  
		if(info["sub-range-code"] != undefined) {
			var wholeRange = info["sub-range-code"].split(',');
			var num = parseInt(wholeRange[0]),start= parseInt(wholeRange[1]) ,end= parseInt(wholeRange[2]);
			if(info["file"] == "src") {
				var idx = getIdxByLineNum(srcLines,num);
				if(idx == -1)
					return true;
				if(srcLines[idx].code_range == undefined)
					srcLines[idx].code_range = new Array();
				srcLines[idx].code_range.splice(srcLines[idx].code_range.length,0,start,end);
			}
			else {
				var idx = getIdxByLineNum(dstLines,num);
				if(idx == -1)
					return true;
				if(dstLines[idx].code_range == undefined)
					dstLines[idx].code_range = new Array();
				dstLines[idx].code_range.splice(dstLines[idx].code_range.length,0,start,end);				
			}
				
			return true;
		}
		var entry = new Object();	
		var block1 = new Object(),block2 = new Object();
		var array1 = new Array(),array2 = new Array();
		switch (true)
		{
		case info["type2"] =="Delete":
			if(info["file"] == "src") {
				var range = parseRange(info["range"],2);
				var idx = getIdxByLineNum(srcLines,range[0]);
				if(idx == -1)
					break;
				for(var i=idx;i<=idx + range[1]-range[0];i++) {					
					srcLines[i].mark = "delete";
//					array[array.length] = srcLines[i];
				}
				
				//标记描述节点
				entry = descObj(info,range,1);
				if(info["sub-range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub-range"],sign+1,srcLines,dstLines,entry);
				}
			}							
		    break;
		case info["type2"] =="Insert":
			if(info["file"] == "dst") {
				var range = parseRange(info["range"],2);
				var idx = getIdxByLineNum(dstLines,range[0]);
				if(idx == -1)
					break;
				for(var i=idx;i<=idx+range[1]-range[0];i++) {
					dstLines[i].mark = "insert";
//					array[array.length] = dstLines[i];
				}
				
				//标记描述节点
				entry = descObj(info,range,2);		
				if(info["sub-range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub-range"],sign+1,srcLines,dstLines,entry);
				}
			}
				break;
		case info["type2"] == "Change":
			if(info["file"] == "src-dst") {
				var range = parseRange(info["range"],4);
				var idx1 = getIdxByLineNum(srcLines,range[0]),idx2 = getIdxByLineNum(dstLines,range[2]);
				if(idx1 == -1 || idx2 == -1)
					break;				
				for(var i=idx1;i<=idx1+range[1]-range[0];i++) {
					srcLines[i].mark = "change";
					array1[array1.length] = srcLines[i];
				}
				for(var i=idx2;i<=idx2+range[3]-range[2];i++) {
					dstLines[i].mark = "change";
					array2[array2.length] = dstLines[i];
				}
//				srcLines.splice(idx1,range[1]-range[0]+1);
				block1.prevLineNum = range[0] -1;
//				dstLines.splice(idx2,range[3]-range[2]+1);
				block2.prevLineNum = range[2] -1;
				
				//标记描述节点
				entry = descObj(info,range,3);		
				
				if(info["sub-range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub-range"],sign+1,array1,array2,entry);
				}
//				
				block1.array = array1;
				aChangeBlock[aChangeBlock.length] = block1;				
				block2.array = array2;
				bChangeBlock[bChangeBlock.length] = block2;								
			}
			break;
		case info["type2"] == "Move" || info["type2"] =="Change.Move":		
			if(info["file"] == "src-dst") {
				var range = parseRange(info["range"],4);
				var idx1 = getIdxByLineNum(srcLines,range[0]),idx2 = getIdxByLineNum(dstLines,range[2]);
				if(idx1 == -1 || idx2 == -1)
					break;				
				for(var i=idx1;i<=idx1+range[1]-range[0];i++) {
					srcLines[i].mark = "move";
					array1[array1.length] = srcLines[i];
				}
				for(var i=idx2;i<=idx2+range[3]-range[2];i++) {
					dstLines[i].mark = "move";
					array2[array2.length] = dstLines[i];
				}			
								
				block1.prevLineNum = range[0] -1;
				block1.array = array1;
				aMoveBlock[aMoveBlock.length] = block1;	
				
				block2.prevLineNum = range[2] -1;	
				block2.array = array2;
				bMoveBlock[bMoveBlock.length] = block2;	
								
				
				//标记描述节点
				entry = descObj(info,range,3);										
				if(info["sub-range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub-range"],sign+1,array1,array2,entry);
				}															
			}		
			break;
		}	
		if(sign == 0)
			descriptions[descriptions.length] = entry;
		else
			superDesc.subDesc[superDesc.subDesc.length] = entry;
    })	
}

function positionRelationship(x1,y1,x2,y2) {
//	alert("range : ("+x1+","+y1+") ("+x2+","+y2+") error!");
	if(parseInt(x1) < parseInt(x2)) {
		if(parseInt(y1) < parseInt(x2)) {
			return "prev";
		}
		else if(parseInt(y1) >= parseInt(y2)) {
			return "parent";
		}
		else {
//			alert("range : ("+x1+","+y1+") ("+x2+","+y2+") error!");
			return;
		}
	}
	else if(parseInt(x1) == parseInt(x2)) {
		if(parseInt(y1) < parseInt(y2)) {
			return "child";
		}
		else if(parseInt(y1) == parseInt(y2)) {
//			alert("range : "+x1+","+y1+" is repeat!");
			return;
		}
		else {
			return "parent";
		}
	}
	else {
		if(parseInt(y1) <= parseInt(y2)) {
			return "child";
		}
		else if(parseInt(x1) > parseInt(y2)) {
			return "next";
		}
		else {
//			alert("range : ("+x1+","+y1+") ("+x2+","+y2+") error!");
			return;
		}
	}
}

function descObj(info,range,sign) {
	var entry = new Object();
	entry.id = info["id"];
	entry.file = info["file"];
	entry.type1 = info["type1"];
	entry.type2 = info["type2"];
	if(sign ==1)
		entry.range1 = [range[0],range[1]];
	else if(sign ==2)
		entry.range2 = [range[0],range[1]];
	else {
		entry.range1 = [range[0],range[1]];
		entry.range2 = [range[2],range[3]];
	}	
	if(info["opt2-exp2"] != undefined) {
		entry.type2 = info["type2"];
	}
	entry["opt2-exp2"] = info["opt2-exp2"];
	entry["description"] = info["description"];
	return entry;
}

function parseRange(rangeStr,num) {
	if(num == 2) {
		var wholeRange = rangeStr.substring(1,rangeStr.length).split(',');
		if(wholeRange.length == 2) {
			return [parseInt(wholeRange[0]),parseInt(wholeRange[1])];
		}
		else if(wholeRange.length == 1) {
			return [parseInt(wholeRange[0]),parseInt(wholeRange[0])];
		}
		else {
			alert("json error: range :"+rangeStr);
			return [];
		}
	}
	else {
		var twoRange = rangeStr.split('-');
		var srcRange = twoRange[0].substring(1,twoRange[0].length).split(',');
		var dstRange = twoRange[1].substring(1,twoRange[1].length).split(',');
		return [parseInt(srcRange[0]),parseInt(srcRange[1]),parseInt(dstRange[0]),parseInt(dstRange[1])];
	}
}
	
function initLines(contentLines,data) {
	contentLines.splice(0,contentLines.length);;
//	var tempLines = data.toString().split(/\r\n/);
	var tempLines = data.toString().split(/\n/);
	for(var i = 0;i<tempLines.length;i++) {
		var line = new Object();
		line.number = i+1;
		var content=tempLines[i].replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
		var prefix="",index = 0;
		while(content.indexOf("	") == 0) {
			content = content.replace(/(^	)/g, "");
			prefix+="&nbsp;&nbsp;&nbsp;&nbsp;";
			index += 3;
		}
		while(content.indexOf(" ") == 0) {
			content = content.replace(/(^\s)/g, "");
			prefix+="&nbsp;";
		}	
		line.content =prefix +content;
		line.indent = index;
		contentLines[i]=line;
	}
}

function getIdxByLineNum(lines,lineNum) {
	var idx = 0;
	for(;idx<lines.length;idx++) {
		if(lines[idx].number == lineNum) 
			return idx;
	}
	return -1;
}
