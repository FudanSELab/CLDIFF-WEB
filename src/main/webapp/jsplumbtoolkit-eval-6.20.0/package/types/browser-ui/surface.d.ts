import { Decorator } from "./decorators";
import { ViewportBounds } from './pan-zoom';
import { PanZoom } from "./pan-zoom";
import { ZoomRange } from './pan-zoom-options';
import { SurfacePlugin, SurfacePluginSpec } from "./plugins/surface-plugin";
import { BrowserUIBase, TemplateRenderer } from "./browser-ui-instance";
import { SurfaceViewOptions } from './surface-view-options';
import { SurfaceDragOptions } from './surface-drag-options';
import { BrowserUIModel } from "./browser-ui-model";
import { UIPath } from './ui-path';
import { EndpointDefinition, UIVertexDefinition } from "./browser-ui-model";
import { FixedElementConstraints } from "./fixed-layer";
import { SurfaceVertexAddedParams } from "./params";
import { ValueSource } from "./value-sources";
import { GridProfile } from "./surface-grid-profile";
import { CenterContentOptions, SurfaceOptions } from "./surface-render-options";
import { BoundingBox, Constructable, Grid, PointXY, RectangleXY, Size } from "../ui-core/util/util";
import { Base, Node, Group, Edge, Port, Vertex, ObjectData } from "../core/model/graph";
import { Selection } from '../core/selection';
import { Connection } from "../ui-core/core/connector/connection-impl";
import { jsPlumbDOMElement } from "../ui-core/browser-ui-renderer/element-facade";
import { BrowserJsPlumbInstance, jsPlumbDOMInformation } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { Endpoint } from "../ui-core/core/endpoint/endpoint";
import { ViewportElement } from "../ui-core/core/viewport";
import { ConnectionEstablishedParams } from "../ui-core/core/callbacks";
import { ConstrainFunction } from "../ui-core/browser-ui-renderer/collicat";
import { OptimisticEventGenerator } from "../ui-core/util/event-generator";
import { ConnectionSelection } from "../ui-core/core/selection/connection-selection";
import { EdgeAddedParams, GroupAddedParams, GroupRemovedParams, NodeAddedParams, NodeRemovedParams, VertexUpdatedParams } from "../core/params";
import { AbstractLayout, LayoutParameters } from "../core/layout/abstract-layout";
import { DataSource, ObjectInfo } from "../core/datasource";
import { ToolkitRenderer } from "../core/renderer";
import { FilterableDataset } from "../core/filterable-dataset";
import { PathOptions } from "../core/model/path";
import { CustomTagOptions } from "../templates-2/custom-tag";
import { ShapeLibrary } from "../browser-ui-shape-library/shape-library-definitions";
import { ConnectorEditorActivateParams } from "./connector-editor";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
import { ElasticGroupManager } from "./elastic-group-manager";
/**
 * Possible surface modes.
 * @public
 */
export declare enum SurfaceMode {
    PAN = "pan",
    SELECT = "select",
    DISABLED = "disabled"
}
export declare type IntersectingVertex<T> = {
    r: BoundingBox;
    v: T;
    el: BrowserElement;
    id: string;
    enclosed: boolean;
};
/**
 * Definition of an entry in the optional `modelEvents` parameter of the Surface's render options.
 * @public
 */
export declare type ModelEventCallback<T> = (event: Event, eventTarget: BrowserElement, modelObject: SurfaceObjectInfo<T>) => any;
/**
 * Models some entity whose class, in the visual representation, can be manipulated.
 * @public
 */
export declare type SupportsClassManipulationElement = Edge | Vertex | BrowserElement | string;
/**
 * List of entities whose class, in the visual representation, can be manipulated.
 * @public
 */
export declare type SupportsClassManipulation = SupportsClassManipulationElement | ArrayLike<SupportsClassManipulationElement>;
/**
 *
 * @public
 */
export interface SurfaceObjectInfo<T> extends ObjectInfo<T> {
    el: HTMLElement;
}
/**
 * Extracts an endpoint definition from the given value source, which may be a DOM element or a JS object. For internal use.
 * @param valueSource
 * @internal
 */
export declare function _extractEndpointDefinitionFromValueSource(valueSource: ValueSource<any>): EndpointDefinition;
export interface jsPlumbToolkitDOMInformation extends jsPlumbDOMInformation {
    node?: Node;
    group?: Group;
    port?: Port;
    vertex?: Vertex;
}
export interface jsPlumbToolkitDOMElement extends jsPlumbDOMElement {
    jtk: jsPlumbToolkitDOMInformation;
    getAttribute(name: string): string;
}
/**
 * @internal
 */
interface InternalSetPositionParams {
    info?: SurfaceObjectInfo<any>;
    vertex: Node | Group | string | Element;
    magnetize?: boolean;
    doNotUpdateElement?: boolean;
    doNotUpdateLayout?: boolean;
    size?: Size;
    doRevalidate?: boolean;
    storeInModel?: boolean;
    x: number;
    y: number;
}
/**
 * An infinite panning canvas support pan/zoom, templating and plugins, with a number of useful methods for
 * navigating the UI. This class is the core of the JsPlumb UI.
 */
export declare class Surface extends OptimisticEventGenerator implements ToolkitRenderer<BrowserElement> {
    private templateRenderer;
    static type: string;
    protected _debug: boolean;
    private _$_magnetizeProfile;
    /**
     * @internal
     */
    _$_gridProfile: GridProfile;
    _$_layoutMap: Map<string, AbstractLayout<any>>;
    dataSource: DataSource;
    toolkitInstance: BrowserUIBase;
    _layout: AbstractLayout<any>;
    private _addToDragSelectionOnSelect;
    private _edgePathEditor;
    container: BrowserElement;
    containerElement: BrowserElement;
    canvasElement: BrowserElement;
    /**
     * Defaults to false. When true, if a port is added to a vertex programmatically, the surface treats the vertex's DOM
     * element as the DOM element for the port if it cannot find a specific element for the port.
     * @internal
     */
    logicalPorts: boolean;
    private _$_storePositionsInModel;
    decorators: Array<Decorator>;
    vertexList: Array<Node>;
    connMap: Record<string, Connection<BrowserElement>>;
    /**
     * list of edges that are as-yet unrendered due to one or both of their vertices not having been rendered.
     */
    private _unrenderedEdges;
    private nodeRenderer;
    private portRenderer;
    private groupRenderer;
    private _$_dataLoading;
    private _$_suspendRendering;
    private _refreshAutomatically;
    private _$_propertyMapper;
    _$_shapeLibrary: ShapeLibrary<ObjectData>;
    /**
     * list of vertices that have been passed to the renderer but which have not yet been reported as rendered.
     */
    _unrenderedVertices: Map<string, {
        vertex: Vertex;
        def: any;
        eventInfo: any;
    }>;
    objectFilter: (b: Base) => boolean;
    _modelTopAttribute: string;
    _modelLeftAttribute: string;
    _modelWidthAttribute: string;
    _modelHeightAttribute: string;
    elementsDraggable: boolean;
    enhancedView: boolean;
    _ignoreToolkitEvents: boolean;
    view: BrowserUIModel;
    dragOptions: SurfaceDragOptions;
    refreshLayoutOnEdgeConnect: boolean;
    jsplumb: BrowserJsPlumbInstance;
    _useModelForSizes: boolean;
    _currentElasticGroup: ElasticGroupManager;
    id: string;
    panZoom: PanZoom;
    contentBounds: any;
    plugins: Array<SurfacePlugin>;
    pluginMap: Map<string, SurfacePlugin>;
    wheelReverse: boolean;
    _$_simpleEdgeStyles: boolean;
    private readonly directRender;
    private _directRenderResizeObserver;
    zoomToFitOnLoad: boolean;
    mode: SurfaceMode;
    autoExitSelectMode: boolean;
    constructor(params: SurfaceOptions, templateRenderer: TemplateRenderer<any>);
    getNodes(): Array<Node>;
    getGroups(): Array<Group>;
    /**
     * Sets the current view for this renderer.
     * @param view View to set.
     * @internal
     */
    setView(view: SurfaceViewOptions): void;
    /**
     * Returns whether or not rendering is currently suspended.
     * @public
     */
    isSuspendRendering(): boolean;
    /**
     * Returns whether or not data is currently being loaded.
     * @internal
     */
    isDataLoading(): boolean;
    /**
     * sizes the current
     * @private
     */
    private _sizeElasticGroupFrame;
    /**
     * Add a plugin to the Surface. You can provide a type parameter to this method to avoid having to cast the return value, if you need to
     * retain a reference to the plugin.
     * @param pluginSpec
     * @public
     */
    addPlugin<T extends SurfacePlugin>(pluginSpec: SurfacePluginSpec): T;
    /**
     * Gets the plugin registered for the given type, null if nothing matching found.
     * @param pluginType
     * @public
     */
    getPlugin<T extends SurfacePlugin>(pluginType: string): T | null;
    /**
     * Sets whether hover events are currently suspended. Used by some plugins.
     * @param s
     * @public
     */
    setHoverSuspended(s: boolean): void;
    /**
     * Sets the current mode for the surface.
     * @param mode
     * @param doNotClearSelection Defaults to false - when true, a mode change will not first cause the selection in the
     * underlying Toolkit to be cleared.
     * @public
     */
    setMode(mode: SurfaceMode, doNotClearSelection?: boolean): void;
    /**
     * Selects a set of edges. If you supply a DOM element for any of the arguments here, the underlying graph object - a Node or a Port - will be
     * determined, and the edges for that object will be retrieved.  Note that for a Port this method does the same thing as
     * `selectAllEdges`, but for a Node, which may have Ports registered on it, this method will retrieve only the Edges directly
     * registered on the Node itself.  You may need to use `selectAllEdges` if you want everything from some Node.
     * @param params - Selection parameters
     * @param params.source - Source node, as a Node, a DOM element, a selector, or a String (including support for wildcard '*')
     * @param params.target - Target node, as a Node, a DOM element, a selector, or a String (including support for wildcard '*')
     * @param params.element - Source or target node, as a Node, a DOM element, a selector, or a String (including support for wildcard '*')
     * @public
     */
    selectEdges(params: {
        source?: string | BrowserElement | Vertex;
        target?: string | BrowserElement | Vertex;
        element?: string | BrowserElement | Vertex;
    }): ConnectionSelection;
    /**
     * Selects a set of Edges.  Parameters are the same as for selectEdges; the difference here is that when you're working with
     * Vertices, this method will return all of the vertex's Edges as well as those of all the Ports registered on the Vertex.
     * @param params Selection parameters
     * @param params.source  Source node, as a Node/Group, a DOM element, or a string (including support for wildcard '*')
     * @param params.target  Target node, as a Node/Group, a DOM element, or a string (including support for wildcard '*')
     * @param params.element Source or target node, as a Node/Group, a DOM element, or a string (including support for wildcard '*')
     * @public
     */
    selectAllEdges(params: {
        source?: string | BrowserElement | Vertex;
        target?: string | BrowserElement | Vertex;
        element?: string | BrowserElement | Vertex;
    }): ConnectionSelection;
    /**
     * Gets the offset for the given DOM element.
     * @param el
     * @internal
     */
    getOffset(el: Element): PointXY;
    /**
     * Sets the position of the given vertex, snapping it to a grid and applying the magnetizer, if necessary. If the
     * given vertex is the child of some group then the group's layout is updated with the new position (and no
     * magnetizer is run); otherwise the main layout is updated with the new position.
     *
     * Other elements may be moved as a result of this method due to the magnetizer potentially running (Although if it runs,
     * it is not guaranteed to move other elements). For each moved element, a node moved event is fired. All of the
     * move events are contained within a single transaction on the Toolkit so if you undo this operation, all of the
     * affected elements will return to where they were prior to the move.
     *
     * @param vertex - The vertex to set the position for
     * @param x - X position to set
     * @param y - Y position to set
     * @public
     */
    setPosition(vertex: string | Node | Group | Element, x: number, y: number): void;
    /**
     * Set the absolute position of the given element. Does not update the pan/zoom or any plugins - this is meant to be
     * used as a helper method for positioning elements not directly under the Surface's control.
     * @param el
     * @param p
     * @public
     */
    /**
     * Adds a class to the DOM element represented by `el`, which can be a Selection, or an instance of many
     * different types - see the `SupportsClassManipulation` interface for a complete list.
     * @param el
     * @param clazz
     * @public
     */
    addClass(el: Selection | SupportsClassManipulation, clazz: string): void;
    /**
     * Removes a class from the DOM element represented by `el`, which can be a Selection, or an instance of many
     * different types - see the `SupportsClassManipulation` interface for a complete list.
     * @param el
     * @param clazz
     * @public
     */
    removeClass(el: Selection | SupportsClassManipulation, clazz: string): void;
    /**
     * Toggles a class on the DOM element represented by `el`, which can be a Selection, or an instance of many
     * different types - see the `SupportsClassManipulation` interface for a complete list.
     * @param el
     * @param clazz
     * @public
     */
    toggleClass(el: Selection | SupportsClassManipulation, clazz: string): void;
    /**
     * Returns whether the DOM element represented by `el` - which can be an Edge, Connection, Node, Group, DOM element, or
     * ID of some model object - has the given class.
     * @param el
     * @param clazz
     * @public
     */
    hasClass(el: SupportsClassManipulationElement, clazz: string): boolean;
    /**
     * Bind an event listener to the given DOM Element. This is a utility function that can be used on any element in the DOM, not just
     * things rendered by the Toolkit.
     * @param el Element, or elements, to bind the event listener to.
     * @param event Name of the event to bind to
     * @param callbackOrSelector Either a callback, or if 4 args are given, this is a selector identifying some element(s) within the given element.
     * @param callback Event callback.
     * @public
     */
    on(el: Document | Element | BrowserElement | NodeListOf<BrowserElement>, event: string, callbackOrSelector: Function | string, callback?: Function): void;
    /**
     * Unbind an event listener from the given DOM Element. This is a utility function that can be used on any element in the DOM, not just
     * things rendered by the Toolkit.
     * @param el Element, or elements, from which to remove the event binding.
     * @param event Name of the event to unbind
     * @param handler The function to unbind
     * @public
     */
    off(el: Document | Element | BrowserElement | NodeListOf<BrowserElement>, event: string, handler: Function): void;
    /**
     * Binds to a mouse event occurring on a given model object. This is a wrapper around the `on` event binding method, which
     * searches for an associated model object for the given event. For instance, you might have a node template that has a button inside of it
     * that you want to respond to. When the button is clicked you want to know the node associated with the button. This method provides that.
     * It is possible to find the associated model object yourself, via the `getObjectInfo` method of the Surface, called with the event's target,
     * but this method does that for you.
     *
     * You can, optionally, provide a type hint to this method in order to fix the type of the returned model object, but note that this is erased at
     * runtime and the type of the returned object is not guaranteed by the surface.
     *
     * This method binds a delegated event handler on the container element used by the surface. You do not need to provide an element to which to bind; you
     * just need to provide an appropriate selector
     *
     * @param event Name of the event to bind to.
     * @param selector CSS3 selector that identifies children of a vertex DOM element on which the event handler should be bound.
     * @param callback Function to call when the event is fired.
     * @public
     */
    bindModelEvent<T extends Edge | Node | Group | Port | Vertex>(event: string, selector: string, callback: ModelEventCallback<T>): void;
    /**
     * Unbinds a listener for a model event.
     * @param event Name of the event to unbind.
     * @param handler Function to unbind.
     * @public
     */
    unbindModelEvent<T = any>(event: string, handler: ModelEventCallback<T>): void;
    /**
     * Sets whether or not the given element, or element representing the given vertex, is draggable.
     * @param el Vertex id, vertex, or DOM element
     * @param draggable
     */
    setDraggable(el: string | Element | Vertex, draggable: boolean): void;
    /**
     * Gets the origin and size of the DOM element representing a Vertex that is being managed by the Surface. Origin
     * is reported in pixels, relative to the parent container of the given Vertex: for a Vertex inside a group, the parent
     * container is group's DOM element (or the group's DOM element's internal parent for children); for a Vertex that is at
     * the root level of the dataset, the container is the canvas.
     *
     * @param el Vertex id, element, or Vertex to get position for.
     * @param relativeToCanvasRoot - Defaults to false, meaning the behaviour is as described above. If true, then all
     * values are reported with respect to the canvas origin. This flag is used, for instance, in the copy/paste module,
     * for determining the canvas offset for some node being copied out of a group into the root of the dataset.
     * @returns A RectangleXY if element was found, otherwise null.
     * @public
     */
    getCoordinates(el: string | Element | Vertex, relativeToCanvasRoot?: boolean): RectangleXY;
    /**
     * Snaps one or all vertices to the current grid or to the grid provided to this method.
     * @param el ID of vertex, Vertex, or DOM element representing a Vertex.
     * @param grid Optional grid to snap to. If not provided, the Surface will use the `grid` passed in to its constructor. If that is
     * also null, nothing will be snapped.
     * @public
     */
    snapToGrid(el?: string | Vertex | Element, grid?: Grid): Record<string, {
        original: PointXY;
        current: PointXY;
    }> | null;
    /**
     * Appends an element to the viewport such that it is zoomed with everything else, but constrains pan
     * in one or both axes so that the element remains fixed with respect to the viewport origin.
     * @param el The DOM element to append.
     * @param constraints Flags to indicate optional constraint to each axis.
     * @param pos Location of the element's origin.
     * @public
     */
    fixElement(el: Element, pos: PointXY, constraints?: FixedElementConstraints): void;
    /**
     * Removes an element that was previously fixed via the fixElement method.
     * @param el
     * @public
     */
    unfixElement(el: Element): void;
    /**
     * Appends an element to the viewport so that it floats above the content that is being zoomed and panned.
     * The element will have `position:absolute` set on it. You can float any element you like, but note that the
     * responsibility for setting an appropriate z index is yours.
     * @param el Element to float.
     * @param pos Position to float the element at.
     * @public
     */
    floatElement(el: Element, pos: PointXY): void;
    /**
     * Zooms the display so that all the tracked elements fit inside the viewport. This method will also,
     * by default, increase the zoom if necessary - meaning the default behaviour is to adjust the zoom so that
     * the content fills the viewport. You can suppress zoom increase by setting `doNotZoomIfVisible:true` on the
     * parameters to this method.
     * @param params.padding Optional padding to leave around all elements. Defaults to 0.
     * @param params.fill Amount of the viewport to fill. By default, this method will zoom so that the content is 0.9 times the size of the viewport.
     * Aesthetically this makes for a more pleasing result than filling the viewport entirely.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.onStep Optional function to call on operation step (centering may be animated).
     * @param params.doNotAnimate By default, the centering content step does not use animation. This is due to this method being used most often to initially setup a UI.
     * @param params.doNotZoomIfVisible Defaults to false. If true, no action is taken if the content is currently all visible.
     * @public
     */
    zoomToFit(params?: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
        onStep?: () => any;
        padding?: number;
        fill?: number;
        doNotZoomIfVisible?: boolean;
    }): void;
    /**
     * Zooms the display so that all the tracked elements fit inside the viewport, but does not make any adjustments
     * to zoom if all the elements are currently visible (it still does center the content though).
     * @param params.padding Optional padding to leave around all elements. Defaults to 0.
     * @param params.fill Amount of the viewport to fill. By default, this method will zoom so that the content is 0.9 times the size of the viewport.
     * Aesthetically this makes for a more pleasing result than filling the viewport entirely.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.onStep Optional function to call on operation step (centering may be animated).
     * @param params.doNotAnimate By default, the centering content step does not use animation. This is due to this method being used most often to initially setup a UI.
     * @public
     */
    zoomToFitIfNecessary(params?: {
        padding?: number;
        fill?: number;
        onComplete?: (p: PointXY) => any;
        onStep?: () => any;
        doNotAnimate?: boolean;
    }): void;
    /**
     * Zooms the viewport so that all of the given elements are visible.
     * @param zParams
     * @public
     */
    zoomToElements(zParams: {
        elements: Array<BrowserElement>;
        fill?: number;
        doNotZoomIfVisible?: boolean;
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
        onStep?: () => any;
        doNotFirePanEvent?: boolean;
    }): void;
    /**
     * Zooms the display so that the background (if one is set) fits inside the viewport.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotAnimate If true, centering content will not use animation.
     * @public
     */
    zoomToBackground(params: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
    }): void;
    /**
     * Maps the location of the given event on the page onto the coordinate space of this widget, returning a value representing where the given event appears to
     * be with respect to the origin of the Surface's viewport.
     * @param event
     * @param doNotAdjustForOffset
     * @public
     */
    mapEventLocation(event: any, doNotAdjustForOffset?: boolean): PointXY;
    /**
     * Gets the layout that is managing the given vertex: if its inside a group, the layout is the layout for the
     * vertex's parent group. Otherwise the layout is the surface's layout.
     * @internal
     * @param obj
     */
    getLayoutFor(obj: Vertex): AbstractLayout<any>;
    /**
     * Centers the tracked content inside the viewport, but does not adjust the current zoom (so the content may still extend past the viewport bounds)
     * @param params Method parameters.
     * @public
     */
    centerContent(params?: CenterContentOptions): void;
    /**
     * Zooms the display so that the current selected nodes are all visible, optionally animating the transition.
     * @param params Optional method params
     * @param params.fill A decimal indicating how much of the viewport to fill with the zoomed content. Defaults to a value of 0.90.
     * @param params.selection Optional Selection to which to zoom. If omitted, the default is to use the Toolkit's
     * current selection.
     * @param params.doNotZoomIfVisible If true, no action is taken if the content is currently all visible. Defaults to false.
     * @param params.doNotAnimate By default the widget does not animate this operation. You can override that behaviour by setting doNotAnimate:false.
     * @param params.filter Optional function to use as a filter; we create the selection by running this filter by the Toolkit's `filter` method.
     * @public
     */
    zoomToSelection(params: {
        fill?: number;
        selection?: Selection;
        filter?: (o: Base) => boolean | ObjectData;
        doNotZoomIfVisible?: boolean;
        doNotAnimate?: boolean;
    }): void;
    /**
     * Gets a Path from some source Vertex to some target Vertex. This method is a wrapper around the Toolkit's `getPath`
     * method, adding a few ui specific functions to the result.
     * @param params Path spec options
     * @returns A Path object. Even if no path exists you will get a return value - but it will just be empty.
     * @public
     */
    getPath(params: PathOptions): UIPath;
    /**
     * Sets the current grid for element dragging, magnetization and group sizing.
     * @param grid Grid to use. If you provide null as the value the grid will be cleared.
     * @public
     */
    setGrid(grid: Grid): void;
    /**
     * Get the current grid.
     * @public
     */
    getGrid(): Grid;
    /**
     * Gets the current element drag constrain function, if set.
     * @internal
     */
    getDragConstrainFunction(): ConstrainFunction;
    /**
     * Returns the apparent {x,y} of the canvas inside the viewport - the coordinates, in real pixel
     * values, of where the origin of the canvas appears to be. This apparent origin is not necessarily the
     * same as the {x,y} values of the canvas, because the transform origin and zoom values change
     * things.  This function can be used in conjunction with the content bounds by widgets such as the miniview,
     * to calculate what is actually visible in the viewport at some point in time.
     * @returns  Top left location of the canvas, relative to the viewport's 0,0.
     * @public
     */
    getApparentCanvasLocation(): PointXY;
    /**
     * Sets the apparent canvas location - see the notes for getApparentCanvasLocation.
     * @param left Value in pixels for left edge of canvas.
     * @param top Value in pixels for top edge of canvas.
     * @returns Location of the actual origin set, after clamping.
     * @public
     */
    setApparentCanvasLocation(left: number, top: number): PointXY;
    /**
     * Gets the current bounds information.
     * @public
     */
    getBoundsInfo(): ViewportBounds;
    /**
     * Sets the current zoom, clamping it to the allowed range.
     * @param zoom - Zoom value. If this is outside the allowed bounds it will be clamped.
     * @param animate - If true, the surface will animate the transition in zoom by stepping through several intermediate levels in succession.
     * @returns Current zoom. This may or may not be the value you asked for - it might have been clamped to the current allowed zoom range.
     */
    setZoom(zoom: number, animate?: boolean): number;
    /**
     * Sets the current zoom range. By default, this method checks if the current zoom is within
     * the new range, and if it is not then `setZoom` is called, which will cause the zoom to be clamped
     * to an allowed value in the new range. You can disable this by passing `true` for `doNotClamp`.
     * @param zr New range, as an array consisting of [lower, upper] values. Lower must be less than upper.
     * @param doNotClamp If true, will not check the current zoom to ensure it falls within the new range.
     * @returns Array of [min, max] current zoom values.
     */
    setZoomRange(zr: ZoomRange, doNotClamp?: boolean): ZoomRange;
    /**
     * Gets the current zoom range.
     * @returns Array of [min, max] current zoom values.
     * @public
     */
    getZoomRange(): ZoomRange;
    /**
     * Gets the current zoom.
     * @returns Current zoom value
     * @public
     */
    getZoom(): number;
    /**
     * Nudges the zoom by the given amount. Zoom will be clamped to the current zoom range in effect and the
     * value that was ultimately set is returned from this function. The value you pass in here is multiplied by
     * 100 to give a percentage value: 1 is 100%, for instance, 0.05 is 5%.
     * @param delta Amount to change zoom by.
     * @param e Original event that caused the nudge. May be null.
     * @returns The zoom that was set. Zoom will be clamped to the allowed range.
     * @public
     */
    nudgeZoom(delta: number, e?: any): number;
    /**
     * Nudges the wheel zoom by the given amount. This function is intended for use by components that control
     * zoom via the mouse wheel, and not for general usage. See `nudgeZoom` for a more general version of this.
     * @param delta Amount to change zoom by.
     * @param e Original event that caused the nudge. May be null.
     * @public
     */
    nudgeWheelZoom(delta: number, e?: any): void;
    /**
     * Gets the current origin of the panned content.
     * @returns Position, in pixels, of the panned content, where 0,0 is the origin of the viewport.
     * @public
     */
    getPan(): PointXY;
    /**
     * Pans the canvas by a given amount in X and Y.
     * @param dx - Amount to pan in X direction
     * @param dy - Amount to pan in Y direction
     * @param doNotAnimate - By default this operation uses animation.
     * @public
     */
    pan(dx: number, dy: number, doNotAnimate?: boolean): void;
    /**
     * Sets the position of the panned content's origin.
     * @param left - Position in pixels of the left edge of the panned content.
     * @param top - Position in pixels of the top edge of the panned content.
     * @param animate - Whether or not to animate the pan. Defaults to false.
     * @param onComplete - If `animate` is set to true, an optional callback for the end of the pan
     * @public
     */
    setPan(left: number, top: number, animate?: boolean, onComplete?: (p: PointXY) => any): void;
    /**
     * Sets the pan and zoom for the Surface in one pass.
     * @param x - Value for pan in x axis
     * @param y - Value for pan in Y axis
     * @param zoom - Value fo zoom
     * @param animate - Defaults to false. If true, the changes will be made with the widget animating.
     * @public
     */
    setPanAndZoom(x: number, y: number, zoom: number, animate?: boolean): void;
    /**
     * Center on the current object and zoom in on it.
     * @param element - The element to center. Can be a DOM element, vertex id, or a Node/Group
     * @param fillRatio How much of the viewport to fill with the object we zoom in on. This will be limited by the current zoom range. Defaults to 0.6.
     * @param doNotAnimate - by default, this operation will be animated.
     * @public
     */
    centerOnAndZoom(element: string | Vertex | Element, fillRatio?: number, doNotAnimate?: boolean): void;
    /**
     * Takes a node/group as argument and positions the surface canvas such that the given node is at the center in both axes.
     * @param element - The element to center. Can be a DOM element, vertex id, or a Node/Group.
     * @public
     */
    centerOn(element: string | Vertex | Element): void;
    /**
     * Takes a node/group as argument and positions the surface canvas such that the given node is at the center in the horizontal axis.
     * @param element - The element to center. Can be a DOM element, vertex id, or a Node/Group
     * @public
     */
    centerOnHorizontally(element: string | Vertex | Element): void;
    /**
     * Takes a node/group as argument and positions the surface canvas such that the given node is at the center in the vertical axis.
     * @param element - The element to center. Can be a DOM element, vertex id, or a Node/Group
     * @public
     */
    centerOnVertically(element: string | Vertex | Element): void;
    /**
     * Sets whether or not the widget clamps the movement of the canvas during pan/zoom
     * to ensure that the managed content never disappears from view.
     * @param clamping Whether or not to clamp movement.
     * @public
     */
    setClamping(clamping: boolean): void;
    /**
     * Returns whether or not the widget clamps the movement of the canvas during pan/zoom/
     * @public
     */
    isClamping(): boolean;
    /**
     * Returns the element used as container for the Surface.
     * @public
     */
    getContainer(): any;
    /**
     * Returns whether or not the given point (relative to page origin) is within the viewport for the widget.
     * @param x X location of point to test
     * @param y Y location of point to test
     * @returns True if the point is within the viewport, false if not.
     * @public
     */
    isInViewport(x: number, y: number): boolean;
    /**
     * Maps the given page location to a value relative to the viewport origin, allowing for
     * zoom and pan of the canvas. This takes into account the offset of the viewport in the page so that what
     * you get back is the mapped position relative to the target element's [left,top] corner. If
     * you wish, you can supply true for 'doNotAdjustForOffset', to suppress that behavior.
     * @param left X location
     * @param top Y location
     * @param doNotAdjustForOffset Whether or not to adjust for the offset of the viewport in the page. Defaults to false.
     * @returns The mapped location, as a PointXY object.
     * @public
     */
    fromPageLocation(left: number, top: number, doNotAdjustForOffset?: boolean): PointXY;
    /**
     * Maps the given location relative to the viewport origin, to a page location, allowing for
     * zoom and pan of the canvas. This takes into account the offset of the viewport in the page so that what
     * you get back is the mapped position relative to the target element's [left,top] corner. If
     * you wish, you can supply true for 'doNotAdjustForOffset', to suppress that behavior.
     * @param left X location
     * @param top Y location
     * @param doNotAdjustForOffset Whether or not to adjust for the offset of the viewport in the page. Defaults to false.
     * @returns The mapped location, as a PointXY object.
     * @public
     */
    toPageLocation(left: number, top: number, doNotAdjustForOffset?: boolean): PointXY;
    /**
     * Finds vertices - Nodes or Groups - that intersect a rectangle defined by the given origin and dimensions.
     * @param origin Origin of the rectangle to test
     * @param dimensions Width and height of the rectangle to test
     * @param enclosed If true, vertices must be fully enclosed by the rectangle
     * @param dontIncludeGroups If true, Groups are omitted from the search
     * @param dontIncludeNodes If true, Nodes are omitted from the search
     * @param dontIncludeNodesInsideGroups If true, Nodes inside Groups are omitted from the search
     * @param dontIncludeNestedGroups If true, Groups that are nested inside other Groups are omitted from the search
     * @public
     */
    findIntersectingVertices<T extends Node>(origin: PointXY, dimensions: Size, enclosed?: boolean, dontIncludeGroups?: boolean, dontIncludeNodes?: boolean, dontIncludeNodesInsideGroups?: boolean, dontIncludeNestedGroups?: boolean): Array<IntersectingVertex<T>>;
    /**
     * Finds Nodes (not Groups) - that intersect a rectangle defined by the given origin and dimensions.
     * @param origin Origin of the rectangle to test
     * @param dimensions Width and height of the rectangle to test
     * @param enclosed If true, vertices must be fully enclosed by the rectangle
     * @param dontIncludeNodesInsideGroups If true, Nodes inside Groups are omitted from the search
     * @public
     */
    findIntersectingNodes(origin: PointXY, dimensions: Size, enclosed?: boolean, dontIncludeNodesInsideGroups?: boolean): Array<IntersectingVertex<Node>>;
    /**
     * Finds Groups (not Nodes) - that intersect a rectangle defined by the given origin and dimensions.
     * @param origin Origin of the rectangle to test
     * @param dimensions Width and height of the rectangle to test
     * @param enclosed If true, vertices must be fully enclosed by the rectangle
     * @param dontIncludeNestedGroups If true, Nodes inside Groups are omitted from the search
     * @public
     */
    findIntersectingGroups(origin: PointXY, dimensions: Size, enclosed?: boolean, dontIncludeNestedGroups?: boolean): Array<IntersectingVertex<Group>>;
    /**
     * Positions a DOM element at a given X,Y on the canvas, in canvas coordinates (meaning it takes into account the current zoom and pan). This is
     * not intended for use with elements the surface is managing: it is designed to be used with elements such as pop-ups that you may wish to
     * position relative to the content in your canvas.
     * @param el Element to position.
     * @param x X location on canvas to move element's left edge to.
     * @param y Y location on canvas to move element's top edge to.
     * @param xShift Optional absolute number of pixels to shift the element by in the x axis after calculating its position relative to the canvas. Typically you'd use this to place something other than the top left corner of your element at the desired location.
     * @param yShift Optional absolute number of pixels to shift the element by in the y axis after calculating its position relative to the canvas.
     * @param ensureOnScreen If true, will ensure that x and y positions are never negative.
     * @public
     */
    positionElementAt(el: Element, x: number, y: number, xShift?: number, yShift?: number, ensureOnScreen?: boolean): void;
    /**
    * Positions a DOM element at the apparent canvas location corresponding to the page location given by some event. This is not intended for use
    * with elements the surface is managing: it is designed to be used with elements such as pop-ups that you may wish to position relative to the
    * content in your canvas.
    * @param el - Element to position.
    * @param evt - Event to position element at.
    * @param xShift - Optional absolute number of pixels to shift the element by in the x axis after calculating its position relative to the canvas. Typically you'd use this to place something other than the top left corner of your element at the desired location.
    * @param yShift - Optional absolute number of pixels to shift the element by in the y axis after calculating its position relative to the canvas.
    * @public
    */
    positionElementAtEventLocation(el: Element, evt: Event, xShift?: number, yShift?: number): void;
    /**
     * Positions a DOM element at the apparent canvas location corresponding to the given page location. This is not intended for use with elements
     * the surface is managing: it is designed to be used with elements such as pop-ups that you may wish to position relative to the content in your
     * canvas.
     * @param el - Element to position.
     * @param x - X location on canvas to move element's left edge to.
     * @param y - Y location on canvas to move element's top edge to.
     * @param xShift - Optional absolute number of pixels to shift the element by in the x axis after calculating its position relative to the canvas. Typically you'd use this to place something other than the top left corner of your element at the desired location.
     * @param yShift - Optional absolute number of pixels to shift the element by in the y axis after calculating its position relative to the canvas.
     * @public
     */
    positionElementAtPageLocation(el: Element, x: number, y: number, xShift?: number, yShift?: number): void;
    /**
     * Redraw all connections.
     * @public
     */
    repaintEverything(): void;
    /**
     * When the Surface is rendering a Selection, this method triggers a reload on the selection, causing the UI to be cleared and
     * recreated.
     * @public
     */
    reload(): void;
    /**
     * Cleans up the Surface.  When using a library integration such as Angular/React/Vue, this method will be called
     * automatically when the associated component is unloaded. If you're using vanilla Toolkit, you might want to call
     * this method if you're cleaning up your UI and you don't need this Surface any longer.
     * @public
     */
    destroy(): void;
    /**
     * Wraps the underlying Toolkit's `batch` function with the added step of first suspending events being
     * fired from this renderer.
     * @param fn Function to run while rendering and events are both suspended.
     * @public
     */
    batch(fn: () => any): void;
    /**
     * Rotate the given vertex by the given number of degrees.  The DOM element representing the vertex is rotated and the view is updated.
     * @param obj - Either a vertex ID, or a Node/Group
     * @param amountInDegrees - Amount - in degrees - to rotate.
     * @public
     */
    rotate(obj: string | Vertex, amountInDegrees: number): void;
    /**
     * Sets the position of the given node/group and runs the magnetizer. This operation is wrapped in a transaction
     * on the Toolkit so if undo is called then every element affected by the magnetize is relocated.
     * @param vertex
     * @param x
     * @param y
     * @param doNotUpdateElement
     * @public
     */
    setMagnetizedPosition(vertex: string | Node | Group | Element, x: number, y: number, doNotUpdateElement?: boolean): {
        movedElements: Record<string, {
            original: PointXY;
            current: PointXY;
        }>;
        resizedGroups: Record<string, {
            group: Group;
            originalSize: Size;
            newSize: Size;
        }>;
    };
    /**
     * Writes the current position for the given vertex into the data model.
     * @param params - Parameters
     * @param params.obj - Object to store vertex positions for.
     * @param params.leftAttribute - Name of the attribute to use for the left position. Default is 'left'
     * @param params.topAttribute - Name of the attribute to use for the top position. Default is 'top'
     * @public
     */
    storePositionInModel(params: string | {
        obj?: Node | Group;
        id: string;
        force?: boolean;
        leftAttribute?: string;
        topAttribute?: string;
        pos?: PointXY;
    }): PointXY;
    /**
     * Writes the current position for each node into the data model. A common use case is to run an auto layout the first time
     * some dataset is seen, and then to save the locations of all the vertices once a human being has moved things around.
     * @param params - Parameters
     * @param params.leftAttribute - Name of the attribute to use for the left position. Default is 'left'
     * @param params.topAttribute - Name of the attribute to use for the top position. Default is 'top'
     * @public
     */
    storePositionsInModel(params?: {
        leftAttribute?: string;
        topAttribute?: string;
    }): void;
    /**
     * Magnetize the elements in the display. If `focus` is provided it will be used as the origin for magnetization, and not moved. If no `focus` is
     * provided, the computed center of all the elements will be used as the origin.
     * @param focus
     * @public
     */
    magnetize(focus?: string | Vertex): void;
    /**
     * Magnetize the elements in the display, using the given point as the origin.
     * @param origin
     * @public
     */
    magnetizeAtPoint(origin: PointXY): void;
    /**
     * Magnetize the elements in the display, using the location of the given event as the origin.
     * @param event
     * @public
     */
    magnetizeAtEvent(event: Event): void;
    /**
     * Gather the elements in the display. If `focus` is provided the elements will be gathered around it. Otherwise, the elements will be
     * gathered around the computed center of all the elements.
     * @param focus - Optional ID of a Vertex, or the Vertex itself, around which to gather elements.
     * @public
     */
    gather(focus?: string | Vertex): void;
    /**
     * Sets the visible state of some model object or group of model objects. If the object is a vertex, the visible state
     * will be applied to all edges connected to the given vertex.
     *
     * By default this method will, for groups and nodes, cascade down to any nested vertices.
     * @param obj - Edge, Group, Node or Port, and array of these, or a `FilterableDataset`, such as a `Selection`.
     * @param state - True if edges should be visible, false otherwise.
     * @param doNotCascade - Defaults to false. If true, don't cascade down to any nested vertices.
     * @public
     */
    setVisible(obj: FilterableDataset | ArrayLike<any> | Base, state: boolean, doNotCascade?: boolean): void;
    /**
     * Sets the visible state of the overlays specified by `obj`
     * @param obj - An edge, array of edges, Selection or Path.
     * @param state - True to make the object(s) visible, false to make them invisible.
     * @param ids - Optional list of overlay ids to operate on. Without this, all overlays on each edge in `obj` are targeted.
     * @public
     */
    setOverlaysVisible(obj: FilterableDataset | ArrayLike<Edge> | Edge, state: boolean, ...ids: Array<string>): void;
    /**
     * Decodes the given input into a data structure containing a model object, its type, its ID, and the DOM element used
     * to represent it. Always returns a value even if no model object could be resolved for the given input, but the fields
     * of the return value may be null.
     * @param obj - Object to decode. Can be in many different forms - an existing model object, a vertex id, a DOM element,
     * a Connection, some backing data.
     * @public
     */
    getObjectInfo<T extends Base | Vertex | Group | Node | Port | Edge>(obj: Element | Connection<BrowserElement> | string | Node | Group | Edge | ObjectData): SurfaceObjectInfo<T>;
    /**
     * Refresh the layout and update all connections.
     * @param _internal For internal use. It is not recommended you set this flag if you call this method: it is a means for
     * the Toolkit to override the suspension of rendering, if it needs to.
     * @public
     */
    refresh(_internal?: boolean): void;
    /**
     * Clears and re-runs the layout, optionally with a new set of parameters.
     * @param newParameters
     * @public
     */
    relayout(newParameters?: any): void;
    /**
     * For a given element, retrieve the model object it represents.
     * @param el
     * @param searchAncestors Defaults to false. If true, ancestors of the given element are searched, up to the underlying container element.
     * @returns a Port, Node, Edge, Group, or null.
     * @public
     */
    getModelObjectFromElement(el: Element, searchAncestors?: boolean): Vertex | Port | Node | Group | Edge | null;
    /**
     * Apply the given layout to the viewport, by default refreshing the viewport afterwards.
     * @param layoutParams
     * @param doNotRefresh
     * @public
     */
    setLayout<LP extends LayoutParameters>(layoutParams: {
        type: string;
        options?: LP;
    }, doNotRefresh?: boolean): void;
    /**
     * Run an adhoc layout on the viewport. The layout will be applied one time, and then the previous layout
     * will be restored (but not run, of course, otherwise the results of this adhoc layout would be overwritten!)
     * @param layoutParams
     * @public
     */
    adHocLayout<LP extends LayoutParameters>(layoutParams: {
        type: string;
        options: LP;
    }): void;
    /**
     * Run an adhoc layout on the given group. The layout will be applied one time, and then the previous layout
     * will be restored (but not run, of course, otherwise the results of this adhoc layout would be overwritten!).
     * @param layoutParams
     * @public
     */
    adHocGroupLayout<LP extends LayoutParameters>(group: string | Group, layoutParams: {
        type: string;
        options: LP;
    }): void;
    /**
     * Gets the name of the attributes used to determine location from an object's backing data.
     * @public
     */
    getModelPositionAttributes(): [string, string];
    /**
     * Gets the name of the attribute that is used to determine the label for the given edge.
     * @param edge
     * @public
     */
    getLabelLocationAttribute(edge: Edge): string;
    /**
     * Sets whether the given vertex is enabled for connection drag/drop.
     * @param v The vertex to set enabled state for. In the UI this could resolve to an element, or to an Endpoint.
     * @param state
     * @public
     */
    setEnabled(v: Vertex, state: boolean): boolean;
    /**
     * For the given object or object ID, retrieve the element that represents it in the UI. This method may return null,
     * specifically in the case that you pass in a Port or Port ID, and that Port is represented as an Endpoint.
     * @param obj
     * @returns HTMLElement that represents the given node, group or port.
     * @public
     */
    getRenderedElement(obj: string | Base): HTMLElement;
    /**
     * Gets the DOM node that was rendered for the Node/Group with the given id.
     * @param vertexId Id for node/group for which to retrieve the rendered element.
     * @returns DOM element for the given vertex id, null if not found.
     * @public
     */
    getRenderedVertex(vertexId: string): BrowserElement;
    /**
     * Gets the DOM node that was rendered for the Port with the given id (does not retrieve `jtk-endpoint` elements)
     * @param portId Port id for which to retrieve the rendered element. Note that you must supply the "full" id here, that is in dotted
     * notation with the id of the Node on which the port resides.
     * @returns DOM element for the given Port id, null if not found.
     * @public
     */
    getRenderedPort(portId: string): BrowserElement;
    /**
     * Gets the underlying jsPlumb connection that was rendered for the Edge with the given id.
     * @param edgeId ID of the Edge to retrieve the Connection for.
     * @returns A jsPlumb Connection, null if not found.
     * @public
     */
    getRenderedConnection(edgeId: string): Connection<BrowserElement>;
    /**
     * Gets the underlying jsPlumb Endpoint that was rendered for the given Port or Vertex.
     * @param vertexId The Port/Node/Group, or the ID of the Port/Node/Group, to retrieve the Endpoint for.
     * @returns A jsPlumb Endpoint, null if not found.
     * @public
     */
    getRenderedEndpoint(vertexId: string): Endpoint<BrowserElement>;
    /**
     * Sets whether rendering is suspended or not.
     * @param val
     * @param thenRefresh If true, the surface will refresh after the change in state.
     * @public
     */
    setSuspendRendering(val: boolean, thenRefresh?: boolean): void;
    /**
     * Expand the given group
     * @param group Group ID, or Group, to expand
     * @public
     */
    expandGroup(group: string | Group): void;
    /**
     * Collapse the given group
     * @param group Group ID, or Group, to collapse
     * @public
     */
    collapseGroup(group: string | Group): void;
    /**
     * Expand/collapse the given group, depending on the current state.
     * @param group Group ID, or Group, to expand/collapse.
     * @public
     */
    toggleGroup(group: string | Group): void;
    /**
     * Run the group auto size routine on every group in the Surface.
     * @param force If true, this flag will override any `autoSize:false` directives on the groups in the Surface.
     * @public
     */
    autoSizeGroups(force?: boolean): void;
    /**
     * Run the group auto size routine on a given groups, and moves element around as necessary
     * @param group The group to auto size
     * @param force If true, this flag will override an `autoSize:false` directive on the Group.
     * @public
     */
    sizeGroupToFit(group: Group, force?: boolean): void;
    /**
     * Sets the size of element representing the given vertex in the DOM, updating the layout.
     * @param id
     * @param w
     * @param h
     * @public
     */
    setSize(id: string, w: number, h: number): void;
    /**
     * Gets the underlying connection for the given Edge. Used internally.
     * @param edge
     * @public
     */
    getConnectionForEdge(edge: Edge): Connection<BrowserElement>;
    /**
     * Gets an array of Connections for the given array of Edges.
     * @param edges
     * @public
     */
    getConnectionsForEdges(edges: Array<Edge>): Array<Connection<BrowserElement>>;
    /**
     * Notification that a connection's geometry was edited.
     * @param connection
     * @internal
     */
    _connectionEdited(connection: Connection<BrowserElement>): void;
    /**
     * Part of the renderer contract: the Toolkit wants to know if this renderer is destroyed.
     * @param cb
     * @internal
     */
    onDestroy(cb: (r: ToolkitRenderer<BrowserElement>) => any): void;
    /**
     * Do not use this method as a user of the library. It is for internal use only.
     * @param params
     * @internal
     */
    _setPosition(params: InternalSetPositionParams): {
        movedElements: Record<string, {
            original: PointXY;
            current: PointXY;
        }>;
        resizedGroups: Record<string, {
            group: Group;
            originalSize: Size;
            newSize: Size;
        }>;
    };
    /**
     * Relayout all of the groups in the Surface.
     * @internal
     */
    _relayoutGroups(): void;
    /**
     * Relayout the given group.
     * @param groupOrId Group, or ID of group, to relayout.
     * @public
     */
    relayoutGroup(groupOrId: string | Group): void;
    /**
     * For the given vertex, retrieve its position in the viewport, including any current rotation.
     * @param obj
     * @internal
     */
    _getViewportPosition(obj: Vertex): ViewportElement<any>;
    /**
     * For the given vertex id, retrieve its position in the viewport, including any current rotation.
     * @param id
     * @internal
     */
    _getViewportPositionById(id: string): ViewportElement<any>;
    /**
     * Repaint the given vertex.
     * @param obj ID of the vertex, or the Vertex object, or the DOM element representing it.
     * @param alsoResetToLayoutPosition Defaults to false. If true, the DOM element representing the Vertex is first repositioned to where the layout thinks it should be.
     * This parameter is mostly intended for internal use.
     * @internal
     */
    repaint(obj: string | Vertex | Element, alsoResetToLayoutPosition?: boolean): void;
    private _resolveInitialVertexSize;
    /**
     * Callback for renderers to tell us when a vertex has been rendered. For internal use (unless you're writing your own renderer)
     * @param v The vertex that was rendered
     * @param el The DOM element representing the Vertex.
     * @param def The vertex definition derived for the type of the Vertex.
     * @internal
     */
    vertexRendered<N extends Vertex>(v: N, el: BrowserElement, def: UIVertexDefinition<any>, eventInfo?: {
        position: PointXY;
    }): void;
    /**
     * Create a DOM element. Used internally.
     * @param params - params for the element's style.
     * @param parent
     * @internal
     */
    _createElement(params: Record<string, any>, parent?: Element): jsPlumbToolkitDOMElement;
    /**
     * Start editing the given edge or connection, optionally with the given edit parameters.
     * @param edgeOrConnection
     * @param params
     * @public
     */
    startEditingPath<T extends ConnectorEditorActivateParams>(edgeOrConnection: Edge | Connection<BrowserElement>, params?: T): void;
    /**
     * Stop editing any connector paths.
     * @public
     */
    stopEditingPath(): void;
    /**
     * Clear the edits for the given connection, returning its path to the automatically computed path.
     * @param edgeOrConnection
     * @public
     */
    clearPathEdits(edgeOrConnection: string | Edge | Connection<BrowserElement>): boolean;
    private _getWheelOptions;
    /**
     * wont actually fire an event if there is no delta unless you specify `force:true`
     * @param vertex
     * @param x
     * @param y
     * @param previousX
     * @param previousY
     * @param force
     * @internal
     */
    private _fireNodeMovedEvent;
    /**
     *
     * @internal
     */
    private _applyFunctionToObject;
    /**
     * @internal
     * @param positions
     * @param sizes
     */
    private updateVertexPositions;
    /**
     * @internal
     * @param focus
     * @param origin
     * @param event
     * @param gather
     */
    private _doMagnetize;
    private _toggleNode;
    private _togglePort;
    private isVisible;
    beforeDrop(params: {
        connection: Connection<BrowserElement>;
        dropEndpoint: Endpoint<BrowserElement>;
    }): any;
    beforeDrag(params: {
        endpoint: Endpoint<BrowserElement>;
    }): Record<string, any> | boolean;
    beforeDetach(connection: Connection<BrowserElement>, isDiscard?: boolean): boolean;
    /**
     * @internal
     * @param params
     */
    beforeStartDetach(params: {
        endpoint: Endpoint<BrowserElement>;
        connection: Connection<BrowserElement>;
    }): Record<string, any> | boolean;
    private _fireEdgeRemoved;
    private _boundToolkitEvents;
    /**
     * Called upon receiving an EVENT_DATA_LOAD_START from the Toolkit. TODO this should also be the first entry for the internal code
     * that loads a Toolkit's existing data when the Surface is created.
     * @internal
     */
    private _loadStartFn;
    /**
     * Called upon receiving an EVENT_DATA_APPEND_START from the Toolkit.
     * @internal
     */
    private _appendStartFn;
    /**
     This method needs to be updated to work with _setDataLoading to ensure that all vertices for
     * some batch load have been rendered before the stuff here happens. Vertices might be painted async by the underlying template
     * engine, such as React 18 or Vue 3.
     * @param noDataWasLoaded
     * @internal
     */
    private _loadEndFn;
    private _appendEndFn;
    /**
     * Appends the element for the given node to the element for the given group. For internal use.
     * @param nodeEl
     * @param n
     * @param group
     * @internal
     */
    private _appendNodeToGroup;
    /**
     * Extract endpoint definitions from the given element. For internal use.
     * @param el
     * @internal
     */
    private _extractEndpointsFromVertex;
    /**
     * Extract endpoint definitions from the given element. For internal use.
     * @param el
     * @internal
     */
    private _extractEndpointFromElementAndDefinition;
    /**
     * Renders the given node. For internal use.
     * @param n
     * @param eventInfo
     * @internal
     */
    private _doRenderNode;
    /**
     * Renders the given group. For internal use.
     * @param g
     * @param eventInfo
     * @internal
     */
    private _doRenderGroup;
    /**
     * Checks the list of edges that are currently unrendered to see if there are any for which the vertices have now
     * been rendered, and therefore the edge can be rendered.  For internal use.
     * @internal
     */
    private _flushUnrenderedEdges;
    /**
     * Prepare a set of connection params appropriate for the given Edge, taking its type into account.
     * @param edge
     * @internal
     */
    private _prepareConnectionParams;
    /**
     * Bind to an event on the Toolkit. Always use this method when you bind something new, because it tracks the
     * various bindings, allowing us to unregister them from the Toolkit if/when this component gets destroyed.
     * @param evt
     * @param fn
     * @internal
     */
    private __bindToToolkit;
    /**
     * Callback from the Toolkit that a node was added. Do not call this method as a library user.
     * @param params
     * @private
     * @internal
     */
    _nodeAdded(params: NodeAddedParams): void;
    /** @internal */
    _groupAdded(params: GroupAddedParams): void;
    _nodeRemoved(deletion: NodeRemovedParams): void;
    _groupRemoved(params: GroupRemovedParams): void;
    /** @internal */
    _edgeAdded(data: EdgeAddedParams): void;
    /** @internal */
    _connectionEstablished(info: ConnectionEstablishedParams): void;
    /**
     *
     * Notification that the graph was cleared. We remove everything from our jsPlumb instance (but do not
     * unbind any event listeners).
     * @internal
    */
    _graphClearStart(): void;
    /**
     * Notification that the graph clear has ended. Currently this component takes no action.
     * @internal
    */
    _graphClearEnd(): void;
    /**
     * Setup all the handlers that listen and respond to events that have occurred in the Toolkit.
     * @internal
     */
    private _bindToolkitEvents;
    /**
     * Handle the update of a vertex. If the template renderer is reactive, it is assumed that the UI side of things
     * will be dealt with. Otherwise, we tell the template renderer to update.
     * @param v
     * @internal
     */
    _vertexUpdated(p: VertexUpdatedParams): void;
    /**
     * Resize a group so that its content area shows all the child nodes.
     * @param group
     * @param def
     * @internal
     */
    private _autoSizeAGroup;
    /** @internal */
    private _connect;
    /**
     * Queues up an edge for rendering, perhaps rendering it immediately if its vertices are both available. Otherwise
     * whenever a new vertex is rendered we'll check to see if the edge can then be rendered.
     * @param edge
     * @param flushNow
     * @internal
     */
    private _enqueueEdge;
    /**
     * Check to see if an edge can be rendered (ie. there is an endpoint or element available for both its source and target), and
     * if so, render it.
     * @param edge
     * @internal
     */
    private _maybeRenderEdge;
    /**
     * Do the work of rendering an edge.
     * @param edge
     * @internal
     */
    private _doRenderEdge;
    /**
     * Toggle the visible state of some edge.
     * @param edge
     * @param state
     * @param doNotCascade
     * @internal
     */
    private _toggleEdge;
    /**
     * Tell the pan/zoom to relayout. Extract to a method because it first has to get extents and i didnt want to
     * duplicate that.
     * @internal
     */
    private relayoutPanZoom;
    /**
     * Setup direct rendering: add appropriate class to surface, add a resize observer if the browser supports it.
     * @internal
     */
    private _configureDirectRender;
    /**
     * Create a layout for the surface to use.
     * @param params
     * @internal
     */
    private _createLayout;
    /**
     * Create a layout for a given group.
     * @param params
     * @param group
     * @internal
     */
    private _createGroupLayout;
    /**
    * TODO this should be a batch operation: all rendering suspended (including of edges) until all vertices have been rendered. then, a data load end event should be fired.
     * @internal
    */
    protected _loadExistingData(params: SurfaceOptions): boolean;
    protected fireNodeAdded(p: SurfaceVertexAddedParams): void;
    private createRenderer;
    private _handleClickOrTap;
    /**
     * @internal
     * @param ep
     * @param evt
     * @param eventName
     */
    private _handleEndpointClick;
    /**
     * @internal
     */
    private _bindToJsPlumb;
    /**
     * Run the given function with toolkit event subscribers suspended.
     * @param fn Function to run. Events are suspended, then this function is run, then events are re-enabled.
     * @internal
     */
    private _whileIgnoringToolkitEvents;
    /**
     * Process the list of elements that have moved after one of these operations:
     *
     * - magnetize
     * - snapToGrid
     * - setPosition
     *
     * These things happen:
     *
     * - positions may be stored in the model (if storePositionsInModel is true, which it is by default)
     * - node/group update events will be fired _by the toolkit_ for any vertices moved by the preceding step
     * - the surface fires node/group move end events for anything moved by this method.
     *
     *
     * @param movedElements
     * @param event
     * @internal
     */
    private _updateMovedElements;
    /**
     * TODO strictly speaking this breaks the concept of multiple renderers, since this event goes on the Toolkit's stack and it may
     * not be relevant for some other renderer. Plus some other renderer could execute an undo and cause changes in this
     * renderer. The solution for that is I guess to have an undo stack per renderer, which wraps the Toolkit's undo.
     *
     * Track group size changes by firing an event through the Toolkit.
     * @param resizedGroups
     * @private
     */
    private _trackGroupSizeChanges;
    /**
     * Directly sets the size of a group element (using the `setSize` method, which abstracts out if its an HTML or SVG element)
     * @internal
     * @param group
     * @param size
     * @private
     */
    private _setGroupElementSize;
    /**
     * Sets the position of the vertex with the given id, and applies the magnetizer to the underlying layout, so that the vertex with the
     * given id ends up where it was requested to be, but other vertices may have moved.
     * @param id
     * @param x
     * @param y
     * @param dontMoveFocusVertex
     * @param layoutToUse
     * @internal
     */
    private _setMagnetizedPosition;
    /**
     * Sets the positions of the vertices with the given ids, and applies the magnetizer to the underlying layout, so that the vertices with the
     * given ids end up where they were requested to be, but other vertices may have moved.
     * @param entries
     * @param dontMoveFocusVertex
     * @param layoutToUse
     * @internal
     */
    private _setMagnetizedPositions;
    /**
     * Sets the position of the vertex with the given id, without running the magnetizer.
     * @param id
     * @param x
     * @param y
     * @param doNotCalculateExtents
     * @param layout
     * @internal
     */
    private _setDirectPosition;
    /**
     * TODO this seems to be functionality that only belongs to Recado/Knockle to me. Specifically what's happening here
     * is that a definition containing only 'template' but no 'templateId' is causing an internal value for templateId
     * to be written to the definition, and then for the template to be registered with the renderer.
     * @param def
     * @internal
     */
    private _ensureTemplate;
    /**
     * Register a custom tag on the Surface. This will only take effect if the Surface is using the Toolkit's
     * default template renderer.
     * @param tagName
     * @param handlers
     * @public
     */
    registerTag(tagName: string, handlers: CustomTagOptions): void;
    /**
     * @internal
     */
    _shapeDefsSvgElement: SVGElement;
    /**
     * @internal
     */
    _setupShapeDefs(): void;
    /**
     * @internal
     */
    private getGroupDefinition;
    /**
     * @internal
     */
    private getPortDefinition;
    /**
     * @internal
     */
    private getNodeDefinition;
    /**
     * For the given element, acting as either a source or target for a drag, find the related model information - the
     * specific model object, if found (may not yet have been created in the case of a port), and the related
     * type definition from the view.
     * @param el
     * @param asSource
     * @internal
     */
    private _getModelInfoForDragElement;
    /**
    * TODO there seems to be considerable overlap between the responsibilities of this method and of the _extractEndpointDefinitionFromValueSource
    * method. One subtle difference is in the way the two methods derive a portId: this method first checks for port attributes that have the
    * `-id` suffix,  `_extractEndpointDefinitionFromValueSource` ignores those variants. The `-id` suffix variants are used to say "this element
    * does not itself have this id, you'll use it for anything created from this element", whereas the non `-id` suffix variants indicate that
    * the element itself has the given id. That's why this method uses the `-id` variants by preference, because this method is used when
    * dragging starts, and the drag may be on a totally different element from where the connection will end up.
     * @internal
    */
    private _setSelectors;
    /** @internal */
    private _selectEdges;
    /**
     * @internal
     * @param el
     * @param clazz
     * @param fn
     */
    private _classOperation;
    /**
     * Appends the given element to the display. For internal use.
     * @param el
     * @param id
     * @param pos
     * @param isDecoration
     * @internal
     */
    private _append;
    /**
     * Gets the dom element for children for the given group.
     * @param group
     * @internal
     */
    private _getGroupDragArea;
}
/** @internal */
export declare const SurfacePlugins: {
    get: (name: string) => SurfacePlugin;
    register: (name: string, sp: Constructable<SurfacePlugin>) => void;
};
export {};
