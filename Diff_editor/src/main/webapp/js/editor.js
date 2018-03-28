var originalLines =  new Array();
var modifiedLines =  new Array();
var aDeleteBlock =  new Array();
var bDeleteBlock = new Array();
var aInsertBlock = new Array();
var bInsertBlock = new Array();
var aMoveBlock = new Array();
var bMoveBlock = new Array();
var aDiagonalBlock = new Array();
var bDiagonalBlock = new Array();

$(document).ready(function() {
	$(function() {
		$.get("sourcedata/diff.lhs.java", function(data) {
        	var tempLines = data.toString().split(/[\n\r]/);
        	for(var i = 0;i<tempLines.length;i++) {
        		var line = new Object();
        		line.number = i+1;
        		line.content=tempLines[i];
        		originalLines[i]=line;
        	}
        	
        	$.get("sourcedata/diff.rhs.java", function(data) {
//        		alert(data);
//        		modifiedLines = data.toString().split(/[\n\r]/); 
        		var tempLines = data.toString().split(/[\n\r]/);
            	for(var i = 0;i<tempLines.length;i++) {
            		var line = new Object();
            		line.number = i+1;
            		line.content=tempLines[i];
            		modifiedLines[i]=line;
            	}
				$.getJSON("json/test.json", function (data){					
	            	var ocut = 0,mcut=0;
					$.each(data,function(infoIndex,info){  
						var wholeRange = info["range"].split(',');
//						alert(wholeRange[0]);
						if(info["file"] == "a") {
							if(info["sub_range"] == undefined) {
								switch (info["type"])
								{
								case "member_delete":
									var block = new Object();
									var array = new Array();
									for(var i=wholeRange[0];i<=wholeRange[1];i++) {
										originalLines[i-1].mark = "delete";
										array[array.length] = originalLines[i-1];
									}
//									originalLines.splice(wholeRange[0]-ocut,wholeRange[1]-wholeRange[0]+1);
									originalLines.splice(wholeRange[0]-ocut-1,wholeRange[1]-wholeRange[0]+1);
									ocut += wholeRange[1]-wholeRange[0]+1;
									block.prevLineNum = wholeRange[0] -1;
									block.array = array;
									aDeleteBlock[aDeleteBlock.length] = block;
								    break;
								case "member_insert":
									aInsertBlock[aInsertBlock.length] = wholeRange;
									break;
								case "member_move":
									aMoveBlock[aMoveBlock.length] = wholeRange;
									break;
								}	
							}
							
							else {
								switch (info["type"])
								{
								case "member_change":
									aDeleteBlock[aDeleteBlock.length] = wholeRange;
								    break;
								}	
							}
						}
						else if(info["file"] == "b") {
							if(info["sub_range"] == undefined) {
								switch (info["type"])
								{
								case "member_delete":									
								    break;
								case "member_insert":
									var block = new Object();
									var array = new Array();
									for(var i=wholeRange[0];i<=wholeRange[1];i++) {
										modifiedLines[i-1].mark = "insert";
										array[array.length] = modifiedLines[i-1];
									}
//									modifiedLines.splice(wholeRange[0]-mcut,wholeRange[1]-wholeRange[0]+1);
									modifiedLines.splice(wholeRange[0]-mcut-1,wholeRange[1]-wholeRange[0]+1);
									ocut += wholeRange[1]-wholeRange[0]+1;
									block.prevLineNum = wholeRange[0] -1;
									block.array = array;
									bInsertBlock[bInsertBlock.length] = block;
									break;
								case "member_move":
									aMoveBlock[aMoveBlock.length] = wholeRange;
									break;
								}	
							}
							
							else {
								switch (info["type"])
								{
								case "member_change":
									aDeleteBlock[aDeleteBlock.length] = wholeRange;
								    break;
								}	
							}
						}						
				    })													
	        		for(var o=0;o<originalLines.length;o++) {
						for(var i=0;i<aDeleteBlock.length;i++) {
//							if(aDeleteBlock[i].prevLineNum == o) {
							if(originalLines[o].number !=undefined && aDeleteBlock[i].prevLineNum == originalLines[o].number) {
								for(a =0;a<aDeleteBlock[i].array.length;a++) {
									originalLines.splice(o+a+1,0,aDeleteBlock[i].array[a]);
									modifiedLines.splice(o+a+1,0,new Object());
								}
//								var diagonal = new Object();
//								diagonal.prevLineNum = originalLines[o].number;
//								alert(originalLines[o].number);
//								diagonal.height = aDeleteBlock[i].array.length;
//								bDiagonalBlock[bDiagonalBlock.length] = diagonal;
								o+=aDeleteBlock[i].array.length;
								aDeleteBlock.splice(i,1);
								i--;
							}
						}
					}	
					for(var m=0;m<modifiedLines.length;m++) {
						for(var i=0;i<bInsertBlock.length;i++) {
							if(modifiedLines[m].number !=undefined && bInsertBlock[i].prevLineNum == modifiedLines[m].number) {
								for(a =0;a<bInsertBlock[i].array.length;a++) {
									modifiedLines.splice(m+a+1,0,bInsertBlock[i].array[a]);
									originalLines.splice(m+a+1,0,new Object());
								}
//								var diagonal = new Object();
//								diagonal.top = m+1;
//								diagonal.height = bInsertBlock[i].array.length;
//								aDiagonalBlock[aDiagonalBlock.length] = diagonal;
								m+=bInsertBlock[i].array.length;
								bInsertBlock.splice(i,1);
								i--;
							}
						}
					}	
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
	            		
	            		if(originalLines[l].number == undefined) {
	            			diagonalLine1 ++;
	            			newDiv1.innerHTML = "<div class='line-numbers'></div>"; 
	            			newDiv2.innerHTML = ""; 
	            			newDiv3.innerHTML = "<span><span class='mtk1'></span></span>";
	            		}	            			
	            		else {
	            			if(diagonalLine1 != 0) {
	            				var diagonalDiv = document.createElement("div");
	    		            	diagonalDiv.className="diagonal-fill";
	    		            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*(l-diagonalLine1))+"px; height: "+(19*diagonalLine1)+"px;";
	    		            	viewZonesDiv1.appendChild(diagonalDiv);
	            				diagonalLine1=0;
	            			}
	            			if(originalLines[l].mark != undefined && originalLines[l].mark == "delete") {
	            				newDiv1.innerHTML = "<div class='cmdr line-delete' style='height: 19px'></div><div class='cldr delete-sign' style='left: 38px; width: 15px; height: 19px'></div><div class='line-numbers'>"
									+ originalLines[l].number
									+ "</div>";
	            				newDiv2.innerHTML = "<div class='cdr line-delete' style='left: 0; width: 100%; height: 19px;'></div>";
	            			}	            				
	            			else {
	            				newDiv1.innerHTML = "<div class='line-numbers'>"
									+ originalLines[l].number
									+ "</div>";
	            				newDiv2.innerHTML = "";
	            			}
	            			var content = originalLines[l].content.replace(/	/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
	            			newDiv3.innerHTML = "<span><span class='mtk1'>"+content+"</span></span>"
	            		}								           			            			            		
	            		overlaysDiv.appendChild(newDiv1);
	            		viewOverlaysDiv.appendChild(newDiv2);
	            		linesDiv1.appendChild(newDiv3);
	            	}
	            	
//	            	for(var d=0;d<aDiagonalBlock.length;d++) {
//	            		//斜线阴影部分
//		            	var diagonalDiv = document.createElement("div");
//		            	diagonalDiv.className="diagonal-fill";
//		            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*aDiagonalBlock[d].top)+"px; height: "+(19*aDiagonalBlock[d].height)+"px;";
//		            	viewZonesDiv1.appendChild(diagonalDiv);
//	            	}
//	            	
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
	            		
	            		if(modifiedLines[l].number == undefined) {
	            			diagonalLine2 ++;
	            			newDiv1.innerHTML = "<div class='line-numbers'></div>"; 
	            			newDiv2.innerHTML = ""; 
	            			newDiv3.innerHTML = "<span><span class='mtk1'></span></span>";
	            		}	            			
	            		else {
	            			if(diagonalLine2 != 0) {
	            				var diagonalDiv = document.createElement("div");
	    		            	diagonalDiv.className="diagonal-fill";
	    		            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*(l-diagonalLine2))+"px; height: "+(19*diagonalLine2)+"px;";
	    		            	viewZonesDiv2.appendChild(diagonalDiv);
	            				diagonalLine2=0;
	            			}
	            			if(modifiedLines[l].mark != undefined && modifiedLines[l].mark == "insert") {
	            				newDiv1.innerHTML = "<div class='cmdr line-insert' style='height: 19px'></div><div class='cldr insert-sign' style='left: 38px; width: 15px; height: 19px'></div><div class='line-numbers'>"
									+ modifiedLines[l].number
									+ "</div>";
	            				newDiv2.innerHTML = "<div class='cdr line-insert' style='left: 0; width: 100%; height: 19px;'></div>";
	            			}	            				
	            			else {
	            				newDiv1.innerHTML = "<div class='line-numbers'>"
									+ modifiedLines[l].number
									+ "</div>";
	            				newDiv2.innerHTML = "";
	            			}
	            			var content = modifiedLines[l].content.replace(/	/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
	            			newDiv3.innerHTML = "<span><span class='mtk1'>"+content+"</span></span>"
	            		}								           			            			            		
	            		overlaysDiv2.appendChild(newDiv1);
	            		viewOverlaysDiv2.appendChild(newDiv2);
	            		linesDiv2.appendChild(newDiv3);
	            	}
//	            	for(var d=0;d<bDiagonalBlock.length;d++) {
//	            		//斜线阴影部分
//		            	var diagonalDiv = document.createElement("div");
//		            	diagonalDiv.className="diagonal-fill";
//		            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*bDiagonalBlock[d].top)+"px; height: "+(19*bDiagonalBlock[d].height)+"px;";
//		            	viewZonesDiv2.appendChild(diagonalDiv);
//	            	}
				}) 
                	
            });
            
        });
    });

})