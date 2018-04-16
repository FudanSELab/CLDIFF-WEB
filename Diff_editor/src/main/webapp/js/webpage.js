function generateContainer() {
	//init
	document.querySelector(".original-in-monaco-diff-editor").innerHTML="";
	document.querySelector(".modified-in-monaco-diff-editor").innerHTML="";
	
	// original editor
	var overlaysDiv = document.createElement("div");
	overlaysDiv.className="margin-view-overlays";
	document.querySelector(".original-in-monaco-diff-editor").appendChild(overlaysDiv);
	// 行中的对齐线；删除、增加颜色效果
	var scrollableDiv = document.createElement("div");
	scrollableDiv.className="monaco-scrollable-element editor-scrollable vs";
//	scrollableDiv.style = "position: absolute; overflow: hidden; left: 53px; width: 490px; height: 700px;";
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
	
	generateEditor(originalLines,originalLinesCoordinate,overlaysDiv,viewOverlaysDiv,linesDiv1,viewZonesDiv1);

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
	generateEditor(modifiedLines,modifiedLinesCoordinate,overlaysDiv2,viewOverlaysDiv2,linesDiv2,viewZonesDiv2);
}

function generateEditor(contentLines,linesCoordinate,overlaysDiv,viewOverlaysDiv,linesDiv,viewZonesDiv) {
	//阴影行数
	var diagonalLine = 0;
	
	for(var l=0;l<contentLines.length;l++) {
		var newDiv1 = document.createElement("div");
		newDiv1.style="width: 100%; height: 19px;";	            		
		var newDiv2 = document.createElement("div");
		newDiv2.style="width: 100%; height: 19px;";            		
		var newDiv3 = document.createElement("div");
		newDiv3.style="top: "+(l*19)+"px; height: 19px;";
		newDiv3.className = "view-line";
		newDiv3.onclick = bubble;
		
		if(contentLines[l].number == undefined) {
			diagonalLine ++;
			newDiv1.innerHTML = "<div class='line-numbers'></div>"; 
			newDiv2.innerHTML = ""; 
			newDiv3.innerHTML = "<span><span class='mtk1'></span></span>";
		}	            			
		else {
			linesCoordinate[contentLines[l].number] = l*19;
			newDiv3.number = contentLines[l].number;
			if(diagonalLine != 0) {
				var diagonalDiv = document.createElement("div");
            	diagonalDiv.className="diagonal-fill";
            	diagonalDiv.style = "position: absolute; width: 100%; display: block; top: "+(19*(l-diagonalLine))+"px; height: "+(19*diagonalLine)+"px;";
            	viewZonesDiv.appendChild(diagonalDiv);
				diagonalLine=0;
			}
			var inner;
			if(contentLines[l].mark != undefined && (contentLines[l].mark == "insert"||contentLines[l].mark == "change"||contentLines[l].mark == "move"||contentLines[l].mark == "delete")) {
				var mark = contentLines[l].mark;
				if(contentLines[l].mark == "move")
					mark="";
				newDiv1.innerHTML = "<div class='cmdr line-"+mark+"' style='height: 19px'></div><div class='cldr "+contentLines[l].mark+"-sign' style='left: 38px; width: 15px; height: 19px'></div><div class='line-numbers'>"
					+ contentLines[l].number
					+ "</div>";
				inner = "<div class='cdr line-"+contentLines[l].mark+"' style='left: 0; width: 100%; height: 19px;'></div>";
				if(contentLines[l].code_range != undefined) {
					for(var co=0;co<contentLines[l].code_range.length;co+=2) {
						inner += "<div class='cdr char-"
								+ contentLines[l].mark
								+ "' style='left:"
								+ (7.7 * (contentLines[l].code_range[co] - 1))
								+ "px;width:"
								+ (7.7 * (contentLines[l].code_range[co+1]
										- contentLines[l].code_range[co] + 1))
								+ "px;height:19px;'></div>"
					}
				}
			}	            				
			else {
				newDiv1.innerHTML = "<div class='line-numbers'>"
					+ contentLines[l].number
					+ "</div>";
				inner = "";	            				
			}
//			var re=eval("/	/g");
//			var matchResult = contentLines[l].content.match(re);
//			if(matchResult != undefined) {
//				var indent = matchResult.length;
//    			for(var m = 0;m<indent;m++) {
//    				inner += "<div class='cigr' style='left: "+(m*30.78125)+"px; height: 19px; width: 0.8px'></div>"
//    			}
//			}
			newDiv2.innerHTML = inner;
			var content = contentLines[l].content.replace(/	/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
			var index = 0;
			var prefix="";
			while(content.indexOf(" ") == 0) {
				content = content.replace(/(^\s)/g, "");
				prefix+="&nbsp;";
			}	
			content =prefix +content;
//			var sub_class = getSubColorByMark(contentLines[l].sub_mark);
//			newDiv3.innerHTML = "<span><span class='"+sub_class+"'>"+content+"</span></span>"
			newDiv3.innerHTML = "<span><span class='mtk1'>"+content+"</span></span>"
		}								           			            			            		
		overlaysDiv.appendChild(newDiv1);
		viewOverlaysDiv.appendChild(newDiv2);
		linesDiv.appendChild(newDiv3);
	}	  
}