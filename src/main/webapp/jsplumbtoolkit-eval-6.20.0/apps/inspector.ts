
import { VanillaInspector, Surface, isNode, Base, Node } from "@jsplumbtoolkit/browser-ui"
import {ImageProcessorModel} from "./definitions"

import { INPUT_INSPECTORS } from "./model/inputs"
import { FILTER_INSPECTORS } from './model/filters'
import { TRANSFORM_INSPECTORS } from './model/transforms'
import { BASIC_INSPECTORS } from './model/basic'
import * as monaco from 'monaco-editor';

const handlers:Record<string, Record<string, {template:(n:Node) => string}>> = {
    input:INPUT_INSPECTORS,
    filter:FILTER_INSPECTORS,
    transform:TRANSFORM_INSPECTORS,
    basic:BASIC_INSPECTORS
}

export class ImageInspector extends VanillaInspector {

    model:ImageProcessorModel

    constructor(container:HTMLElement, surface:Surface, model:ImageProcessorModel) {
        super({
            container,
            surface,
            templateResolver:(obj:Base) => {
                if (isNode(obj)) {
                    this._renderNodeTemplate(obj,container)
                    // return this._renderNodeTemplate(obj)
                }

                return ''
            },
            cacheTemplates:false,
            renderEmptyContainer:() => `<h1>SELECT SOMETHING INNIT</h1>`,
            refresh:(obj:Base, cb:()=> any)=>null
        })

        this.model = model
    }

    _renderNodeTemplate(obj:Node,container:HTMLElement):string {
        console.log(obj.data.id)
        const code = window.map.get(obj.data.id).code;
        console.log(container)
        console.log(code)
        const editor2 = monaco.editor.create(container as HTMLElement, {
            value: code,
            language: 'java',
            autoIndent: 'advanced',
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            overviewRulerBorder: false
        });
        console.log('render node template')
        // entrance for right bar
        // console.log(obj)
        const [set, type] = obj.type.split(".")
        try {
            // console.log(handlers[set][type].template(obj))
            // return handlers[set][type].template(obj)
            return `<div/>`
        } catch (e) {
            return `<div/>`
        }

    }
}
