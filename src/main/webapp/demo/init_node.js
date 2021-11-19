
function initNode(ele,data,i){
    var colors = ["#F44336","#FFCDD2","#64B5F6","#66BB6A","#FFD54F","#B0BEC5","#0097A7","#757575"];
    var c = document.createElement(`div`);
    document.getElementById(ele.id).appendChild(c);
    c.setAttribute("class","title")
    c.innerText = data.file_name.substring(data.file_name.lastIndexOf("/")+1);
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
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript',
            autoIndent:true,
            contentLeft:0,
            automaticLayout:true,
        });
    });
}

window.onload=function(){
    initRightEditor();
    test();
    calljsplumb();
    document.getElementById('canvas').style.transform = "scale(0.15)";
    document.getElementById('canvas').style.transformOrigin = "" +0+ "px" + " " + "" + 0+ "px";

}