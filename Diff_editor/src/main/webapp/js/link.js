var linkObj = new Object();
var linkRecord = new Object();
var desc;
var clickedDescId = -1;

function showLink() {
	clearPopoverTop();
	linkObj = new Object();
	linkRecord = new Object();
	var file = 1,container = document.querySelector(".original-in-monaco-diff-editor");
	if(this.parentNode.parentNode.parentNode.parentNode.className == "monaco-editor modified-in-monaco-diff-editor vs") {
		file = 2;
	}
	
	clickedDescId = -1;
	for(var i=0;i<descriptions.length;i++) 
		drawLinkLayer(file,this.number,descriptions[i],descriptions[i].id);	
//	alert(JSON.stringify(linkObj));
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
		}
	} 
	
	var content = "<ul>";
	for(var i =0; i< idArray.length;i++){ 
		var linkList = linkRecord[idArray[i]]; 
		for(var l=0;l<linkList.length;l++) {
			var name="";
			if(linkList[l].fileName != undefined && linkList[l].fileName != 'undefined' && linkList[l].fileName != '')
				name ="("+linkList[l].fileName+")";
			content += "<li><a onclick=\"linkTo('"+linkList[l].id+"','"+linkList[l].fileName+"','"+linkList[l].parentCommit+"')\">"+linkList[l].id+". "+linkList[l].desc+" "+name+"</a></li>";
		}
		id = linkObj[idArray[i]];
	}
	content += "</ul>";
	
	if(id != undefined || clickedDescId != -1) {
		var popoverTopDiv = document.createElement("div");
		if(id != undefined)
			popoverTopDiv.className = "popover top "+id;
		else {
			content = "There is no association!";
			popoverTopDiv.className = "popover top";
			desc = new Object();
			getDescById(descriptions,clickedDescId);
			if(file ==1)
				top = originalLinesCoordinate[desc.range1[0]];
			else 
				top = modifiedLinesCoordinate[desc.range2[0]];
		}
		popoverTopDiv.style = "position:absolute;left:0;max-width:400px;";
		var inner = "<div class='arrow'></div>";
		inner += " <div class='popover-content' style='max-height:100px;overflow:auto;'>" + content+"</div>";
		popoverTopDiv.innerHTML=inner;
		if(top == 0)
			parent = document.querySelector(".editor.modified");
		parent.appendChild(popoverTopDiv);
		popoverTopDiv.style.top = (top - popoverTopDiv.offsetHeight) + "px";	
	}			
	
//	if(id != undefined) {
//		var popoverTopDiv = document.createElement("div");
//		popoverTopDiv.className = "popover top "+id;
//		popoverTopDiv.style = "position:absolute;left:0;max-width:400px;width:350px";
//		var inner = "<div class='arrow'></div>";
//		inner += " <div class='popover-content' style='max-height:100px;overflow:auto;'>" + content+"</div>";
//		popoverTopDiv.innerHTML=inner;
//		if(top == 0)
//			parent = document.querySelector(".editor.modified");
//		parent.appendChild(popoverTopDiv);
//		popoverTopDiv.style.top = (top - popoverTopDiv.offsetHeight) + "px";		
//	}
	
}

function drawLinkLayer(file,number,descObj,mostParentId) {
	if(file == 1 && descObj.range1 != undefined) {
		if(number>=descObj.range1[0]&&number<=descObj.range1[1]) {	
			clickedDescId = descObj.id;
			if(hasLink(descObj.id,mostParentId))
				linkObj[mostParentId] = descObj.id;
		}
	}
	else if(file == 2  && descObj.range2 != undefined) {	
		if(number>=descObj.range2[0]&&number<=descObj.range2[1]) {	
			clickedDescId = descObj.id;
			if(hasLink(descObj.id,mostParentId)) {
				linkObj[mostParentId] = descObj.id;
			}
		}
	}	
	if(descObj.subDesc != undefined) {
		for(var i=0;i<descObj.subDesc.length;i++) 
			drawLinkLayer(file,number,descObj.subDesc[i],mostParentId);
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
	
	for(var fn in otherFilelink) {
		if(otherFilelink[fn] != undefined) {
			for(var pc in otherFilelink[fn]) {
				var array = otherFilelink[fn][pc];
				for(var i=0;i<array.length;i++) {
					if(parseInt(array[i]["from"]) == parseInt(descId) || parseInt(array[i]["to"]) == parseInt(descId)) {
						hasLink = true;
						var obj = new Object();
						(parseInt(array[i]["from"]) == parseInt(descId)) ? obj.id=array[i]["to"]:obj.id=array[i]["from"];
						obj.desc = array[i]["desc"];
						obj.fileName = fn;		
						obj.parentCommit = pc;
						tempRecord[tempRecord.length] = obj;
					}
				}
			}			
		}
	}
	if(tempRecord.length > 0) {
		linkRecord[mostParentId] = tempRecord;
	}
	return hasLink;
}

function linkTo(id,name,pc) {
	clearPopoverTop();
	var popTop,file;
	if(name == undefined || name == 'undefined' || name == '') {
		clearPopoverTop();
		if(ceCoordinate[id].top1 != undefined)
			showPointer(1,ceCoordinate[id].top1,id);
		if(ceCoordinate[id].top2 != undefined)
			showPointer(2,ceCoordinate[id].top2,id);
//		popTop= ceCoordinate[id].top;
		window.scroll(0,ceCoordinate[id].top+160);
//		file = ceCoordinate[id].file;
	}
	else {
		fileName = name;
		parentCommitId = pc;
		refreshPage(pc,name);
		
		var childrenList = document.querySelector("#fileList").children;
		for(var i=0;i<childrenList.length;i++) {
			childrenList[i].classList.remove("active");
			if(childrenList[i].parentId == parentCommitId && childrenList[i].children[0].innerHTML.trim() == name) {
				childrenList[i].classList.add("active")
			}
		}
		if(ceCoordinate[id] == undefined) {
			popTop = 20;
			fileId= id;
			showPointer(2,popTop,id);
//			file = 2;
		}
		else {
			popTop= ceCoordinate[id].top;
			if(ceCoordinate[id].top1 != undefined)
				showPointer(1,ceCoordinate[id].top1,id);
			if(ceCoordinate[id].top2 != undefined)
				showPointer(2,ceCoordinate[id].top2,id);
//			file = ceCoordinate[id].file;
		}
		window.scroll(0,popTop+160+100);
		
	}	

}

function showPointer(file,popTop,id) {
	var parent;
	if(file == 1) 
		parent = document.querySelector(".original-in-monaco-diff-editor .margin-view-overlays");
	else
		parent = document.querySelector(".modified-in-monaco-diff-editor .margin-view-overlays");
	var popoverTopDiv = document.createElement("div");
	popoverTopDiv.className = "popover top "+id;
	popoverTopDiv.style = "position:absolute;left:47px;";
	var inner = "<div class='arrow' style='height:13px;border-top-color:red;border-width:15px;bottom:-24px;'></div>";
	popoverTopDiv.innerHTML=inner;
	parent.appendChild(popoverTopDiv);
	popoverTopDiv.style.top = (popTop - popoverTopDiv.offsetHeight) + "px";
}

function clearPopoverTop() {
	var popovers = document.querySelectorAll(".popover.top");
	for(var p=0;p<popovers.length;p++) {
		popovers[p].parentNode.removeChild(popovers[p]);
	}
}