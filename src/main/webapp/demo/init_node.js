
function initNode(ele,data,i){
    // color bar
    var colors = ["#F44336","#64B5F6","#66BB6A","#FFD54F","#B0BEC5","#FFCDD2","#0097A7","#757575"];
    var c = document.createElement(`div`);
    document.getElementById(ele.id).appendChild(c);
    c.setAttribute("class","title")
    //c.innerText = data.file_name.substring(data.file_name.lastIndexOf("/")+1);
    c.innerText = data.desc;

    c.style.backgroundColor = colors[i%8];
    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' }});
    require(['vs/editor/editor.main'], function() {
        var d=document.createElement(`div`);
        d.setAttribute("class","node");
        document.getElementById(ele.id).appendChild(d);
        var editor = monaco.editor.create(d, {
            value: [
                data.code
            ].join('\n'),
            language: 'java',
            autoIndent:true,
            contentLeft:0,
            automaticLayout:true,
            minimap:{enabled: false},
            overviewRulerBorder: false,
        });
    });

}


function initRightEditor(){

    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' }});
    require(['vs/editor/editor.main'], function() {
        var d=document.createElement(`div`);
        d.setAttribute("class","test");
        document.getElementById("rightEditor").appendChild(d);
        var editor = monaco.editor.create(d, {
            value: [
                'public void method(){',
                '\tSystem.out.println(\"demo\");',
                '}'
            ].join('\n'),
            language: 'java',
            autoIndent:true,
            contentLeft:0,
            automaticLayout:true,
            minimap:{enabled: false},
            overviewRulerBorder: false,
        });
    });
}
var  clickTimeId;
var isZoom = false;
var scal = scal;
var step = 0.05
function addZoom(){
    // $(".jtk-node").dblclick(function(evt) {
    //     if(isZoom){
    //         isZoom = false;
    //         document.getElementById('canvas').style.transform = "scale("+scaleNum+")";
    //         document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    //     }else{
    //         isZoom = true;
    //         document.getElementById('canvas').style.transform = "scale("+scaleNum+")";
    //         document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    //     }
    //     // if (window.getComputedStyle(document.body).transform.charAt(7) === "1" || ((window.getComputedStyle(document.body).transformOrigin =="0px 0px"))) {
    //     //     $(this).zoomTo({targetsize:0.2, duration:600});
    //     //
    //     // }
    //     // else{
    //     //     $("body").zoomTo({targetsize: 0.2, duration: 600});
    //     // }
    //     // clearTimeout(clickTimeId);
    //     // evt.stopPropagation();
    // });

    // document.onkeydown = function(event) {        //在全局中绑定按下事件
    //
    //     var e = event || window.e;
    //
    //     var keyCode = e.keyCode || e.which;
    //
    //     switch (keyCode) {
    //
    //         case 27:
    //
    //             // if (window.getComputedStyle(document.body).transform.charAt(7) != "1")
    //             //     $("body").zoomTo({targetsize: 0.2, duration: 600})
    //             document.getElementById('canvas').style.transform = "scale("+0.6+")";
    //             document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    //             isZoom = false;
    //             break;
    //
    //     }
    // }


    $("#minus_canvas").click(function (evt){
        console.log('click minus');
        newScale = scal - step;
        scal = newScale;
        instance.setZoom(scal);
        document.getElementById('canvas').style.transform = "scale("+newScale+")";

        w = $("#canvas").width()
        h = $("#canvas").height()
        // > 0
        sw = step * w / 10
        // > 0
        sh = step * h / 10
        var matrix = $container.find(".panzoom").panzoom("getMatrix");
        matrix[4] = (parseInt(matrix[4]) + parseInt(sw)).toString();
        matrix[5] = (parseInt(matrix[5]) + parseInt(sh)).toString();
        $container.find(".panzoom").panzoom("setMatrix",matrix);

    });

    $("#plus_canvas").click(function (evt){
        console.log('click plus')
        newScale = scal + step;
        scal = newScale;
        instance.setZoom(scal);
        document.getElementById('canvas').style.transform = "scale("+newScale+")";
        w = $("#canvas").width()
        h = $("#canvas").height()
        // > 0
        sw = step * w / 10
        // > 0
        sh = step * h / 10
        var matrix = $container.find(".panzoom").panzoom("getMatrix");
        matrix[4] = (parseInt(matrix[4]) - parseInt(sw)).toString();
        matrix[5] = (parseInt(matrix[5]) - parseInt(sh)).toString();
        $container.find(".panzoom").panzoom("setMatrix",matrix);


    });

}

function createNodes(rootData, rootPosition) {

    if (rootData == null) {
        return;
    }

    var can = $('#canvas');
    var relData = rootData.rel;
    var i = 0, relLen = relLength(relData);
    var rootTop = rootPosition[0];
    var rootLeft = rootPosition[1];

    var nextRootData = {};
    var nextRootPosition = [];
    var divStr = createDiv(rootData);
    //var nodeDivId = getNodeDivId(rootData);
    can.append(divStr);


    for (i = 0; i < relLen; i++) {
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
