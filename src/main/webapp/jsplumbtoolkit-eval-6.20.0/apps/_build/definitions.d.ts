import { Node, Port } from "@jsplumbtoolkit/browser-ui";
import { Graph } from "@jsplumbtoolkit/browser-ui/types/core/model/graph";
import { IdFunction } from "@jsplumbtoolkit/browser-ui/types/core/model/graph";
export declare const TYPE_DISPLAY = "display";
export declare const TYPE_SOURCE = "source";
export declare const ATTRIBUTE_WIDTH = "width";
export declare const ATTRIBUTE_HEIGHT = "height";
export declare const ATTRIBUTE_LABEL = "label";
export declare const CANVAS_SIZE: {
    w: number;
    h: number;
};
export interface ImageProcessorInput {
    id: string;
    label: string;
    type: string;
    defaultValue?: any;
}
export interface ImageProcessorOutput {
    id: string;
    label: string;
    type: string;
    defaultValue?: any;
}
export interface ImageProcessorModel {
    nodeTypes: Record<string, {
        name: string;
        inputs: Array<ImageProcessorInput>;
        outputs: Array<ImageProcessorOutput>;
    }>;
}
export declare class ImageProcessorNode extends Node {
    dirty?: boolean;
    constructor(graph: Graph, data?: any, idFunction?: IdFunction);
}
export interface ImageProcessorPort extends Port {
    getParent: () => ImageProcessorNode;
}
export interface OperationSet {
    set: string;
    name: string;
    types: Array<ImageOperation>;
}
export type ComputeFunction = (node: Node) => any;
export interface ImageOperation {
    id: string;
    name: string;
    compute: ComputeFunction;
    inputs: Array<ImageProcessorInput>;
    outputs: Array<ImageProcessorOutput>;
}
