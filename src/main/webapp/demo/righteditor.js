function initRightEditor() {

    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
    require(['../node_modules/monaco-editor/dev/vs/editor/editor.main'], function() {
        var d = document.createElement(`div`);
        d.setAttribute("class", "test");
        document.getElementById("rightEditor").appendChild(d);
        var editor = monaco.editor.create(d, {
            value: [
                'public void method(){',
                '\tSystem.out.println(\"demo\");',
                '}'
            ].join('\n'),
            language: 'java',
            autoIndent: true,
            contentLeft: 0,
            automaticLayout: true,
            minimap: { enabled: false },
            overviewRulerBorder: false,
        });
    });
}