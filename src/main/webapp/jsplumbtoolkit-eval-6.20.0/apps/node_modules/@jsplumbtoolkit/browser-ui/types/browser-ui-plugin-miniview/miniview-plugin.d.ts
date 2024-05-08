import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { Group, Vertex, Node } from "../core/model/graph";
import { jsPlumbToolkitDOMElement, Surface } from "../browser-ui/surface";
import { SurfaceVertexAddedParams } from "../browser-ui/params";
import { PointXY } from "../ui-core/util/util";
import { OptimisticEventGenerator } from "../ui-core/util/event-generator";
import { PanZoom, ViewportBounds } from "../browser-ui/pan-zoom";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
import { Viewport } from "../ui-core/core/viewport";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
/**
 * Options for the miniview plugin.
 * @public
 */
export interface MiniviewPluginOptions extends SurfacePluginOptions {
    /**
     * Element to render into. When using a library integration you do not provide this.
     */
    container: BrowserElement;
    /**
     * Defaults to false. Whether or not to suspend rendering after load.
     */
    suspended?: boolean;
    /**
     * Defaults to true, determines whether or not the miniview can be collapsed.
     */
    collapsible?: boolean;
    /**
     * Optional function to use to derive a type for each rendered node/group. This is written onto
     * the corresponding element as the value of the `data-jtk-miniview-type` attribute, and can be useful
     * for styling.
     * @param v
     */
    typeFunction?: (v: Node | Group) => string;
    /**
     * Optional overide for how sensitive the wheel zoom should be.
     */
    wheelSensitivity?: number;
    /**
     * Optional filter for elements to display. Defaults to undefined - all elements displayed.
     * @param v
     */
    elementFilter?: (v: Vertex) => boolean;
    /**
     * Defauts to true, Whether or not to enable the wheel zoom.
     */
    enableWheelZoom?: boolean;
    /**
     * Defaults to true. Whether or not the miniview is initially visible.
     */
    visible?: boolean;
    /**
     * Defaults to false. Whether or not to reverse the zoom direction in response to a wheel event.
     */
    wheelReverse?: boolean;
    /**
     * Defaults to true, meaning the miniview actively updates as nodes/groups are dragged on the related surface. If this is set
     * to false, the miniview only updates after mouseup.
     */
    activeTracking?: boolean;
    /**
     * Defaults to true, meaning a click on a node/group in the miniview will cause that node/group to be centered in the related surface.
     */
    clickToCenter?: boolean;
}
interface MiniviewDOMElement extends jsPlumbToolkitDOMElement {
    relatedElement: jsPlumbToolkitDOMElement;
}
/**
 * Miniview plugin for Surface.
 */
export declare class MiniviewPlugin extends OptimisticEventGenerator implements SurfacePlugin {
    static type: string;
    surface: Surface;
    panzoom: PanZoom;
    containerElement: BrowserElement;
    canvasElement: BrowserElement;
    pannerElement: BrowserElement;
    surfaceBounds: ViewportBounds;
    suspended: boolean;
    _collapsible: boolean;
    typeFunction: (v: Node | Group) => string;
    _collapser: any;
    _collapsed: boolean;
    wheelSensitivity: number;
    wheelReverse: boolean;
    panning: boolean;
    downAt: PointXY;
    pannerAtMouseDown: PointXY;
    zoomingWithWheel: boolean;
    elementFilter: (vertex: Node | Group) => boolean;
    visible: boolean;
    pannerPos: PointXY;
    vertexMap: Record<string, MiniviewDOMElement>;
    /**
     * When true, which is the default, miniview elements move at the same time as their related element in the surface is being dragged.
     */
    activeTracking: boolean;
    /**
     * Defaults to true, meaning a click on a node/group in the miniview will cause that node/group to be centered in the related surface.
     */
    clickToCenter: boolean;
    enableWheelZoom: boolean;
    eventManager: EventManager;
    _zoomToFit: (a: any, e?: any) => any;
    surfaceBindings: Array<[string, Function]>;
    _doToggleCollapse: Function;
    viewport: Viewport<any>;
    private _doWheelZoom;
    private _downListener;
    private _moveListener;
    private _upListener;
    destroy(): void;
    bindToSurface(evtName: string, handler: Function): void;
    initialise(surface: Surface, options: MiniviewPluginOptions & InternalSurfacePluginOptions): boolean;
    reset(): void;
    private _loadInitialData;
    private _onGroupAdded;
    private _onGroupCollapse;
    private _onGroupExpand;
    private _onGroupMemberRemoved;
    private _onGroupResize;
    private _onGroupMemberAdded;
    private _objectRotated;
    private downListener;
    private moveListener;
    private upListener;
    private wheelZoom;
    private _toggleCollapsed;
    private zoomToFit;
    private _vertexMoved;
    private _groupRelayout;
    private _afterRelayout;
    _migrateGroupMembers(group: Group, groupEl: any): void;
    _nodeAdded(params: SurfaceVertexAddedParams, extraClasses?: any): void;
    registerNode(params: any): void;
    /**
     * Sets whether or not the miniview is visible. Strictly speaking you don't need to use this method
     * you can just control the miniview's container via your own CSS or whatever. But the Surface uses this
     * occasionally, and there is also the concept of having the miniview initially invisible until the
     * related surface contains some data.
     */
    setVisible(v: boolean): void;
    getPan(): PointXY;
    _showGroupMembers(group: Group, state: boolean): void;
    _objectRepainted(info: {
        id: string;
        obj?: Node | Group;
    }): void;
    invalidate(id?: string): void;
    setSuspended(s: boolean, updateAfterwards?: boolean): void;
    private _vertexRemoved;
    private _groupRemoved;
    private _nodeRemoved;
    private _removeAllNodes;
    private _nodeVisibility;
    _updatePanner(): void;
    _updateSurface(pannerPos?: PointXY): PointXY;
    getRenderedVertex(vertexId: string): any;
}
export {};
