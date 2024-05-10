import { ready, newInstance, AbsoluteLayout, BlankEndpoint, AnchorLocations, DEFAULT, EVENT_CANVAS_CLICK, EVENT_DBL_CLICK, StateMachineConnector, ActiveFilteringPlugin, PlainArrowOverlay, Port, EVENT_CLICK, LabelOverlay, MiniviewPlugin, ControlsComponent, uuid } from "@jsplumbtoolkit/browser-ui";
import { initialize } from './generate-templates';
import { Processor } from './process';
// import {Palette } from './palette'
import { readImageFromFile } from '@jsplumb/canvas-image-processing';
import { ImageInspector } from "./inspector";
import { NativeImageDropHandler } from "./native-drop-handler";
// const editor  = require('./node_modules/monaco-editor')
// import {editor} from "."
// import {editor} from './node_modules/monaco-editor/dev/vs/editor/editor.main'
// require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
// import {editor} from './node_modules/monaco-editor'
// import * as helloworld from './editor';
import * as monaco from 'monaco-editor';
// declare function editorFun(value:string,task:string): string;
///////// <ressssssference path="./node_modules/monaco-editor/monaco.d.ts" />
ready(() => {
    let model;
    // Get a new Toolkit instance
    const toolkit = newInstance({
        beforeConnect: (source, target) => {
            return target.objectType === Port.objectType && source.objectType === Port.objectType && source.getParent().id !== target.getParent().id;
        },
        portExtractor: (data) => {
            const t = model.nodeTypes[data.type];
            if (t == null) {
                return [];
            }
            else {
                const p = t.inputs.map((i) => Object.assign({}, i, { id: `in:${i.id}`, input: true }));
                p.push(...t.outputs.map((i) => Object.assign({}, i, { id: `out:${i.id}`, output: true })));
                return p;
            }
        }
    });
    model = initialize(toolkit);
    // Get the DOM element to render into
    const container = document.getElementById("container");
    const miniview = document.getElementById("miniview");
    const processor = new Processor(toolkit, model, () => {
        toolkit.eachNode((idx, dn) => {
            // const el = surface.getRenderedElement(dn)
            // var canvas = el.querySelector("canvas")
            // console.log("canvas", canvas)
            // var monacoDiv = document.createElement(`div`);
            // monacoDiv.setAttribute("class", "node");
            // canvas.appendChild(monacoDiv);
            // const value = `function hello() {
            //     alert('Hello world!');
            // }`;
            // const myEditor = editor.create(monacoDiv, {
            //     value,
            //     language: "javascript",
            //     automaticLayout: true,
            // });
            // require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
            // require(['vs/editor/editor.main'], function() {
            //     var monacoDiv = document.createElement(`div`);
            //     monacoDiv.setAttribute("class", "node");
            //     canvas.appendChild(monacoDiv);
            //     var editor = monaco.editor.create(monacoDiv, {
            //         value: [
            //         'System.out.println("sss");'
            //     ].join('\n'),
            //     language: 'java',
            //     autoIndent: true,
            //     contentLeft: 0,
            //     automaticLayout: true,
            //     minimap: { enabled: false },
            //     overviewRulerBorder: false,
            //     });
            // });
        });
        // toolkit.filter(o => o.type === "basic.display").eachNode((idx,dn) => {
        //     const el = surface.getRenderedElement(dn),
        //         canvas = el.querySelector("canvas"),
        //         a = el.querySelector(".jtk-imp-download") as HTMLAnchorElement
        //     const hasImage = setCanvasImageFromImage(canvas, CANVAS_SIZE.w, CANVAS_SIZE.h,  dn.data["in:image"])
        //     el.setAttribute("data-has-image", "" + hasImage)
        //     if (hasImage) {
        //         a.href = imageToDataURL(dn.data["in:image"])
        //         a.download = `${dn.data.label}.png`
        //     } else {
        //         const ctx = canvas.getContext("2d")
        //         ctx.fillStyle = "white"
        //         ctx.fillRect(0, 0, canvas.width, canvas.height)
        //     }
        // })
        // toolkit.filter(o => o.type === "basic.source").eachNode((idx,dn) => {
        //     const canvas = surface.getRenderedElement(dn).querySelector("canvas")
        //     setCanvasImageFromImage(canvas, CANVAS_SIZE.w, CANVAS_SIZE.h, dn.data["out:image"])
        // })
    }, () => {
        alert("ERROR ");
    });
    const view = {
        nodes: model.uiDefinitions,
        ports: {
            source: {
                isSource: true,
                maxConnections: 1000,
                anchor: AnchorLocations.Right
            },
            target: {
                isTarget: true,
                maxConnections: 1000,
                anchor: AnchorLocations.Left
            }
        },
        edges: {
            [DEFAULT]: {
                overlays: [
                    {
                        type: LabelOverlay.type,
                        options: {
                            label: "x",
                            cssClass: "jtk-imp-overlay-delete",
                            events: {
                                [EVENT_CLICK]: (p) => {
                                    toolkit.removeEdge(p.edge);
                                }
                            }
                        }
                    },
                    {
                        type: PlainArrowOverlay.type,
                        options: {
                            location: 1,
                            width: 7,
                            length: 7
                        }
                    }
                ],
                events: {
                    [EVENT_DBL_CLICK]: (p) => toolkit.removeEdge(p.edge)
                }
            }
        }
    };
    // Render to a Surface.
    const surface = toolkit.render(container, {
        layout: {
            type: AbsoluteLayout.type
        },
        plugins: [
            ActiveFilteringPlugin.type,
            {
                type: MiniviewPlugin.type,
                options: {
                    container: miniview,
                    typeFunction: (n) => n.type.split(/\./)[0]
                }
            }
        ],
        defaults: {
            endpoint: {
                type: BlankEndpoint.type,
                options: {
                    cssClass: "jtk-imp-blank-ep"
                }
            },
            connector: StateMachineConnector.type
        },
        events: {
            [EVENT_CANVAS_CLICK]: () => {
                toolkit.clearSelection();
            }
        },
        view,
        magnetize: {
            afterDrag: true,
        },
        consumeRightClick: false,
        modelEvents: [
            {
                event: EVENT_CLICK,
                selector: ".jtk-imp-delete-node",
                callback: (e, el, info) => {
                    toolkit.removeNode(info.obj);
                }
            },
            {
                event: EVENT_CLICK,
                selector: ".jtk-imp-upload",
                callback: (e, el, info) => {
                    let input = document.createElement('input');
                    input.type = 'file';
                    input.onchange = _ => {
                        let files = Array.from(input.files);
                        if (files.length > 0 && files[0].type.match(/image.*/)) {
                            readImageFromFile(files[0]).then((img) => {
                                toolkit.update(info.obj, {
                                    image: img,
                                    width: img.naturalWidth,
                                    height: img.naturalHeight
                                });
                            });
                        }
                    };
                    input.click();
                }
            }
        ],
        zoomToFit: true
    });
    /**
     * Attach a native image drop handler to the surface, targetting ".jtk-imp-basic-source canvas" -
     * that is, the canvas element of source nodes. When an image is dropped we
     * update the node - the processor will respond to the event and recalculate.
     */
    new NativeImageDropHandler({
        selector: ".jtk-imp-basic-source canvas",
        hoverClass: "jtk-imp-drop-target",
        surface,
        imageDropped: (e, img, el, info) => {
            toolkit.update(info.obj, {
                image: img,
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        }
    });
    /**
     * Attach a native image drop handler to the surface's whitespace.
     * When a drop occurs on here we add a new node with that image in its data.
     * The processor will pick up the node added event and handle the new node.
     */
    new NativeImageDropHandler({
        hoverClass: "jtk-imp-drop-target",
        surface,
        imageDropped: (e, img, el, info) => {
            const evtLoc = surface.mapEventLocation(e);
            toolkit.addNode({
                type: "basic.source",
                label: "Source",
                id: uuid(),
                left: evtLoc.x,
                top: evtLoc.y,
                image: img,
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        }
    });
    new ImageInspector(document.getElementById("inspector"), surface, model);
    new ControlsComponent(document.getElementById("controls"), surface);
    // new Palette(surface, model)
    // debugger
    const selectionHeader = document.getElementById("selectionHeader");
    const liElements = selectionHeader.querySelectorAll('li');
    liElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            const target = event.target;
            if (target.tagName.toLowerCase() === 'a') {
                const value = target.getAttribute('value');
                const task = target.textContent;
                toolkit.clear();
                toolkit.load({
                    url: value,
                    onload: () => {
                        const containers2 = document.querySelectorAll('.editor');
                        const editor2 = monaco.editor.create(containers2[0], {
                            value: ['public static void main() {', '\tSystem.out.println("Hello world!");', '}'].join('\n'),
                            language: 'java',
                            autoIndent: 'advanced',
                            scrollBeyondLastLine: false,
                            minimap: { enabled: false },
                            overviewRulerBorder: false
                        });
                        // editorFun(value, task);
                        // toolkit.eachNode((idx,dn) => {
                        //     console.log(dn)
                        // })
                    }
                });
            }
        });
    });
    // toolkit.addEdge();
    toolkit.load({
        url: './dataset.json',
        onload: () => {
            // toolkit.filter(o => o.type === "basic.source").eachNode((idx,dn) => {
            toolkit.eachNode((idx, dn) => {
                console.log(dn);
            });
        }
    });
});
