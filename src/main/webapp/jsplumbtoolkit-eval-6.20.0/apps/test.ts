import * as monaco from 'monaco-editor';


const editor = document.getElementById('inspector');

const editor2 = monaco.editor.create(editor as HTMLElement, {
    value: "            if (ConsumeMessageConcurrentlyService.this.defaultMQPushConsumerImpl.hasHook()) {\n                consumeMessageContext.getProps().put(MixAll.CONSUME_CONTEXT_TYPE, returnType.name());\n            }\n",
    language: 'java'
    // autoIndent: 'advanced',
    // scrollBeyondLastLine: false,
    // minimap: { enabled: false },
    // overviewRulerBorder: false,
    // contextmenu: false, // or set another keyCode here
    // wordWrap: 'on',
    // fontSize: 20,
    // accessibilitySupport: "off",
    // domReadOnly: true

});
