<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>editor</title>
<script src="js/jquery.js"></script> 
<link type="text/css" rel="styleSheet" href="bootstrap-3.3.7-dist/css/bootstrap.min.css" />
<link type="text/css" rel="styleSheet" href="style/base.css" />
<link type="text/css" rel="styleSheet" href="style/editor.css" />
<link type="text/css" rel="styleSheet" href="style/color1.css" />
<link type="text/css" rel="styleSheet" href="style/addition.css" />
</head>
<body>
    <div style="position:absolute;display:inline;top:0;left:10px;color:blue">commit id:</div>
    <div style="position:absolute;display:inline;top:0;left:650px;color:blue">file name:</div>
	<div id ="commitList"class="list-group" style="position:absolute;left:10px;display:inline;width:610px;height:240px;top:20px;overflow:auto">
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">1</span>
			3a098c5e67274246b0b62018f0b92fd49b028359
		</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">2</span>
			9b44404b9f7845ea6c4c56eea7ba71525b4e8ad0
		</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">3</span>
			5bd4ac2ccb25be1248dd71ff31a39b7e63884c05</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">4</span>
			5c58f826364ded0895d96413273d5456bc04f3c6</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">5</span>
			8a6bf14fc9a61f7c1c0016ca217be02ca86211d2</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">6</span>
			54c281a3d106da4f3bcf2f59271b1c9034683a60</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">7</span>
			88aa8540fef43326628dbdd758043f689390fa2d</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">8</span>
			1706fe1e2fbe2ef12a8d8c12ce8e2c3a43e48b3c</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">9</span>
			2770e4dd0ee663f66af4c198daa10367d6c2478b</button>
		<button type="button" class="list-group-item" onclick="getFileByCommit(this)">
			<span class="badge" style="float: left; margin-right: 6px">10</span>
			63572c792182f0c2446ceeb3262d843f28558459
		</button>
	</div>
	<div id ="fileList" class="list-group" style="position:absolute;left:650px;display:inline;width:600px;height:240px;top:20px;overflow:auto">
	</div>
	<div class="editor-frame" style="margin-top: 230px;">
		<div id="diff-editor" >
			<div
				class="monaco-diff-editor monaco-editor-background side-by-side vs"
				style="position: relative; height: 100%;">	
				<canvas id="myCanvas3" width="200" height="20000"
						style="position: absolute; will-change: transform; top: 0px; left: 1086px;"></canvas>
				<!--é¢è§è¾¹æ¡-->							
				<div class="diffOverview"
					style="position: absolute; top: 0px; height: 700px; width: 30px; left: 1386px;">
					<div class="diffViewport"
						style="position: absolute; width: 30px; height: 35px; top: 0px;"></div>
					<canvas class="original diffOverviewRuler" width="18" height="500"
						style="position: absolute; will-change: transform; top: 0px; right: 15px; width: 15px; height: 100%;"></canvas>
					<canvas class="modified diffOverviewRuler" width="18" height="500"
						style="position: absolute; will-change: transform; top: 0px; right: 0px; width: 15px; height: 100%;"></canvas>												
				</div>				
				<!--original-->
				<div class="editor original" data-keybinding-context="2"
					data-mode-id="javascript"
					style="position: absolute; height: 100%; width: 243px; left: 0px;">
					<div class="monaco-editor original-in-monaco-diff-editor vs"
						data-uri="inmemory://model/2" style="width: 243px; height: 700px;">										
						</div>
							<!-- ä¸æ¹æ»å¨æ¡ -->
							<!-- <div role="presentation" aria-hidden="true"
								class="invisible scrollbar horizontal fade"
								style="position: absolute; width: 76px; height: 10px; left: 0px; bottom: 0px;">
								<div class="slider"
									style="position: absolute; top: 0px; left: 0px; height: 10px; will-change: transform; width: 20px;"></div>
							</div> -->
							<!-- åç´æ»å¨æ¡ -->
<!-- 							<canvas class="decorationsOverviewRuler" aria-hidden="true"
								width="17" height="500"
								style="position: absolute; will-change: transform; top: 0px; right: 0px; width: 14px; height: 700px;"></canvas>
 -->							<!-- åç´æ»å¨æ¡ -->
							<!-- <div role="presentation" aria-hidden="true"
								class="visible scrollbar vertical"
								style="position: absolute; width: 14px; height: 700px; right: 0px; top: 0px;">
								<div class="slider"
									style="position: absolute; top: 0px; left: 0px; width: 14px; will-change: transform; height: 35px;"></div>
							</div> -->
<!-- 						</div>
 -->						<!-- <div role="presentation" aria-hidden="true" style="width: 143px;"
							class=""></div> -->
						<!-- <div data-mprt="8" class="minimap slider-mouseover"
							role="presentation" aria-hidden="true"
							style="position: absolute; left: 0px; width: 0px; height: 700px;">
							<div class="minimap-shadow-hidden" style="height: 700px;"></div>
							<canvas width="1" height="500"
								style="position: absolute; left: 0px; width: 0.8px; height: 700px;"></canvas>
							<div class="minimap-slider"
								style="position: absolute; will-change: transform; width: 0px;">
								<div class="minimap-slider-horizontal"
									style="position: absolute; width: 0px; height: 0px;"></div>
							</div>
						</div> -->
					<!-- </div> -->
				</div>
				<!--modified-->
				<div class="editor modified" data-keybinding-context="3"
					data-mode-id="javascript"
					style="position: absolute; height: 100%; width: 173px; left: 543px;">
					<div class="monaco-editor modified-in-monaco-diff-editor vs"
						data-uri="inmemory://model/3" style="width: 543px; height: 700px;">																				
							<!-- <div role="presentation" aria-hidden="true"
								class="invisible scrollbar horizontal fade"
								style="position: absolute; width: 76px; height: 10px; left: 0px; bottom: 0px;">
								<div class="slider"
									style="position: absolute; top: 0px; left: 0px; height: 10px; will-change: transform; width: 20px;"></div>
							</div> -->
							<!--åç´æ»å¨æ¡-->
							<!-- <canvas class="decorationsOverviewRuler" aria-hidden="true"
								width="17" height="500"
								style="position: absolute; will-change: transform; top: 0px; right: 0px; width: 14px; height: 700px;"></canvas> -->
							<!--åç´æ»å¨æ¡-->
							<!-- <div role="presentation" aria-hidden="true"
								class="visible scrollbar vertical"
								style="position: absolute; width: 14px; height: 700px; right: 0px; top: 0px;">
								<div class="slider"
									style="position: absolute; top: 0px; left: 0px; width: 14px; will-change: transform; height: 35px;"></div>
							</div> -->
						<!-- </div> -->
						<!-- <div role="presentation" aria-hidden="true" style="width: 143px;"
							class=""></div>
						<div data-mprt="8" class="minimap slider-mouseover"
							role="presentation" aria-hidden="true"
							style="position: absolute; left: 0px; width: 0px; height: 700px;">
							<div class="minimap-shadow-hidden" style="height: 700px;"></div>
							<canvas width="1" height="500"
								style="position: absolute; left: 0px; width: 0.8px; height: 700px;"></canvas>
							<div class="minimap-slider"
								style="position: absolute; will-change: transform; width: 0px;">
								<div class="minimap-slider-horizontal"
									style="position: absolute; width: 0px; height: 0px;"></div>
							</div>
						</div> -->
					</div>
				</div>
				<div class="bubbleZone" data-keybinding-context="3"
					data-mode-id="javascript"
					style="position: absolute; height: 100%; width: 273px; left: 1086px;">
				</div>
			<!-- <svg class="lineWrap" data-keybinding-context="3" width="1200" style="positon:absolute;top:0;left:0;height: 100%;z-index:-9999">
					<line id="line" xmlns="http://www.w3.org/2000/svg" x1="0"
						y1="0" x2="1200" y2="50" stroke="#000" stroke-width="2"
						 stroke-dasharray="10,10"></line>
						 <line id="line" xmlns="http://www.w3.org/2000/svg" x1="30"
						y1="0" x2="900" y2="90" stroke="#000" stroke-width="2"
						 stroke-dasharray="10,10"></line>
				</svg> -->	
		</div>
	</div>
	</div>
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"
		integrity="sha256-wS9gmOZBqsqWxgIVgA8Y9WcQOa7PgSIX+rPA0VL2rbQ="
		crossorigin="anonymous"></script>
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.0/bootstrap.min.js"
		integrity="sha256-u+l2mGjpmGK/mFgUncmMcFKdMijvV+J3odlDJZSNUu8="
		crossorigin="anonymous"></script>
	<script type="text/javascript" src="js/editor.js"></script>
	<script type="text/javascript" src="js/webpage.js"></script>
	<script type="text/javascript" src="js/bubble.js"></script>
	<script type="text/javascript" src="js/color.js"></script>
	<script type="text/javascript" src="js/file.js"></script>
	<script type="text/javascript" src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</body>
</html>