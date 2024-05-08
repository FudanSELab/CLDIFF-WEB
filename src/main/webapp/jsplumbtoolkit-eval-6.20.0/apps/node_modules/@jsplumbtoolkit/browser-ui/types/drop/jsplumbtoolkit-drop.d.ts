/**
 * A utility for enabling drop of arbitrary elements onto the nodes/groups of a surface.
 */
/**
 * Defines a function used to filter drop on another vertex.
 * @public
 */
import { Edge, Group, Node, Vertex } from "../core/model/graph";
import { Grid, PointXY, Size } from "../ui-core/util/util";
import { Surface } from "../browser-ui/surface";
import { Collicat, Drag } from "../ui-core/browser-ui-renderer/collicat";
import { BrowserElement } from "../ui-core/browser-ui-renderer/index";
/**
 * Defines a function used to filter drop.
 */
export declare type DropFilter<T> = (data: T, target: Node | Group) => boolean;
/**
 * Defines a function used to filter drop on a canvas
 * @public
 */
export declare type CanvasDropFilter<T> = (data: T) => boolean;
/**
 * Defines a function used to filter drop on an edge.
 * @public
 */
export declare type EdgeDropFilter<T> = (data: T, target: Edge) => boolean;
/**
 * Defines the callback function invoked when an item is being dragged.
 * @public
 */
export declare type DragFunction<T> = (data: T, e: Event, position: PointXY, canvasLocation: PointXY) => any;
/**
 * Defines the function invoked when an item is dropped onto an existing vertex.
 * @public
 */
export declare type DropFunction<T> = (data: T, target: Node | Group, draggedElement?: BrowserElement, e?: Event, position?: PointXY, canvasLocation?: PointXY, targetLocation?: PointXY, locationOnTarget?: PointXY) => void;
/**
 * Defines the function invoked when an item is dropped on an edge.
 * @public
 */
export declare type EdgeDropFunction<T> = (data: T, target: Edge, draggedElement?: BrowserElement, e?: Event, position?: PointXY, canvasLocation?: PointXY) => void;
/**
 * Defines the function invoked when an item is dropped onto whitespace in the canvas.
 * @public
 */
export declare type CanvasDropFunction<T> = (data: T, canvasPosition: PointXY, draggedElement?: BrowserElement, e?: Event, position?: PointXY, elementSize?: Size) => void;
/**
 * Defines the function that is invoked to gather a dataset to associate with an item that is being dragged.
 * @public
 */
export declare type DataGeneratorFunction<T> = (el: BrowserElement) => T;
/**
 * Defines the function invoked to determine the type of some item that is about to be dragged.
 * @public
 */
export declare type TypeGeneratorFunction<T> = (d: T) => string;
/**
 * Defines the function that is invoked to determine whether an item that is about to be dragged represents a group.
 */
export declare type GroupIdentifierFunction<T> = (d: T, el: BrowserElement) => boolean;
/**
 * Options for the DropManager.
 * @public
 */
export interface DropManagerOptions<T> {
    /**
     * The Surface to attach to. Required.
     */
    surface: Surface;
    /**
     * The element that contains draggable elements.
     */
    source: Element;
    /**
     * A selector that identifies the draggable elements inside `source`.
     */
    selector: string;
    scope?: string;
    /**
     * By default, the DropManager will apply a `scale` transform to elements that are being dragged so that they appear
     * at the same size as the Surface they're being dragged to. Setting this flag to true will switch off that behaviour.
     */
    ignoreZoom?: boolean;
    onDrag?: DragFunction<T>;
    onDrop?: DropFunction<T>;
    onEdgeDrop?: EdgeDropFunction<T>;
    onCanvasDrop?: CanvasDropFunction<T>;
    dropFilter?: DropFilter<T>;
    canvasDropFilter?: CanvasDropFilter<T>;
    edgeDropFilter?: EdgeDropFilter<T>;
    dragActiveClass?: string;
    dragHoverClass?: string;
    dragElementClass?: string;
    dataGenerator: DataGeneratorFunction<T>;
    enabled?: boolean;
    canvasSelector?: string;
    elementGenerator?: (el: BrowserElement) => BrowserElement;
    /**
     * Optional dimensions to use for elements being dragged.
     * @public
     */
    dragSize?: Size;
    ignoreGrid?: boolean;
    /**
     * If true, the manager will ignore any element constrain function that may be set on the surface
     */
    ignoreConstrainFunction?: boolean;
}
/**
 * Offers a means to configure some element in the UI to act as a source for drag/drop of new nodes/groups. This is a concrete
 * class that can be used standalone, but note that it is extended by the `SurfaceDropManager`, and for the vast majority of
 * applications, `SurfaceDropManager` will be the class you want to use. The difference between the two classes is that
 * `DropManager` provides a means for you to respond to items being dropped onto a surface canvas, but it does not do
 * anything when such an event occurs other than inform you, via a set of callbacks, whereas the `SurfaceDropManager` provides
 * implementations of these callbacks that manipulate the canvas and the data model.
 * @public
 */
export declare class DropManager<T> {
    private surface;
    private surfaceCanvas;
    private readonly surfaceCanvasPlaceholder;
    readonly source: Element;
    readonly selector: string;
    dropFilter: DropFilter<T>;
    canvasDropFilter: CanvasDropFilter<T>;
    edgeDropFilter: EdgeDropFilter<T>;
    scope: string;
    dragSize: Size;
    onEdgeDrop: EdgeDropFunction<T>;
    onDrop: DropFunction<T>;
    onCanvasDrop: CanvasDropFunction<T>;
    dragActiveClass: string;
    dragHoverClass: string;
    dragElementClass: string;
    dataGenerator: DataGeneratorFunction<T>;
    onDrag: DragFunction<T>;
    canvasSelector: string;
    private readonly ignoreZoom;
    private readonly elementGenerator;
    private _generatedElement;
    private currentNodeList;
    private currentEdgeList;
    private candidateData;
    private candidate;
    private canvasMoveListener;
    private canvasMouseOutListener;
    private isCurrentlyOnCanvasElement;
    private canDropOnCanvas;
    private viewportPosition;
    private enabled;
    private _translateX;
    private _translateY;
    private readonly constrainFunction;
    private readonly ignoreConstrainFunction;
    ignoreGrid: boolean;
    grid: Grid;
    drag: Drag;
    dragManager: Collicat;
    private _active;
    constructor(params: DropManagerOptions<T>);
    /**
     * sets whether or not dragging is currently enabled.
     * @param e
     * @public
     */
    setEnabled(e: boolean): void;
    /**
     * Sets the current surface. Not for public use.
     * @param surface
     * @internal
     */
    setSurface(surface: Surface): void;
    /**
     *
     * @param e
     * @returns
     * @internal
     */
    isEffectivelyOnCanvas(e: Event): boolean;
    private getAllNodesAndGroups;
    private _adjustForTransformations;
    /**
     * Find all the connectors in the canvas, computing their position in page coords (taking into account the viewport
     * position of the surface and its current zoom). We return [ connection, connector, bounding rect ] for each connector.
     * @internal
     */
    private getAllConnectors;
    private _cleanupClasses;
}
/**
 * Options for the SurfaceDropManager.
 * @public
 */
export interface SurfaceDropManagerOptions<T> {
    /**
     * The surface to attach to.
     */
    surface: Surface;
    /**
     * The element containing things that will be dragged.
     */
    source: Element;
    /**
     * A CSS selector identifying children of `source` that are draggable
     */
    selector: string;
    /**
     * Optional function to generate an initial payload from an element that has started to be dragged.
     */
    dataGenerator?: DataGeneratorFunction<T>;
    /**
     * Optional function to determine the type of the data object being dragged from an element that has started to be dragged.
     */
    typeGenerator?: TypeGeneratorFunction<T>;
    /**
     * Optional function to use to determine if the element being dragged represents a group. If you do not provide this,
     * the default behaviour is to check for the presence of a `data-jtk-is-group` attribute on the element, with a value of `true`.
     */
    groupIdentifier?: GroupIdentifierFunction<T>;
    /**
     * By default, the SurfaceDropManager will apply a `scale` transform to elements that are being dragged so that they appear
     * at the same size as the Surface they're being dragged to. Setting this flag to true will switch off that behaviour.
     */
    ignoreZoom?: boolean;
    /**
     * If true, the surface will be instructed to magnetize after dropping a new element.
     */
    magnetize?: boolean;
    /**
     * Defaults to true. Allows items to be dropped onto edges in the canvas.
     */
    allowDropOnEdge?: boolean;
    /**
     * Defaults to true. Allows items to be dropped onto groups in the canvas.
     */
    allowDropOnGroup?: boolean;
    /**
     * Defaults to false. Allows items to be dropped onto nodes in the canvas. If this is true and an element is dropped onto a node, the
     * result is the same as if the element has been dropped onto whitespace.
     */
    allowDropOnNode?: boolean;
    /**
     * Defaults to true. Allows items to be dropped onto whitespace.
     */
    allowDropOnCanvas?: boolean;
    /**
     * Optional selector specifying what parts of the surface's canvas should be considered whitespace. If you're using a decorator,
     * for instance, you might want to add a selector for that decorator's elements so that items can be dropped onto them.
     */
    canvasSelector?: string;
    /**
     * Defaults to false. By default this class will conform to any grid in place in the surface to which it is attached when dragging items around.
     */
    ignoreGrid?: boolean;
    /**
     * Optional callback that will be invoked after a new vertex has been dropped and added to the dataset.
     * @param v
     */
    onVertexAdded?: (v: Vertex, dropTarget?: {
        pos: PointXY;
        vertex: Node | Group;
        size: Size;
    }) => any;
    /**
     * If true, the manager will ignore any element constrain function that may be set on the surface
     */
    ignoreConstrainFunction?: boolean;
    elementGenerator?: (el: BrowserElement) => BrowserElement;
    /**
     * Optional size to use for dragged elements.
     */
    dragSize?: Size;
    canvasDropFilter?: CanvasDropFilter<T>;
}
/**
 * when a new vertex was dropped onto an existing vertex, the onVertexAdded callback is passed an object of this type to describe the vertex onto which the new vertex was dropped.
 */
export declare type DropTargetInfo = {
    pos: PointXY;
    vertex: Node | Group;
    size: Size;
};
/**
 * SurfaceDropManager wraps DropManager with default implementations of the various callbacks. Most users will want to use this
 * class rather than DropManager, as it operates at a higher level.
 * @public
 */
export declare class SurfaceDropManager<T> {
    private surface;
    readonly dropManager: DropManager<T>;
    private toolkit;
    private readonly typeGenerator;
    private readonly groupIdentifier;
    private modelPositionAttributes;
    private readonly magnetize;
    private readonly ignoreZoom;
    private readonly ignoreGrid;
    private readonly grid;
    private readonly allowDropOnEdge;
    private readonly allowDropOnGroup;
    private readonly allowDropOnCanvas;
    private readonly allowDropOnNode;
    private readonly constrainFunction;
    private readonly ignoreConstrainFunction;
    private dragSize;
    private onVertexAdded;
    private _mapToPositionAttributes;
    private addNewVertexToCanvas;
    constructor(options: SurfaceDropManagerOptions<T>);
    /**
     * Sets whether or not dragging is currently enabled.
     * @public
     */
    setEnabled(e: boolean): void;
    /**
     *
     * @param s
     * @internal
     */
    setSurface(s: Surface): void;
}
