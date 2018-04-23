<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>editor</title>
<link type="text/css" rel="styleSheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css" />
<link type="text/css" rel="styleSheet" href="style/base.css" />
<link type="text/css" rel="styleSheet" href="style/editor.css" />
<link type="text/css" rel="styleSheet" href="style/color.css" />
<link type="text/css" rel="styleSheet" href="style/addition.css" />
</head>
<body>
<!-- <div class="popover top">
      <div class="arrow"></div>
      <h3 class="popover-title">Popover 顶部</h3>
      <div class="popover-content">
        <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
      </div>
    </div> -->
    <span class="label label-primary" style="position:absolute;top:0;left:10px;font-size:18px">RQ</span>
    <span class="label label-primary" style="position:absolute;top:0;left:160px;font-size:18px">commit id</span>
    <span class="label label-primary" style="position:absolute;top:0;left:670px;font-size:18px">file name</span>
    <div id ="RQList"class="list-group" style="position:absolute;left:10px;display:inline;width:70px;height:240px;top:30px;overflow:auto">	
    	<button id ="RQ3" type="button" class="list-group-item">
			RQ3</button>
		<button id ="RQ4" type="button" class="list-group-item" onclick="getCommitByRQ(this)">
			RQ4</button>
    </div>
	<div id ="commitList"class="list-group" style="position:absolute;left:160px;display:inline;width:450px;height:200px;top:30px;overflow:auto">		
		<!-- <button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">1</span>
			3c1adf7f6af0dff9bda74f40dabe8cf428a62003</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">2</span>
			ace6bd2418cba892f793e9e3666ac02a541074c7</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">3</span>
			65b17b80ba353d3c21ab392d711d347bcbcce42b</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">4</span>
			90309ab0b5c5cc3b406825fd3f9db730db03ad36</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">5</span>
			f5cce14fe7749183a766e6335ee511d8918a81d4</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">6</span>
			3f392e32f56993e4cf92e5c61ed227b80fa10b82</button>
		<button type="button" class="list-group-item"
			onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">7</span>
			96da77ef759e8f9623b20d7f28adbb72dc13a946
		</button>
		<button type="button" class="list-group-item"
			onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">8</span>
			6560aed1c85eef68faeb0356c34e12035a2826bf
		</button>
		<button type="button" class="list-group-item"
			onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">9</span>
			ea9ad4ee9bd6604fe57f73004bf375c7c4cd7be3
		</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">10</span>
			fccec210b4fecbbc3ab758d127a95fb741b21175
		</button>		 -->
	</div>
	<div style="position:absolute;left:670px;display:inline;width:800px;height:200px;top:30px;overflow:auto">
		<div id ="fileList" class="list-group" style="width:800px;">
		</div>
	</div>

	<div class="panel panel-default"
		style="position: absolute; left: 1550px; display: inline; width: 250px; height: 200px; top: 30px;">
		<div class="panel-heading">
			<h3 class="panel-title">Legend</h3>
		</div>
		<div class="panel-body">	
		
			<ul style="position:absolute;top:60px;">
				<li style="height:25px;">
					<div style="position: absolute; top: 1px; left: 5px; display: inline; background-color: rgba(0, 205, 0, 0.2); width: 45px; height: 18px;"></div>
					<span style="position: absolute; left: 60px;">Insert</span>
				</li>
				<li style="height:25px;">
					<div style="position: absolute; top: 26px; left: 5px; display: inline; background-color: rgba(255, 0, 0, 0.2); width: 45px; height: 18px;"></div>
					<span style="position: absolute; left: 60px;" >Delete</span>
				</li>
				<li style="height:25px;">
					<div style="position: absolute; top: 51px; left: 5px; display: inline; background-color: rgba(0, 100, 255, 0.2); width: 45px; height: 18px;"></div>
					<span style="position: absolute; left: 60px;">Change</span>
				</li>
				<li style="height:25px;">
					<div style="position: absolute; top:76px; left: 5px; display: inline; background-color: rgba(255, 140, 0, 0.2); width: 45px; height: 18px;"></div>
					<span style="position: absolute; left: 60px;">Move</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="editor-frame" style="margin-top: 200px;">
		<div id="diff-editor" >
			<div
				class="monaco-diff-editor monaco-editor-background side-by-side vs"
				style="position: relative; height: 100%;">	
				<canvas id="myCanvas3" width="400" height="300"
						style="position: absolute; will-change: transform; top: 0px; left: 1486px;"></canvas>		
				<!--original-->
				<div class="editor original" data-keybinding-context="2"
					data-mode-id="javascript"
					style="position: absolute; height: 100%; width: 243px; left: 0px;">
					<div class="monaco-editor original-in-monaco-diff-editor vs"
						data-uri="inmemory://model/2" style="width: 743px; height: 4000px;overflow:hidden">										
						</div>
				</div>
				<!--modified-->
				<div class="editor modified" data-keybinding-context="3"
					data-mode-id="javascript"
					style="position: absolute; height: 100%; width: 173px; left: 743px;">
					<div class="monaco-editor modified-in-monaco-diff-editor vs"
						data-uri="inmemory://model/3" style="width: 743px; height: 4000px;overflow:hidden">																									
					</div>
				</div>
				<div class="bubbleZone" data-keybinding-context="3"
					data-mode-id="javascript"
					style="position: absolute; height: 100%; width: 410px; left: 1486px;">
				</div>			
		</div>
	</div>
	</div>
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/file.js"></script>
	<script type="text/javascript" src="js/webpage.js"></script>
	<script type="text/javascript" src="js/bubble.js"></script>
	<script type="text/javascript" src="js/link.js"></script>
	<script type="text/javascript" src="js/color.js"></script>	
	<script type="text/javascript" src="js/editor.js"></script>
	<script type="text/javascript" src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</body>
</html>