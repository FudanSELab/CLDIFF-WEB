var fileNameList;
var fileNameWithParent;
var metaObject;
var fileNameKeys;

function getAllFileFromServer(url,author,commitHash,parentCommitHash,projectName,fileName) {
	var content;
	$.ajaxSettings.async = false;
	$.post(url,{author:author,commit_hash:commitHash,parent_commit_hash:parentCommitHash,project_name:projectName,file_name:fileName}, function(data) {
		content = data;
	});
	return content;
}

function getMetaFileFromServer(url,commitURL) {
	var content;
	$.ajaxSettings.async = false;
	$.post(url,{commit_url:commitURL}, function(data) {
		content = data;
	});
	return content;
}

function isValidUrl(url){
    var patt = /^(https:[/]{2,})?(github.com[/]+)([A-Za-z0-9_-]+[/]+){2}(commit[/]+)[A-Za-z0-9]+$/;
    return patt.test(url);
}

function setInputBar(flag) {
	var commitUrl = document.getElementById("commitUrl");
	if (flag == 1) {
		commitUrl.value = "3c1adf7f6af0dff9bda74f40dabe8cf428a62003";
	} else {
		commitUrl.value = "https://github.com/spring-projects/spring-framework/commit/3c1adf7f6af0dff9bda74f40dabe8cf428a62003"
	}
}
//entrance:click enter button
function getFileByCommitUrl(flag) {
	if(typeof(flag)=='number'){
		var commitUrl = document.getElementById("commitUrl").value.trim();
		var isValid;
		if(flag==1){
			isValid = true;
		} else {
			isValid = isValidUrl(commitUrl);
		}
		if(isValid==false){
			console.log("invalid url");
			alert("invalid github url");
			return;
		}
	}
	else if(typeof(flag)=='object' && flag['commit_url']!=undefined && flag['project_path']!=undefined){
		var params = flag;
	}
	else{
		console.log("invalid parameter");
		alert("invalid parameter");
		return;
	}
	init();
	var listGroup = document.getElementById("toc");
	listGroup.style.visibility = "visible";
	var first = listGroup.children[0];
	var last = listGroup.children[1];
	
	var json;
	if(params != flag){
		console.log(commitUrl);
		json = getMetaFileFromServer("BCMetaServlet",commitUrl);
	}
	else{
		console.log('commit_url: ' + params['commit_url']);
		console.log('project_path: ' + params['project_path']);
		$.ajaxSettings.async = false;
		$.post("BCMetaServlet",params, function(data) {
			json = data;
		});
	}
	
	json = eval("("+json+")");
	if(json==null){
		alert("Response is null");
		return;
	}
	var parents = json.parents;
	var files = json.files;
	metaObject = new Object();
	metaObject["author"] = json["author"];
	metaObject["date_time"] = json["date_time"];
	metaObject["commit_hash"] = json["commit_hash"];
	metaObject["project_name"] = json["project_name"];
	metaObject["actions"] = json["actions"];
//	metaObject["parent_commit_hash"] = json["parent_commit_hash"];//????
	fileNameWithParent = new Object();
	for(var i=0;i<files.length;i++) {
		var id = files[i]["id"];
		var file_name = files[i]["file_name"];
		var parent_commit = files[i]["parent_commit"];
		var fileObj = new Object();
		fileObj["parent_commit"] = parent_commit;
		fileObj["prev_file_path"] = files[i]["prev_file_path"];
		fileObj["curr_file_path"] = files[i]["curr_file_path"];
		fileObj["id"] = id;
		fileObj["action"] = metaObject["actions"][id]; 
		if(parent_commit in fileNameWithParent) {			
			fileNameWithParent[parent_commit][id+"---"+file_name] = fileObj;
		}
		else {
			var parentCommitObj = new Object();
			parentCommitObj[id+"---"+file_name] = fileObj;
			fileNameWithParent[parent_commit] = parentCommitObj;
		}		
	}
	console.log(fileNameWithParent);
	last.innerHTML = ""; 
	var cnt = 0;
	fileNameKeys = [];
	for(var parentCommit in fileNameWithParent){  
		if(fileNameWithParent[parentCommit] != undefined) {
			var appendString = "";
			appendString += '<svg title="modified" class="octicon octicon-diff-modified" ' +
			'viewBox="0 0 14 16" version="1.1" width="14" height="16" ' +
				'aria-hidden="true"> '+
				'<path fill-rule="evenodd" ' +
					'd="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path></svg>';
			appendString += '<a style="color:#000079">"'+"diff with parent commit id : "+parentCommit+'"</a>';
			var dividerDiv = document.createElement("li");
//			dividerDiv.className = "dropdown-header";
			dividerDiv.innerHTML= appendString;
			dividerDiv.style = "color:#000079";
			last.appendChild(dividerDiv);
			
			for(var fileName in fileNameWithParent[parentCommit]){ 
				fileNameKeys.push(fileName);
				var fileObj = fileNameWithParent[parentCommit][fileName];
				var path  = "";
				var appendString2 = "";
				if(fileObj["action"]=="removed"){
					path = fileObj["prev_file_path"];
					appendString2 += '<svg title="removed" class="octicon octicon-diff-removed" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zm-2-5H3V7h8v2z"></path></svg>';
				}else if(fileObj["action"]=="added"){
					path = fileObj["curr_file_path"];
					appendString2 += '<svg title="added" class="octicon octicon-diff-added" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM6 9H3V7h3V4h2v3h3v2H8v3H6V9z"></path></svg>';
				}else{
					path = fileObj["curr_file_path"];
					appendString2 += '<svg title="modified" class="octicon octicon-diff-modified" ' +
					'viewBox="0 0 14 16" version="1.1" width="14" height="16" ' +
						'aria-hidden="true"> '+
						'<path fill-rule="evenodd" ' +
							'd="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z"></path></svg>';
				}
				appendString2 += '<a onclick = "getContentByFileNameAndParentId(this)" name="'+fileName+'">'+path.substring(45)+'</a>';
				var li = document.createElement("li");
				li.parentId = parentCommit;
				li.innerHTML = appendString2;
				last.appendChild(li);
				cnt++;
				
			}
		}			
	}
	first.children[1].innerHTML = cnt +" changed files";
	console.log(first.children[1].text);
	if(listGroup.children.length > 0)
		listGroup.style.visibility = "visible";
//	var last=JSON.stringify(fileNameWithParent); //将JSON对象转化为JSON字符
//	alert(last);
}
//single file entrance
function getContentByFileNameAndParentId(file) {
	var activeList = document.querySelectorAll("#fileList .active");
	for(var i=0;i<activeList.length;i++) {
		activeList[i].classList.remove("active");
	}
	file.parentNode.classList.add("active");
	var fn = file.name;
	var parentId = file.parentNode.parentId;
	parentCommitId = parentId;
	fileName = fn;
	refreshPage(parentId,fn);
}
//deprecated
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
	
	refreshPage(commitID,name);
}

function getFileName(path) {
	var name;
	var index = path.lastIndexOf("/");
	if(index >=0)
		name = path.substring(index+1,path.length);
	return name;
}

function getLinkJson(commitID,fileCount) {
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
		}
		else if((links[i]["file-name"] == fileName)||(links[i]["file-name2"] == fileName) && links[i]["link-type"] == "two-file-link") {
			if(links[i].links.length > 0) {
				var thisIdx,otherFile;
				(links[i]["file-name"] == fileName) ? otherFile =links[i]["file-name2"]:otherFile = links[i]["file-name"];
				otherFilelink[otherFile] = links[i].links;
				if(fileCount ==1 && descriptions.length == 0) {
					(links[i]["file-name"] == fileName) ? thisIdx ="from":thisIdx = "to";
					var entry = new Object();					
					entry.id = links[i].links[0][thisIdx];
					entry.file = "dst";
					entry.range2 = [1,modifiedLines.length];	
					descriptions.splice(0,0,entry);
				}
			}
		}
	}
}

function parseLinkFile(links,fileCount) {
	otherFilelink = new Object();
    inFilelink.splice(0,inFilelink.length);
    var fileShortName = fileName.split("---")[1];
	for(var i=0;i<links.length;i++) {
		if(links[i]["link-type"] == "one-file-link" && links[i]["file-name"] == fileShortName && links[i]["parent-commit"] == parentCommitId) {
			if(links[i].links.length > 0)
				inFilelink = links[i].links;
		}
		else if(links[i]["link-type"] == "two-file-link") {
			var thisIdx,otherFile,otherParentCommit;
			var find = false;
			if(links[i]["file-name"] == fileShortName && links[i]["parent-commit"] == parentCommitId) {
				otherFile =links[i]["file-name2"];
				otherParentCommit =links[i]["parent-commit2"];
				thisIdx ="from";
				find = true;
			}
			else if(links[i]["file-name2"] == fileShortName && links[i]["parent-commit2"] == parentCommitId) {
				otherFile =links[i]["file-name"];
				otherParentCommit =links[i]["parent-commit"];
				thisIdx = "to";
				find = true;
			}
			if(links[i].links.length > 0 && find) {
				if(!(otherFile in otherFilelink)) {			
					otherFilelink[otherFile] = new Object();
				}
				otherFilelink[otherFile][otherParentCommit] = links[i].links;
				if(fileCount ==1 && descriptions.length == 0) {
					var entry = new Object();					
					entry.id = links[i].links[0][thisIdx];
					entry.file = "dst";
					entry.range2 = [1,modifiedLines.length];	
					descriptions.splice(0,0,entry);
				}
			}
		} 
	}
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