var linkObj = new Object();
var linkRecord = new Object();
var desc;

function showLink() {
	clearPopoverTop();
	linkObj = new Object();
	linkRecord = new Object();
	var file = 1,container = document.querySelector(".original-in-monaco-diff-editor");
	if(this.parentNode.parentNode.parentNode.parentNode.className == "monaco-editor modified-in-monaco-diff-editor vs") {
		file = 2;
	}
//	var top = parseInt(this.style.top);
//	var left = parseInt(this.style.left);
//	if(isNaN(left)) 
//		left = 0;
//	var id= "12";
//	var popoverTop = document.getElementsByClassName("popover top "+id);
//	if(popoverTop.length != 0) {
//		popoverTop[0].style.visibility="visible";
//	}
//	else {
//		var popoverTopDiv = document.createElement("div");
//		popoverTopDiv.className = "popover top 12";
//		popoverTopDiv.id = 12;
//		popoverTopDiv.style = "position:absolute;left:"+left+"px;";
//		var inner = "<div class='arrow'></div>";
//		inner += " <div class='popover-content' style='max-height:100px;overflow:auto;'>" +
////				"<p>Sed posuere consectetur e.</br>" +
////				"<p>Sed posuere consectetur e.</br>" +
////				"<p>Sed posuere consectetur e.</br>" +
////				"<p>Sed posuere consectetur e.</br>" +
//				"<a onclick='linkTo("+top+")'>Sed posuere consectetur e.</a></br></p></div>";
//		popoverTopDiv.innerHTML=inner;
//		this.parentNode.appendChild(popoverTopDiv);
//		popoverTopDiv.style.top = (top - popoverTopDiv.offsetHeight) + "px";
//	}
	
	for(var i=0;i<descriptions.length;i++) 
		drawLinkLayer(file,this.number,descriptions[i],descriptions[i].id);	
	drawLink(file,this.parentNode);
}

function drawLink(file,parent) {
	var top;
	var idArray = new Array();
	var id;
	for(var attribute in linkObj){    
		if(linkObj[attribute] != undefined) {
			desc = new Object();
			getDescById(descriptions,linkObj[attribute]);
			var temp;
			(file == 1) ? temp= originalLinesCoordinate[desc.range1[0]] : temp= modifiedLinesCoordinate[desc.range2[0]];
			if(top == undefined) {
				top = temp;
				idArray[0] = attribute;
			}
			else if(parseInt(temp) == parseInt(top)) {
				idArray[idArray.length] = attribute;
			}
			else if(parseInt(temp) >= parseInt(top)) {
				top = temp;
				idArray.splice(0,idArray.length);
				idArray[0] = attribute;
			}
			//draw
		}
	} 
	
	var content = "";
//	alert(idArray[0].length);
	for(var i =0; i< idArray.length;i++){ 
		var linkList = linkRecord[idArray[0]]; 
		for(var l=0;l<linkList.length;l++) {
			content += "<a onclick='linkTo("+linkList[l].id+","+linkList[l].fileName+")'>"+linkList[l].id+"   "+linkList[l].desc+"</a></br>";
		}
		id = linkObj[idArray[i]];
	}
	
	if(id != undefined) {
		var popoverTop = document.getElementsByClassName("popover top "+id);
//		alert(popoverTop.length);
		if(parseInt(popoverTop.length) > 0) {
//			alert(popoverTop[0]);
//			popoverTop[0].parentNode.removeChild(popoverTop[0]);
//			var temp = popoverTop[0];			
			var temp = popoverTop[0].parentNode.removeChild(popoverTop[0]);
			parent.appendChild(temp);
			temp.style.visibility="visible";
			temp.style.top = (top - temp.offsetHeight) + "px";
			
//			popoverTop[0].style.top = top;
//			parent.appendChild(popoverTop[0]);
		}
		else {
			var popoverTopDiv = document.createElement("div");
			popoverTopDiv.className = "popover top "+id;
			popoverTopDiv.style = "position:absolute;left:0;";
			var inner = "<div class='arrow'></div>";
			inner += " <div class='popover-content' style='max-height:100px;overflow:auto;'>" +
			content+
//					"<p>Sed posuere consectetur e.</br>" +
//					"<p>Sed posuere consectetur e.</br>" +
//					"<p>Sed posuere consectetur e.</br>" +
//					"<p>Sed posuere consectetur e.</br>" +
//					"<a onclick='linkTo("+top+")'>Sed posuere consectetur e.</a></br></p>" +
							"</div>";
			popoverTopDiv.innerHTML=inner;
			parent.appendChild(popoverTopDiv);
			popoverTopDiv.style.top = (top - popoverTopDiv.offsetHeight) + "px";
		}		
	}
	
}

function drawLinkLayer(file,number,descObj,mostParentId) {
//	for(var i=0;i<descArray.length;i++) {
		if(file == 1 && descObj.range1 != undefined) {
			if(number>=descObj.range1[0]&&number<=descObj.range1[1]) {	
//				alert("o  "+descObj.id);
				if(hasLink(descObj.id,mostParentId))
					linkObj[mostParentId] = descObj.id;
				if(descObj.subDesc != undefined) {
					for(var i=0;i<descObj.subDesc.length;i++) 
						drawLinkLayer(file,number,descObj.subDesc[i],mostParentId);
				}
			}
		}
		else if(file == 2  && descObj.range2 != undefined) {			
			if(number>=descObj.range2[0]&&number<=descObj.range2[1]) {	
				if(hasLink(descObj.id,mostParentId)) {
					linkObj[mostParentId] = descObj.id;
				}
				if(descObj.subDesc != undefined) {
					for(var i=0;i<descObj.subDesc.length;i++) 
						drawLinkLayer(file,number,descObj.subDesc[i],mostParentId);
				}
			}
		}		
//	}
}

function hasLink(descId,mostParentId) {
	var tempRecord = new Array();
	var hasLink = false;
	for(var i=0;i<inFilelink.length;i++) {
//		alert("id "+descId);
		if(parseInt(inFilelink[i]["from"]) == parseInt(descId) || parseInt(inFilelink[i]["to"]) == parseInt(descId)) {
			hasLink = true;
			var obj = new Object();
			(parseInt(inFilelink[i]["from"]) == parseInt(descId)) ? obj.id=inFilelink[i]["to"]:obj.id=inFilelink[i]["from"];
			obj.desc = inFilelink[i]["desc"];
//			if(linkRecord[mostParentId] == undefined) 
//				linkRecord[mostParentId] = new Array();
//			linkRecord[mostParentId][linkRecord[mostParentId].length] = obj;
			tempRecord[tempRecord.length] = obj;
		}
//		if(link[i]["file-name"] == fileName && link[i]["file-name2"] == undefined ) {
//			for(var l=0;l<link[i].parsedLink.length;l++) {
//				if(parseInt(link[i][l][0]) == parseInt(descId) || parseInt(link[i][l][1]) == parseInt(descId)) {
//					hasLink = true;
//					var obj = new Object();
//					(parseInt(link[i][l][0]) == parseInt(descId))? obj.id=link[i][l][1]:obj.id=link[i][l][0];
//					if(linkRecord[mostParentId] == undefined) 
//						linkRecord[mostParentId] = new Array();
//					linkRecord[mostParentId][linkRecord[mostParentId].length] = obj;
//				}
//			}
//		}
//		if(link[i]["file-name"] == fileName || link[i]["file-name2"] == fileName) {
//			var idx;
//			(link[i]["file-name"] == fileName) ? idx=0 : idx=1;
//			for(var l=0;l<link[i].parsedLink.length;l++) {
//				if(parseInt(link[i][l][idx]) == parseInt(descId)) {
//					hasLink = true;
//					var obj = new Object();
//					obj.id=link[i][l][idx^1];
//					(idx==0) ? obj.fileName = link[i]["file-name2"] : obj.fileName = link[i]["file-name"];
//					if(linkRecord[mostParentId] == undefined) 
//						linkRecord[mostParentId] = new Array();
//					linkRecord[mostParentId][linkRecord[mostParentId].length] = obj;
//				}
//			}
//		}
	}
	for(var attribute in otherFilelink) {
		if(otherFilelink[attribute] != undefined) {
			var array = otherFilelink[attribute];
			for(var o=0;o<array.length;o++) {
				if(parseInt(array[i]["from"]) == parseInt(descId) || parseInt(array[i]["to"]) == parseInt(descId)) {
					hasLink = true;
					var obj = new Object();
					(parseInt(array[i]["from"]) == parseInt(descId)) ? obj.id=array[i]["to"]:obj.id=array[i]["from"];
					obj.desc = inFilelink[i]["desc"];
					obj.fileName = attribute;
//					if(linkRecord[mostParentId] == undefined) 
//						linkRecord[mostParentId] = new Array();
//					linkRecord[mostParentId][linkRecord[mostParentId].length] = obj;
					tempRecord[tempRecord.length] = obj;
				}
			}
		}
	}
	if(tempRecord.length > 0) {
		linkRecord[mostParentId] = tempRecord;
	}
	return hasLink;
}

function linkTo(id,fileName) {
	if(fileName == undefined) {
		window.scrollTo(0,ceCoordinate[id]+240);
	}
//	alert(document.body.scrollTop);
//	document.body.scrollTop=500;
//	window.scrollTo(0,top+240);
}

function clearPopoverTop() {
	var popovers = document.querySelectorAll(".popover.top");
//	var popovers = document.querySelectorAll("div[class='popover top']");
	for(var p=0;p<popovers.length;p++) {
		popovers[p].style.visibility="hidden";
	}
}