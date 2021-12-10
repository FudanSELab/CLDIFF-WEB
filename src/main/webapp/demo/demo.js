var links=[];
var instance;

function calljsplumb() {
    for(let edge of data.edges){

            links.push({
                from: edge.source.toString(),
                to: edge.target.toString(),
            })

}
    console.log(links)
    //if want to remove duplicate entry restrictly,use function below
    //links = unique(links);
    links = unique2(links);
    console.log(links)
    instance = window.jsp = jsPlumb.getInstance({
        // default drag options
        DragOptions: {cursor: 'pointer', zIndex: 2000},
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.

        ConnectionOverlays: [
            // ["Arrow", {
            //     location: 1,
            //     visible: true,
            //     width: 5,
            //     length: 5,
            //     id: "ARROW",
            // }],
            ["Label", {
                location: 0.05,
                id: "label",
                cssClass: "aLabel",
            }]
        ],
        Container: "canvas",
        Anchors: [ "Continuous", "Continuous"],
        // ["Top", "Right", "Bottom", "Left", [0.25, 0, 0, -1], [0.75, 0, 0, -1], [0.25, 1, 0, 1], [0.75, 1, 0, 1]
        // , [0, 0.25, 0, -1], [0, 0.75, 0, -1], [1, 0.25, 0, 1], [1, 0.75, 0, 1]]

    });

    var incre =5;
    var start = 10;
    _.each(links,function(link){
        instance.connect({
            source:link.from,
            target:link.to,
            connector: [ "Flowchart",
                // {
                //     cornerRadius: 3,
                //     stub:160
                // }
                {
                    cornerRadius: 10,
                    midpoint:start/100
                }
            ],

            // paintStyle:{ stroke:"blue" },
            // hoverPaintStyle:{ stroke:"red" },
            // hoverPaintStyle:connectorHoverStyle,
            // paintStyle:connectorPaintStyle,
            //paintStyle: connectorPaintStyle,
            endpoints:["Blank","Blank"],
            overlays:[["Arrow",{location:1,width:20, length:20}]],
        });
        start +=incre;
        start %= 100;

    });
    var dg = new dagre.graphlib.Graph();
    dg.setGraph({nodesep:200,ranksep:200,marginx:80,marginy:80,align:"UL",edgesep:100,ranker:"longest-path"});
    dg.setDefaultEdgeLabel(function() { return {}; });
    $("#canvas").find(".jtk-node").each(
        function(idx, node) {
            var $n = $(node);

            var box = {
                width  : Math.round($n.outerWidth()),
                height : Math.round($n.outerHeight())
            };
            dg.setNode($n.attr('id'), box);

            // console.log($(node).className)
        }
    );
    instance.getAllConnections()
        .forEach(function(edge) {
            dg.setEdge(edge.source.id,edge.target.id);});
    dagre.layout(dg);
    var graphInfo = dg.graph();

    dg.nodes().forEach(
        function(n) {
            var node = dg.node(n);
            // console.log(node)
            var top = Math.round(node.y-node.height/2)+'px';
            var left = Math.round(node.x-node.width/2)+'px';
            $('#' + n).css({left:left,top:top});
        });

    instance.repaintEverything();


    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
            strokeWidth: 2,
            stroke: "#61B7CF",
            joinstyle: "round",
            outlineStroke: "white",
            outlineWidth: 2
        },
        // .. and this is the hover style.
        connectorHoverStyle = {
            strokeWidth: 3,
            stroke: "#216477",
            outlineWidth: 5,
            outlineStroke: "white"
        },
        endpointHoverStyle = {
            fill: "#216477",
            stroke: "#216477"
        },
        // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
            endpoint: "Blank",
            maxConnections: -1,
            paintStyle: {
                stroke: "#7AB02C",
                fill: "transparent",
                radius: 7,
                strokeWidth: 1
            },
            isSource: true,
            connector: ["Flowchart", {stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true}],
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                ["Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel",
                    visible: false
                }]
            ]
        },
        // the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
            endpoint: "Blank",
            paintStyle: {fill: "#7AB02C", radius: 7},
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: {hoverClass: "hover", activeClass: "active"},
            isTarget: true,
            overlays: [
                ["Label", {location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible: false}]
            ]
        },
        init = function (connection) {

        };

    var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint("flowchart" + toId, targetEndpoint, {anchor: targetAnchors[j], uuid: targetUUID});
        }
    };

    var _addEndpoints2 = function (toId) {
            instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
                anchor: "Continuous", uuid: toId
            });

    };

    $(".jtk-node").on("click",function (ev) {
        let reg = /\d\n+/g;
        var data = $(this).context.innerText.replace(reg,"");
        var color =(getComputedStyle(this.firstElementChild,false)["background-color"])
        clearTimeout(clickTimeId);
        var path =  $(this).attr("path").substring($(this).attr("path").indexOf("/src"));
        // var path =  $(this).attr("path")
        console.log(path)
        //执行延时
        clickTimeId = setTimeout( function () {
            //此处为单击事件要执行的代码
           $("#rightEditor").html("");
            var c = document.createElement(`div`);
            document.getElementById("rightEditor").appendChild(c);
            c.setAttribute("class","title")
            c.innerText = data.substring(0,data.indexOf("\n"));
            c.style.backgroundColor = color;
            console.log(data)
            require(['vs/editor/editor.main'], function() {
                var d=document.createElement(`div`);
                d.setAttribute("class","test");
                document.getElementById("rightEditor").appendChild(d);
                var editor = monaco.editor.create(d, {
                    value: [
                        data.substring(data.indexOf("\n")+1)
                    ].join('\n'),
                    language: 'java',
                    autoIndent:true,
                    contentLeft:0,
                    automaticLayout:true,
                    minimap:{enabled: false},
                    overviewRulerBorder: false,

                    // wordWrap: "wordWrapColumn",
                    // wordWrapColumn: 40,
                    // wordWrapMinified: true,
                    // wrappingIndent: "indent",
                    // lineNumbers: "off",
                    // scrollBeyondLastLine: false,

                    wordWrap: "on",
                    wrappingIndent:"indent",
                    wrappingStrategy:"advanced"
                    ,
                });
            });

            document.getElementById("span").innerText = path;
        }, 250);



    })

    // suspend drawing and initialise.
    instance.batch(function () {



        instance.bind("click", function (connInfo) {
            console.log("dsdaaaa")
            console.log(connInfo);
            console.log($(this));
            init(connInfo)
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), {

             containment: 'parent',

        });


    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);


// });
};

function unique(arr) {
    return arr.filter(function(item, index, arr) {
            return arr.findIndex(item1 =>(item1.from === item.from && item1.to === item.to)) === index
        }
    );
}

function unique2(arr){
    return arr.filter(function(item, index, arr) {
        return arr.findIndex(item1 =>((item1.from === item.from && item1.to === item.to)||(item1.from === item.to && item1.to === item.from))) === index
        }
    );
}


function createNodes(rootData, rootPosition) {

    if (rootData == null) {
        return ;
    }

    var can = $('#canvas');
    var relData = rootData.rel;
    var i=0, relLen = relLength(relData);
    var rootTop = rootPosition[0];
    var rootLeft = rootPosition[1];

    var nextRootData = {};
    var nextRootPosition = [];
    var divStr = createDiv(rootData);
    //var nodeDivId = getNodeDivId(rootData);
    can.append(divStr);



    for (i=0; i < relLen; i++) {
        nextRootData = relData[i];
        nextRootPosition = getNextRoot(rootData, nextRootData, rootPosition);
        createNodes(nextRootData, nextRootPosition);
    }

    function relLength(relData) {
        if (isArray(relData)) {
            return relData.length;
        }
        return 0;
    }


}