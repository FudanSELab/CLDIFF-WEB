import { AbstractLayoutAdapter } from "./abstract-layout-adapter";
import { Node, Group, Vertex } from "../model/graph";
import { JsPlumbToolkit } from "../toolkit";
import { Magnetizer, MagnetizerRunOptions } from "../magnetizer";
import { Extents, Grid, PointXY, Size } from "../../ui-core/util/util";
import { DataSource } from "../datasource";
/**
 * @internal
 */
export interface InternalLayoutOptions<LP extends LayoutParameters> {
    adapter: AbstractLayoutAdapter<any>;
    toolkit: JsPlumbToolkit;
    container: any;
    options: LP;
}
/**
 * Defines a function that, given some vertex, can provide the x/y location of the vertex on the canvas. During a group layout, the second
 * argument will contain the group that is being laid out, but when running the layout for the main canvas, `parentGroup` will not be provided.
 * @public
 */
export declare type LocationFunction = (n: Vertex, parentGroup?: Group) => PointXY;
/**
 * Base interface for layout parameters. All layout parameter interfaces extend this.
 * @public
 */
export interface LayoutParameters extends Record<string, any> {
    /**
     * Optional function that, given some vertex, can provide the x/y location of the vertex on the canvas
     */
    locationFunction?: LocationFunction;
    /**
     * Optional padding to put around the elements.
     */
    padding?: PointXY;
    /**
     * Optional fixed width for the layout.
     */
    width?: number;
    /**
     * Optional fixed height for the layout.
     */
    height?: number;
}
declare type LayoutEntry = {
    id: string;
    size: Size;
    position: PointXY;
    xmax: number;
    ymax: number;
    xmin: number;
    ymin: number;
};
/**
 * Base class for all layouts.
 * @public
 */
export declare abstract class AbstractLayout<P extends LayoutParameters> {
    /**
     * @internal
     */
    toolkit: JsPlumbToolkit;
    /**
     * @internal
     */
    adapter: AbstractLayoutAdapter<any>;
    /**
     * @internal
     */
    _vertices: Array<Node | Group>;
    /**
     * @internal
     */
    magnetizer: Magnetizer<string>;
    /**
     * @internal
     */
    magnetizerIterations: number;
    protected positions: Map<string, PointXY>;
    protected sizes: Map<string, Size>;
    protected positionArray: Array<any>;
    /** @internal */
    parameters: P;
    protected done: boolean;
    /** @internal */
    _minx: number;
    /** @internal */
    _miny: number;
    /** @internal */
    _maxx: number;
    /** @internal */
    _maxy: number;
    /** @internal */
    entries: Record<string, LayoutEntry>;
    /** @internal */
    xmax: Array<any>;
    /** @internal */
    ymax: Array<any>;
    /** @internal */
    xmin: Array<any>;
    /** @internal */
    ymin: Array<any>;
    /** @internal */
    width: number;
    /** @internal */
    height: number;
    /** @internal */
    container: any;
    /** @internal */
    containerSize: Size;
    /** @internal */
    padding: PointXY;
    /** @internal */
    xShift: number;
    /** @internal */
    yShift: number;
    protected _locationFunction: LocationFunction;
    /** @internal */
    _vertexMap: Record<string, Node | Group>;
    abstract defaultMagnetized: boolean;
    abstract canMagnetize(id: string): boolean;
    abstract getDefaultParameters(): LayoutParameters;
    abstract type: string;
    protected constructor(params: InternalLayoutOptions<P>);
    abstract reset(): void;
    /**
     * @internal
     * */
    _reset(): void;
    /**
     * Subclasses that use `defaultMagnetized` may wish to override this to filter out candidates for the magnetizer.
     * @param id
     * @internal
     */
    protected _magnetizerFilter(id: string): boolean;
    private static _defaultParameters;
    private _$_prepareParameters;
    private _$_getEntry;
    private _cleanupEntry;
    /**
     * @internal
     * @private
     */
    _$_calculateExtents(): void;
    /**
     * Uses the magnetizer to snap either all the elements in the layout, or a single element, to a grid.
     * @param grid - Definition of the grid to snap to.
     * @param elementId - If provided, only this element will be snapped to the grid.
     * @internal
     */
    snapToGrid(grid: Grid, elementId?: string): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Run the magnetizer.
     * @param params - Options for the magnetizer.
     * @param internal - whether or not the magnetize call was made by the layout itself.
     * @internal
     */
    magnetize(params: {
        options?: MagnetizerRunOptions<any>;
        origin?: PointXY;
        focus?: string;
    }, internal: boolean): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Called by components to inform a layout that a new Node was added. You should never
     * call this method directly. Also, you should not override this method in a custom layout: if your layout
     * needs to track Node addition, implement `_nodeAdded` instead.
     *
     * This method is only ever called after a layout has been run and some change has been made to the data model. When the layout is run again,
     * the layout's list of vertices is completely refreshed.
     * @param params - Method args
     * @param params.vertex - Vertex that was added
     * @param params.el - The DOM element associated with the vertex.
     * @param eventInfo - Optional information associated with the Event that the host system needs to pass through without adding to the data model.
     * @internal
     */
    vertexAdded(params?: {
        id?: string;
        el: any;
        pos?: PointXY;
        vertex: Node | Group;
    }, eventInfo?: {
        position?: PointXY;
    }): PointXY;
    /**
     * Called by components to inform a layout that a given vertex was removed. You should never
     * call this method directly.
     * @param vertex - Vertex that was removed
     * @internal
     */
    vertexRemoved(vertex: Vertex, doNotCalculateExtents: boolean): void;
    /**
     * Gets the size of the vertex with the given id, retrieving from the viewport and caching it for later use if not
     * found locally. It is cached only for the duration of one run of the layout.
     * @param id - ID of the vertex whose size to retrieve
     * @returns Width and height of vertex
     * @internal
     */
    _getSize(id: string): Size;
    private _getPosition;
    /**
     * Update internal position information for the vertex with the given id.
     * @param id
     * @param x
     * @param y
     * @internal
     */
    private _doSetPosition;
    /**
     * Internal method that is used to notify interested subclasses, via the `_vertexMoved`
     * method, that some vertex has been moved.
     * @param id
     * @param x
     * @param y
     * @internal
     */
    private _$_doUpdateAfterMove;
    /**
     * Subclasses can override this method to take action when a vertex is reported as having been moved. For internal use only. Not part of the public API.
     * @param id
     * @param x
     * @param y
     * @internal
     */
    protected _vertexMoved(id: string, x: number, y: number): void;
    /**
     * Subclasses can override this method to take action when a vertex is reported as having been added. For internal use only. Not part of the public API.
     * @param params
     * @param eventInfo
     * @internal
     */
    protected _vertexAdded(params: {
        el: any;
        pos?: PointXY;
        vertex: Vertex;
        parameters?: any;
    }, eventInfo: any): PointXY;
    /**
     * Subclasses can override this method to take action when a vertex is reported as having been removed. For internal use only. Not part of the public API.
     * @param v
     * @internal
     */
    protected _vertexRemoved(v: Vertex): void;
    /**
     * Sets the position of the given element, and then runs the magnetizer. By default, the element whose position was just
     * set will retain its position and everything else will move around it. If `dontMoveFocusVertex` is set, it will be the
     * element that was just dragged that will be repositioned.
     *
     * This method is not something that users of the API should call. It is called by the Surface.
     *
     * @param id Vertex that should be moved
     * @param x X position to move to
     * @param y Y position to move to
     * @param dontMoveFocusVertex If true, the vertex being moved stays where it was placed and other vertices move. Otherwise the repositioned vertex can move.
     * @internal
     */
    setMagnetizedPosition(id: string, x: number, y: number, dontMoveFocusVertex: boolean, grid: Grid): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Sets the Position of the vertex with the given ID.
     * @param id ID of the vertex to set the position for.
     * @param pos X/y location for the vertex.
     * @internal
     */
    _setPosition(id: string, pos: PointXY): void;
    protected _getRandomPosition(id: string, w?: number, h?: number, doNotCalculateExtents?: boolean): PointXY;
    /** @internal */
    dumpPos(): void;
    private _$_initialiseMagnetizer;
    /**
     * Sets the position of the node/group with the given id, and, by default, recalculates the extents.
     * @param id ID of the node/group to move
     * @param x Left position
     * @param y Top position.
     * @param doNotCalculateExtents If true, do not recalculate the layout extents. we use this during a layout run, as
     * we dont need to calculate the extents until it is finished. But for a single setPosition call, we do want to recalculate extents.
     * @internal
     */
    setPosition(id: string, x: number, y: number, doNotCalculateExtents?: boolean): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Gets the current positions held by the layout.
     * @internal
     */
    getPositions(): Map<string, PointXY>;
    /**
     * Get the current position for the vertex with the given ID.
     * @param id
     * @internal
     */
    getPosition(id: string): PointXY;
    /**
     * Gets the layout's extents.
     * @internal
     */
    _getExtents(): Extents;
    /**
     * Sets what the layout considers to be the size of the node with the given id. This method is not
     * generally necessary if you use the `layout` methods on the surface widget.
     * @param id ID of the Node to set the size for.
     * @param s Size of the node.
     * @internal
     */
    setSize(id: string, s: Size): void;
    /** @internal */
    getSizes(): Map<string, Size>;
    private _$_updateEntry;
    /**
     * This is an abstract function that subclasses may implement if they wish. It will be called at the beginning of a layout.
     * @param toolkit The associated jsPlumbToolkit instance
     * @param parameters Parameters configured for the layout.
     * @internal
     */
    abstract begin(toolkit: DataSource, parameters: P): void;
    /**
     * This is an abstract function that subclasses may implement if they wish. It will be called at the end of a layout.
     * @param toolkit The associated jsPlumbToolkit instance
     * @param parameters Parameters configured for the layout.
     * @internal
     */
    abstract end(toolkit: DataSource, parameters: P, wasMagnetized: boolean): void;
    /**
     * Step through the layout. For some layouts there is only a single step, but others continue stepping until some
     * condition is met. Once the condition is met, the subclass must set `this.done = true`, or the layout will
     * continue looping indefinitely.
     * @param toolkit
     * @param parameters
     * @internal
     */
    abstract step(toolkit: DataSource, parameters: P): void;
    /**
     * private method to run the layout.
     */
    private _layout;
    /**
     * Runs the layout, first doing a reset of element positions. Next, if the subclass has defined a `begin` method, that will
     * be called first.  Then, the subclass's `step` method will be called repeatedly, until the subclass makes a call to `_super.setDone`.
     * Use the `layout` method to run the layout incrementally without first resetting everything.
     * @param newParameters  Optional new set of parameters to apply.
     * @param onComplete Optional function to call on completion of relayout.
     * @param magnetizeAfterLayout Defaults to false. If true, the magnetizer will be run after the layout has completed.
     * @internal
     */
    relayout(newParameters: P, onComplete: LayoutResultsFunction, magnetizeAfterLayout: boolean): void;
    /**
     * Runs the layout, without resetting calculated or user-provided positions beforehand.
     * If the subclass has defined a `begin` method, that will be called first.  Then, the subclass's
     * `step` method will be called repeatedly, until the subclass makes a call to `_super.setDone`.
     * @internal
     */
    layout(onComplete: LayoutResultsFunction, magnetizeAfterLayout: boolean): void;
}
/**
 * Defines the signature of the callback method that a layout will hit after it has run. The layout passes back the position of every element,
 * the bounds of the layout (min/max in each axis), and the size of every element.
 * @internal
 */
declare type LayoutResultsFunction = (result: {
    positions: Map<string, PointXY>;
    bounds: Extents;
    sizes: Map<string, Size>;
}) => any;
export {};
