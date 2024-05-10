function loadJson(file_name) {
    fetch(file_name)
        .then((response) => response.json())
        .then((json) => loadJson2(json));
}

function loadJson2(data) {
    diffJson = data;
    console.log(data);
    window['require'].config({
        paths: {
            vs: '../node_modules/monaco-editor/min/vs'
        }
    });

    containers2 = $('.editor');
    window['require'](['vs/editor/editor.main'], function() {
        console.log("Monaco Editor loaded successfully!");
        for (var i = 0; i < containers2.length; i++) {
            var editor = monaco.editor.create(containers2[i], {
                // value: ['public static void main() {', '\tSystem.out.println("Hello world!");', '}'].join('\n'),
                value: data['nodes'][0]['code'],
                language: 'java',
                autoIndent: true,
                contentLeft: 0,
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                overviewRulerBorder: false,
            });
        }

    });
}


function editorFun(value, task) {
    console.log("Hello from myFunction!");
    jsonFile = value.replace("transformed_data", "transformed_data2")
    console.log(jsonFile);
    loadJson(jsonFile);
}