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
	$.ajaxSettings.async = false;
	var json = getFileFromServer("getfile",commitID,"","meta.json");
	json = eval("("+json+")");
	fileNameList = json.file_list;

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
//	alert(name);
	var activeCommit = document.querySelector("#commitList .active");
	var commitID = $(activeCommit).contents().filter(function() { return this.nodeType === 3; }).text().trim();
//	alert(commitID);
	refreshPage(commitID,name);
}