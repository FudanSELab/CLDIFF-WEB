function initRightEditor() {


    $("#tree").fancytree({
        source: [

            {
                title: "Class A",
                key: "2",
                folder: true,
                children: [
                    { title: "Method a1", key: "3" },
                    { title: "Method a2", key: "4" }
                ]
            },
            {
                title: "Class B",
                key: "2",
                folder: true,
                children: [
                    { title: "Method b1", key: "3" },
                    { title: "Method b2", key: "4" }
                ]
            }
        ]
    });

    require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
    require(['../node_modules/monaco-editor/dev/vs/editor/editor.main'], function() {
        var d = document.createElement(`div`);
        d.setAttribute("class", "test");
        document.getElementById("rightEditor").appendChild(d);
        var editor = monaco.editor.create(d, {
            value: [
                'public void demo(){',
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