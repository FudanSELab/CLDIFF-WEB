var fileNameList;

function getFileFromServer(url,name,type) {
	var content;
	$.ajaxSettings.async = false;
	$.post(url,{fileName:name,SrcOrDstOrJson:type}, function(data) {
		content = data;
	});
	return content;
}

function getFileByCommit(button) {
	var activeList = document.querySelectorAll("#commitList .active");
	for(var i=0;i<activeList.length;i++) {
		activeList[i].classList.remove("active");
	}
	button.classList.add("active");
	$.ajaxSettings.async = false;
	$.post("getfile", {fileName:"File",SrcOrDstOrJson:"ljson"}, function (data){
		data = eval("("+data+")");
		fileNameList  = data.file_list;
	});
	var listGroup = document.getElementById("fileList");
	listGroup.innerHTML="";
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
}