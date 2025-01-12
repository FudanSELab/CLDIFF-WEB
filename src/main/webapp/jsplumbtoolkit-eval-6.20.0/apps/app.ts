import {
    ready,
    newInstance,
    AbsoluteLayout,
    BlankEndpoint, AnchorLocations,
    DEFAULT, EVENT_CANVAS_CLICK, EVENT_DBL_CLICK,
    StateMachineConnector,
    ActiveFilteringPlugin,
    PlainArrowOverlay,
    Port,
    EVENT_CLICK, Edge, SurfaceObjectInfo, LabelOverlay, MiniviewPlugin, Node,
    ControlsComponent, uuid,
    att
} from "@jsplumbtoolkit/browser-ui"

import { initialize } from './generate-templates'
import { Processor } from './process'

import {CANVAS_SIZE, ImageProcessorInput, ImageProcessorNode, ImageProcessorOutput} from "./definitions"
import {NativeImageDropHandler} from "./native-drop-handler"

import * as monaco from 'monaco-editor';



declare global {
    interface Window {
        map: Map<string, Node>;
    }
}


function stripTabs(input: string, stripChar:string): string {
    //     console.log( `\\u${stripChar.charCodeAt(0).toString(16).padStart(4, '0')}`);
    if(input.endsWith('\n')){
        input = input.substring(0,input.length-1)
    }
    let lines = input.split('\n');
    // Check if all lines start with a tab
    const allStartWithTab = (lines: string[]) => lines.every(line => line.startsWith(stripChar) || line === "");
  
    // Iteratively strip tabs if all lines start with tabs
    while (allStartWithTab(lines)) {
      lines = lines.map(line => line.startsWith(stripChar) ? line.slice(1) : line);
    }
    return lines.join('\n');
}
  
//   // Example usage
//   const input = "\t\tLine 1\n\t\tLine 2\n\tLine 3\n";
//   const result = stripTabs(input);
//   console.log(result);
  


// declare function editorFun(value:string,task:string): string;
///////// <ressssssference path="./node_modules/monaco-editor/monaco.d.ts" />
ready(() => {

    let model:any

    // Get a new Toolkit instance
    const toolkit = newInstance({
        beforeConnect:(source:Port, target:Port) => {
            return target.objectType === Port.objectType && source.objectType === Port.objectType && source.getParent().id !== target.getParent().id
        },
        portExtractor:(data) => {
            const t = model.nodeTypes[data.type]
            if (t == null) {
                return []
            } else {
                const p:Array<{id:string, label:string, type:string, defaultValue?:any, input?:boolean, output?:boolean}> = t.inputs.map((i:ImageProcessorInput) => Object.assign({}, i, {id:`in:${i.id}`, input:true}))
                p.push(...t.outputs.map((i:ImageProcessorOutput) => Object.assign({}, i, {id:`out:${i.id}`, output:true})))
                return p
            }
        }
    })

    model = initialize(toolkit)

    // Get the DOM element to render into
    const container = document.getElementById("container")
    const miniview = document.getElementById("miniview")
    

    const processor = new Processor(toolkit, model, () => {
        toolkit.eachNode((idx,dn) => {
          
           
        })
       
    }, () => {
        alert("ERROR " )
    })

    const view = {
        nodes:model.uiDefinitions,
        ports:{
            source:{
                isSource:true,
                maxConnections:1000,
                anchor:AnchorLocations.Right
            },
            target:{
                isTarget:true,
                maxConnections:1000,
                anchor:AnchorLocations.Left
            }
        },
        edges:{
            [DEFAULT]:{
                overlays:[
                    {
                        type:LabelOverlay.type,
                        options:{
                            label:"x",
                            cssClass:"jtk-imp-overlay-delete",
                            events:{
                                [EVENT_CLICK]:(p:{edge:Edge}) => {
                                    toolkit.removeEdge(p.edge)
                                }
                            }
                        }
                    },
                    {
                        type:PlainArrowOverlay.type,
                        options:{
                            location:1,
                            width:7,
                            length:7
                        }
                    }
                ],
                events:{
                    [EVENT_DBL_CLICK]:(p:{edge:Edge}) => toolkit.removeEdge(p.edge)
                },
                label:"{{label}}"
            }
        }
    }
    

    // Render to a Surface.
    const surface = toolkit.render(container, {
        layout:{
            type:AbsoluteLayout.type
        },
        plugins:[
            ActiveFilteringPlugin.type,
            {
                type:MiniviewPlugin.type,
                options:{
                    container:miniview,
                    typeFunction:(n:Node) => n.type.split(/\./)[0]
                }
            }
        ],
        defaults:{
            endpoint:{
                type:BlankEndpoint.type,
                options:{
                    cssClass:"jtk-imp-blank-ep"
                }
            },
            connector:StateMachineConnector.type
        },
        events:{
            [EVENT_CANVAS_CLICK]:() => {
                toolkit.clearSelection()
            }
        },
        // view,
        simpleEdgeStyles:true, 
        view,
        magnetize:{
            afterDrag:false,
        },
        consumeRightClick:false,
        modelEvents:[
          
        ],
        zoomToFit:true
    })


    /**
     * Attach a native image drop handler to the surface, targetting ".jtk-imp-basic-source canvas" -
     * that is, the canvas element of source nodes. When an image is dropped we
     * update the node - the processor will respond to the event and recalculate.
     */
    new NativeImageDropHandler<ImageProcessorNode, HTMLCanvasElement>({
        selector:".jtk-imp-basic-source canvas",
        hoverClass:"jtk-imp-drop-target",
        surface,
        imageDropped:(e:DragEvent, img:HTMLImageElement, el:HTMLCanvasElement, info:SurfaceObjectInfo<ImageProcessorNode>) => {
            // toolkit.update(info.obj, {
            //     image:img,
            //     width:img.naturalWidth,
            //     height:img.naturalHeight
            // })
        }
    })

    /**
     * Attach a native image drop handler to the surface's whitespace.
     * When a drop occurs on here we add a new node with that image in its data.
     * The processor will pick up the node added event and handle the new node.
     */
    new NativeImageDropHandler<ImageProcessorNode, HTMLElement>({
        hoverClass:"jtk-imp-drop-target",
        surface,
        imageDropped:(e:DragEvent, img:HTMLImageElement, el:HTMLElement, info:SurfaceObjectInfo<ImageProcessorNode>) => {

            
        }
    })

    new ControlsComponent(document.getElementById("controls"), surface)

    // new Palette(surface, model)

    // debugger

    

    const selectionHeader = document.getElementById("selectionHeader")
    const liElements = selectionHeader.querySelectorAll('li');
    liElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a') {
                const value = target.getAttribute('value');
                const filePath = value.replace('transformed_data','transformed_data4')
                const task = target.textContent;
                toolkit.clear();
                toolkit.load({
                    url: filePath,
                    onload:() => {
                        var nodes = toolkit.getNodes();
                        console.log(nodes);
                        const containers2 = document.querySelectorAll('.jtk-node');
                        // fetch(filePath).then((response) => response.json()).then((json: JsonData) => {
                        window.map = new Map<string, Node>();
                        nodes.forEach((node) => {
                            window.map.set(node.id, node);
                        });
                        

                        // json.edges.forEach((edge) => {
                            // 这里你可以按需处理边的信息，比如将边的 ID 作为键
                        // });
                        

                        // inspector click listener
                        containers2.forEach((container) => {
                            container.addEventListener("click", (event) => {
                                const ele = event.currentTarget as HTMLElement;
                                if(ele === container){
                                    // inspector
                                    console.log('event')
                                    const dataJtkVertex = ele.getAttribute('data-jtk-vertex');
                                    const code = window.map.get(dataJtkVertex).data.code;
                                    const inspector = document.getElementById("inspector")

                                    inspector.removeAttribute("data-keybinding-context");
                                    inspector.removeAttribute("data-mode-id");
                                    inspector.removeAttribute("style");
                                    inspector.innerHTML = ''

                                    const editor2 = monaco.editor.create(inspector as HTMLElement, {
                                        value: stripTabs(stripTabs(code,"\t")," "),
                                        language: 'java',
                                        autoIndent: 'advanced',
                                        scrollBeyondLastLine: false,
                                        minimap: { enabled: false },
                                        overviewRulerBorder: false,
                                        contextmenu: false, // or set another keyCode here
                                        wordWrap: 'on',
                                        fontSize: 14,
                                        accessibilitySupport: "off",
                                        domReadOnly: true

                                    });

                                }
                            });
                        });
                        // 初始化节点内部的editor

                        containers2.forEach((container) => {
                            const dataJtkVertex = container.getAttribute('data-jtk-vertex');
                            const code = window.map.get(dataJtkVertex).data.code;
                            const editorsEles = container.querySelectorAll('.editor')
                            const editorEle = editorsEles[0] as HTMLElement
                            const editor2 = monaco.editor.create(editorEle as HTMLElement, {
                                value: stripTabs(stripTabs(code,"\t")," "),
                                language: 'java',
                                autoIndent: 'advanced',
                                scrollBeyondLastLine: false,
                                minimap: { enabled: false },
                                overviewRulerBorder: false,
                                contextmenu: false, // or set another keyCode here,
                                wordWrap: 'on',
                                fontSize: 20,
                                accessibilitySupport: "off",
                                domReadOnly: true
                                
                            });
                            let debugPos = true;
                            // debugger position
                            if(debugPos){
                                const containerNew = container as HTMLElement
                                const onMouseDown = (event: MouseEvent) => {
                                    console.log(containerNew.style.left)
                                    console.log(containerNew.style.top)
                                    const legend = container.querySelectorAll('.legend')
                                    const legendEle = legend[0] as HTMLElement
                                    legendEle.textContent = containerNew.style.left + " : " + containerNew.style.top;

                                };
                                containerNew.addEventListener('mousedown', onMouseDown);
                            }
                            

                        });


                       
                        // banner
                        const myFileColorMap = new Map<string, string>();
                        const myFileNameNodeIdMap = new Map<string, number>();

                        nodes.forEach((node)=>{
                            var file_name = node.data.file_name.split("__CLDIFF__");
                            myFileColorMap.set(file_name[1], "");
                            myFileNameNodeIdMap.set(file_name[1], Number(node.data.id));
                        });
                        
                        const idAttributeMap = new Map<number, string>();
                        containers2.forEach((container) => {
                            var idd = container.getAttribute('data-jtk-vertex');
                            // var attributeName = container.children[0].getAttributeNames()[1]
                            var attributeName = container.getAttribute("class").split(' ')[0].replace('jtk-imp-','').replace('-','.')
                            idAttributeMap.set(Number(idd), attributeName);
                        })
                        myFileColorMap.forEach((value,key)=>{
                            var idd = myFileNameNodeIdMap.get(key);
                            var attri = idAttributeMap.get(idd);
                            console.log(attri)
                            switch (attri) {
                                case "basic.source":
                                  myFileColorMap.set(key,"#d7c9d0");
                                  break;
                                case "basic.display":
                                    myFileColorMap.set(key,"#c8c7c0");
                                    break;
                                case "filter.invert":
                                    myFileColorMap.set(key,"#8bafbc");
                                  break;
                                case "transform.overlay":
                                    myFileColorMap.set(key,"#dfdf86");
                                  break;
                                case "transform.crop":
                                    myFileColorMap.set(key,"#ddaf76");
                                  break;
                                case "input.number":
                                    myFileColorMap.set(key,"#a1c18a");
                                    break;
                                case "math":
                                    myFileColorMap.set(key,"#deaeb7");
                                    break;
                                default:
                                  console.log('Value is unknown');
                                  break;
                              }
                        })
                        const files = document.getElementById("files")
                        files.innerHTML = ''
                        var str = ""
                        myFileColorMap.forEach((value,key)=>{
                            var index =  key.lastIndexOf('/')
                            var className = key.substring(index+1,key.length)
                            var prefix = key.replace(className,'')
                            str = str + " <div class=\"banner\" style=\"background-color:"+value+"\"><span>"+className +'\n'+ prefix+ "</span></div>"
                        })
                        files.innerHTML = str
                    }
                })
            }
        });
    });

    
    toolkit.load({
        url:'./dataset.json',
        onload:() => {
            // toolkit.eachNode((idx,dn) => {
            //     // console.log(dn)
            // })
        }
    })
})
