var fileNameList;

function getFileFromServer(url,commitID,name,type) {
	var content;
	$.ajaxSettings.async = false;
	$.post(url,{commitId:commitID,fileName:name,SrcOrDstOrJson:type}, function(data) {
		content = data;
	});
	return content;
}

function getFileByCommit(button) {
	var listGroup = document.getElementById("fileList");
	listGroup.innerHTML="";
	
	var activeList = document.querySelectorAll("#commitList .active");
	for(var i=0;i<activeList.length;i++) {
		activeList[i].classList.remove("active");
	}
	button.classList.add("active");
	var commitID = $(button).contents().filter(function() { return this.nodeType === 3; }).text().trim();
	commitId = commitID;
	$.ajaxSettings.async = false;
	var json = getFileFromServer("getfile",commitID,"","meta.json");
	json = eval("("+json+")");
	fileNameList = json.files;

	for(var i=0;i<fileNameList.length;i++) {
		var buttonDiv = document.createElement("button");
		buttonDiv.type="button";
		buttonDiv.className="list-group-item";
		buttonDiv.innerHTML=fileNameList[i];
		buttonDiv.onclick = getContentByFileName;
		listGroup.appendChild(buttonDiv);
	}

}

function getContentByFileName() {
	var activeList = document.querySelectorAll("#fileList .active");
	for(var i=0;i<activeList.length;i++) {
		activeList[i].classList.remove("active");
	}
	this.classList.add("active");
	var name = $(this).text().trim();
	var index = name.lastIndexOf("/");
	if(index >=0)
		name = name.substring(index+1,name.length);
	fileName = name;
//	alert(name);
	var activeCommit = document.querySelector("#commitList .active");
	var commitID = $(activeCommit).contents().filter(function() { return this.nodeType === 3; }).text().trim();
//	alert(commitID);
	
    otherFilelink = new Object();
    inFilelink.splice(0,inFilelink.length);
//	link json
	var json = getFileFromServer("getfile",commitID,"","link.json");
	json = eval("("+json+")");
	var links = json.links;

	for(var i=0;i<links.length;i++) {
		if(links[i]["file-name"] == fileName && links[i]["link-type"] == "one-file-link") {
			if(links[i].links.length > 0)
				inFilelink = links[i].links;
//			for(var li =0;li<links[i].links.length;li++) {
////				inFilelink[inFilelink.length] = [links[i].links[li].from,links[i].links[li].to];
//				inFilelink[inFilelink.length] = links[i].links[li];
//			}
		}
		else if((links[i]["file-name"] == fileName)||(links[i]["file-name2"] == fileName) && links[i]["link-type"] == "two-file-link") {
			if(links[i].links.length > 0) {
				var thisIdx,otherFile;
//				(links[i]["file-name"] == fileName) ? thisIdx = 0:thisIdx = 1;
//				var thisIdx;
				(links[i]["file-name"] == fileName) ? thisIdx ="from":thisIdx = "to";
				otherFilelink[otherFile] = new Object();
				otherFilelink[otherFile]["thisIdx"] = thisIdx;
				otherFilelink[otherFile]["links"] = links[i].links;
			}
			
//			for(var li =0;li<links[i].links.length;li++) {
//				
//			}
		}
//		link[i].parsedLink = [];
//		for(var l=0;l<link[i].links.length;l++) {
//			link[i].parsedLink[link[i].parsedLink.length] = parseLink(link[i].links[l]);
//		}
	}
	
//	for(var i=0;i<link.length;i++) {
//		if()
//		link[i].parsedLink = [];
////		for(var l=0;l<link[i].links.length;l++) {
////			link[i].parsedLink[link[i].parsedLink.length] = parseLink(link[i].links[l]);
////		}
//	}
//	alert(JSON.stringify(inFilelink));
//	alert(JSON.stringify(otherFilelink));
	
	refreshPage(commitID,name);
}

function parseLink(rangeStr) {
	var wholeRange = rangeStr.split(',');
	if(wholeRange.length == 2) {
		return [parseInt(wholeRange[0]),parseInt(wholeRange[1])];
	}
	else {
		alert("json error: link range :"+rangeStr);
		return [];
	}	
}

function getDescById(descArray,id) {
	for(var i=0;i<descArray.length;i++) {
		if(descArray[i].id == id) {
			desc = descArray[i];
//			alert("---------  "+obj.id);			
			return;
		}
		if(descArray[i].subDesc != undefined) {
			getDescById(descArray[i].subDesc,id);
		}
	}
}