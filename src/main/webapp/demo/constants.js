var row, col, rem;
var node_div_map = new Map();
var node_degree_set = new Set();
var res = [];
var node_map = new Map();
var outer_link = [];


var file_color_map = {};


var instance;
var edge_colors = {
    "def-use": "peachpuff",
    "override": "blue",
    "abstract": "indianred",
    "implement": "yellow",
    "systematic": "aqua"
};


var diffJson = [];
var diffEdges = [];


var links = [];
var instance;




let settings = {
    /** canvas initial width */
    canvasWidth: 9600,
    /** canvas initial height */
    canvasHeight: 7600,
    /** node initial width */
    nodeWidth: 426,
    /** node initial height */
    nodeHeight: 186,
    /**A map stores node belongs to which div , the div is described by col and row,
    eg:{
        {
            "key": 0,
            "value": "canvasrow1col0"
        },
        {
            "key": 1,
            "value": "canvasrow1col0"
         },
      }
     */

    nodeDivMap: node_div_map,
    /** A array stores files in each block and its degree(includes in-degree and out-degree)
    eg:{
    "id": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
    "data": [
        {
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
        .....
    ],
    "rank": 3
    }
     */
    sortedFileBlock: res,
    /** A array stores links */
    links: links,
    /** A array stores links between different file block */
    outerLink: outer_link
};

let raw_nodes = [];