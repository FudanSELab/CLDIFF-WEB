var myTextArea = document.getElementById("graph1");
var editor1 = CodeMirror.fromTextArea(myTextArea, {
	lineNumbers: true,
	// mode: "java",
	// mode: "text/x-diff",
    mode: "text/x-java", //实现Java代码高亮
	matchBrackets: true,
	//			scrollbarStyle: "simple",
})
const width1 = document.getElementById('chart').scrollWidth;
const height1 = document.getElementById('chart').scrollHeight || 1500;
editor1.setSize(width1, height1)
// editor1.setScrollbar()
editor1.getDoc().setValue("+ Hover over code to view it here!!!\n- You can also check for diff!!!");

var Util = G6.Util;
//		
//'tool.minimap' 缩略图

const plugin = new G6.Plugins['layout.dagre']({
	align: 'DL',
	rankdir: 'LR',
	nodesep: 50,
	ranksep: 150,
});
const minimap = new G6.Plugins['tool.minimap']({});


G6.registerNode('customNode', {
	cssSize: true, // 不使用内部 size 作为节点尺寸
	getHtml: function (cfg) {
		const model = cfg.model;
		const container = Util.createDOM('<div class="node-conatiner"></div>');
		/*			const container = Util.createDOM('<textarea class="node-conatiner" id="editor"></textarea>');*/

		const title = Util.createDOM(`<div class="node-conatiner-title node-conatiner-${model.group}">
      ${model.desc}
    </div>`);
		container.appendChild(title);
		const list = Util.createDOM(`<textarea class="bikesh" id="bikesh">${model.code}</textarea>`);
		container.appendChild(list);
		const containerCode = Util.createDOM(`<!--<div id="bikesh2"></div>-->`);
		// container.appendChild(containerCode)
		return container;
	}
}, 'html');

const data = {
	"nodes": [{
			"code": "+ this.heartbeatThreadPoolQueue = new LinkedBlockingQueue<Runnable>\n- (this.brokerConfig.getHeartbeatThreadPoolQueueCapacity());\n- (this.brokerConfig.getHeartbeatThreadPoolQueueCapacity());\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 0,
			"desc": "addExpressionStatement",
			"group": 0
				},
		{
			"code": "- this.heartbeatExecutor = new BrokerFixedThreadPoolExecutor(\n+ this.brokerConfig.getHeartbeatThreadPoolNums(),\n                this.brokerConfig.getHeartbeatThreadPoolNums(),\n                1000 * 60,\n                TimeUnit.MILLISECONDS,\n                this.heartbeatThreadPoolQueue,\n                new ThreadFactoryImpl(\"HeartbeatThread_\",true));\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 1,
			"desc": "testtest",
			"group": 0
				},
		{
			"code": "if (this.transactionalMessageCheckService != null) {\n            this.transactionalMessageCheckService.shutdown(false);\n        }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 2,
			"desc": "deleteIf",
			"group": 0
				},
		{
			"code": "this.remotingServer.registerProcessor(RequestCode.HEART_BEAT, clientProcessor, this.heartbeatExecutor);\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 3,
			"desc": "updateExpressionStatement   by",
			"group": 0
				},
		{
			"code": "this.fastRemotingServer.registerProcessor(RequestCode.HEART_BEAT, clientProcessor, this.heartbeatExecutor);\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 4,
			"desc": "updateExpressionStatement   by",
			"group": 0
				},
		{
			"code": "public BlockingQueue<Runnable> getHeartbeatThreadPoolQueue() {\n        return heartbeatThreadPoolQueue;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 5,
			"desc": "addMethodDeclaration",
			"group": 0
				},
		{
			"code": "private ExecutorService heartbeatExecutor;\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 6,
			"desc": "addFieldDeclaration",
			"group": 0
				},
		{
			"code": "private final BlockingQueue<Runnable> heartbeatThreadPoolQueue;\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
			"id": 7,
			"desc": "addFieldDeclaration",
			"group": 0
				},
		{
			"code": "cleanExpiredRequestInQueue(this.brokerController.getHeartbeatThreadPoolQueue(),\n            this.brokerController.getBrokerConfig().getWaitTimeMillsInHeartbeatQueue());\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/latency/BrokerFastFailure.java",
			"id": 8,
			"desc": "addExpressionStatement",
			"group": 1
				},
		{
			"code": "public void setWaitTimeMillsInHeartbeatQueue(long waitTimeMillsInHeartbeatQueue) {\n        this.waitTimeMillsInHeartbeatQueue = waitTimeMillsInHeartbeatQueue;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 9,
			"desc": "addMethodDeclaration",
			"group": 2
				},
		{
			"code": "public long getWaitTimeMillsInHeartbeatQueue() {\n        return waitTimeMillsInHeartbeatQueue;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 10,
			"desc": "addMethodDeclaration",
			"group": 2
				},
		{
			"code": "public void setHeartbeatThreadPoolNums(int heartbeatThreadPoolNums) {\n        this.heartbeatThreadPoolNums = heartbeatThreadPoolNums;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 11,
			"desc": "addMethodDeclaration",
			"group": 2
				},
		{
			"code": "public int getHeartbeatThreadPoolNums() {\n        return heartbeatThreadPoolNums;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 12,
			"desc": "addMethodDeclaration",
			"group": 2
				},
		{
			"code": "public void setHeartbeatThreadPoolQueueCapacity(int heartbeatThreadPoolQueueCapacity) {\n        this.heartbeatThreadPoolQueueCapacity = heartbeatThreadPoolQueueCapacity;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 13,
			"desc": "addMethodDeclaration",
			"group": 2
				},
		{
			"code": "public int getHeartbeatThreadPoolQueueCapacity() {\n        return heartbeatThreadPoolQueueCapacity;\n    }\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 14,
			"desc": "addMethodDeclaration",
			"group": 2
				},
		{
			"code": "private long waitTimeMillsInHeartbeatQueue = 31 * 1000;\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 15,
			"desc": "addFieldDeclaration",
			"group": 2
				},
		{
			"code": "private int heartbeatThreadPoolQueueCapacity = 50000;\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 16,
			"desc": "addFieldDeclaration",
			"group": 2
				},
		{
			"code": "private int heartbeatThreadPoolNums = Math.min(32,Runtime.getRuntime().availableProcessors());\n",
			"file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__common/src/main/java/org/apache/rocketmq/common/BrokerConfig.java",
			"id": 17,
			"desc": "addFieldDeclaration",
			"group": 2
				}
			],
	"edges": [{
			"link_type_str": "def-use@field",
			"source": 3,
			"label": "def-use@field",
			"type": "57",
			"value": 1,
			"target": 6
				},
		{
			"link_type_str": "def-use@field",
			"source": 4,
			"text": "def-use@field",
			"type": "58",
			"value": 1,
			"target": 6
				},
		{
			"link_type_str": "def-use@field",
			"source": 1,
			"text": "def-use@field",
			"type": "57",
			"value": 1,
			"target": 7
				},
		{
			"link_type_str": "def-use@field",
			"source": 1,
			"text": "def-use@field",
			"type": "57",
			"value": 1,
			"target": 6
				},
		{
			"link_type_str": "def-use@field",
			"source": 0,
			"text": "def-use@field",
			"type": "57",
			"value": 1,
			"target": 7
				},
		{
			"link_type_str": "def-use@method",
			"source": 8,
			"text": "def-use@method",
			"type": "56",
			"value": 1,
			"target": 5
				},
		{
			"link_type_str": "def-use@method",
			"source": 1,
			"text": "def-use@method",
			"type": "56",
			"value": 1,
			"target": 12
				},
		{
			"link_type_str": "def-use@method",
			"source": 0,
			"text": "def-use@method",
			"type": "56",
			"value": 1,
			"target": 14
				},
		{
			"link_type_str": "def-use@method",
			"source": 8,
			"text": "def-use@method",
			"type": "56",
			"value": 1,
			"target": 10
				}
			]
}

const width = document.getElementById('mountNode').scrollWidth;
const height = document.getElementById('mountNode').scrollHeight || 1500;
const graph = new G6.Net({
	id: 'mountNode',
	grid: null,
	width: width, // 画布宽
	height: height, // 画布高
	plugins: [plugin],
//	 mode: 'analysis',
	
});
const graphContainer = graph.get('graphContainer'); //获取图表内部容器
//		graphContainer.oncontextmenu = function(e) {
//			return false;
//		} //阻止默认右键菜单
graph.on('contextmenu', ev => { // 鼠标右键点击事件
	console.log("type:", ev.itemType);
	console.log(ev);
});





graph.removeBehaviour(['wheelZoom', 'resizeNode']);

graph.source(data.nodes, data.edges);
graph.node()
	.shape('customNode')
	.style({
		stroke: null, // 去除默认边框
		fillOpacity: 1
	});
graph.edge()
	.shape('arrow')
	.style({
		lineWidth: 5
	})
	.color('rgb(97, 183, 207)');

graph.tooltip({
	title: 'Node Info', // @type {String} 标题
	split: ': ', // @type {String} 分割符号
	dx: 10, // @type {Number} 水平偏移
	dy: 10 // @type {Number} 竖直偏移
});
graph.node().tooltip(['id', 'group']);

graph.render();

graph.changeData(data.nodes, data.edges);


var codemirrorInstance = [];
var foundtextareasarr = document.getElementsByClassName('bikesh');

for (var i = 0; foundtextareasarr[i]; ++i) {

	codemirrorInstance[i] = CodeMirror.fromTextArea(foundtextareasarr[i], {
		lineNumbers: true,
		mode: "java",
		theme: 'default',
		//			scrollbarStyle: "simple",
	});

}


// graph.on('node:mousedown', ev => { //单击显示
//     const item = ev.item;
//     editor1.getDoc().setValue(item._attrs.model.code);
//     var d = item._attrs.model.file_name.split("__CLDIFF__");
//
//     document.getElementById('alert1').textContent = d[1];
//
// });

// $("g6-html-node-container").unbind("resize");
