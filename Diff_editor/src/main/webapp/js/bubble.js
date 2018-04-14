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
	drawDescLayer(file,this.number,descriptions,1);
//	document.querySelector(".modified-in-monaco-diff-editor .view-overlays").children[top/19].appendChild(currentLineDiv);
}

function drawDescLayer(file,number,descArray,color) {
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
			drawDescLayer(file,number,descArray[i].subDesc,color+1);
		}
	}
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
//	alert(entry.id + "  " +top);
	var bubbleDiv = document.createElement("div");
	bubbleDiv.className = "popover";
	bubbleDiv.id = entry.id;
	bubbleDiv.style.borderColor = getColor(level);
	bubbleDiv.style.top = (top+9.5)+"px";
	bubbleDiv.innerHTML="<div class='popover-content'>"+entry.description+"</div>";
	document.querySelector(".bubbleZone").appendChild(bubbleDiv);
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
		cxt.lineTo(47,top2);
		cxt.lineTo(53,top2);
		cxt.lineTo(53,bottom2);
		cxt.lineTo(47,bottom2);
		cxt.lineTo(0,bottom1);
		cxt.fillStyle="rgba(255, 140, 0, 0.2)";
		cxt.strokeStyle="rgba(255, 140, 0, 0.2)";
		cxt.fill();
		cxt.stroke();
		cxt.beginPath();  
		cxt.lineWidth = 1;  
		cxt.moveTo(0,top1);
		cxt.lineTo(47,top2);
		cxt.lineTo(53,top2);
		cxt.moveTo(0,bottom1);
		cxt.lineTo(47,bottom2);
		cxt.lineTo(53,bottom2);
		cxt.strokeStyle="rgb(255, 69, 0)";		
		cxt.stroke();
		drawArrow(cxt,53,top2);
		drawArrow(cxt,53,bottom2);
	}
}

function drawArrow(cxt,x,y) {
	cxt.beginPath();  
	cxt.moveTo(x,y);
	cxt.lineTo(x-3.2,y-3.2);
	cxt.moveTo(x,y);
	cxt.lineTo(x-3.2,y+3.2);
	cxt.stroke();	
}

function drawTagLine(file,top,middle,bottom,id,color) {
	var popover = document.getElementById(id);
	popover.style.visibility="visible";
	var popoverTop = parseInt(popover.style.top);
	var borderCanvas,arrowCanvas;
	var myCanvas,cxt;
	var tail = popoverTop+1;
	if(file == 1) {
		tail = middle;
		borderCanvas = "myCanvas1";
		arrowCanvas = "overlayCanvas";
		
		myCanvas=document.getElementById("myCanvas2");
		cxt=myCanvas.getContext("2d");
		cxt.lineWidth = 1.5;  
		cxt.beginPath();  
		cxt.moveTo(0,middle);
		cxt.lineTo(600,middle);
		cxt.strokeStyle=color;
		cxt.stroke();	
		myCanvas=document.getElementById("myCanvas3");
		cxt=myCanvas.getContext("2d");
		cxt.lineWidth = 1.5;  
		cxt.beginPath();  
		cxt.moveTo(0,middle);
		cxt.lineTo(90,popoverTop+1);
		cxt.strokeStyle=color;
		cxt.stroke();
	}
	else {
		borderCanvas = "myCanvas2";
		arrowCanvas = "myCanvas3";
	}

	myCanvas=document.getElementById(arrowCanvas);
	cxt=myCanvas.getContext("2d");
	cxt.lineWidth = 1.5;  
	cxt.beginPath();  
	cxt.moveTo(0,top);
	cxt.lineTo(30,middle);
	cxt.lineTo(0,bottom);
	cxt.moveTo(30,middle);
	cxt.lineTo(90,tail);
	cxt.strokeStyle=color;
	cxt.stroke();
	myCanvas=document.getElementById(borderCanvas);
	cxt=myCanvas.getContext("2d");
	cxt.lineWidth = 1.5;  
	cxt.beginPath();  
	cxt.moveTo(0,top);
	cxt.lineTo(600,top);
	cxt.moveTo(0,bottom);
	cxt.lineTo(600,bottom);
	cxt.moveTo(1,top);
	cxt.lineTo(1,bottom);
	cxt.strokeStyle=color;
	cxt.stroke();		
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