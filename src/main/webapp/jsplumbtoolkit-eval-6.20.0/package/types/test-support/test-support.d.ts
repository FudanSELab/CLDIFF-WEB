import { MiniviewPlugin, MiniviewPluginOptions } from "../browser-ui-plugin-miniview/miniview-plugin";
import { BrowserJsPlumbInstance } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { Surface } from "../browser-ui/surface";
import { Endpoint } from "../ui-core/core/endpoint/endpoint";
import { PointXY } from "../ui-core/util/util";
import { Connection } from "../ui-core/core/connector/connection-impl";
import { JsPlumbToolkit, JsPlumbToolkitOptions, LoadOptions } from "../core/toolkit";
import { Edge, Group, ObjectData, Node } from "../core/model/graph";
import { BrowserUIBase, TemplateRenderer } from "../browser-ui/browser-ui-instance";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
import { SurfaceRenderOptions } from "../browser-ui/surface-render-options";
import { ObjectInfo } from "../core/datasource";
import { SurfaceAnimator } from "../browser-ui-anim/anim";
import { jsPlumbDOMElement } from "../ui-core/browser-ui-renderer/element-facade";
import { BrowserElement } from "../ui-core/browser-ui-renderer/index";
interface TestHarnessMiniviewPluginOptions extends MiniviewPluginOptions {
    width?: number;
    height?: number;
}
declare function _addDiv(id: string, parent?: HTMLElement, className?: string, styles?: Record<string, string>): any;
declare function _addDivs(ids: Array<string>, parent?: HTMLElement): void;
declare function _cleanup(): void;
/**
 * Tests that the two values are no further than `amount` apart.
 * @param v1 First value to compare
 * @param v2 Second value to compare
 * @param amount Optional, defaults to 0.0005.
 * @returns
 */
declare function delta(v1: string | number, v2: string | number, amount: number): boolean;
declare function getEdgeCanvas(connection: Connection<Element>): any;
declare function getPortCanvas(ep: Endpoint<Element>): any;
/**
 * Make an event for the given element. Events use page coordinates so we just use the getBoundingClientRect()
 * method on the given element. The event is positioned on the center of the given element.
 * @param surface
 * @param el
 * @returns a SynthesizedEvent
 * @internal
 */
declare function _makeEvt(el: Element, data?: Record<string, any>, locationOnTarget?: PointXY): SynthesizedEvent;
/**
 * An object conforming to enough of the Event interface to be used to trigger events in the DOM.
 */
export interface SynthesizedEvent {
    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
    pageX: number;
    pageY: number;
}
/**
 * Callbacks you can provide to connection drag methods to interrupt the process and inspect what's going on,
 */
export interface ConnectionDragEventHandlers {
    start?: Function;
    down?: Function;
    move?: Function;
    up?: Function;
}
/**
 * Handlers you can pass as an argument to various element drag methods, to interrupt the drag and inspect what's going on.
 */
export interface DragEventHandlers {
    afterDown?: Function;
    afterMove?: Function;
    afterUp?: Function;
}
/**
 * Synthesize an event
 * @param l
 * @param t
 * @returns a SynthesizedEvent
 * @internal
 */
declare function _evt(l: number, t: number, values?: Record<string, any>): SynthesizedEvent;
declare function _nudgeEvent(evt: SynthesizedEvent, dx: number, dy: number): SynthesizedEvent;
export interface ContainerOptions {
    width?: number;
    height?: number;
}
export declare const jsPlumbToolkitTestSupport: {
    addDiv: typeof _addDiv;
    addDivs: typeof _addDivs;
    cleanup: typeof _cleanup;
    delta: typeof delta;
    DOWN_EVENT: string;
    UP_EVENT: string;
    MOVE_EVENT: string;
    isTouchDevice: boolean;
    makeEvent: typeof _makeEvt;
    makeEventAt: typeof _evt;
    nudgeEvent: typeof _nudgeEvent;
    getEdgeCanvas: typeof getEdgeCanvas;
    getPortCanvas: typeof getPortCanvas;
    defaultEventManager: EventManager;
    /**
     * Drag any element around, not just elements managed by the surface.
     * @param el
     * @param dx
     * @param dy
     */
    dragElementBy: (el: Element, dx: number, dy: number) => void;
    attachToSurface: (surface: Surface) => jsPlumbToolkitTestHarness;
    create: (toolkitParams: JsPlumbToolkitOptions, renderParams: SurfaceRenderOptions, containerParams?: ContainerOptions, templateRenderer?: TemplateRenderer<any>) => jsPlumbToolkitTestHarness;
    trigger: (m: EventManager, el: Element, evt: string, x: number, y: number) => void;
    getTransform: (el: HTMLElement) => {
        translateX: number;
        translateY: number;
        scale: number;
    };
};
export declare class jsPlumbToolkitTestHarness {
    toolkit: BrowserUIBase;
    eventManager: any;
    surface: Surface;
    undoManager: any;
    _edgePathEditor: any;
    consoleOutput: string;
    constructor(toolkit: BrowserUIBase, surface?: Surface);
    get jsplumb(): BrowserJsPlumbInstance;
    get container(): any;
    get edgePathEditor(): any;
    /**
     * Destroy the underlying Surface and remove the test harness container from the DOM.
     */
    destroy(): void;
    /**
     * Start editing the given Edge. You need to have imported `jsplumbtoolkit/connector-editors` for this to work.
     * @param edge - Edge to edit
     * @param params - Optional editor params.
     */
    startEditing(edge: Edge, params?: any): void;
    /**
     * Stop editing an Edge. You need to have imported `jsplumbtoolkit/connector-editors` for this to work.
     */
    stopEditing(): void;
    render(renderParams: SurfaceRenderOptions, containerParams?: any): Surface;
    /**
     * Run a CSS3 query selector on the current container.
     * @param selector
     */
    querySelectorAll(selector: string): any;
    /**
     * Run a CSS3 query selector on the current container.
     * @param selector
     */
    querySelector(selector: string): any;
    /**
     * Randomly drag a node around. Can be useful to ensure the model is being updated, or you're getting
     * callbacks you expect, etc. We use this internally when we just want a node to move and we don't care where
     * it moves to.
     * @param obj
     */
    dragANodeAround(obj: Element | Connection<Element> | string | Node | Group | Edge | ObjectData, callbacks?: ConnectionDragEventHandlers): void;
    /**
     * Randomly drag a DOM element around
     * @param el
     */
    dragAnElementAround(el: HTMLElement): void;
    /**
     * Connect, using the mouse, from `obj1` to `obj2`. This will throw an Error if either or both of the arguments cannot be
     * resolved. Any interceptors you have setup on the underlying Toolkit
     * instance will be invoked - this functions just as if the user had used the mouse to drag a connection from
     * one object to the other.
     * @param obj1 An node/group/port ID, or node/group/port, or a DOM element.
     * @param obj2 An node/group/port ID, or node/group/port, or a DOM element.
     * @param callbacks Optional map of callbacks for the connection.  See `ConnectionDragEventHandlers` interface.
     */
    dragConnection(obj1: any, obj2: any, callbacks?: ConnectionDragEventHandlers, locationOnTarget?: PointXY): Connection<Element>;
    /**
     * Connect, using the mouse, the given two dom elements.
     * @param el1
     * @param el2
     * @param callbacks Optional map of callbacks for the connection.  See `ConnectionDragEventHandlers` interface.
     */
    dragConnectionBetweenElements(el1: Element, el2: Element, callbacks?: ConnectionDragEventHandlers, locationOnTarget?: PointXY): Connection<Element>;
    /**
     * Connect, using the mouse, the given two endpoints.
     * @param ep1
     * @param ep2
     * @param callbacks Optional map of callbacks for the connection.  See `ConnectionDragEventHandlers` interface.
     */
    dragConnectionBetweenEndpoints(ep1: Endpoint<jsPlumbDOMElement>, ep2: Endpoint<jsPlumbDOMElement>, callbacks?: ConnectionDragEventHandlers, locationOnTarget?: PointXY): Connection<Element>;
    /**
     * Shortcut to the underlying `load` method of the toolkit.
     * @param options
     */
    load(options: LoadOptions): JsPlumbToolkit;
    /**
     * Run a function and capture the console output.
     * @param fn
     */
    withConsole(fn: Function): void;
    /**
     * Shortcut to the underlying `clear` method of the toolkit.
     */
    clear(): JsPlumbToolkit;
    /**
     * For the given argument, find and return the corresponding DOM element.
     * @param obj A node/group/port id, or node/group/port, or a DOM element.
     */
    getRenderedElement(obj: Element | Connection<Element> | string | Node | Group | Edge | ObjectData): Element;
    /**
     * For the given edge id, find and return the underlying Connection used to render it.
     * @param edgeId An edge ID
     */
    getRenderedConnection(edgeId: string): Connection<Element>;
    /**
     * Drag the given node into the given group.
     * @param node Node id, Node, or DOM element.
     * @param group Group id, Group, or DOM element.
     */
    dragNodeIntoGroup(node: string | Node | Element, group: string | Group | Element): void;
    /**
     * Gets a Group from the underlying Toolkit.
     * @param obj Group Id, DOM element, or Group.
     * @returns
     */
    getGroup(obj: Element | Connection<Element> | string | Node | Group | Edge | ObjectData): ObjectInfo<Group>;
    /**
     * Gets a Node from the underlying Toolkit.
     * @param obj Node Id, DOM element, or Node.
     * @returns
     */
    getNode(obj: Element | Connection<Element> | string | Node | Group | Edge | ObjectData): ObjectInfo<Node>;
    /**
     * Find the corresponding Toolkit object for the given input.
     * @param obj A string representing an ID, a DOM element, or an existing Toolkit object.
     * @returns an object containing the given model object, plus its id, and type etc.
     */
    getToolkitObject<T = any>(obj: Element | Connection<Element> | string | Node | Group | Edge | ObjectData): ObjectInfo<T>;
    /**
     * Drag the given Node to the given [x,y], which are canvas coordinates.
     * @param obj  Node id, node, or DOM element.
     * @param x Location on canvas in X axis to position top left corner of the node.
     * @param y Location on canvas in Y axis to position top left corner of the node.
     */
    dragNodeTo(obj: string | Node | Element, x: number, y: number): void;
    /**
     * Drag the given Node by the given x/y amounts.
     * @param obj  Node id, node, or DOM element.
     * @param x Amount to move in X axis
     * @param y Amount to move in Y axis
     * @param eventHandlers
     */
    dragNodeBy(obj: string | Node | Element, x: number, y: number, eventHandlers?: Record<string, Function>): void;
    /**
     * Drag the given DOM element by the given x/y amounts.
     * @param el  DOM element.
     * @param x Amount to move in X axis
     * @param y Amount to move in Y axis
     */
    dragElementBy(el: BrowserElement, x: number, y: number, eventHandlers?: Record<string, Function>): void;
    /**
     * Drag an element over a number of stages, advancing a little each time.
     * @param el
     * @param x
     * @param y
     * @param stages
     * @param eventHandlers
     */
    dragElementByInStages(el: BrowserElement, x: number, y: number, stages?: number, eventHandlers?: Record<string, Function>, metaKeys?: Record<string, boolean>): void;
    /**
     * Connect the given source and target via a call on the Toolkit, ie. without using the mouse.
     * @param source Node/Port/Group id, node/port/group, or DOM element.
     * @param target Node/Port/Group id, node/port/group, or DOM element.
     * @param data Optional data for the edge.
     */
    connect(source: any, target: any, data?: ObjectData): Edge;
    /**
     * Drag the given Group to the given [x,y], which are canvas coordinates.
     * @param obj Group id, group, or DOM element.
     * @param x Location on canvas in X axis to position top left corner of the group.
     * @param y Location on canvas in Y axis to position top left corner of the group.
     */
    dragGroupTo: (obj: string | Node | Element, x: number, y: number) => void;
    /**
     * Drags a connection between two vertices, either by supplying the ID of the vertices, or the element representing the vertex and some query
     * selector that identifies a part of the dom element. We use this in the Toolkit's own test suite to ensure that connections can be dragged from
     * specific parts of some element, or that a connection source on an element does not cause the element to be dragged, etc.
     * @param source
     * @param target
     * @param callbacks
     */
    dragConnectionBetweenVertexElements(source: string | [string, string], target: string | [string, string], callbacks: ConnectionDragEventHandlers, locationOnTarget?: PointXY): Connection<Element>;
    /**
     * Use the mouse to drag the target endpoint of the given edge and drop it on distant whitespace, causing the edge to be detached.
     * @param edge
     */
    detachEdge(edge: Edge): void;
    /**
     * Trigger the event with the given name on the given object. By default the event will occur in the middle of the DOM element
     * representing the object.
     * @param obj Node/Port/Group id, node/port/group, or DOM element.
     * @param eventName eg 'click', 'mouseover'
     * @param evt Optional, an event you previously created via #makeEvent. Sometimes you want to control the specific location
     * of the event.
     */
    trigger(obj: any, eventName: string, evt: any): void;
    /**
     * Trigger an event on the given DOM element.
     * @param el
     * @param eventName
     */
    triggerOnElement(el: HTMLElement, eventName: string): void;
    /**
     * Trigger the provided event on the given DOM element.
     * @param el
     * @param eventName
     */
    triggerEventOnElement(el: HTMLElement, eventName: string, data: Record<string, any>): void;
    /**
     * Synthesize an event for the given object.
     * @param obj Node/Port/Group id, node/port/group, or DOM element.
     * @param dx Optional offset from the center of the x axis of the related DOM element to position the event.
     * @param dy Optional offset from the center of the y axis of the related DOM element to position the event.
     * @returns a SynthesizedEvent
     */
    makeEvent(obj: any, dx: number, dy: number): SynthesizedEvent;
    /**
     * Make an event at the given page location.
     * @param x
     * @param y
     */
    makeEventAt(x: number, y: number): SynthesizedEvent;
    /**
     * Gets an Edge.
     * @param obj Edge ID, or Edge object.
     */
    getEdge(obj: any): Edge;
    /**
     * Updates an Edge.
     * @param edge Edge, or edge ID.
     * @param data Data to update the edge with.
     */
    updateEdge(edge: any, data: any): void;
    /**
     * Gets all edges in the underlying Toolkit.
     */
    getAllEdges(): Array<Edge>;
    /**
     * Gets the Endpoint that was rendered for some port.
     * @param obj Port, or port ID.
     */
    getRenderedPort(obj: any): Element;
    /**
     * Returns the list of Endpoints associated with the given node/group.
     * @param vertexId
     */
    getEndpoints(vertexId: string): Array<Endpoint<Element>>;
    /**
     * Add a Node to the Toolkit.
     * @param data Data for the Node.
     */
    addNode(data: ObjectData): Node;
    /**
     * Update a Node in to the Toolkit.
     * @param obj Node, or Node Id.
     * @param data Data for the Node.
     */
    updateNode(obj: any, data: ObjectData): void;
    /**
     * Clicks on the node with the given ID.
     * @param nodeId ID of the node to click on.
     */
    clickOnNode(nodeId: string): void;
    /**
     * Double clicks on the node with the given ID.
     * @param nodeId ID of the node to click on.
     */
    dblClickOnNode(nodeId: string): void;
    /**
     * Right-clicks on the node with the given ID.
     * @param nodeId ID of the node to click on.
     */
    rightClickOnNode(nodeId: string): void;
    /**
     * Simulates a tap event on the node with the given id - a tap event is a mousedown followed by a mouseup whose page coordinates are
     * identical to the mousedown event's page coordinates.
     * @param nodeId
     */
    tapOnNode(nodeId: string): void;
    /**
     * Simulates a double tap event on the node with the given id - a tap event is a mousedown followed by a mouseup whose page coordinates are
     * identical to the mousedown event's page coordinates.
     * @param nodeId
     */
    dblTapOnNode(nodeId: string): void;
    mousemoveOnNode(nodeId: string): void;
    mouseoverOnNode(nodeId: string): void;
    mouseoutOnNode(nodeId: string): void;
    mouseupOnNode(nodeId: string): void;
    mousedownOnNode(nodeId: string): void;
    contextmenuOnNode(nodeId: string): void;
    /**
     * Clicks on the canvas.
     */
    clickOnCanvas(clickCount?: number, button?: number): void;
    /**
     * Right-clicks on the canvas.
     */
    rightClickOnCanvas(clickCount?: number): void;
    /**
     * Update a Group in the Toolkit.
     * @param obj Group, or Group Id.
     * @param data Data for the Group.
     */
    updateGroup(obj: any, data: ObjectData): void;
    /**
     * Clicks on the group with the given ID.
     * @param groupId ID of the group to click on.
     */
    clickOnGroup(groupId: string): void;
    /**
     * Clicks on an element
     */
    clickOnElement(el: HTMLElement): void;
    /**
     * Clicks on an element inside the node with the given ID.
     * @param nodeId ID of the node to click on.
     * @param selector CSS selector identifying the child element to click on.
     */
    clickOnElementInsideNode(nodeId: string, selector: string): void;
    /**
     * Double clicks on an element inside the node with the given ID.
     * @param nodeId ID of the node to double click on.
     * @param selector CSS selector identifying the child element to click on.
     */
    dblClickOnElementInsideNode(nodeId: string, selector: string): void;
    /**
     * Taps on an element (mousedown followed by mouseup
     */
    tapOnElement(el: HTMLElement): void;
    /**
     * Taps on an element inside the node with the given ID.
     * @param nodeId ID of the node to tap on.
     * @param selector CSS selector identifying the child element to click on.
     */
    tapOnElementInsideNode(nodeId: string, selector: string): void;
    /**
     * Taps on an element inside the node with the given ID.
     * @param nodeId ID of the node to tap on.
     * @param selector CSS selector identifying the child element to click on.
     */
    dblTapOnElementInsideNode(nodeId: string, selector: string): void;
    /**
     * Clicks on the given edge
     * @param edgeId ID of the edge to click on
     */
    clickOnEdge(edgeId: string): void;
    /**
     * Double clicks on the given edge
     * @param edgeId ID of the edge
     */
    dblClickOnEdge(edgeId: string): void;
    /**
     * Taps on the given edge
     * @param edgeId ID of the edge
     */
    tapOnEdge(edgeId: string): void;
    /**
     * Double taps on the given edge
     * @param edgeId ID of the edge
     */
    dblTapOnEdge(edgeId: string): void;
    /**
     * Synthesize a mousedown event on the edge with the given id.
     * @param edgeId
     */
    mousedownOnEdge(edgeId: string): void;
    /**
     * Synthesize a mouseup event on the edge with the given id.
     * @param edgeId
     */
    mouseupOnEdge(edgeId: string): void;
    mouseoverOnEdge(edgeId: string): void;
    mouseoutOnEdge(edgeId: string): void;
    contextmenuOnEdge(edgeId: string): void;
    /**
     * Clicks on the overlay with the given ID, on the given Edge.
     * @param edgeId ID of the Edge
     * @param overlayId ID of the overlay to click on.
     */
    clickOnOverlay(edgeId: string, overlayId: string): void;
    /**
     * Clicks on the endpoint
     */
    clickOnEndpoint(ep: Endpoint<jsPlumbDOMElement>): void;
    /**
     * Clicks on the port with the given ID on the node with given node id.
     * @param nodeId ID of the node containing the port
     * @param portId ID of the port to click on.
     */
    clickOnPort(nodeId: string, portId: string): void;
    /**
     * Returns the count of Edges in the underlying Toolkit.
     */
    getEdgeCount(): number;
    /**
     * Drag the given element onto the canvas, optionally at a specific x,y. Use this when you want to test drag/drop
     * from some palette.
     * @param el Element to drop onto the canvas.
     * @param x Optional, defaults to 250.
     * @param y Optional, defaults to 250.
     */
    dragElementToCanvas(el: HTMLElement, x: number, y: number): void;
    /**
     * Add a miniview to this test harness.
     * @param miniviewOptions Options for the miniview.
     */
    addMiniview(miniviewOptions: TestHarnessMiniviewPluginOptions): MiniviewPlugin;
    /**
     * Gets the position in the DOM of the element representing the given Node or Group
     * @param v
     */
    getDOMPosition(v: string | Node | Group): PointXY;
    /**
     * Returns whether or not the DOM element representing the given vertex is at the given point `p`.
     * @param v node/group or id of node/group
     * @param x x location to test
     * @param y y location to test
     */
    isAtPosition(v: string | Node | Group, x: number, y: number): boolean;
    /**
     * Attaches a SurfaceAnimator to the surface, and returns it.
     */
    attachAnimator(): SurfaceAnimator;
    within(val: number, target: number, _ok: Function, msg: string): void;
}
export {};
