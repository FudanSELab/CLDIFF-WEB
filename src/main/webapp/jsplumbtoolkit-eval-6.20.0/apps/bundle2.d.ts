declare module "model/filters" {
    import { Node } from "@jsplumbtoolkit/browser-ui";
    const filters: {
        set: string;
        name: string;
        types: ({
            id: string;
            name: string;
            inputs: ({
                id: string;
                label: string;
                type: string;
                defaultValue?: undefined;
            } | {
                id: string;
                label: string;
                type: string;
                defaultValue: number;
            })[];
            outputs: {
                id: string;
                label: string;
                type: string;
            }[];
            compute: (node: Node) => Promise<boolean>;
        } | {
            id: string;
            name: string;
            inputs: ({
                id: string;
                label: string;
                type: string;
                defaultValue?: undefined;
            } | {
                id: string;
                label: string;
                type: string;
                defaultValue: string;
            })[];
            outputs: {
                id: string;
                label: string;
                type: string;
            }[];
            compute: (node: Node) => Promise<boolean>;
        })[];
    };
    export const FILTER_INSPECTORS: Record<string, any>;
    export default filters;
}
declare module "definitions" {
    import { Node, Port } from "@jsplumbtoolkit/browser-ui";
    export const TYPE_DISPLAY = "display";
    export const TYPE_SOURCE = "source";
    export const ATTRIBUTE_WIDTH = "width";
    export const ATTRIBUTE_HEIGHT = "height";
    export const ATTRIBUTE_LABEL = "label";
    export const CANVAS_SIZE: {
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
    export interface ImageProcessorNode extends Node {
        dirty?: boolean;
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
}
declare module "model/transforms" {
    import { Node } from "@jsplumbtoolkit/browser-ui";
    export const TRANSFORM_MIRROR = "mirror";
    export const TRANSFORM_BLEND = "blend";
    export const TRANSFORM_CLIP = "clip";
    export const TRANSFORM_CROP = "crop";
    export const TRANSFORM_RESIZE = "resize";
    export const TRANSFORM_OVERLAY = "overlay";
    export const TRANSFORM_THRESHOLD = "threshold";
    const _default: {
        set: string;
        name: string;
        types: {
            id: string;
            name: string;
            inputs: ({
                id: string;
                label: string;
                type: string;
                defaultValue?: undefined;
            } | {
                id: string;
                label: string;
                type: string;
                defaultValue: number;
            })[];
            outputs: {
                id: string;
                label: string;
                type: string;
            }[];
            compute: (node: Node) => Promise<boolean>;
        }[];
    };
    export default _default;
    export const TRANSFORM_INSPECTORS: Record<string, any>;
}
declare module "model/math" {
    import { Node } from "@jsplumbtoolkit/browser-ui";
    const _default_1: {
        set: string;
        name: string;
        types: {
            id: string;
            name: string;
            inputs: {
                id: string;
                label: string;
                type: string;
            }[];
            outputs: {
                id: string;
                label: string;
                type: string;
            }[];
            compute: (node: Node) => Promise<boolean>;
        }[];
    };
    export default _default_1;
}
declare module "model/inputs" {
    import { OperationSet } from "definitions";
    export const INPUT_TYPES: OperationSet;
    export const INPUT_INSPECTORS: Record<string, any>;
}
declare module "model/basic" {
    import { Node } from "@jsplumbtoolkit/browser-ui";
    const _default_2: {
        set: string;
        name: string;
        types: {
            id: string;
            name: string;
            inputs: {
                id: string;
                label: string;
                type: string;
            }[];
            outputs: {
                id: string;
                label: string;
                type: string;
            }[];
            compute: (node: Node) => Promise<boolean>;
        }[];
    };
    export default _default_2;
    export const BASIC_INSPECTORS: Record<string, any>;
}
declare module "generate-templates" {
    import { JsPlumbToolkit, UINodeDefinition } from "@jsplumbtoolkit/browser-ui";
    import { ComputeFunction, ImageOperation } from "definitions";
    export function initialize(toolkit: JsPlumbToolkit): {
        uiDefinitions: Record<string, UINodeDefinition>;
        processors: Record<string, ComputeFunction>;
        nodeTypes: Record<string, ImageOperation>;
    };
}
declare module "process" {
    import { JsPlumbToolkit } from "@jsplumbtoolkit/browser-ui";
    /**
     * This is the processor for the image pipeline. It listens to various events on the Toolkit and either runs the whole
     * pipeline or just some node and its descendants, as necessary.
     */
    export class Processor {
        toolkit: JsPlumbToolkit;
        model: any;
        onComplete: (value: unknown) => unknown;
        onError: Function;
        _loading: boolean;
        constructor(toolkit: JsPlumbToolkit, model: any, onComplete: (value: unknown) => unknown, onError: Function);
        /**
         * Run the processor, and invoke the onComplete handler afterwards.
         * @param force
         */
        run(force?: boolean): Promise<void>;
        /**
         * For a given node, mark everything downstream for processing.
         * @param obj
         * @param touched
         * @private
         */
        private _clearDownstream;
        /**
         * Mark a node for processing: clear everything downstream, compute the node, and if a value was returned, propagate to children.
         * @param obj
         * @private
         */
        private _markDirty;
        /**
         * Run the processor.
         * @param force
         */
        private execute;
    }
}
declare module "palette" {
    import { Surface } from "@jsplumbtoolkit/browser-ui";
    import { ImageProcessorModel } from "definitions";
    /**
     * Manages drag/drop of new nodes. This class draws out the palette from the lists of filters, transforms, inputs and math ops, using
     * a `BrowserUiRecado` instance, which is the Toolkit's default template renderer.
     */
    export class Palette {
        constructor(surface: Surface, model: ImageProcessorModel);
    }
}
declare module "inspector" {
    import { VanillaInspector, Surface, Node } from "@jsplumbtoolkit/browser-ui";
    import { ImageProcessorModel } from "definitions";
    export class ImageInspector extends VanillaInspector {
        model: ImageProcessorModel;
        constructor(container: HTMLElement, surface: Surface, model: ImageProcessorModel);
        _renderNodeTemplate(obj: Node): string;
    }
}
declare module "native-drop-handler" {
    import { Surface, Edge, Node, Group, Port, Vertex, SurfaceObjectInfo, EventManager } from "@jsplumbtoolkit/browser-ui";
    export interface NativeDropHandlerOptions<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
        selector?: string;
        element?: Element;
        surface: Surface;
        hoverClass?: string;
        onDrop: (e: DragEvent, el: E, info?: SurfaceObjectInfo<T>) => any;
    }
    export class NativeDropHandler<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
        hoverClasses: Array<string>;
        private surface;
        eventManager: EventManager;
        constructor(options: NativeDropHandlerOptions<T, E>);
    }
    export interface NativeImageDropHandlerOptions<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
        imageDropped: (e: DragEvent, img: HTMLImageElement, targetElement: E, info?: SurfaceObjectInfo<T>) => any;
        selector?: string;
        surface: Surface;
        hoverClass?: string;
        element?: Element;
    }
    export class NativeImageDropHandler<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
        handler: NativeDropHandler<T, E>;
        eventManager: EventManager;
        constructor(options: NativeImageDropHandlerOptions<T, E>);
    }
}
declare module "app" { }
