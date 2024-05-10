import { Surface, Edge, Node, Group, Port, Vertex, SurfaceObjectInfo, EventManager } from "@jsplumbtoolkit/browser-ui";
export interface NativeDropHandlerOptions<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
    selector?: string;
    element?: Element;
    surface: Surface;
    hoverClass?: string;
    onDrop: (e: DragEvent, el: E, info?: SurfaceObjectInfo<T>) => any;
}
export declare class NativeDropHandler<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
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
export declare class NativeImageDropHandler<T = Edge | Node | Group | Port | Vertex, E extends Element = Element> {
    handler: NativeDropHandler<T, E>;
    eventManager: EventManager;
    constructor(options: NativeImageDropHandlerOptions<T, E>);
}
