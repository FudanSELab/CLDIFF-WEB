import { DataSource, ObjectInfo } from "./datasource";
import { JsPlumbToolkit, ObjectFactory } from "./toolkit";
import { Graph, Base, Port, Group, Node, Edge, Vertex } from "./model/graph";
import { FilterableDataset } from "./filterable-dataset";
import { DataModel } from "./datamodel/data-model";
import { Path } from "./model/path";
import { ToolkitRenderer } from "./renderer";
import { EventGenerator } from "../ui-core/util/event-generator";
/**
 * Possible modes for a Selection.
 * mixed: any combination of vertices and edges is supported
 * isolated: either a set of vertices, or a set of edges, but not both at the same time
 * nodesOnly: only Node objects
 * groupsOnly: only Group objects
 * edgesOnly:only Edge object.
 * @public
 */
export declare enum SelectionModes {
    mixed = "mixed",
    isolated = "isolated",
    nodesOnly = "nodesOnly",
    groupsOnly = "groupsOnly",
    edgesOnly = "edgesOnly"
}
/**
 * Possible modes for a selection.
 * @public
 */
export declare type SelectionMode = keyof typeof SelectionModes;
/**
 * Options for the behaviour of a selection.
 * @public
 */
export interface SelectionOptions {
    /**
     * Optional. called after a reload when a `generator` was supplied.
     */
    onReload?: Function;
    /**
     * Optional. called before the selection is cleared at the beginning of a reload, when a `generator` is supplied.
     */
    onBeforeReload?: Function;
    /**
     * Optional function to call when the selection is cleared.
     */
    onClear?: Function;
    /**
     * Defaults to false. If true, and a `generator` is supplied,
     */
    autoFill?: boolean;
    /**
     * Optional function that can be called to fill the selection. You'd use this
     * when you are rendering individual selections and you need to be able to refresh the whole view based on some
     * change in the data model.
     */
    generator?: Function;
    /**
     * If true, the selection will not populate itself as soon as it is constructed. Otherwise, and this is the default
     * behaviour, it will.
     */
    lazy?: boolean;
    /**
     * Defaults to SelectionModes.mixed, meaning any combination of nodes, groups and edges may be present in the
     * selection at a given point in time.
     */
    mode?: SelectionMode;
}
declare type ListSuffix = ":removed" | ":added" | ":updated";
/**
 * A selection is a group of vertices and edges, upon which you can perform bulk operations.
 */
export declare class Selection<T = Node | Edge | Group> extends EventGenerator implements DataSource, FilterableDataset {
    toolkit: JsPlumbToolkit;
    static DISCARD_EXISTING: string;
    static DISCARD_NEW: string;
    maxNodes: number;
    maxEdges: number;
    maxGroups: number;
    _nodes: Array<Node>;
    _groups: Array<Group>;
    _edges: Array<Edge>;
    capacityPolicy: string;
    generator: Function;
    onReload: Function;
    onBeforeReload: Function;
    onClear: Function;
    autoFill: boolean;
    dataSource: DataSource;
    private _$_objMap;
    private _mode;
    _loading: boolean;
    edgeFactory: ObjectFactory;
    private _getList;
    /**
     * Sets the selection's current mode, flushing any objects which do not match the given mode. If you switch to
     * `SelectionModes.isolated` the entire selection is cleared, because it does not know what single supported type
     * should be until something is subsequently added.
     * @param mode
     */
    setMode(mode: SelectionMode): void;
    _pushToList(obj: Base): any;
    _fireListEvent(obj: Base, suffix: ListSuffix): void;
    constructor(toolkit: JsPlumbToolkit, params?: SelectionOptions);
    private _addOne;
    private _modePermitsAddition;
    private _removeOne;
    private _toggle;
    private _makeSenseOf;
    /**
     * Removes the given object from the selection.
     * @param obj Object(s) to remove. May take many forms - a Group, Group Id, Node, Node Id, or Edge, or a list of these,
     * or a Path.
     */
    remove(obj: string | Array<string> | Base | Array<Base> | Path | Selection, evtPipe?: any): any[];
    /**
     * Appends the given object to the selection.
     * @param obj Object(s) to add. May take many forms - a Group, Group Id, Node, Node Id, or Edge, or a list of these,
     * or a Path.
     */
    append(obj: string | Array<string> | Base | Array<Base> | Path | Selection, evtPipe?: any): any[];
    /**
     * Toggles the given object's membership in the current selection. If `obj` is a Path, then the individual
     * members of the Path are toggled independently.
     * @param obj Object(s) to add. May take many forms - a Group, Group Id, Node, Node Id, or Edge, or a list of these,
     * or a Path.
     */
    toggle(obj: string | Array<string> | Base | Array<Base> | Path | Selection, evtPipe?: any): any[];
    /**
     * Sets the maximum number of nodes the selection can hold. The action taken when appending a node that would
     * take the selection above its limit depends on the current `capacityPolicy`, which can be either
     * Selection.DISCARD_EXISTING (the default) or Selection.DISCARD_NEW.
     * @param _maxNodes
     */
    setMaxNodes(_maxNodes: number): void;
    /**
     * Sets the maximum number of groups the selection can hold. The action taken when appending a group that would
     * take the selection above its limit depends on the current `capacityPolicy`, which can be either
     * Selection.DISCARD_EXISTING (the default) or Selection.DISCARD_NEW.
     * @param _maxGroups
     */
    setMaxGroups(_maxGroups: number): void;
    /**
     * Sets the maximum number of edges the selection can hold. The action taken when appending an edge that would
     * take the selection above its limit depends on the current `capacityPolicy`, which can be either
     * Selection.DISCARD_EXISTING (the default) or Selection.DISCARD_NEW.
     * @param _maxEdges
     */
    setMaxEdges(_maxEdges: number): void;
    /**
     * Sets the action taken when appending an edge or node that would
     * take the selection above its limit for that given type.
     * @param policy One of `Selection.DISCARD_EXISTING` (which removes the 0th entry from the list
     * before insertion of the new value) or `Selection.DISCARD_NEW`.
     */
    setCapacityPolicy(policy: string): void;
    private _clearEdges;
    private _clearNodes;
    private _clearGroups;
    private _clearVertices;
    private _clearAll;
    /**
     * Clears the selection. Does not fire individual deselect events.
     * @param doNotFireEvent
     */
    clear(doNotFireEvent?: boolean): void;
    private _filterEdgeList;
    /**
     * Reloads the content of this Selection, if a `generator` was supplied to the constructor. Otherwise
     * does nothing. A data load start event is fired first, followed by a call to the generator to repopulate,
     * and then a data load end event is fired.  So calling this method on a Selection that you are rendering
     * to a Surface will cause the Surface to repaint itself.
     */
    reload(): void;
    /**
     * Iterates the objects of the given type in the selection, calling the supplied callback
     * for each item. The callback's signature should be `function(index, item)`. If you don't supply
     * `type`, the default of "Node" will be used.
     * @param  fn Function to call with each item.
     * @param type Type of object to iterate. Defaults to Node.objectType.
     */
    private each;
    /**
     * Iterates the Nodes in the selection, calling the supplied callback
     * for each item. The callback's signature should be `function(index, item)`.
     * @param fn Function to call with each item.
     */
    eachNode(fn: (idx: number, n: Node) => any): void;
    /**
     * Iterates the Groups in the selection, calling the supplied callback
     * for each item. The callback's signature should be `function(index, item)`.
     * @param fn Function to call with each item.
     */
    eachGroup(fn: (idx: number, g: Group) => any): void;
    /**
     * Iterates the Nodes and the Groups in the selection, calling the supplied callback
     * for each item. The callback's signature should be `function(index, item)`.
     * @param fn Function to call with each item.
     */
    eachVertex(fn: (idx: number, v: Vertex) => any): void;
    /**
     * Iterates the Edges in the selection, calling the supplied callback
     * for each item. The callback's signature should be `function(index, item)`.
     * @param fn Function to call with each item.
     */
    eachEdge(fn: (idx: number, e: Edge) => any): void;
    /**
     * Get the current number of Nodes in the selection.
     */
    getNodeCount(): number;
    /**
     * Gets the node at the given index.
     * @param idx Index of the Node to retrieve. Will return null if index out of range.
     * @returns A Node, or null.
     */
    getNodeAt(idx: number): Node;
    /**
     * Gets all the Nodes in the Selection.
     */
    getNodes(): Array<Node>;
    /**
     * Gets the Node with the given ID, if it is in the current selection
     * @param id ID of the Node to retrieve
     */
    getNode(id: string): Node;
    /**
     * Gets the Group at the given index.
     * @param idx Index of the Gorup to retrieve. Will return null if index out of range.
     * @returns A Group, or null.
     */
    getGroupAt(idx: number): Group;
    /**
     * Gets all the Groups in the Selection.
     */
    getGroups(): Array<Group>;
    /**
     * Gets the Group with the given ID, if it is in the selection.
     * @param id ID of the Group to retrieve
     */
    getGroup(id: string): Group;
    /**
     * Get the current number of Groups in the selection.
     */
    getGroupCount(): number;
    /**
     * Gets all the nodes, edges and groups.
     */
    getAll(): Array<T>;
    /**
     * Gets all Edges for the given Node or Group.
     * @param node The Node to get Edges for.
     * @param filter Optional filter for edges.
     * @returns An array of Edges, which may be empty. Never null.
     */
    getAllEdgesFor(node: Vertex, filter?: (e: Edge) => boolean): Array<Edge>;
    /**
     * Gets all source Edges for the given Node or Group.
     * @param v The Node/Group to get source Edges for.
     * @returns An array of Edges, which may be empty. Never null.
     */
    getSourceEdgesFor(v: Node | Group): Array<Edge>;
    /**
     * Get the current number of Edges in the selection.
     */
    getEdgeCount(): number;
    /**
     * Gets the Edge at the given index.
     * @param idx Index of the Edge to retrieve.
     * @returns Edge at the given index, null if nothing found at that index.
     */
    getEdgeAt(idx: number): Edge;
    /**
     * Gets all the edges in the selection
     * @returns All the edges in the selection, perhaps an empty list. Never null.
     */
    getEdges(): Array<Edge>;
    /**
     * @internal
     */
    shouldFireEvent(event: string, value: any, originalEvent?: Event): boolean;
    getNodeType(nodeData: Record<string, any>): string;
    getModel(): DataModel;
    getGraph(): Graph;
    setSuspendGraph(v: boolean): void;
    getNodeId(node: Record<string, any>): string;
    getPortType(port: Record<string, any>): string;
    addPort(node: string | Node, data: Record<string, any>, doNotFireEvent?: boolean): Port;
    getPortId(port: Record<string, any>): string;
    getEdge(edgeId: string): Edge;
    addEdge(params: any, source?: any, doNotFireEvent?: boolean): Edge;
    edgeMoved(edge: Edge, obj: any, index: number): void;
    removeEdge(edge: Edge): void;
    setEdgeGeometry(edge: Edge, geometry: any, renderer: ToolkitRenderer<any>): void;
    getEdgeType(edgeData: Record<string, any>): string;
    addToGroup(node: Node, group: Group, sourceGroup?: Group, position?: any): boolean;
    removeFromGroup(node: Node, doNotFireEvent?: boolean, targetGroup?: Group, source?: ToolkitRenderer<any>): Group;
    /**
     * Returns the vertex with the given id, if it is in the selection.
     * @param id
     */
    getVertex(id: string): Vertex;
    /**
     * Returns whether or not the vertex (node/group) with the given id is in the selection.
     * @param id
     */
    containsVertex(id: string): boolean;
    getObjectInfo<T>(obj: any): ObjectInfo<T>;
    beforeConnect(source: Vertex, target: Vertex, data?: any): any;
    beforeMoveConnection(source: Vertex, target: Vertex, edge: Edge): any;
    beforeStartConnect(source: Vertex, type: string): any;
    beforeDetach(source: Vertex, target: Vertex, edge: Edge): any;
    beforeStartDetach(source: Vertex, edge: Edge): any;
    get debugEnabled(): boolean;
    batch(fn: () => any): void;
    protected _createSelection(onClear?: Function): Selection;
    filter(spec: any, includePartials?: boolean): Selection;
}
export {};
