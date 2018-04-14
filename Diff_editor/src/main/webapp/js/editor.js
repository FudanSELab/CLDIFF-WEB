var originalLines =  new Array();
var modifiedLines =  new Array();
var descriptions =  new Array();
var originalLinesCoordinate  =  new Array();
var modifiedLinesCoordinate  =  new Array();
var aMoveBlock = new Array();
var bMoveBlock = new Array();

$(document).ready(function() {
//	$(function() {
//		$.ajaxSettings.async = false;  
//		initLines(originalLines,getFileFromServer("getfile","File","src"));
//		initLines(modifiedLines,getFileFromServer("getfile","File","dst"));
//    	
//		var text = getFileFromServer("getfile","File","json");
//		text = eval("("+text+")");		
//		parseDiff(text,0,originalLines,modifiedLines);
//			
//		generateContainer();
//    	
//    	for(var d = 0;d<descriptions.length;d++) {
//    		drawBubble(descriptions[d],1);
//    	}
//    	clearPopover();
//    	drawLinkLine();
//    });
})

function refreshPage(commitID,fileName) {
	$.ajaxSettings.async = false;  
	var file = getFileFromServer("getfile",commitID,fileName,"src");
	alert(file);
	initLines(originalLines,file);
	alert(originalLines.length);
	
//	initLines(originalLines,getFileFromServer("getfile",commitID,fileName,"src"));
//	
//	initLines(modifiedLines,getFileFromServer("getfile",commitID,fileName,"dst"));
//	alert(modifiedLines.length);
//	var text = getFileFromServer("getfile",commitID,fileName,"diff.json");
//	alert(text);
//	text = eval("("+text+")");		
//	parseDiff(text,0,originalLines,modifiedLines);
//		
//	generateContainer();
//	
//	for(var d = 0;d<descriptions.length;d++) {
//		drawBubble(descriptions[d],1);
//	}
//	clearPopover();
//	drawLinkLine();
}

function parseDiff(data,sign,srcLines,dstLines,superDesc) {
	var aDeleteBlock =  new Array();
	var bInsertBlock = new Array();
	var aChangeBlock = new Array();
	var bChangeBlock = new Array();
	$.each(data,function(infoIndex,info){  
		if(info["sub_range_code"] != undefined) {
			var wholeRange = info["sub_range_code"].split(',');
			var num = parseInt(wholeRange[0]),start= parseInt(wholeRange[1]) ,end= parseInt(wholeRange[2]);
			if(info["file"] == "src") {
				var idx = getIdxByLineNum(srcLines,num);
				if(idx == -1)
					return true;
				srcLines[idx].code_range = [start,end];
			}
			else {
				var idx = getIdxByLineNum(dstLines,num);
				if(idx == -1)
					return true;
				dstLines[idx].code_range = [start,end];
			}
				
			return true;
		}
		var entry;
		switch (true)
		{
		case info["type"] =="member_delete" || info["type"] == "statement_delete":
			if(info["file"] == "src") {
				var range = parseRange(info["range"],2);
				var block = new Object();
				var array = new Array();
				var idx = getIdxByLineNum(srcLines,range[0]);
				if(idx == -1)
					break;
				for(var i=idx;i<=idx + range[1]-range[0];i++) {					
					if(sign == 1)
						srcLines[i].sub_mark = "sub_delete";
					else
						srcLines[i].mark = "delete";
					array[array.length] = srcLines[i];
				}
				
				srcLines.splice(idx,range[1]-range[0]+1);
				block.prevLineNum = range[0] -1;
				block.array = array;
				aDeleteBlock[aDeleteBlock.length] = block;
				
				//标记描述节点
				entry = descObj(info,range,1);
			}							
		    break;
		case info["type"] =="statement_insert" || info["type"] =="member_insert":
			if(info["file"] == "dst") {
				var range = parseRange(info["range"],2);
				var block = new Object();
				var array = new Array();
				var idx = getIdxByLineNum(dstLines,range[0]);
				if(idx == -1)
					break;
				for(var i=idx;i<=idx+range[1]-range[0];i++) {
					if(sign == 1)
						dstLines[i].sub_mark = "sub_insert";
					else
						dstLines[i].mark = "insert";
					array[array.length] = dstLines[i];
				}
				dstLines.splice(idx,range[1]-range[0]+1);
				block.prevLineNum = range[0] -1;
				block.array = array;
				bInsertBlock[bInsertBlock.length] = block;
				
				//标记描述节点
				entry = descObj(info,range,2);		
			}
				break;
		case info["type"] == "member_change" || info["type"] =="statement_change":
			if(info["file"] == "src_dst") {
				var range = parseRange(info["range"],4);
//				var block1 = new Object(),block2 = new Object();
//				var array1 = new Array(),array2 = new Array();
				var idx1 = getIdxByLineNum(srcLines,range[0]),idx2 = getIdxByLineNum(dstLines,range[2]);
				if(idx1 == -1 || idx2 == -1)
					break;				
				for(var i=idx1;i<=idx1+range[1]-range[0];i++) {
					if(sign == 1)
						srcLines[i].sub_mark = "sub_change";
					else
						srcLines[i].mark = "change";
					array1[array1.length] = srcLines[i];
				}
				for(var i=idx2;i<=idx2+range[3]-range[2];i++) {
					if(sign == 1)
						dstLines[i].sub_mark = "sub_change";
					else
						dstLines[i].mark = "change";
					array2[array2.length] = dstLines[i];
				}
				srcLines.splice(idx1,range[1]-range[0]+1);
				block1.prevLineNum = range[0] -1;
				dstLines.splice(idx2,range[3]-range[2]+1);
				block2.prevLineNum = range[2] -1;
				
				//标记描述节点
				entry = descObj(info,range,3);		
				
				if(info["sub_range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub_range"],1,array1,array2,entry);
				}
				var extra = array1.length - array2.length;
				var addArray = array2;
				if(array1.length < array2.length) {
					extra = array2.length - array1.length;
					addArray = array1;
				}								
				for(var i=0;i<extra;i++) {
					addArray[addArray.length] = new Object();
				}
				
				block1.array = array1;
				aChangeBlock[aChangeBlock.length] = block1;				
				block2.array = array2;
				bChangeBlock[bChangeBlock.length] = block2;								
			}
			break;
		case info["type"] == "member_move" || info["type"] =="statement_move":
			if(info["file"] == "src_dst") {
				var range = parseRange(info["range"],4);
//				var block1 = new Object(),block2 = new Object();
//				var array1 = new Array(),array2 = new Array();
				var idx1 = getIdxByLineNum(srcLines,range[0]),idx2 = getIdxByLineNum(dstLines,range[2]);
				if(idx1 == -1 || idx2 == -1)
					break;				
				for(var i=idx1;i<=idx1+range[1]-range[0];i++) {
					if(sign == 1)
						srcLines[i].sub_mark = "sub_move";
					else
						srcLines[i].mark = "move";
					array1[array1.length] = srcLines[i];
				}
				for(var i=idx2;i<=idx2+range[3]-range[2];i++) {
					if(sign == 1)
						dstLines[i].sub_mark = "sub_move";
					else
						dstLines[i].mark = "move";
					array2[array2.length] = dstLines[i];
				}
				srcLines.splice(idx1,range[1]-range[0]+1);
				block1.prevLineNum = range[0] -1;
				block1.array = array1;
				aMoveBlock[aMoveBlock.length] = block1;	
				
				dstLines.splice(idx2,range[3]-range[2]+1);
				block2.prevLineNum = range[2] -1;	
				block2.array = array2;
				bMoveBlock[bMoveBlock.length] = block2;	
				
				//标记描述节点
				entry = descObj(info,range,3);										
				if(info["sub_range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub_range"],1,array1,array2,entry);
				}															
			}
			break;
		}	
		if(sign == 0)
			descriptions[descriptions.length] = entry;
		else
			superDesc.subDesc[superDesc.subDesc.length] = entry;
    })	

    for (var o = 0; o < srcLines.length; o++) {
    	o = restoreBlockToContent(aDeleteBlock,srcLines,o,dstLines,true);
    	o = restoreBlockToContent(aChangeBlock,srcLines,o,undefined,true);
	}
	for (var m = 0; m < dstLines.length; m++) {
		m = restoreBlockToContent(bInsertBlock,dstLines,m,srcLines,true);
		m = restoreBlockToContent(bChangeBlock,dstLines,m,undefined,true);
	}
	for (var o = 0; o < srcLines.length; o++) {
		o = restoreBlockToContent(aMoveBlock,srcLines,o,dstLines,false);
	}
	for (var m = 0; m < dstLines.length; m++) {
		m = restoreBlockToContent(bMoveBlock,dstLines,m,srcLines,false);
	}
}

function descObj(info,range,sign) {
	var entry = new Object();
	entry.id = info["id"];
	entry.file = info["file"];
	entry.type = info["type"];
	if(sign ==1)
		entry.range1 = [range[0],range[1]];
	else if(sign ==2)
		entry.range2 = [range[0],range[1]];
	else {
		entry.range1 = [range[0],range[1]];
		entry.range2 = [range[2],range[3]];
	}	
	entry.description = info["description"];
	return entry;
}

function parseRange(rangeStr,num) {
	if(num == 2) {
		var wholeRange = rangeStr.split(',');
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
		var twoRange = rangeStr.split('_');
		var srcRange = twoRange[0].split(',');
		var dstRange = twoRange[1].split(',');
		return [parseInt(srcRange[0]),parseInt(srcRange[1]),parseInt(dstRange[0]),parseInt(dstRange[1])];
	}
}

function restoreBlockToContent(block,contentLines,lineIdx,anotherLines,isToSpliceBlock) {
	for (var i = 0; i < block.length; i++) {
		if (contentLines[lineIdx].number != undefined
				&& block[i].prevLineNum == contentLines[lineIdx].number) {
			for (a = 0; a < block[i].array.length; a++) {
				contentLines.splice(lineIdx + a + 1, 0, block[i].array[a]);
				if(anotherLines != undefined)
					anotherLines.splice(lineIdx + a + 1, 0, new Object());
			}
			lineIdx += block[i].array.length;
			if(isToSpliceBlock) {
				block.splice(i, 1);
				i--;
			}
		}
	}
	return lineIdx;
}
	
function initLines(contentLines,data) {
	contentLines = new Array();
	var tempLines = data.toString().split(/\r\n/);
	for(var i = 0;i<tempLines.length;i++) {
		var line = new Object();
		line.number = i+1;
		line.content=tempLines[i];
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
