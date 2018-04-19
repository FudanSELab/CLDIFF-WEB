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
	
	for(var i=0;i<descriptions.length;i++) 
		drawLinkLayer(file,this.number,descriptions[i],descriptions[i].id);	
	drawLink(file,this.parentNode);
}

function drawLink(file,parent) {
	var top,bottom;
	var idArray = new Array();
	var id;
	for(var attribute in linkObj){  
		if(linkObj[attribute] != undefined) {
			desc = new Object();
			getDescById(descriptions,linkObj[attribute]);
			var tempTop,tempBottom;
			(file == 1) ? tempTop= originalLinesCoordinate[desc.range1[0]] : tempTop= modifiedLinesCoordinate[desc.range2[0]];
			(file == 1) ? tempBottom= originalLinesCoordinate[desc.range1[1]] : tempBottom= modifiedLinesCoordinate[desc.range2[1]];
			if(top == undefined) {
				top = tempTop;
				bottom = tempBottom;
				idArray[0] = attribute;
			}
			else if(parseInt(tempTop) == parseInt(top) && parseInt(tempBottom) == parseInt(bottom)) {
				idArray[idArray.length] = attribute;
			}
			else if(parseInt(tempTop) >= parseInt(top) && parseInt(tempBottom) <= parseInt(bottom)) {
				top = tempTop;
				bottom = tempBottom;
				idArray.splice(0,idArray.length);
				idArray[0] = attribute;
			}
			else if(parseInt(tempTop) > parseInt(top)) {
				top = tempTop;
				bottom = tempBottom;
				idArray.splice(0,idArray.length);
				idArray[0] = attribute;
			}
//			else if(parseInt(tempTop) == parseInt(top) && parseInt(tempBottom) == parseInt(bottom)) {
//				idArray[idArray.length] = attribute;
//			}
//			else {
//				idArray[idArray.length] = attribute;
//			}
			//draw
		}
	} 
	
	var content = "<ul>";
	for(var i =0; i< idArray.length;i++){ 
		var linkList = linkRecord[idArray[i]]; 
		for(var l=0;l<linkList.length;l++) {
//			content += "<a onclick='linkTo()'>"+linkList[l].id+". "+linkList[l].desc+"</a></br>";
			var name="";
			if(linkList[l].fileName != undefined && linkList[l].fileName != 'undefined' && linkList[l].fileName != '')
				name ="("+linkList[l].fileName+")";
			content += "<li><a onclick=\"linkTo('"+linkList[l].id+"','"+linkList[l].fileName+"')\">"+linkList[l].id+". "+linkList[l].desc+" "+name+"</a></li>";
		}
		id = linkObj[idArray[i]];
	}
	content += "</ul>"
	
	if(id != undefined) {
//		var popoverTop = document.getElementsByClassName("popover top "+id);
//		if(parseInt(popoverTop.length) > 0) {		
//			var temp = popoverTop[0].parentNode.removeChild(popoverTop[0]);
//			parent.appendChild(temp);
//			temp.style.visibility="visible";
//			temp.style.top = (top - temp.offsetHeight) + "px";
//		}
//		else {
			var popoverTopDiv = document.createElement("div");
			popoverTopDiv.className = "popover top "+id;
			popoverTopDiv.style = "position:absolute;left:0;";
			var inner = "<div class='arrow'></div>";
			inner += " <div class='popover-content' style='max-height:100px;overflow:auto;'>" + content+"</div>";
			popoverTopDiv.innerHTML=inner;
			parent.appendChild(popoverTopDiv);
			popoverTopDiv.style.top = (top - popoverTopDiv.offsetHeight) + "px";
//		}		
	}
	
}

function drawLinkLayer(file,number,descObj,mostParentId) {
	if(file == 1 && descObj.range1 != undefined) {
		if(number>=descObj.range1[0]&&number<=descObj.range1[1]) {	
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
}

function hasLink(descId,mostParentId) {
	var tempRecord = new Array();
	var hasLink = false;
	for(var i=0;i<inFilelink.length;i++) {
		if(parseInt(inFilelink[i]["from"]) == parseInt(descId) || parseInt(inFilelink[i]["to"]) == parseInt(descId)) {
			hasLink = true;
			var obj = new Object();
			(parseInt(inFilelink[i]["from"]) == parseInt(descId)) ? obj.id=inFilelink[i]["to"]:obj.id=inFilelink[i]["from"];
			obj.desc = inFilelink[i]["desc"];
			tempRecord[tempRecord.length] = obj;
		}
	}
	for(var attribute in otherFilelink) {
		if(otherFilelink[attribute] != undefined) {
			var array = otherFilelink[attribute];
//			alert(JSON.stringify(array));
			for(var i=0;i<array.length;i++) {
//				alert(descId +"  " +array[i]["from"] +"  "+array[i]["to"]);
				if(parseInt(array[i]["from"]) == parseInt(descId) || parseInt(array[i]["to"]) == parseInt(descId)) {
//					alert(JSON.stringify(otherFilelink));
//					alert(1111111);

					hasLink = true;
					var obj = new Object();
					(parseInt(array[i]["from"]) == parseInt(descId)) ? obj.id=array[i]["to"]:obj.id=array[i]["from"];
					obj.desc = inFilelink[i]["desc"];
					obj.fileName = attribute;					
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

function linkTo(id,name) {
	if(name == undefined || name == 'undefined' || name == '') {
		clearPopoverTop();
		window.scroll(0,ceCoordinate[id].top+240);
		
	}
	else {
		fileName = name;
		refreshPage(commitId,name);
		var childrenList = document.querySelector("#fileList").children;
		for(var i=0;i<childrenList.length;i++) {
			childrenList[i].classList.remove("active");
			if(getFileName($(childrenList[i]).text().trim()) == name) {
				childrenList[i].classList.add("active")
			}
		}
//		this.classList.add("active");
//		var name = $(this).text().trim();
		window.scroll(0,ceCoordinate[id].top+240);
	}
	var parent;
	if(ceCoordinate[id].file == 1) 
		parent = document.querySelector(".original-in-monaco-diff-editor .margin-view-overlays");
	else
		parent = document.querySelector(".modified-in-monaco-diff-editor .margin-view-overlays");
	var popoverTopDiv = document.createElement("div");
	popoverTopDiv.className = "popover top "+id;
	popoverTopDiv.style = "position:absolute;left:47px;";
	var inner = "<div class='arrow' style='height:13px;border-top-color:red;border-width:15px;bottom:-24px;'></div>";
	popoverTopDiv.innerHTML=inner;
	parent.appendChild(popoverTopDiv);
	popoverTopDiv.style.top = (ceCoordinate[id].top - popoverTopDiv.offsetHeight) + "px";
}

function clearPopoverTop() {
	var popovers = document.querySelectorAll(".popover.top");
	for(var p=0;p<popovers.length;p++) {
		popovers[p].parentNode.removeChild(popovers[p]);
	}
}