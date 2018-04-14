var originalLines =  new Array();
var modifiedLines =  new Array();
var descriptions =  new Array();
var originalLinesCoordinate  =  new Array();
var modifiedLinesCoordinate  =  new Array();
var aMoveBlock = new Array();
var bMoveBlock = new Array();

$(document).ready(function() {
	$(function() {
		$.post("getfile",{fileName:"File",SrcOrDstOrJson:"src"}, function(data) {
//			alert(data.toString().replace(/\n/g,"$").replace(/\r/g,"#"));
        	var tempLines = data.toString().split(/\r\n/);
        	for(var i = 0;i<tempLines.length;i++) {
        		var line = new Object();
        		line.number = i+1;
        		line.content=tempLines[i];
        		originalLines[i]=line;
        	}
        	
        	$.post("getfile", {fileName:"File",SrcOrDstOrJson:"dst"}, function(data) {
        		var tempLines = data.toString().split(/\r\n/);
            	for(var i = 0;i<tempLines.length;i++) {
            		var line = new Object();
            		line.number = i+1;
            		line.content=tempLines[i];
            		modifiedLines[i]=line;
            	}
				$.post("getfile", {fileName:"File",SrcOrDstOrJson:"json"}, function (data){
					data = eval("("+data+")");
					
					parseDiff(data,0,originalLines,modifiedLines);
	        			
					// original editor
					var overlaysDiv = document.createElement("div");
	            	overlaysDiv.className="margin-view-overlays";
	        		document.querySelector(".original-in-monaco-diff-editor").appendChild(overlaysDiv);
	        		// 行中的对齐线；删除、增加颜色效果
	        		var scrollableDiv = document.createElement("div");
	            	scrollableDiv.className="monaco-scrollable-element editor-scrollable vs";
//	            	scrollableDiv.style = "position: absolute; overflow: hidden; left: 53px; width: 490px; height: 700px;";
	        		document.querySelector(".original-in-monaco-diff-editor").appendChild(scrollableDiv);
	        		var backgroundDiv = document.createElement("div");
	        		backgroundDiv.className="lines-content monaco-editor-background";
	        		backgroundDiv.style = "position: absolute; overflow: hidden; width: 100000px; height: 100000px; will-change: transform; top: 0px; left: 0px;";
	        		scrollableDiv.appendChild(backgroundDiv);
	            	var viewOverlaysDiv = document.createElement("div");
	            	viewOverlaysDiv.className="view-overlays";
	            	viewOverlaysDiv.style = "position: absolute; height: 0px; width: 538px;";
	            	backgroundDiv.appendChild(viewOverlaysDiv);
	            	//斜线阴影部分
	            	var viewZonesDiv1 = document.createElement("div");
	            	viewZonesDiv1.className="view-zones";
	            	backgroundDiv.appendChild(viewZonesDiv1);
	            	
	            	//lines content
	            	var linesDiv1 = document.createElement("div");
	            	linesDiv1.className="view-lines";
	            	linesDiv1.style = "position: absolute; font-family: Consolas, monospace; font-weight: normal; font-size: 14px; line-height: 19px; letter-spacing: 0px; width: 538px; height: 4523px;";
	            	backgroundDiv.appendChild(linesDiv1);
	            	//canvas1
	            	var myCanvas1 = document.createElement("canvas");
	            	myCanvas1.id = "myCanvas1";
	            	myCanvas1.height = 20000;
	            	myCanvas1.width = 600;
	            	linesDiv1.appendChild(myCanvas1);
	            	
	            	//阴影行数
	            	var diagonalLine1 = 0;
	            	
	            	for(var l=0;l<originalLines.length;l++) {
	            		var newDiv1 = document.createElement("div");
	            		newDiv1.style="width: 100%; height: 19px;";	            		
	            		var newDiv2 = document.createElement("div");
	            		newDiv2.style="width: 100%; height: 19px;";            		
	            		var newDiv3 = document.createElement("div");
	            		newDiv3.style="top: "+(l*19)+"px; height: 19px;";
	            		newDiv3.className = "view-line";
	            		newDiv3.onclick = bubble;
	            		
	            		if(originalLines[l].number == undefined) {
	            			diagonalLine1 ++;
	            			newDiv1.innerHTML = "<div class='line-numbers'></div>"; 
	            			newDiv2.innerHTML = ""; 
	            			newDiv3.innerHTML = "<span><span class='mtk1'></span></span>";
	            		}	            			
	            		else {
	            			newDiv3.number = originalLines[l].number;
	            			originalLinesCoordinate[originalLines[l].number] = l*19;
	            			if(diagonalLine1 != 0) {
	            				var diagonalDiv = document.createElement("div");
	    		            	diagonalDiv.className="diagonal-fill";
	    		            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*(l-diagonalLine1))+"px; height: "+(19*diagonalLine1)+"px;";
	    		            	viewZonesDiv1.appendChild(diagonalDiv);
	            				diagonalLine1=0;
	            			}
	            			var inner;
	            			if(originalLines[l].mark != undefined && (originalLines[l].mark == "delete" || originalLines[l].mark == "change" || originalLines[l].mark == "move")) {
	            				newDiv1.innerHTML = "<div class='cmdr line-"+originalLines[l].mark+"' style='height: 19px'></div><div class='cldr "+originalLines[l].mark+"-sign' style='left: 38px; width: 15px; height: 19px'></div><div class='line-numbers'>"
									+ originalLines[l].number
									+ "</div>";
	            				inner = "<div class='cdr line-"+originalLines[l].mark+"' style='left: 0; width: 100%; height: 19px;'></div>";
	            				if(originalLines[l].code_range != undefined) {
	            					inner+="<div class='cdr char-"+originalLines[l].mark+"' style='left:"+(7.7*(originalLines[l].code_range[0]-1))+"px;width:"+(7.7*(originalLines[l].code_range[1]-originalLines[l].code_range[0]+1))+"px;height:19px;'></div>"
	            				}
	            			}	            				
	            			else {
	            				newDiv1.innerHTML = "<div class='line-numbers'>"
									+ originalLines[l].number
									+ "</div>";
	            				inner = "";
	            			}
	            			var re=eval("/	/g");
	            			var matchResult = originalLines[l].content.match(re);
	            			if(matchResult != undefined) {
	            				var indent = matchResult.length;
		            			for(var m = 0;m<indent;m++) {
		            				inner += "<div class='cigr' style='left: "+(m*30.78125)+"px; height: 19px; width: 0.8px'></div>"
		            			}
	            			}	            			
	            			newDiv2.innerHTML = inner;
	            			var content = originalLines[l].content.replace(/	/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
	            			var index = 0;
	            			var prefix="";
	            			while(content.indexOf(" ") == 0) {
	            				content = content.replace(/(^\s)/g, "");
	            				prefix+="&nbsp;";
	            			}	
	            			content =prefix +content;
	            			var sub_class = "mtk1";
	            			if(originalLines[l].sub_mark != undefined) {
	            				switch(originalLines[l].sub_mark) {
	            				case "sub_insert":
	            					sub_class="mtk7";
	            					break;
	            				case "sub_delete":
	            					sub_class="mtk4";
	            					break;
	            				case "sub_change":
	            					sub_class="mtk6";
	            					break;
	            				}
	            			}
	            			newDiv3.innerHTML = "<span><span class='"+sub_class+"'>"+content+"</span></span>"
	            		}								           			            			            		
	            		overlaysDiv.appendChild(newDiv1);
	            		viewOverlaysDiv.appendChild(newDiv2);
	            		linesDiv1.appendChild(newDiv3);
	            	}
	            		            	
	            	
	            	// modified editor
					var overlaysDiv2 = document.createElement("div");
	            	overlaysDiv2.className="margin-view-overlays";
	        		document.querySelector(".modified-in-monaco-diff-editor").appendChild(overlaysDiv2);
	        		// 行中的对齐线；删除、增加颜色效果
	        		var scrollableDiv2 = document.createElement("div");
	            	scrollableDiv2.className="monaco-scrollable-element editor-scrollable vs";
	        		document.querySelector(".modified-in-monaco-diff-editor").appendChild(scrollableDiv2);
	        		var backgroundDiv2 = document.createElement("div");
	        		backgroundDiv2.className="lines-content monaco-editor-background";
	        		backgroundDiv2.style = "position: absolute; overflow: hidden; width: 100000px; height: 100000px; will-change: transform; top: 0px; left: 0px;";
	        		scrollableDiv2.appendChild(backgroundDiv2);
	            	var viewOverlaysDiv2 = document.createElement("div");
	            	viewOverlaysDiv2.className="view-overlays";
	            	viewOverlaysDiv2.style = "position: absolute; height: 0px; width: 538px;";
	            	backgroundDiv2.appendChild(viewOverlaysDiv2);	            	
	            	
	            	//斜线阴影部分
	            	var viewZonesDiv2 = document.createElement("div");
	            	viewZonesDiv2.className="view-zones";
	            	backgroundDiv2.appendChild(viewZonesDiv2);
	            	
	            	//lines content
	            	var linesDiv2 = document.createElement("div");
	            	linesDiv2.className="view-lines";
	            	linesDiv2.style = "position: absolute; font-family: Consolas, monospace; font-weight: normal; font-size: 14px; line-height: 19px; letter-spacing: 0px; width: 538px; height: 4523px;";
	            	backgroundDiv2.appendChild(linesDiv2);
	            	
	            	//overlayCanvas
	            	var overlayCanvas = document.createElement("canvas");
	            	overlayCanvas.id = "overlayCanvas";
	            	overlayCanvas.height = 20000;
	            	overlayCanvas.width = 200;
	            	overlayCanvas.style = "position:absolute;top:0";
	            	overlaysDiv2.appendChild(overlayCanvas);
	            	//myCanvas2
	            	var myCanvas2 = document.createElement("canvas");
	            	myCanvas2.id = "myCanvas2";
	            	myCanvas2.height = 20000;
	            	myCanvas2.width = 600;
	            	linesDiv2.appendChild(myCanvas2);
	            	
	            	//阴影行数
	            	var diagonalLine2 = 0;
	            	
	            	for(var l=0;l<modifiedLines.length;l++) {
	            		var newDiv1 = document.createElement("div");
	            		newDiv1.style="width: 100%; height: 19px;";	            		
	            		var newDiv2 = document.createElement("div");
	            		newDiv2.style="width: 100%; height: 19px;";            		
	            		var newDiv3 = document.createElement("div");
	            		newDiv3.style="top: "+(l*19)+"px; height: 19px;";
	            		newDiv3.className = "view-line";
	            		newDiv3.onclick = bubble;
	            		
	            		if(modifiedLines[l].number == undefined) {
	            			diagonalLine2 ++;
	            			newDiv1.innerHTML = "<div class='line-numbers'></div>"; 
	            			newDiv2.innerHTML = ""; 
	            			newDiv3.innerHTML = "<span><span class='mtk1'></span></span>";
	            		}	            			
	            		else {
	            			modifiedLinesCoordinate[modifiedLines[l].number] = l*19;
	            			newDiv3.number = modifiedLines[l].number;
	            			if(diagonalLine2 != 0) {
	            				var diagonalDiv = document.createElement("div");
	    		            	diagonalDiv.className="diagonal-fill";
	    		            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*(l-diagonalLine2))+"px; height: "+(19*diagonalLine2)+"px;";
	    		            	viewZonesDiv2.appendChild(diagonalDiv);
	            				diagonalLine2=0;
	            			}
	            			var inner;
	            			if(modifiedLines[l].mark != undefined && (modifiedLines[l].mark == "insert"||modifiedLines[l].mark == "change"||modifiedLines[l].mark == "move")) {
	            				var mark = modifiedLines[l].mark;
	            				if(modifiedLines[l].mark == "move")
	            					mark="";
	            				newDiv1.innerHTML = "<div class='cmdr line-"+mark+"' style='height: 19px'></div><div class='cldr "+modifiedLines[l].mark+"-sign' style='left: 38px; width: 15px; height: 19px'></div><div class='line-numbers'>"
									+ modifiedLines[l].number
									+ "</div>";
	            				inner = "<div class='cdr line-"+modifiedLines[l].mark+"' style='left: 0; width: 100%; height: 19px;'></div>";
	            				if(modifiedLines[l].code_range != undefined) {
	            					inner+="<div class='cdr char-"+modifiedLines[l].mark+"' style='left:"+(7.7*(modifiedLines[l].code_range[0]-1))+"px;width:"+(7.7*(modifiedLines[l].code_range[1]-modifiedLines[l].code_range[0]+1))+"px;height:19px;'></div>"
	            				}
	            			}	            				
	            			else {
	            				newDiv1.innerHTML = "<div class='line-numbers'>"
									+ modifiedLines[l].number
									+ "</div>";
	            				inner = "";	            				
	            			}
	            			var re=eval("/	/g");
	            			var matchResult = modifiedLines[l].content.match(re);
	            			if(matchResult != undefined) {
	            				var indent = matchResult.length;
		            			for(var m = 0;m<indent;m++) {
		            				inner += "<div class='cigr' style='left: "+(m*30.78125)+"px; height: 19px; width: 0.8px'></div>"
		            			}
	            			}
	            			newDiv2.innerHTML = inner;
	            			var content = modifiedLines[l].content.replace(/	/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
	            			var index = 0;
	            			var prefix="";
	            			while(content.indexOf(" ") == 0) {
	            				content = content.replace(/(^\s)/g, "");
	            				prefix+="&nbsp;";
	            			}	
	            			content =prefix +content;
	            			var sub_class = "mtk1";
	            			if(modifiedLines[l].sub_mark != undefined) {
	            				switch(modifiedLines[l].sub_mark) {
	            				case "sub_insert":
	            					sub_class="mtk25";
	            					break;
	            				case "sub_delete":
	            					sub_class="mtk4";
	            					break;
	            				case "sub_change":
	            					sub_class="mtk6";
	            					break;
	            				}
	            			}
	            			newDiv3.innerHTML = "<span><span class='"+sub_class+"'>"+content+"</span></span>"
	            		}								           			            			            		
	            		overlaysDiv2.appendChild(newDiv1);
	            		viewOverlaysDiv2.appendChild(newDiv2);
	            		linesDiv2.appendChild(newDiv3);
	            	}	            		            	
	            	for(var d = 0;d<descriptions.length;d++) {
	            		drawBubble(descriptions[d],1);
	            	}
	            	clearPopover();
	            	drawLinkLine();
				}) 
                	
            });
            
        });
    });

})

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
		switch (true)
		{
		case info["type"] =="member_delete" || info["type"] == "statement_delete":
			if(info["file"] == "src") {
				var wholeRange = info["range"].split(',');
				var start ,end;
				if(wholeRange.length == 2) {
					start = parseInt(wholeRange[0]);
					end = parseInt(wholeRange[1]);
				}
				else if(wholeRange.length == 1) {
					start = parseInt(wholeRange[0]);
					end = parseInt(wholeRange[0]);
				}
				else {
					alert("json error: member_delete range :"+info["range"]);
				}
				var block = new Object();
				var array = new Array();
				var idx = getIdxByLineNum(srcLines,start);
				if(idx == -1)
					break;
				for(var i=idx;i<=idx + end-start;i++) {					
					if(sign == 1)
						srcLines[i].sub_mark = "sub_delete";
					else
						srcLines[i].mark = "delete";
					array[array.length] = srcLines[i];
				}
				
				srcLines.splice(idx,end-start+1);
				block.prevLineNum = start -1;
				block.array = array;
				aDeleteBlock[aDeleteBlock.length] = block;
				
				//标记描述节点
				var entry = new Object();
				entry.id = info["id"];
				entry.file = info["file"];
				entry.type = info["type"];
				entry.range1 = [start,end];
				entry.description = info["description"];
				if(sign == 0) {		
					descriptions[descriptions.length] = entry;
				}
				else {
					superDesc.subDesc[superDesc.subDesc.length] = entry;
				}
			}							
		    break;
		case info["type"] =="statement_insert" || info["type"] =="member_insert":
			if(info["file"] == "dst") {
				var wholeRange = info["range"].split(',');
				var start ,end;
				if(wholeRange.length == 2) {
					start = parseInt(wholeRange[0]);
					end = parseInt(wholeRange[1]);
				}
				else if(wholeRange.length == 1) {
					start = parseInt(wholeRange[0]);
					end = parseInt(wholeRange[0]);
				}
				else {
					alert("json error: member_insert :"+info["range"]);
				}
				var block = new Object();
				var array = new Array();
				var idx = getIdxByLineNum(dstLines,start);
				if(idx == -1)
					break;
				for(var i=idx;i<=idx+end-start;i++) {
					if(sign == 1)
						dstLines[i].sub_mark = "sub_insert";
					else
						dstLines[i].mark = "insert";
					array[array.length] = dstLines[i];
				}
				dstLines.splice(idx,end-start+1);
				block.prevLineNum = start -1;
				block.array = array;
				bInsertBlock[bInsertBlock.length] = block;
				
				//标记描述节点
				var entry = new Object();
				entry.id = info["id"];
				entry.file = info["file"];
				entry.type = info["type"];
				entry.range2 = [start,end];
				entry.description = info["description"];		
				if(sign == 0) {		
					descriptions[descriptions.length] = entry;
				}
				else {
					superDesc.subDesc[superDesc.subDesc.length] = entry;
				}
			}
				break;
		case info["type"] == "member_change" || info["type"] =="statement_change":
			if(info["file"] == "src-dst") {
				var twoRange = info["range"].split('-');
				var srcRange = twoRange[0].split(',');
				var dstRange = twoRange[1].split(',');
				var block1 = new Object(),block2 = new Object();
				var array1 = new Array(),array2 = new Array();
				var start1 = parseInt(srcRange[0]),end1 = parseInt(srcRange[1]),start2 = parseInt(dstRange[0]),end2 = parseInt(dstRange[1]);
				var idx1 = getIdxByLineNum(srcLines,start1),idx2 = getIdxByLineNum(dstLines,start2);
				if(idx1 == -1 || idx2 == -1)
					break;				
				for(var i=idx1;i<=idx1+end1-start1;i++) {
					if(sign == 1)
						srcLines[i].sub_mark = "sub_change";
					else
						srcLines[i].mark = "change";
					array1[array1.length] = srcLines[i];
				}
				for(var i=idx2;i<=idx2+end2-start2;i++) {
					if(sign == 1)
						dstLines[i].sub_mark = "sub_change";
					else
						dstLines[i].mark = "change";
					array2[array2.length] = dstLines[i];
				}
				srcLines.splice(idx1,end1-start1+1);
				block1.prevLineNum = start1 -1;
				dstLines.splice(idx2,end2-start2+1);
				block2.prevLineNum = start2 -1;
				
				//标记描述节点
				var entry = new Object();
				entry.id = info["id"];
				entry.file = info["file"];
				entry.type = info["type"];
				entry.range1 = [start1,end1];
				entry.range2 = [start2,end2];
				entry.description = info["description"];		
				if(sign == 0) {
					descriptions[descriptions.length] = entry;
				}
				else {
					superDesc.subDesc[superDesc.subDesc.length] = entry;
				}
				
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
			if(info["file"] == "src-dst") {
				var twoRange = info["range"].split('-');
				var srcRange = twoRange[0].split(',');
				var dstRange = twoRange[1].split(',');
				var block1 = new Object(),block2 = new Object();
				var array1 = new Array(),array2 = new Array();
				var start1 = parseInt(srcRange[0]),end1 = parseInt(srcRange[1]),start2 = parseInt(dstRange[0]),end2 = parseInt(dstRange[1]);
				var idx1 = getIdxByLineNum(srcLines,start1),idx2 = getIdxByLineNum(dstLines,start2);
				if(idx1 == -1 || idx2 == -1)
					break;				
				for(var i=idx1;i<=idx1+end1-start1;i++) {
					if(sign == 1)
						srcLines[i].sub_mark = "sub_move";
					else
						srcLines[i].mark = "move";
					array1[array1.length] = srcLines[i];
				}
				for(var i=idx2;i<=idx2+end2-start2;i++) {
					if(sign == 1)
						dstLines[i].sub_mark = "sub_move";
					else
						dstLines[i].mark = "move";
					array2[array2.length] = dstLines[i];
				}
				srcLines.splice(idx1,end1-start1+1);
				block1.prevLineNum = start1 -1;
				dstLines.splice(idx2,end2-start2+1);
				block2.prevLineNum = start2 -1;
				
				//标记描述节点
				var entry = new Object();
				entry.id = info["id"];
				entry.file = info["file"];
				entry.type = info["type"];
				entry.range1 = [start1,end1];
				entry.range2 = [start2,end2];
				entry.description = info["description"];		
				if(sign == 0) {
					descriptions[descriptions.length] = entry;
				}
				else {
					superDesc.subDesc[superDesc.subDesc.length] = entry;
				}
				
				if(info["sub_range"] != undefined) {
					entry.subDesc = new Array();
					parseDiff(info["sub_range"],1,array1,array2,entry);
				}
//				var extra = array1.length - array2.length;
//				var addArray = array2;
//				if(array1.length < array2.length) {
//					extra = array2.length - array1.length;
//					addArray = array1;
//				}								
//				for(var i=0;i<extra;i++) {
//					addArray[addArray.length] = new Object();
//				}
				
				block1.array = array1;
				aMoveBlock[aMoveBlock.length] = block1;				
				block2.array = array2;
				bMoveBlock[bMoveBlock.length] = block2;								
			}
			break;
		}						
    })	

    for (var o = 0; o < srcLines.length; o++) {
		for (var i = 0; i < aDeleteBlock.length; i++) {
			if (srcLines[o].number != undefined
					&& aDeleteBlock[i].prevLineNum == srcLines[o].number) {
				for (a = 0; a < aDeleteBlock[i].array.length; a++) {
					srcLines
							.splice(o + a + 1, 0, aDeleteBlock[i].array[a]);
					dstLines.splice(o + a + 1, 0, new Object());
				}
				o += aDeleteBlock[i].array.length;
				aDeleteBlock.splice(i, 1);
				i--;
			}
		}
		for (var i = 0; i < aChangeBlock.length; i++) {
			if (srcLines[o].number != undefined
					&& aChangeBlock[i].prevLineNum == srcLines[o].number) {
				for (a = 0; a < aChangeBlock[i].array.length; a++) {
					srcLines
							.splice(o + a + 1, 0, aChangeBlock[i].array[a]);
				}
				o += aChangeBlock[i].array.length;
				aChangeBlock.splice(i, 1);
				i--;
			}
		}
		for (var i = 0; i < aMoveBlock.length; i++) {
			if (srcLines[o].number != undefined
					&& aMoveBlock[i].prevLineNum == srcLines[o].number) {
				for (a = 0; a < aMoveBlock[i].array.length; a++) {
					srcLines
							.splice(o + a + 1, 0, aMoveBlock[i].array[a]);
					//
					dstLines.splice(o + a + 1, 0, new Object());
				}
				o += aMoveBlock[i].array.length;
			}
		}
	}
	for (var m = 0; m < dstLines.length; m++) {
		for (var i = 0; i < bInsertBlock.length; i++) {
			if (dstLines[m].number != undefined
					&& bInsertBlock[i].prevLineNum == dstLines[m].number) {
				for (a = 0; a < bInsertBlock[i].array.length; a++) {
					dstLines
							.splice(m + a + 1, 0, bInsertBlock[i].array[a]);
					srcLines.splice(m + a + 1, 0, new Object());
				}
				m += bInsertBlock[i].array.length;
				bInsertBlock.splice(i, 1);
				i--;
			}
		}
		for (var i = 0; i < bChangeBlock.length; i++) {
			if (dstLines[m].number != undefined
					&& bChangeBlock[i].prevLineNum == dstLines[m].number) {
				for (a = 0; a < bChangeBlock[i].array.length; a++) {
					dstLines
							.splice(m + a + 1, 0, bChangeBlock[i].array[a]);
				}
				m += bChangeBlock[i].array.length;
				bChangeBlock.splice(i, 1);
				i--;
			}
		}
//		for (var i = 0; i < bMoveBlock.length; i++) {
//			if (dstLines[m].number != undefined
//					&& bMoveBlock[i].prevLineNum == dstLines[m].number) {
//				for (a = 0; a < bMoveBlock[i].array.length; a++) {
//					dstLines
//							.splice(m + a + 1, 0, bMoveBlock[i].array[a]);
//					//
////					srcLines.splice(m + a + 1, 0, new Object());
//				}
//				m += bMoveBlock[i].array.length;
//			}
//		}
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

function drawBubble(entry,level) {
	if(entry.subDesc != undefined) {
		for(var s = 0;s<entry.subDesc.length;s++)		
			drawBubble(entry.subDesc[s],level+1);
	}
	var top = undefined,top1 = undefined,top2 = undefined;
	if(entry.range1 != undefined) {
		top1 = (originalLinesCoordinate[entry.range1[0]] + originalLinesCoordinate[entry.range1[1]])/2;
	}
	if(entry.range2 != undefined) {
		top2 = (modifiedLinesCoordinate[entry.range2[0]] + modifiedLinesCoordinate[entry.range2[1]])/2;
	}		
	if(top1!=undefined) {
		top = top1;
		if(top2!=undefined) {
			top = (top +top2)/2;
		}
	}
	else 
		top = top2;
	var bubbleDiv = document.createElement("div");
	bubbleDiv.className = "popover";
	bubbleDiv.id = entry.id;
	bubbleDiv.style.borderColor = getColor(level);
	bubbleDiv.style.top = top+"px";
	bubbleDiv.innerHTML="<div class='popover-content'>"+entry.description+"</div>";
	document.querySelector(".bubbleZone").appendChild(bubbleDiv);
}

function getDesc(file,number,descArray,color) {
	var top1,bottom1,top2,bottom2,middle1,middle2;
	var str = getColor(color);
	for(var i=0;i<descArray.length;i++) {
		if(file == 1 && descArray[i].range1 != undefined) {
			if(number>=descArray[i].range1[0]&&number<=descArray[i].range1[1]) {
				top1 = originalLinesCoordinate[descArray[i].range1[0]];
				bottom1 = originalLinesCoordinate[descArray[i].range1[1]]+19;
				middle1 = (top1 + bottom1)/2;
				drawTagLine(file,top1,middle1,bottom1,descArray[i].id,str);
			}
		}
		else if(file == 2 && descArray[i].range2 != undefined) {			
			if(number>=descArray[i].range2[0]&&number<=descArray[i].range2[1]) {				
				top2 = modifiedLinesCoordinate[descArray[i].range2[0]];
				bottom2 = modifiedLinesCoordinate[descArray[i].range2[1]]+19;
				middle2 = (top2 + bottom2)/2;
				drawTagLine(file,top2,middle2,bottom2,descArray[i].id,str);			
			}
		}
		if(descArray[i].subDesc != undefined) {
			getDesc(file,number,descArray[i].subDesc,color+1);
		}
	}
}

function getColor(level) {
	var str;
	switch(level) {
	case 1:
		str="red";
		break;
	case 2:
		str="blue";
		break;
	case 3:
		str="yellow";
		break;
	}
	return str;
}

function drawLinkLine() {
	var borderCanvas,arrowCanvas;
	var myCanvas,cxt;
	myCanvas=document.getElementById("overlayCanvas");
	cxt=myCanvas.getContext("2d");	
	for(var i=0;i<aMoveBlock.length;i++) {
		var top1,bottom1,top2,bottom2;
		top1 = originalLinesCoordinate[aMoveBlock[i].array[0].number]+1;
		bottom1 = originalLinesCoordinate[aMoveBlock[i].array[aMoveBlock[i].array.length-1].number]+19-1;
		top2 = modifiedLinesCoordinate[bMoveBlock[i].array[0].number]+1;
		bottom2 = modifiedLinesCoordinate[bMoveBlock[i].array[bMoveBlock[i].array.length-1].number]+19-1;
		cxt.beginPath();  
		cxt.moveTo(0,top1);
		cxt.bezierCurveTo(53,top1,0,top2,53,top2);
		cxt.lineTo(53,bottom2);
		cxt.bezierCurveTo(0,bottom2,53,bottom1,0,bottom1);
		cxt.lineTo(0,bottom1);
		cxt.fillStyle="rgba(255, 140, 0, 0.2)";
		cxt.strokeStyle="rgba(255, 140, 0, 0.2)";
		cxt.fill();
		cxt.stroke();
		cxt.beginPath();  
		cxt.lineWidth = 1;  
		cxt.moveTo(0,top1);
		cxt.bezierCurveTo(53,top1,0,top2,53,top2);
		cxt.moveTo(0,bottom1);
		cxt.bezierCurveTo(53,bottom1,0,bottom2,53,bottom2);
		cxt.strokeStyle="rgb(255, 69, 0)";		
		cxt.stroke();
		drawArrow(cxt,53,top2);
		drawArrow(cxt,53,bottom2);
	}
}

function drawArrow(cxt,x,y) {
	cxt.beginPath();  
	cxt.moveTo(x,y);
	cxt.lineTo(x-5,y-5);
	cxt.moveTo(x,y);
	cxt.lineTo(x-5,y+5);
	cxt.stroke();	
}

function drawTagLine(file,top,middle,bottom,id,color) {
	var borderCanvas,arrowCanvas;
	var myCanvas,cxt;
	if(file == 1) {
		borderCanvas = "myCanvas1";
		arrowCanvas = "overlayCanvas";
		
		myCanvas=document.getElementById("myCanvas2");
		cxt=myCanvas.getContext("2d");
		cxt=myCanvas.getContext("2d");	
		cxt.lineWidth = 2;  
		cxt.beginPath();  
		cxt.moveTo(0,middle);
		cxt.lineTo(600,middle);
		cxt.strokeStyle=color;
		cxt.stroke();	
		myCanvas=document.getElementById("myCanvas3");
		cxt=myCanvas.getContext("2d");
		cxt=myCanvas.getContext("2d");	
		cxt.lineWidth = 2;  
		cxt.beginPath();  
		cxt.moveTo(0,middle);
		cxt.lineTo(60,middle);
		cxt.strokeStyle=color;
		cxt.stroke();
	}
	else {
		borderCanvas = "myCanvas2";
		arrowCanvas = "myCanvas3";
	}
	myCanvas=document.getElementById(arrowCanvas);
	cxt=myCanvas.getContext("2d");
	cxt=myCanvas.getContext("2d");	
	cxt.lineWidth = 1.5;  
	cxt.beginPath();  
	cxt.moveTo(0,top);
	cxt.lineTo(30,middle);
	cxt.lineTo(0,bottom);
	cxt.strokeStyle=color;
	cxt.stroke();
	cxt.moveTo(30,middle);
	cxt.lineTo(100,middle);
	cxt.stroke();
	myCanvas=document.getElementById(borderCanvas);
	cxt=myCanvas.getContext("2d");
	cxt=myCanvas.getContext("2d");	
	cxt.lineWidth = 2;  
	cxt.beginPath();  
	cxt.moveTo(0,top);
	cxt.lineTo(600,top);
	cxt.moveTo(0,bottom);
	cxt.lineTo(600,bottom);
	cxt.moveTo(1,top);
	cxt.lineTo(1,bottom);
	cxt.strokeStyle=color;
	cxt.stroke();	
	document.getElementById(id).style.visibility="visible";
}

function bubble() {
	clearPopover();
	clearCanvas();
//	<!--<div class="current-line" style="width:538px; height:19px;"></div>-->
//    <!--<div class="cdr bracket-match" style="left:0px;width:8px;height:19px;"></div>-->
	var file = 1;
	if(this.parentNode.parentNode.parentNode.parentNode.className == "monaco-editor modified-in-monaco-diff-editor vs")
		file = 2;
	var top = parseInt(this.style.top);
	var left = parseInt(this.style.left);
	if(isNaN(left)) 
		left = 0;
	getDesc(file,this.number,descriptions,1);
//	document.querySelector(".modified-in-monaco-diff-editor .view-overlays").children[top/19].appendChild(currentLineDiv);
}

function clearPopover() {
	var popovers = document.querySelectorAll("div[class='popover']");
	for(var p=0;p<popovers.length;p++) {
		popovers[p].style.visibility="hidden";
	}
}

function clearCanvas() {
	var myCanvas=document.getElementById("myCanvas1");
	var cxt = myCanvas.getContext("2d");
    cxt.clearRect(0,0,myCanvas.width,myCanvas.height);  
    myCanvas=document.getElementById("myCanvas2");
	cxt = myCanvas.getContext("2d");
    cxt.clearRect(0,0,myCanvas.width,myCanvas.height);  
    myCanvas=document.getElementById("myCanvas3");
	cxt = myCanvas.getContext("2d");
    cxt.clearRect(0,0,myCanvas.width,myCanvas.height);  
    myCanvas=document.getElementById("overlayCanvas");
	cxt = myCanvas.getContext("2d");
    cxt.clearRect(0,0,myCanvas.width,myCanvas.height);
    drawLinkLine();
}
