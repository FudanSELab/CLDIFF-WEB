var bubbleArray = new Array();
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
	drawDescLayer(file,this.number,descriptions);
//	document.querySelector(".modified-in-monaco-diff-editor .view-overlays").children[top/19].appendChild(currentLineDiv);
}

function drawDescLayer(file,number,descArray) {
	var top1,bottom1,top2,bottom2,middle1,middle2;
//	var str = getColorByType(color);
	for(var i=0;i<descArray.length;i++) {
		var isChangeOrMove = false;
		if(descArray[i].type2 == "Change" ||descArray[i].type2 == "Move"||descArray[i].type2 == "Change.Move")
			isChangeOrMove = true;
		if(file == 1 && descArray[i].range1 != undefined) {
			if(number>=descArray[i].range1[0]&&number<=descArray[i].range1[1]) {			
				if(!isChangeOrMove) {
					top1 = originalLinesCoordinate[descArray[i].range1[0]];
					bottom1 = originalLinesCoordinate[descArray[i].range1[1]]+19;
				}
				else if(descArray[i].range2 != undefined) {
					top1 = modifiedLinesCoordinate[descArray[i].range2[0]];
					bottom1 = modifiedLinesCoordinate[descArray[i].range2[1]]+19;
				}
				middle1 = (top1 + bottom1)/2;
				drawTagLine(file,top1,middle1,bottom1,descArray[i].id,getColorByType(descArray[i].type2),isChangeOrMove);
			}
		}
		else if(file == 2  && descArray[i].range2 != undefined) {			
			if(number>=descArray[i].range2[0]&&number<=descArray[i].range2[1]) {				
				top2 = modifiedLinesCoordinate[descArray[i].range2[0]];
				bottom2 = modifiedLinesCoordinate[descArray[i].range2[1]]+19;
				middle2 = (top2 + bottom2)/2;
				drawTagLine(file,top2,middle2,bottom2,descArray[i].id,getColorByType(descArray[i].type2),isChangeOrMove);			
			}
		}
		if(descArray[i].subDesc != undefined) {
			drawDescLayer(file,number,descArray[i].subDesc);
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
			top = (top2+top1)/2;
		}
	}
	else 
		top = top2;
	var bubbleDiv = document.createElement("div");
	bubbleDiv.className = "popover";
	bubbleDiv.id = entry.id;
	var bubbleTop = top+9,bubbleLeft = 110;
	bubbleDiv.style.borderColor = getColorByType(entry["type2"]);
	bubbleDiv.style.width = "300px";
	bubbleDiv.innerHTML="<div class='popover-content'>"+entry.description+"</div>";
	document.querySelector(".bubbleZone").appendChild(bubbleDiv);
	bubbleDiv.style.left = bubbleLeft+"px";
	
//	var list="";
//	for (var d = 0; d < bubbleArray.length; d++) {
//		list += bubbleArray[d].id+"  "+parseInt(bubbleArray[d].style.top) +"\n";
//	}
//	alert(list);
	
	computeBubbleCoordinate(bubbleDiv,bubbleTop,bubbleTop+bubbleDiv.offsetHeight);

}

function computeBubbleCoordinate(bubbleDiv,top,bottom) {
	var inserted = false;
	var i = 0;	
	for (; i < bubbleArray.length; i++) {
		var topTemp = parseInt(bubbleArray[i].style.top);
		var bottomTemp = topTemp + bubbleArray[i].offsetHeight;
		var position = positionRelationship(top,bottom,topTemp,bottomTemp);    		
		if((position != undefined &&position == "prev") || parseInt(bottom) == parseInt(topTemp)) {
			bubbleArray.splice(i, 0, bubbleDiv);
			bubbleDiv.style.top = top+"px";
			inserted = true;
			break;
		}
		else if((position != undefined && position == "next") || parseInt(top) == parseInt(bottomTemp)) 
			continue;
		else {
			bubbleArray.splice(i+1, 0, bubbleDiv);
			if(parseInt(top) < parseInt(bottomTemp)) {
				top = bottomTemp;
				bottom = top + bubbleDiv.offsetHeight;
			}
			bubbleDiv.style.top = top+"px";
			shiftBubble(i+2,bottom);
			inserted = true;
			break;
		}				
    }
	if(!inserted) {
		bubbleArray.splice(i, 0, bubbleDiv);
		bubbleDiv.style.top = top+"px";
	}
}

function shiftBubble(index,bottom) {
	for (var i = index; i < bubbleArray.length; i++) {
		if(parseInt(bubbleArray[i].style.top) < parseInt(bottom)) {
			bubbleArray[i].style.top = bottom+"px";
			bottom = bottom + bubbleArray[i].offsetHeight;
		}
		else {
			break;
		}
	}
	
}


function drawLinkLine(srcBlocks,dstBlocks,fillStyleColor,strokeStyleColor) {
	var borderCanvas,arrowCanvas;
	var myCanvas,cxt;
	myCanvas=document.getElementById("overlayCanvas");
	cxt=myCanvas.getContext("2d");	
	for(var i=0;i<srcBlocks.length;i++) {
		var top1,bottom1,top2,bottom2;
		top1 = originalLinesCoordinate[srcBlocks[i].array[0].number]+1;
		bottom1 = originalLinesCoordinate[srcBlocks[i].array[srcBlocks[i].array.length-1].number]+19-1;
		top2 = modifiedLinesCoordinate[dstBlocks[i].array[0].number]+1;
		bottom2 = modifiedLinesCoordinate[dstBlocks[i].array[dstBlocks[i].array.length-1].number]+19-1;
		cxt.lineWidth = 1.5; 
		cxt.beginPath();  
		cxt.moveTo(0,top1);
		cxt.lineTo(47,top2);
		cxt.lineTo(53,top2);
		cxt.lineTo(53,bottom2);
		cxt.lineTo(47,bottom2);
		cxt.lineTo(0,bottom1);
		cxt.fillStyle=fillStyleColor;
		cxt.strokeStyle=fillStyleColor;
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
		cxt.strokeStyle=strokeStyleColor;		
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

function drawTagLine(file,top,middle,bottom,id,color,isChangeOrMove) {
	var popover = document.getElementById(id);
	popover.style.visibility="visible";
	var popoverTop = parseInt(popover.style.top);
	var popoverLeft = parseInt(popover.style.left);
	var borderCanvas,arrowCanvas;
	var myCanvas,cxt;
	var tail = popoverTop+1;
	if(file == 1 && (!isChangeOrMove)) {
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
		cxt.lineTo(popoverLeft,popoverTop+1);
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
	cxt.lineTo(popoverLeft,tail);
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
	if(!isChangeOrMove) {
		cxt.moveTo(1,top);
		cxt.lineTo(1,bottom);
	}	
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
    drawLinkLine(aMoveBlock,bMoveBlock,"rgba(255, 140, 0, 0.2)","rgb(255, 69, 0)");
	drawLinkLine(aChangeBlock,bChangeBlock,"rgba(0, 100, 255, 0.2)","rgb(10, 49, 255)");
}