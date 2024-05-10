import { VanillaInspector, Surface, Node } from "@jsplumbtoolkit/browser-ui";
import { ImageProcessorModel } from "./definitions";
export declare class ImageInspector extends VanillaInspector {
    model: ImageProcessorModel;
    constructor(container: HTMLElement, surface: Surface, model: ImageProcessorModel);
    _renderNodeTemplate(obj: Node): string;
}
