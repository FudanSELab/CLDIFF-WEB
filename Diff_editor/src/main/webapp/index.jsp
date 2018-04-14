<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>editor</title>
<script src="js/jquery.js"></script> 
<link type="text/css" rel="styleSheet" href="style/bootstrap-3.3.7-dist/addition.css" />
<link type="text/css" rel="styleSheet" href="style/base.css" />
<link type="text/css" rel="styleSheet" href="style/editor.css" />
<link type="text/css" rel="styleSheet" href="style/color1.css" />
<link type="text/css" rel="styleSheet" href="style/addition.css" />
</head>
<body>
	<div class="editor-frame">
		<div id="diff-editor">
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
						<!-- <div class="monaco-scrollable-element editor-scrollable vs"
							role="presentation" data-mprt="5"
							style="position: absolute; overflow: hidden; left: 53px; width: 490px; height: 700px;"> -->
							<!-- whole background -->
							<!-- <div class="lines-content monaco-editor-background"
								style="position: absolute; overflow: hidden; width: 100000px; height: 100000px; will-change: transform; top: 0px; left: 0px;"> -->
								<!-- è¡ä¸­çå¯¹é½çº¿ï¼å é¤ãå¢å é¢è²ææ -->
<!-- 								<div class="view-overlays" role="presentation"
									aria-hidden="true"
									style="position: absolute; height: 0px; width: 538px;">
									<div style="width: 100%; height: 19px;">
										<div class="current-line" style="width: 538px; height: 19px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 31px; width: 15px; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 31px; width: 15px; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="current-line" style="width:538px; height:19px;"></div>
										<div class="cdr bracket-match" style="left:0px;width:8px;height:19px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
										<div class="cigr"
											style="left: 92.34375px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
										<div class="cigr"
											style="left: 92.34375px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
										<div class="cigr"
											style="left: 92.34375px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-delete"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
										<div class="cigr"
											style="left: 61.5265px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
										<div class="cigr"
											style="left: 30.78125px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px;"></div>
									</div>
								</div>
 --><!-- 								<div role="presentation" aria-hidden="true" class="view-rulers"></div>
 -->								<!-- é´å½±ææ -->
								<!-- <div class="view-zones" role="presentation" aria-hidden="true"
									style="position: absolute; width: 538px;">
									<div class="diagonal-fill" monaco-view-zone="1"
										style="position: absolute; width: 100%; display: block; top: 114px; height: 57px;"
										monaco-visible-view-zone="true"></div>
								</div> -->
								<!-- ä»£ç åå®¹ -->
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
						<!--è¡å·-->
						<!-- <div class="margin-view-overlays">
							<div style="width: 100%; height: 19px;">
								<div class="current-line" style="width: 53px; height: 19px;"></div>
								<div class="line-numbers" style="left: 0px; width: 38px;">
									1</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									2</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									3</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									4</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									5</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									6</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="cmdr line-insert" style="height: 19px;"></div>
								<div class="cldr insert-sign"
									style="left: 38px; width: 15px; height: 19px;"></div>
								<div class="line-numbers" style="left: 0px; width: 38px;">
									7</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="cmdr line-insert" style="height: 19px;"></div>
								<div class="cldr insert-sign"
									style="left: 38px; width: 15px; height: 19px;"></div>
								<div class="line-numbers" style="left: 0px; width: 38px;">
									8</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="cmdr line-insert" style="height: 19px;"></div>
								<div class="cldr insert-sign"
									style="left: 38px; width: 15px; height: 19px;"></div>
								<div class="line-numbers" style="left: 0px; width: 38px;">
									9</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									10</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									11</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="cmdr line-insert" style="height: 19px;"></div>
								<div class="cldr insert-sign"
									style="left: 38px; width: 15px; height: 19px;"></div>
								<div class="line-numbers" style="left: 0px; width: 38px;">
									12</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="cmdr line-insert" style="height: 19px;"></div>
								<div class="cldr insert-sign"
									style="left: 38px; width: 15px; height: 19px;"></div>
								<div class="line-numbers" style="left: 0px; width: 38px;">
									13</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									14</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									15</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									16</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									17</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									18</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									19</div>
							</div>
							<div style="top: 361px; width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									20</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									21</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									22</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									23</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									24</div>
							</div>
							<div style="width: 100%; height: 19px;"></div>
							<div style="width: 100%; height: 19px;"></div>
							<div style="width: 100%; height: 19px;"></div>
							<div style="width: 100%; height: 19px;"></div>
							<div style="width: 100%; height: 19px;"></div>
							<div style="width: 100%; height: 19px;"></div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									25</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									26</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									27</div>
							</div>
							<div style="width: 100%; height: 19px;">
								<div class="line-numbers" style="left: 0px; width: 38px;">
									28</div>
							</div>
						</div> -->
						<!-- <div class="monaco-scrollable-element editor-scrollable vs"
							role="presentation" data-mprt="5"> -->
							<!--whole background-->
							<!-- <div class="lines-content monaco-editor-background"
								style="position: absolute; overflow: hidden; width: 100000px; height: 100000px; will-change: transform; top: 0px; left: 0px;"> -->
								<!--è¡ä¸­çå¯¹é½çº¿ï¼å é¤ãå¢å é¢è²ææ-->
								<!-- <div class="view-overlays" role="presentation"
									aria-hidden="true"
									style="position: absolute; height: 0px; width: 538px;">
									<div style="width: 100%; height: 19px;">
										<div class="current-line" style="width: 538px; height: 19px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr char-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr line-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr char-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr line-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr char-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr line-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
									</div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cdr char-insert"
											style="left: 31px; width: 31px; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cdr line-insert"
											style="left: 0; width: 100%; height: 19px;"></div>
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 61.5625px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 61.5625px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 61.5625px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 61.5625px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 61.5625px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;"></div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 61.5625px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
										<div class="cigr"
											style="left: 30.78125px; height: 19px; width: 0.8px"></div>
									</div>
									<div style="width: 100%; height: 19px;">
										<div class="cigr"
											style="left: 0px; height: 19px; width: 0.8px"></div>
									</div>

								</div> -->
								<!--<div role="presentation" aria-hidden="true" class="view-rulers"></div>-->
								<!--é´å½±ææ-->
								<!-- <div class="view-zones" role="presentation" aria-hidden="true"
									style="position: absolute; width: 961px;">
									<div class="diagonal-fill" monaco-view-zone="1"
										style="position: absolute; width: 100%; display: block; top: 456px; height: 114px;"
										monaco-visible-view-zone="true"></div>
								</div> -->
								<!--ä»£ç åå®¹-->
								<!-- <div class="view-lines" role="presentation" aria-hidden="true"
									data-mprt="7"
									style="position: absolute; font-family: Consolas, monospace; font-weight: normal; font-size: 14px; line-height: 19px; letter-spacing: 0px; width: 538px; height: 4523px;">
									<div style="top: 0px; height: 19px;" class="view-line">
										<span><span class="mtk8">/*</span></span>
									</div>
									<div style="top: 19px; height: 19px;" class="view-line">
										<span><span class="mtk8">&nbsp;&nbsp;&copy;&nbsp;Microsoft.&nbsp;All&nbsp;rights&nbsp;reserved.</span></span>
									</div>
									<div style="top: 38px; height: 19px;" class="view-line">
										<span><span class="mtk8">&nbsp;&nbsp;Build:&nbsp;6.2.8100.0&nbsp;</span></span>
									</div>
									<div style="top: 57px; height: 19px;" class="view-line">
										<span><span class="mtk8">&nbsp;&nbsp;Version:&nbsp;0.5&nbsp;</span></span>
									</div>
									<div style="top: 76px; height: 19px;" class="view-line">
										<span><span class="mtk8">*/</span></span>
									</div>
									<div style="top: 95px; height: 19px;" class="view-line">
										<span><span>&nbsp;</span></span>
									</div>
									<div style="top: 114px; height: 19px;" class="view-line">
										<span><span class="mtk8">//&nbsp;Here&nbsp;are&nbsp;some&nbsp;inserted&nbsp;lines</span></span>
									</div>
									<div style="top: 133px; height: 19px;" class="view-line">
										<span><span class="mtk8">//&nbsp;with&nbsp;some&nbsp;extra&nbsp;comments</span></span>
									</div>
									<div style="top: 152px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;</span></span>
									</div>
									<div style="top: 171px; height: 19px;" class="view-line">
										<span><span class="mtk1">(</span><span class="mtk6">function</span><span
											class="mtk1">&nbsp;(</span><span class="mtk6">global</span><span
											class="mtk1">,&nbsp;</span><span class="mtk6">undefined</span><span
											class="mtk1">)&nbsp;{</span></span>
									</div>
									<div style="top: 190px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk20">&quot;use&nbsp;strict&quot;</span><span
											class="mtk1">;</span></span>
									</div>
									<div style="top: 209px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;definedVariable&nbsp;=&nbsp;{};</span></span>
									</div>
									<div style="top: 228px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;definedVariable.prop&nbsp;=&nbsp;</span><span
											class="mtk7">5</span><span class="mtk1">;</span></span>
									</div>
									<div style="top: 247px; height: 19px;" class="view-line">
										<span><span>&nbsp;</span></span>
									</div>
									<div style="top: 266px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">function</span><span class="mtk1">&nbsp;initializeProperties(target,&nbsp;members)&nbsp;{</span></span>
									</div>
									<div style="top: 285px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;keys&nbsp;=&nbsp;Object.keys(members);</span></span>
									</div>
									<div style="top: 304px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;properties;</span></span>
									</div>
									<div style="top: 323px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;i,&nbsp;len;</span></span>
									</div>
									<div style="top: 342px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">for</span><span class="mtk1">&nbsp;(i&nbsp;=&nbsp;</span><span
											class="mtk7">0</span><span class="mtk1">,&nbsp;len&nbsp;=&nbsp;keys.length;&nbsp;i&nbsp;&lt;&nbsp;len;&nbsp;i++)&nbsp;{</span></span>
									</div>
									<div style="top: 361px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;key&nbsp;=&nbsp;keys[i];</span></span>
									</div>
									<div style="top: 380px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;enumerable&nbsp;=&nbsp;key.charCodeAt(</span><span
											class="mtk7">0</span><span class="mtk1">)&nbsp;!==&nbsp;</span><span
											class="mtk8">/*_*/</span><span class="mtk7">95</span><span
											class="mtk1">;</span></span>
									</div>
									<div style="top: 399px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">var</span><span class="mtk1">&nbsp;member&nbsp;=&nbsp;members[key];</span></span>
									</div>
									<div style="top: 418px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
											class="mtk6">if</span><span class="mtk1">&nbsp;(member&nbsp;&amp;&amp;&nbsp;</span><span
											class="mtk6">typeof</span><span class="mtk1">&nbsp;member&nbsp;===&nbsp;</span><span
											class="mtk20">'object'</span><span class="mtk1">)&nbsp;{</span></span>
									</div>
									<div style="top: 437px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span>
									</div>
									<div style="top: 570px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target[key]&nbsp;=&nbsp;member;</span></span>
									</div>
									<div style="top: 589px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span>
									</div>
									<div style="top: 608px; height: 19px;" class="view-line">
										<span><span class="mtk1">&nbsp;&nbsp;&nbsp;&nbsp;}</span></span>
									</div>
									<div style="top: 627px; height: 19px;" class="view-line">
										<span><span class="mtk1">})(</span><span class="mtk6">this</span><span
											class="mtk1">);</span></span>
									</div>
								</div> -->
							<!-- </div> -->
							<!--ä¸æ¹æ»å¨æ¡-->
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
					<!-- <div class="popover" style="display:true">
						<div class="arrow"></div>
						<h3 class="popover-title">Popover 左侧</h3>
						<div class="popover-content">
							<p>Sed posuere consectetur est at lobortis. Aenean eu leo
								quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
						</div>
					</div> -->
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
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"
		integrity="sha256-wS9gmOZBqsqWxgIVgA8Y9WcQOa7PgSIX+rPA0VL2rbQ="
		crossorigin="anonymous"></script>
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.0/bootstrap.min.js"
		integrity="sha256-u+l2mGjpmGK/mFgUncmMcFKdMijvV+J3odlDJZSNUu8="
		crossorigin="anonymous"></script>
	<script type="text/javascript" src="js/editor.js"></script>
</body>
</html>