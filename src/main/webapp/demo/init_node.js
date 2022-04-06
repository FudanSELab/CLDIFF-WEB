
function initNode(ele,data,i){
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



function initEdge(){

}

function initRightEditor(){


    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' }});

    require(['vs/editor/editor.main'], function() {
        var d=document.createElement(`div`);
        d.setAttribute("class","node");
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

function addZoom(){
    $(".jtk-node").dblclick(function(evt) {
        if (window.getComputedStyle(document.body).transform.charAt(7) === "1" || ((window.getComputedStyle(document.body).transformOrigin =="0px 0px"))) {
            $(this).zoomTo({targetsize:0.2, duration:600,});

        }
        else{
            $("body").zoomTo({targetsize: 0.2, duration: 600});
        }
        clearTimeout(clickTimeId);
        evt.stopPropagation();
    });

    document.onkeydown = function(event) {        //在全局中绑定按下事件

        var e = event || window.e;

        var keyCode = e.keyCode || e.which;

        switch (keyCode) {

            case 27:

                if (window.getComputedStyle(document.body).transform.charAt(7) != "1")
                    $("body").zoomTo({targetsize: 0.2, duration: 600})

                break;

        }
    }
}

window.onload=function(){
   // $("#canvas").empty();
    initRightEditor();
    test1();
    calljsplumb();

    document.getElementById('canvas').style.transform = "scale("+0.3+")";
    document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";
    // $(".window").draggable({
    //     start: function(e){
    //         var pz = $container.find(".panzoom");
    //         currentScale = pz.panzoom("getMatrix")[0];
    //         $(this).css("cursor","move");
    //         pz.panzoom("disable");
    //     },
    //     drag:function(e,ui){
    //         ui.position.left = ui.position.left/scal;
    //         ui.position.top = ui.position.top/scal;
    //         if($(this).hasClass("jsplumb-connected"))
    //         {
    //             instance.repaint($(this).attr('id'),ui.position);
    //             $(e.target).css("cursor","move");
    //         }
    //     },
    //     stop: function(e,ui){
    //         var nodeId = $(this).attr('id');
    //         if($(this).hasClass("jsplumb-connected"))
    //         {
    //             instance.repaint(nodeId,ui.position);
    //         }
    //         $(this).css("cursor","");
    //         $container.find(".panzoom").panzoom("enable");
    //     }
    // });

      addZoom();



}