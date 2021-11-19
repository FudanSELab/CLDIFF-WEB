var data = {
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