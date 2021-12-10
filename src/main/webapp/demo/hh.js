var s= "BrokerConfig.java\n" +
    "1\n" +
    "2\n" +
    "3\n" +
    "4\n" +
    "public void setWaitTimeMillsInHeartbeatQueue(long waitTimeMillsInHeartbeatQueue) {\n" +
    "        this.waitTimeMillsInHeartbeatQueue = waitTimeMillsInHeartbeatQueue;\n" +
    "    }\n" +
    " ";
let reg = /\d\n+/g;
var data = s.replace(reg,"");
console.log(data.substring(0,data.lastIndexOf(".java")+5))
var incre =5;
var start = 10;
for (let i=0;i<20;i++){

    start +=incre;
    start %= 100;
    console.log(start)
};