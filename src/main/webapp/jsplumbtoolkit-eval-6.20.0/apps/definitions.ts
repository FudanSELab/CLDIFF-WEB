import {Node, Port} from "@jsplumbtoolkit/browser-ui"
import {Graph} from "@jsplumbtoolkit/browser-ui/types/core/model/graph"
import {IdFunction} from "@jsplumbtoolkit/browser-ui/types/core/model/graph"

export const TYPE_DISPLAY = "display"
export const TYPE_SOURCE = "source"

export const ATTRIBUTE_WIDTH = "width"
export const ATTRIBUTE_HEIGHT = "height"
export const ATTRIBUTE_LABEL = "label"
// change node size here 
export const CANVAS_SIZE = {w:400, h:200}

export interface ImageProcessorInput {
    id:string, label:string, type:string, defaultValue?:any
}

export interface ImageProcessorOutput {
    id:string, label:string, type:string, defaultValue?:any
}

export interface ImageProcessorModel {
    nodeTypes:Record<string, {
        name:string,
        inputs:Array<ImageProcessorInput>,
        outputs:Array<ImageProcessorOutput>
    }>
}

export class ImageProcessorNode extends Node {
    dirty?:boolean;
    
    constructor(graph: Graph, data?: any, idFunction?: IdFunction) {
        console.log('aabbbb')
        super(graph, data, idFunction); // Call the parent class constructor
    }
}

export interface ImageProcessorPort extends Port {
    getParent:() => ImageProcessorNode
}

export interface OperationSet {
    set:string
    name:string
    types:Array<ImageOperation>
}

export type ComputeFunction = (node:Node) => any

export interface ImageOperation {
    id:string
    name:string
    compute: ComputeFunction
    inputs:Array<ImageProcessorInput>
    outputs:Array<ImageProcessorOutput>
}
