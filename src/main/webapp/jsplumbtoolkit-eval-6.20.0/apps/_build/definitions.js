import { Node } from "@jsplumbtoolkit/browser-ui";
export const TYPE_DISPLAY = "display";
export const TYPE_SOURCE = "source";
export const ATTRIBUTE_WIDTH = "width";
export const ATTRIBUTE_HEIGHT = "height";
export const ATTRIBUTE_LABEL = "label";
// change node size here 
export const CANVAS_SIZE = { w: 400, h: 200 };
export class ImageProcessorNode extends Node {
    dirty;
    constructor(graph, data, idFunction) {
        console.log('aabbbb');
        super(graph, data, idFunction); // Call the parent class constructor
    }
}
