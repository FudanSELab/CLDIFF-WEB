const data = {
    "nodes": [{
        "code": "+ this.heartbeatThreadPoolQueue = new LinkedBlockingQueue<Runnable>\n- (this.brokerConfig.getHeartbeatThreadPoolQueueCapacity());\n- (this.brokerConfig.getHeartbeatThreadPoolQueueCapacity());\n",
        "file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
        "id": 0,
        "desc": "addEStatement",
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
            "code": "- this.heartbeatExecutor = new BrokerFixedThreadPoolExecutor(\n+ this.brokerConfig.getHeartbeatThreadPoolNums(),\n                this.brokerConfig.getHeartbeatThreadPoolNums(),\n                1000 * 60,\n                TimeUnit.MILLISECONDS,\n                this.heartbeatThreadPoolQueue,\n                new ThreadFactoryImpl(\"HeartbeatThread_\",true));\n",
            "file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
            "id": 2,
            "desc": "testtest",
            "group": 0
        },
        {
            "code": "- this.heartbeatExecutor = new BrokerFixedThreadPoolExecutor(\n+ this.brokerConfig.getHeartbeatThreadPoolNums(),\n                this.brokerConfig.getHeartbeatThreadPoolNums(),\n                1000 * 60,\n                TimeUnit.MILLISECONDS,\n                this.heartbeatThreadPoolQueue,\n                new ThreadFactoryImpl(\"HeartbeatThread_\",true));\n",
            "file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
            "id": 3,
            "desc": "testtest",
            "group": 0
        },
        {
            "code": "- this.heartbeatExecutor = new BrokerFixedThreadPoolExecutor(\n+ this.brokerConfig.getHeartbeatThreadPoolNums(),\n                this.brokerConfig.getHeartbeatThreadPoolNums(),\n                1000 * 60,\n                TimeUnit.MILLISECONDS,\n                this.heartbeatThreadPoolQueue,\n                new ThreadFactoryImpl(\"HeartbeatThread_\",true));\n",
            "file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
            "id": 4,
            "desc": "testtest",
            "group": 0
        },
        {
            "code": "- this.heartbeatExecutor = new BrokerFixedThreadPoolExecutor(\n+ this.brokerConfig.getHeartbeatThreadPoolNums(),\n                this.brokerConfig.getHeartbeatThreadPoolNums(),\n                1000 * 60,\n                TimeUnit.MILLISECONDS,\n                this.heartbeatThreadPoolQueue,\n                new ThreadFactoryImpl(\"HeartbeatThread_\",true));\n",
            "file_name": "76233ed8b77c293e669f42daec855cabf74b9f3a__CLDIFF__broker/src/main/java/org/apache/rocketmq/broker/BrokerController.java",
            "id": 5,
            "desc": "testtest",
            "group": 0
        }
    ],
    "edges": [{
        "link_type_str": "def-use@field",
        "source": 0,
        "label": "def-use@field",
        "type": "57",
        "value": 1,
        "target": 1
    },
        {
            "link_type_str": "def-use@field",
            "source": 1,
            "text": "def-use@field",
            "type": "58",
            "value": 1,
            "target": 2
        },
        {
            "link_type_str": "def-use@field",
            "source": 2,
            "text": "def-use@field",
            "type": "58",
            "value": 1,
            "target": 3
        },
        {
            "link_type_str": "def-use@field",
            "source": 3,
            "text": "def-use@field",
            "type": "58",
            "value": 1,
            "target": 4
        },
        {
            "link_type_str": "def-use@field",
            "source": 4,
            "text": "def-use@field",
            "type": "58",
            "value": 1,
            "target": 5
        },
        {
            "link_type_str": "def-use@field",
            "source": 2,
            "text": "def-use@field",
            "type": "58",
            "value": 1,
            "target": 4
        },
        {
            "link_type_str": "def-use@field",
            "source": 0,
            "text": "def-use@field",
            "type": "58",
            "value": 1,
            "target": 5
        }
    ]
}