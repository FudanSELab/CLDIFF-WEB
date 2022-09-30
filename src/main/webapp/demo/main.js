var links = [];
var instance;
var edge_colors =
    {
        "def-use": "peachpuff",
        "override":"blue",
        "abstract":"indianred",
        "implement": "yellow",
        "systematic": "aqua"
    };


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
    nodeDivMap : node_div_map,


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
    sortedFileBlock : res,


    /** A array stores links */
    links: links,

    /** A array stores links between different file block */
    outerLink : outer_link
};

let raw_nodes = [];

function wrapNodes(){
    $("#canvas").find(".jtk-node").each(
        function (idx, node) {
            let $n = $(node);
            let id = $n.attr("id");
            let row = settings.nodeDivMap.get(parseInt(id)).charAt(9);
            let col = settings.nodeDivMap.get(parseInt(id)).charAt(13);
            raw_nodes.push(new RawNode(id,row,col));
        }
    );
}

/**
 * Computes the specified coordinate for each node in an array.
 * @Param raw_nodes, A array consists of RawNode, which has attribute x, y and id
 * @Param settings, Stores graph meta info */
function computeCoordinates(raw_nodes,settings){
    //
    //TODO Update node's coordinate in raw_nodes array
}


function calljsplumb() {
    for (let edge of data.edges) {
        links.push({
            from: edge.source.toString(),
            to: edge.target.toString(),
            link_type_str: edge.link_type_str.toString()
        })
    }
    //if want to remove duplicate entry restrictly,use function below
    //links = unique(links);
    links = unique2(links);
    instance = window.jsp = jsPlumb.getInstance({
        DragOptions: {cursor: 'pointer', zIndex: 2000},
        HoverPaintStyle: {stroke: '#1E90FF'},
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                visible: true,
                width: 20,
                length: 20,
                id: "ARROW",
            }],
            ["Label", {
                location: 0.05,
                id: "label",
                cssClass: "aLabel",
            }]
        ],

        Container: "canvas",
        Anchors: ["Continuous", "Continuous"],
        // ["Top", "Right", "Bottom", "Left", [0.25, 0, 0, -1], [0.75, 0, 0, -1], [0.25, 1, 0, 1], [0.75, 1, 0, 1]
        // , [0, 0.25, 0, -1], [0, 0.75, 0, -1], [1, 0.25, 0, 1], [1, 0.75, 0, 1]]

    });

    var incre = 5;
    var start = 10;

    _.each(links, function (link) {
        let link_type=link.link_type_str;
        let color;
        if(link_type.includes("def-use")){
            color = edge_colors["def-use"];
        }
        else if(link_type.includes("systematic")){
            color = edge_colors["systematic"];
        }
        else if(link_type.includes("implement")){
            color = edge_colors["implement"];
        }
        else if(link_type.includes("override")){
            color = edge_colors["override"];
        }
        else{
            color = edge_colors["abstract"]
        }
        instance.connect({
            source: link.from,
            target: link.to,
            connector: ["Flowchart",
                // {
                //     cornerRadius: 3,
                //     stub:160
                // }
                {
                    cornerRadius: 10,
                    midpoint: start / 100,

                }
            ],
            endpoints: ["Blank", "Blank"],
            paintStyle: {
                stroke: color,
                strokeWidth: 5
            },
            // label:link.from+"-"+link.to
        });
        start += incre;
        start %= 100;

    });

    var connection = instance.getAllConnections()
    connection.map(item => {
        //item.setPaintStyle({ stroke: 'yellow' ,strokeWidth: 5})
        item.getOverlay("label").setLabel(item.source.id+"-"+item.target.id)
    });

    let files_map = new Map();
    $("#canvas").find(".jtk-node").each(
        function (idx, node) {
            var $n = $(node);
            if(!files_map.has($n.attr("path"))){
                files_map.set($n.attr("path"),[$n]);
            }
            else{
                let s = files_map.get($n.attr("path"));
                s.push($n);
                files_map.set($n.attr("path"),s);
            }

        }
    );
    console.log(files_map);
    //changed_files_color
    for(let file_name of files_map.keys()){
        let file_name_div = document.createElement("div");
        let file_short_name = file_name.substring(file_name.lastIndexOf("/") + 1);
        file_name_div.innerText = file_short_name;
        file_name_div.setAttribute("class","alert alert-success");
        file_name_div.style.backgroundColor = file_color_map[file_short_name];
        document.getElementById("changed_files").appendChild(file_name_div);
    }

    let div_size_map = new Map();
    files_map.forEach(
        function (value, key, map){
            let empty_count = 0;
            for (let node of value) {
                var $n = node;
                //layout for zero degree nodes
                if (!node_degree_set.has(parseInt(node.attr("id")))) {
                    empty_count++;
                    $("#" + (node.attr("id"))).css({
                        left: empty_count* 50,
                        top: empty_count* 50
                    })
                }
                else{
                    continue;
                }
            }
            //space for zero degree nodes
            let margin_x = 200+ empty_count*50;
            let margin_y = 250+ empty_count*50;
            var dg = new dagre.graphlib.Graph();
            dg.setGraph({
                nodesep: 150,
                ranksep: 100,
                marginx: margin_x,
                marginy: margin_y,
                align: "UL",
                edgesep: 100,
                //ranker: "longest-path"
            });
            dg.setDefaultEdgeLabel(function () {
                return {};
            });
            let set = new Set();
            let div_id = node_div_map.get(parseInt(value[0].attr("id")));
            for(let node of value){
                var $n = node;
                if(!node_degree_set.has(parseInt(node.attr("id")))){
                    continue;
                }
                set.add(node.attr("id"));
                var box = {
                    width: Math.round($n.outerWidth()),
                    height: Math.round($n.outerHeight())
                };
                dg.setNode($n.attr('id'), box);
            }
            instance.getAllConnections()
                .forEach(function (edge) {
                    if(set.has(edge.source.id) && set.has(edge.target.id)) {
                        dg.setEdge(edge.source.id, edge.target.id);
                    }
                });
            dagre.layout(dg);
            // console.log(JSON.stringify(dg))
            //fix infinite number
            let finite_width =  isFinite(Object.values(dg)[3].width);
            let finite_height =  isFinite(Object.values(dg)[3].height);
            // console.log(finite_width)
            // console.log(finite_height)
            let div_width = !finite_width?600:Object.values(dg)[3].width;
            let div_height = !finite_height ?600:Object.values(dg)[3].height;
            // console.log($("#"+div_id))
            //self-adaptive size
            $("#"+div_id).css({width: div_width, height: div_height})
            let row_num = div_id.substring(0,10);
            if(!div_size_map.has(div_id.substring(0,10))){
                div_size_map.set(div_id.substring(0,10),{width:div_width,height:div_height});
            }
            else{
                let new_width = div_size_map.get(row_num).width + div_width;
                let new_height = Math.max(div_size_map.get(row_num).height , div_height);
                div_size_map.set(row_num,{width:new_width, height: new_height});
            }
            dg.nodes().forEach(
                function (n) {
                    var node = dg.node(n);
                    //if(node.x <= $("#canvas").width()/2 - node.width){
                    var top = Math.round(node.y - node.height / 2 )  + 'px';
                    var left = Math.round(node.x - node.width / 2  )+ 'px';
                    $('#' + n).css({left: left, top: top});
                    // }
                    // else{
                    //     var top = Math.round(node.y - node.height / 2 + (node.height + 200) * level) + 'px';
                    //     var left = Math.round(node.x - node.width / 2 - ((node.width + 140) * 5) * level) + 'px';
                    //     $('#' + n).css({left: left, top: top});
                    // }
                });
        }
    );

    //Comment below to fix div size
    // div_size_map.forEach(
    //     function (value,key) {
    //         $("#"+key).css({
    //             width: value.width,
    //             height: value.height
    //         })
    //     }
    // )
    // console.log(div_size_map);


    //Rearrange layout,
    //when finish the computeCoordinates function,remove comments below
    computeCoordinates(raw_nodes,settings);
    raw_nodes.forEach(
        function (value) {
            let node = value;
             $('#' + node.id).css({left: node.x, top: node.y});
        }
    )

    instance.repaintEverything();

    $(".jtk-node").on("click", function (ev) {
        let reg = /\d\n+/g;
        var data = $(this).context.innerText.replace(reg, "");
        var color = (getComputedStyle(this.firstElementChild, false)["background-color"])
        clearTimeout(clickTimeId);
        var path = $(this).attr("path").substring($(this).attr("path").indexOf("/src"));
        // var path =  $(this).attr("path")
        console.log(path)
        //执行延时
        clickTimeId = setTimeout(function () {
            //此处为单击事件要执行的代码
            $("#rightEditor").html("");
            var c = document.createElement(`div`);
            document.getElementById("rightEditor").appendChild(c);
            c.setAttribute("class", "title")
            c.innerText = data.substring(0, data.indexOf("\n"));
            c.style.backgroundColor = color;
            console.log(data)
            require(['vs/editor/editor.main'], function () {
                var d = document.createElement(`div`);
                d.setAttribute("class", "test");
                document.getElementById("rightEditor").appendChild(d);
                var editor = monaco.editor.create(d, {
                    value: [
                        data.substring(data.indexOf("\n") + 1)
                    ].join('\n'),
                    language: 'java',
                    autoIndent: true,
                    contentLeft: 0,
                    automaticLayout: true,
                    minimap: {enabled: false},
                    overviewRulerBorder: false,
                    wordWrap: "on",
                    wrappingIndent: "indent",
                    wrappingStrategy: "advanced"
                    ,
                });
            });
        }, 250);


    })

    // suspend drawing and initialise.
    instance.batch(function () {

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), {
            //containment: 'parent',
        });

        instance.setZoom(scal);
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);


// });
};

function unique(arr) {
    return arr.filter(function (item, index, arr) {
            return arr.findIndex(item1 => (item1.from === item.from && item1.to === item.to)) === index
        }
    );
}

function unique2(arr) {
    return arr.filter(function (item, index, arr) {
            return arr.findIndex(item1 => ((item1.from === item.from && item1.to === item.to) || (item1.from === item.to && item1.to === item.from))) === index
        }
    );
}




window.onload=function(){
    // $("#canvas").empty();
    initRightEditor();
    layout();
    wrapNodes();
    calljsplumb();
    console.log(raw_nodes)
    document.getElementById('canvas').style.transform = "scale("+scal+")";
    document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    windowDraggable();
    addZoom();
    $("#leftPanel").attr("style", "overflow:scroll");
}