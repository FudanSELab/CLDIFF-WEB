"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_ui_1 = require("@jsplumbtoolkit/browser-ui");
var generate_templates_1 = require("./generate-templates");
var process_1 = require("./process");
// import {Palette } from './palette'
var canvas_image_processing_1 = require("@jsplumb/canvas-image-processing");
var inspector_1 = require("./inspector");
var native_drop_handler_1 = require("./native-drop-handler");
// const editor  = require('./node_modules/monaco-editor')
// import {editor} from "."
// import {editor} from './node_modules/monaco-editor/dev/vs/editor/editor.main'
// require.config({ paths: { 'vs': '../node_modules/monaco-editor/dev/vs' } });
// import {editor} from './node_modules/monaco-editor'
(0, browser_ui_1.ready)(function () {
    var _a, _b, _c, _d;
    var model;
    // Get a new Toolkit instance
    var toolkit = (0, browser_ui_1.newInstance)({
        beforeConnect: function (source, target) {
            return target.objectType === browser_ui_1.Port.objectType && source.objectType === browser_ui_1.Port.objectType && source.getParent().id !== target.getParent().id;
        },
        portExtractor: function (data) {
            var t = model.nodeTypes[data.type];
            if (t == null) {
                return [];
            }
            else {
                var p = t.inputs.map(function (i) { return Object.assign({}, i, { id: "in:".concat(i.id), input: true }); });
                p.push.apply(p, t.outputs.map(function (i) { return Object.assign({}, i, { id: "out:".concat(i.id), output: true }); }));
                return p;
            }
        }
    });
    model = (0, generate_templates_1.initialize)(toolkit);
    // Get the DOM element to render into
    var container = document.getElementById("container");
    var miniview = document.getElementById("miniview");
    var processor = new process_1.Processor(toolkit, model, function () {
        toolkit.eachNode(function (idx, dn) {
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
    }, function () {
        alert("ERROR ");
    });
    var view = {
        nodes: model.uiDefinitions,
        ports: {
            source: {
                isSource: true,
                maxConnections: 1000,
                anchor: browser_ui_1.AnchorLocations.Right
            },
            target: {
                isTarget: true,
                maxConnections: 1000,
                anchor: browser_ui_1.AnchorLocations.Left
            }
        },
        edges: (_a = {},
            _a[browser_ui_1.DEFAULT] = {
                overlays: [
                    {
                        type: browser_ui_1.LabelOverlay.type,
                        options: {
                            label: "x",
                            cssClass: "jtk-imp-overlay-delete",
                            events: (_b = {},
                                _b[browser_ui_1.EVENT_CLICK] = function (p) {
                                    toolkit.removeEdge(p.edge);
                                },
                                _b)
                        }
                    },
                    {
                        type: browser_ui_1.PlainArrowOverlay.type,
                        options: {
                            location: 1,
                            width: 7,
                            length: 7
                        }
                    }
                ],
                events: (_c = {},
                    _c[browser_ui_1.EVENT_DBL_CLICK] = function (p) { return toolkit.removeEdge(p.edge); },
                    _c)
            },
            _a)
    };
    // Render to a Surface.
    var surface = toolkit.render(container, {
        layout: {
            type: browser_ui_1.AbsoluteLayout.type
        },
        plugins: [
            browser_ui_1.ActiveFilteringPlugin.type,
            {
                type: browser_ui_1.MiniviewPlugin.type,
                options: {
                    container: miniview,
                    typeFunction: function (n) { return n.type.split(/\./)[0]; }
                }
            }
        ],
        defaults: {
            endpoint: {
                type: browser_ui_1.BlankEndpoint.type,
                options: {
                    cssClass: "jtk-imp-blank-ep"
                }
            },
            connector: browser_ui_1.StateMachineConnector.type
        },
        events: (_d = {},
            _d[browser_ui_1.EVENT_CANVAS_CLICK] = function () {
                toolkit.clearSelection();
            },
            _d),
        view: view,
        magnetize: {
            afterDrag: true,
        },
        consumeRightClick: false,
        modelEvents: [
            {
                event: browser_ui_1.EVENT_CLICK,
                selector: ".jtk-imp-delete-node",
                callback: function (e, el, info) {
                    toolkit.removeNode(info.obj);
                }
            },
            {
                event: browser_ui_1.EVENT_CLICK,
                selector: ".jtk-imp-upload",
                callback: function (e, el, info) {
                    var input = document.createElement('input');
                    input.type = 'file';
                    input.onchange = function (_) {
                        var files = Array.from(input.files);
                        if (files.length > 0 && files[0].type.match(/image.*/)) {
                            (0, canvas_image_processing_1.readImageFromFile)(files[0]).then(function (img) {
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
    new native_drop_handler_1.NativeImageDropHandler({
        selector: ".jtk-imp-basic-source canvas",
        hoverClass: "jtk-imp-drop-target",
        surface: surface,
        imageDropped: function (e, img, el, info) {
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
    new native_drop_handler_1.NativeImageDropHandler({
        hoverClass: "jtk-imp-drop-target",
        surface: surface,
        imageDropped: function (e, img, el, info) {
            var evtLoc = surface.mapEventLocation(e);
            toolkit.addNode({
                type: "basic.source",
                label: "Source",
                id: (0, browser_ui_1.uuid)(),
                left: evtLoc.x,
                top: evtLoc.y,
                image: img,
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        }
    });
    new inspector_1.ImageInspector(document.getElementById("inspector"), surface, model);
    new browser_ui_1.ControlsComponent(document.getElementById("controls"), surface);
    // new Palette(surface, model)
    // debugger
    var selectionHeader = document.getElementById("selectionHeader");
    var liElements = selectionHeader.querySelectorAll('li');
    liElements.forEach(function (element) {
        element.addEventListener("click", function (event) {
            var target = event.target;
            if (target.tagName.toLowerCase() === 'a') {
                var value = target.getAttribute('value');
                var task = target.textContent;
                toolkit.clear();
                toolkit.load({
                    url: value,
                    onload: function () {
                        toolkit.eachNode(function (idx, dn) {
                            console.log(dn);
                        });
                    }
                });
            }
        });
    });
    toolkit.load({
        url: './dataset.json',
        onload: function () {
            // toolkit.filter(o => o.type === "basic.source").eachNode((idx,dn) => {
            toolkit.eachNode(function (idx, dn) {
                console.log(dn);
            });
        }
    });
});
