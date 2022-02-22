
require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' }});

// monaco.js comment 89454-89497
require(['vs/editor/editor.main'], function() {

    var shapes = document.getElementsByClassName("shape");
    var editors = new Array();
    for(var i=0;i<shapes.length;i++){
        var item = shapes[i];
        var editor = monaco.editor.create(shapes[i], {
            value: [
                'public class Test{',
                '\tprivate String fieldaaasaasaaaaaaaaaaaaaaaaaaaaaazaazaaaaaaa;',
                '}'
            ].join('\n'),
            language: 'java',
            contextmenu: false,
            hover:{
                "enabled":false
            },
            minimap:{
                "enabled":false
            },
            hideCursorInOverviewRuler:true
        });
        editors.push(editor);
    }

});


jsPlumb.ready(function () {

    var instance = jsPlumb.getInstance({
        Connector: "StateMachine",
        PaintStyle: { strokeWidth: 3, stroke: "#ffa500", "dashstyle": "2 4" },
        Endpoint: [ "Dot", { radius: 5 } ],
        EndpointStyle: { fill: "#ffa500" },
        Container: "canvas"
    });

    var shapes = jsPlumb.getSelector(".shape");
    // make everything draggable
    instance.draggable(shapes);

    // suspend drawing and initialise.
    instance.batch(function () {

        // loop through them and connect each one to each other one.
        for (var i = 0; i < shapes.length; i++) {
            for (var j = i + 1; j < shapes.length; j++) {
                if(i==1 && j==2){
                    continue;
                }
                instance.connect({
                    source: shapes[i],  // just pass in the current node in the selector for source
                    target: shapes[j],
                    // here we supply a different anchor for source and for target, and we get the element's "data-shape"
                    // attribute to tell us what shape we should use, as well as, optionally, a rotation value.
                    anchors: [
                        [ "Continuous", { shape: shapes[i].getAttribute("data-shape"), rotation: shapes[i].getAttribute("data-rotation") }],
                        [ "Continuous", { shape: shapes[j].getAttribute("data-shape"), rotation: shapes[j].getAttribute("data-rotation") }]
                    ],
                    overlays:[
                        "Arrow",
                        [ "Label", { label:"foo", location:0.25, id:"myLabel" } ]
                    ]
                });
            }
        }
    });
    // jsPlumb.addGroup({
    //     el:$("test1"),
    //     id:"aGroup"
    // });
    //
    // jsPlumb.addToGroup("aGroup", $("#test2"));

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
});

function getAllFileFromServer(url,author,commitHash,parentCommitHash,projectName,fileName) {
    var mData = {};
    mData.author = author;
    mData.commit_hash = commitHash;
    mData.parent_commit_hash = parentCommitHash;
    mData.project_name = projectName;
    mData.file_name = fileName;
    $.post(url,mData, function(data) {
        console.log(data);
    },"json");
    return content;
}

function getMetaFileFromServer(url,commitURL) {
    var mData = {};
    mData.commit_url = commitURL;
    $.post(url,mData, function(data) {
        console.log(data)
    },"json");
}


function startGraph(){
    var commit = document.getElementById("commitUrl").value.trim();
    console.log(commit);
    if(commit==null || commit ==""){
        return;
    }
    getMetaFileFromServer("BCMetaServlet",commit);
    // var jsonDiff = getAllFileFromServer("BCGetFileServlet","a","b","c","d","e");
}