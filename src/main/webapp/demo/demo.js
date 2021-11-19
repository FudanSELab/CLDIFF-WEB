var links=[];
var instance;

function calljsplumb() {
    for(let edge of data.edges){
    links.push({
        from: edge.source.toString(),
        to: edge.target.toString(),
    })
}
    instance = window.jsp = jsPlumb.getInstance({
        // default drag options
        DragOptions: {cursor: 'pointer', zIndex: 2000},
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            ["Arrow", {
                location: 1,
                visible: true,
                width: 5,
                length: 5,
                id: "ARROW",
            }],
            ["Label", {
                location: 0.1,
                id: "label",
                cssClass: "aLabel",
            }]
        ],
        Container: "canvas",
        Anchors: [["Left","Right","Bottom","Top"], ["Top","Bottom","Left","Right"]],

    });


    _.each(links,function(link){
        instance.connect({
            source:link.from,
            target:link.to,
            connector: [ "Flowchart",
                {
                    cornerRadius: 3,
                    stub:16
                }
            ],
            //paintStyle: connectorPaintStyle,
            endpoints:["Blank","Blank"],
            //overlays:[["Arrow",{location:1,width:10, length:10}]],
        });
    });
    var dg = new dagre.graphlib.Graph();
    dg.setGraph({nodesep:200,ranksep:200,marginx:80,marginy:80});
    dg.setDefaultEdgeLabel(function() { return {}; });
    $("#canvas").find(".jtk-node").each(
        function(idx, node) {
            var $n = $(node);

            var box = {
                width  : Math.round($n.outerWidth()),
                height : Math.round($n.outerHeight())
            };
            dg.setNode($n.attr('id'), box);

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
            connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
            console.log(connection.sourceId)
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
        // console.log($(this).context.innerText)
        // console.log("aaaaa")
        //$("#flowchartWindow2").html("")
        let reg = /[0-9]+/g;
        //console.log($(this).innerText.replace(reg,""));
        console.log($(this).context.innerText.replace(reg,""));
        console.log($(this).context.innerText.replace(/\r\n/g,""))
        //console.log($(this).context.innerText)
        $("#rightEditor").html($(this).html())
    })

    // suspend drawing and initialise.
    instance.batch(function () {


        console.log("hh")
        instance.bind("connection", function (connInfo) {
            console.log("dsdaaaa")
            init(connInfo.connection);
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), {

            containment: 'parent'
        });


    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);


// });
};



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