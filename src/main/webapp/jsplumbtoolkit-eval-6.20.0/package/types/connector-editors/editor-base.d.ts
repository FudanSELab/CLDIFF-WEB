import { BrowserJsPlumbInstance } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { LightweightAnchor, LightweightContinuousAnchor } from "../ui-core/core/factory/anchor-record-factory";
import { PointXY, Size } from "../ui-core/util/util";
import { Endpoint } from "../ui-core/core/endpoint/endpoint";
import { ConnectorEditor, ConnectorEditorActivateParams } from "../browser-ui/connector-editor";
import { Connection } from "../ui-core/core/connector/connection-impl";
import { Edge, Vertex } from "../core/model/graph";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
import { Surface } from "../browser-ui/surface";
import { DragHandlerOptions } from "../ui-core/browser-ui-renderer/collicat";
import { Connector } from "../ui-core/common/connector";
import { BrowserElement } from "../ui-core/browser-ui-renderer/index";
import { ViewportElement } from "../ui-core/core/viewport";
export declare const PX = "px";
export declare const ATTR_ANCHOR_FACE = "jtk-anchor-face";
export declare const CLASS_ANCHOR_PLACEHOLDER = "jtk-anchor-placeholder";
export declare const CLASS_ANCHOR_CANDIDATE = "jtk-anchor-candidate";
export declare const CLASS_EDGE_DELETE_BUTTON = "jtk-edge-delete";
export declare const CLASS_CONNECTION_EDIT = "jtk-connection-edit";
export declare const EVT_CLEAR_CONNECTION_EDITS = "clearConnectionEdits";
export declare const EVT_START_CONNECTION_EDIT = "startConnectionEdit";
export declare const EVT_STOP_CONNECTION_EDIT = "stopConnectionEdit";
export declare const EVT_ZOOM = "zoom";
/**
 * @internal
 */
export declare const ANCHOR_PLACEHOLDER_SELECTOR: string;
/**
 * @internal
 */
export declare function _makeHandle(x: number, y: number, clazz: string, visible?: boolean): HTMLElement;
/**
 * @internal
 */
export declare function _makeAndAppendHandle(x: number, y: number, _jsPlumb: BrowserJsPlumbInstance, clazz: string, visible?: boolean): HTMLElement;
/**
 * @internal
 */
export declare function relocateContinuousAnchor(anchor: LightweightContinuousAnchor, ep: Endpoint<Element>, pos: PointXY, dragEl: Element, constrainRect: Size, elementSize: Size, idx: number, connector: Connector, instance: BrowserJsPlumbInstance): PointXY;
/**
 * Relocate the given dynamic anchor according to the given proximity of `pos` to each of the anchor's supported locations. the face is changed
 * on the anchor itself (and the anchor is locked), and in this case we simply return the current value of `pos`, meaning the user sees the drag proxy
 * under the mouse cursor, which is probably not where the anchor is now positioned, but it makes for a better UX. on drag stop, for all anchor types,
 * the anchor proxy is relocated to the current value.
 * @param anchor
 * @param ep
 * @param pos
 * @param dragEl
 * @param constrainRect
 * @internal
 */
export declare function relocateDynamicAnchor(anchor: LightweightAnchor, ep: Endpoint<Element>, pos: PointXY, dragEl: Element, constrainRect: Size): PointXY;
/**
 * Options for the EdgePathEditor.
 * @public
 */
export interface ConnectorEditorOptions {
    /**
     * When true (which is the default), tells the EdgePathEditor to mark any new connection dragged with the
     * mouse as "edited", ie. to fix the initial geometry. This is particularly beneficial when using
     * an `anchorPositionFinder`: it results in every new edge having a 'geometry' object, so that if
     * you export the dataset, you will get the anchor values you chose in your anchorPositionFinder. If an edge
     * does not get exported with geometry for its path, next time it is loaded it will be assigned anchors
     * automatically, which may or may not match the anchors you actually wanted.
     */
    activeMode?: boolean;
}
/**
 * Class applied to edge drag handles.
 * @public
 */
export declare const EDGE_DRAG_HANDLE = "jtk-edge-handle";
/**
 * Base class for connector editors.  This isn't a class that users of the API will ordinarily need to interact directly with.
 * @internal
 */
export declare abstract class EditorBase<ConnectorType extends Connector> implements ConnectorEditor {
    protected surface: Surface;
    current: Connection<BrowserElement>;
    currentConnector: ConnectorType;
    currentEdge: Edge;
    currentSourceVertex: Vertex;
    currentTargetVertex: Vertex;
    sourceInfo: ViewportElement<BrowserElement>;
    targetInfo: ViewportElement<BrowserElement>;
    currentOverlays: Array<any>;
    sourceDimensions: any;
    targetDimensions: any;
    sourceAnchorPlaceholder: BrowserElement;
    targetAnchorPlaceholder: BrowserElement;
    active: boolean;
    jsplumb: BrowserJsPlumbInstance;
    private sourceAnchorPositionFinder;
    private targetAnchorPositionFinder;
    snapToAnchors: boolean;
    eventManager: EventManager;
    update: () => void;
    cleanup: () => void;
    private _dragHandlers;
    private _anchorDragContext;
    abstract _repaint(args?: any): void;
    /**
     * For the given vertex type, retrieve its type definition and return any `anchorPositions` that were
     * registered for it.
     * @param vertex
     * @private
     */
    private _resolveAnchorPositions;
    protected constructor(surface: Surface, options: ConnectorEditorOptions);
    private _attachOverlay;
    private _attachOverlays;
    private _detachOverlays;
    private _attachDeleteButton;
    /**
     * Repaints the current connection, passing some arguments, optionally. These are retrieved inside `refresh`,
     * and are ultimately handed off to the subclass's `repaint` method. Subclasses should call this on things like handle
     * dragging, as the existence (and nature of ) args can subsequently be used by their `repaint` method to decide whether or not
     * to redraw all the handles (such as you would in the event of an external paint event), or just to reposition the existing
     * ones. During a drag, of course, blowing away the current handle would be bad.
     * @internal
     */
    protected repaintConnection(args?: any): void;
    /**
     * Fires a connection edit event, passing the current connection, and the current
     * connection's exported geometry.
     * @internal
     */
    protected fireConnectionEditEvent(): void;
    /**
     * Redraw anchor placeholders and editor handles.
     * @param args Optional args to pass to the subclass repaint method.
     * @internal
     */
    refresh(args?: any): void;
    /**
     * Draws, or repositions if they exist already, the anchor placeholders for the current connection.
     * @internal
     */
    private _drawAnchorPlaceholders;
    /**
     * Removes anchor placeholders.
     * @internal
     */
    private _cleanupAnchors;
    /**
     * @internal
     */
    _clearGeometry(): void;
    /**
     * @internal
     */
    reset(): void;
    /**
     * @internal
     */
    isActive(): boolean;
    /**
     * @internal
     * @param el
     * @param x
     * @param y
     */
    protected _setElementPosition(el: HTMLElement, x: number, y: number): void;
    /**
     * Activate the editor, with the given Connection.
     * @param edge - Edge to edit.
     * @param connection - Connection to activate the editor for.
     * @param params - optional params for the activation. The type of this depends on the subclass.
     * @internal
     */
    activate<T extends ConnectorEditorActivateParams>(edge: Edge, connection: Connection<BrowserElement>, params?: T): void;
    /**
     * Deactivates the editor, removing all editor handles and anchor placeholders etc.
     * @param e
     */
    deactivate(e?: Event): void;
    protected _addDragHandler(o: DragHandlerOptions, atStart?: boolean): void;
    abstract _update(args?: any): void;
    abstract _clearHandles(): void;
    abstract _activate(conn: Connection<Element>, params?: any): void;
    abstract _elementDragged(p: any): void;
    abstract _elementDragging(p: any): void;
}
