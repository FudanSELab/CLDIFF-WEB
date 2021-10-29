

function initNode(){

    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow1\"><strong>1</strong><br/><br/></div>")
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow2\"><strong>2</strong><br/><br/></div>")
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow3\"><strong>3</strong><br/><br/></div>")
    $("#canvas").append("<div class=\"window jtk-node\" id=\"flowchartWindow4\"></div>")

    // $("#canvas").append("<div class='container' ></div>")
    //
    // $("#sd").css(
    //     {
    //         "color":"white",
    //         "background-color":"#98bf21",
    //         "font-family":"Arial",
    //         "font-size":"20px",
    //         "padding":"5px",
    //         "text-align": "center",
    // "height": "30px",
    //         "justify-content": "center",
    //  "align-items": "center",
    //  "cursor": "pointer",
    //     })

}



function initEdge(){


}

function initRightEditor(){

    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' }});

    require(['vs/editor/editor.main'], function() {
        var editor = monaco.editor.create(document.getElementById( "flowchartWindow4"), {
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
    initNode();
    initEdge();
    initRightEditor();
    calljsplumb();
}