import { Graph, IdFunction, TypeFunction, ObjectData, Base, Node, Port, Group, Vertex, Edge, AddEdgeOptions } from "./model/graph";
import { AutoSaveOptions, AutoSaver } from "./autosaver";
import { Cluster } from "./model/cluster";
import { Path, PathOptions } from "./model/path";
import { Selection } from "./selection";
import { ToolkitRenderer } from "./renderer";
import { DataSource, ObjectInfo } from "./datasource";
import { DataLoadOptions } from "./io";
import { DataModel, DataModelDefinition } from "./datamodel/data-model";
import { SelectionMode } from './selection';
import { EdgeSelectionParams } from "./params";
import { TransactionCleanupAction, UndoRedoManager } from "./undo-redo/undo-redo";
import { OptimisticEventGenerator } from "../ui-core/util/event-generator";
import { PointXY } from "../ui-core/util/util";
/**
 * Definition of a function to use as a beforeConnect interceptor.
 * @param source - The source vertex for the new edge
 * @param target - The target vertex for the new edge
 * @param data - optional initial data for the edge, which would have
 * @param userInstigated - If true, the new edge came from user activity, with a pointer device or touch input. This will be
 * false whenever the edge is added programmatically, either during a data load or via the `addEdge` method of the Toolkit.
 */
export declare type BeforeConnectInterceptor = (source: Vertex, target: Vertex, data?: Record<string, any>, userInstigated?: boolean) => any;
/**
 * A function to run before an edge of the given type is relocated from its current source or target to a new
 * source or target. Returning false from this method will abort the move.
 * @param source Candidate source. May be the edge's current source, or may be a new source.
 * @param target Candidate target. May be the edge's current target, or may be a new target.
 * @param edge The edge that is being moved.
 */
export declare type BeforeMoveConnectionInterceptor = (source: Vertex, target: Vertex, edge: Edge) => any;
/**
 * A function to run before an edge of the given type is dragged from the given source. Returning false from
 * this method will abort the connection.
 * @param source
 * @param type
 * @returns If you return boolean false from this method the connection is aborted. If you return an object from this method it will
 * be used as the initial data for the resulting edge.
 */
export declare type BeforeStartConnectInterceptor = (source: Vertex, type: string) => boolean | Record<string, any>;
/**
 * A function to run before the given edge is detached from the given source vertex. If this method returns false, the
 * detach will be aborted.
 * @param source Edge's source.
 * @param target Candidate target for the edge
 * @param edge The edge that is being detached.
 */
export declare type BeforeDetachInterceptor = (source: Vertex, target: Vertex, edge: Edge) => boolean;
/**
 * A function to run before the given edge is detached from the given source vertex. If this method returns false, the
 * detach will be aborted. The difference between this and `beforeDetach` is that this method is fired as soon as a user
 * tries to detach an edge from an endpoint in the UI, whereas `beforeDetach` allows a user to detach the edge in the UI.
 * @param source
 * @param edge
 */
export declare type BeforeStartDetachInterceptor = (source: Vertex, edge: Edge) => Record<string, any> | boolean;
/**
 * Constructor options for a Toolkit instance.
 * @public
 */
export interface JsPlumbToolkitOptions {
    /**
     * The name of a property that will exist inside the backing data for nodes/group, and which represents a list of ports pertaining
     * to that node/group. When a node/group is rendered, if this property is set, the Toolkit will consider the value of this
     * property to be a list of port data object. So this property's value should be of type `Array<ObjectData>`
     */
    portDataProperty?: string;
    /**
     * The name of a property inside of each port's data that can be used to order the ports. For instance, you might have
     * ports that have a `rank` property, which is a number. The Toolkit will sort the ports according to the natural ordering
     * of this property.
     */
    portOrderProperty?: string;
    model?: DataModelDefinition;
    /**
     * The name of the property inside a vertex's data that identifies its location in the x axis. Defaults to `left`.
     */
    modelTopAttribute?: string;
    /**
     * The name of the property inside a vertex's data that identifies its location in the y axis. Defaults to `top`.
     */
    modelLeftAttribute?: string;
    /**
     * The name of the property inside a vertex's data that identifies its width. Defaults to `width`.
     */
    modelWidthAttribute?: string;
    /**
     * The name of the property inside a vertex's data that identifies its height. Defaults to `height`.
     */
    modelHeightAttribute?: string;
    nodeFactory?: ObjectFactory;
    edgeFactory?: ObjectFactory;
    portFactory?: ObjectFactory;
    groupFactory?: ObjectFactory;
    /**
     * Whether or not to automatically save the data when an update to a model object occurs. If you set this then
     * you need to provide `saveUrl` or `autoSaveHandler`.
     */
    autoSave?: boolean;
    /**
     * Optional type to use for auto save. Defaults to "json", the default input/output format the Toolkit uses. If you
     * have registered your own exporter you can use this parameter to instruct the Toolkit to auto save via that exporter.
     */
    autoSaveType?: string;
    /**
     * URL for auto save endpoint.
     */
    saveUrl?: string;
    /**
     * A debounce timeout to use when the `autoSave` functionality is turned on. You can use this to reduce the number
     * of calls to your auto save endpoint.
     */
    autoSaveDebounceTimeout?: number;
    /**
     * A map of HTTP headers to send along with an auto save request.
     */
    saveHeaders?: any;
    /**
     * A function to call when an auto save operation was successful.
     */
    onAutoSaveSuccess?: () => any;
    /**
     * A function to call when an auto save operation experienced an error.
     */
    onAutoSaveError?: () => any;
    /**
     * A handler for the auto save operation. You need to provide this or `saveUrl` if you set `autoSave:true`.
     * @param instance
     */
    autoSaveHandler?: (instance: JsPlumbToolkit) => any;
    /**
     * Sets whether or not the Toolkit manipulates the original dataset when updates are made. Defaults to true.
     * @see setDoNotUpdateOriginalData
     */
    doNotUpdateOriginalData?: boolean;
    /**
     * A function to run before auto save runs.
     */
    onBeforeAutoSave?: () => any;
    /**
     * A function to run after the auto save has run.
     */
    onAfterAutoSave?: () => any;
    /**
     * The character to use in port identifiers. Defaults to `.`, eg. someVertex.somePort.
     */
    portSeparator?: string;
    /**
     * The default cost for an edge. Default value is 1.
     */
    defaultCost?: number;
    /**
     * Whether edges are directed by default. The default value for this is `true` - edges are directed by default.
     */
    defaultDirected?: boolean;
    /**
     * @internal
     */
    enableSubgraphs?: boolean;
    /**
     * Definition of a function to use as a beforeConnect interceptor.
     * @param source - The source vertex for the new edge
     * @param target - The target vertex for the new edge
     * @param userInstigated - If true, the new edge came from user activity, with a pointer device or touch input. This will be
     * false whenever the edge is added programmatically, either during a data load or via the `addEdge` method of the Toolkit.
     */
    beforeConnect?: BeforeConnectInterceptor;
    /**
     * A function to run before an edge of the given type is relocated from its current source or target to a new
     * source or target. Returning false from this method will abort the move.
     * @param source Candidate source. May be the edge's current source, or may be a new source.
     * @param target Candidate target. May be the edge's current target, or may be a new target.
     * @param edge The edge that is being moved.
     */
    beforeMoveConnection?: BeforeMoveConnectionInterceptor;
    /**
     * A function to run before an edge of the given type is dragged from the given source. Returning false from
     * this method will abort the connection.
     * @param source
     * @param type
     */
    beforeStartConnect?: BeforeStartConnectInterceptor;
    /**
     * A function to run before the given edge is detached from the given source vertex. If this method returns false, the
     * detach will be aborted.
     * @param source Edge's source.
     * @param target Candidate target for the edge
     * @param edge The edge that is being detached.
     */
    beforeDetach?: BeforeDetachInterceptor;
    /**
     * A function to run before the given edge is detached from the given source vertex. If this method returns false, the
     * detach will be aborted. The difference between this and `beforeDetach` is that this method is fired as soon as a user
     * tries to detach an edge from an endpoint in the UI, whereas `beforeDetach` allows a user to detach the edge in the UI.
     * @param source
     * @param edge
     */
    beforeStartDetach?: BeforeStartDetachInterceptor;
    /**
     * Optional mode for the Toolkit's current selection. Defaults to the Selection default - `SelectionModes.mixed`.
     */
    selectionMode?: SelectionMode;
    /**
     * The maximum number of nodes that can be selected at any one time. Defaults to Infinity.
     */
    maxSelectedNodes?: number;
    /**
     * The maximum number of edges that can be selected at any one time. Defaults to Infinity.
     */
    maxSelectedEdges?: number;
    /**
     * The maximum number of groups that can be selected at any one time. Defaults to Infinity.
     */
    maxSelectedGroups?: number;
    /**
     * Defines the action taken when appending an object that would take the selection above its limit for the given
     * object type. This can be either Selection.DISCARD_EXISTING (the default) or Selection.DISCARD_NEW.
     */
    selectionCapacityPolicy?: string;
    /**
     * Data to load directly after Toolkit has been created.
     */
    data?: any;
    /**
     * Configuration for undo/redo
     */
    undoRedo?: {
        /**
         * Whether or not undo/redo is enabled. Defaults to true.
         */
        enabled?: boolean;
        /**
         * Maximum size of the undo stack. Defaults to 50.
         */
        maximumSize?: number;
    };
    /**
     * A function to use to determine the ID of some data object. By default the Toolkit uses the value of the object's `id` property.
     */
    idFunction?: IdFunction;
    /**
     * The name of the property that identifies a given object's `type`. By default this is the `type` property.
     */
    typeProperty?: string;
    /**
     * The name of the property that identifies a given edge's `type`. By default this is the `type` property. If you do not set this but
     * you do set `typeProperty`, that value will be used.
     */
    edgeTypeProperty?: string;
    /**
     * The name of the property that identifies a given port's `type`. By default this is the `type` property. If you do not set this but
     * you do set `typeProperty`, that value will be used.
     */
    portTypeProperty?: string;
    /**
     * A function to use to determine the type of some data object. By default the Toolkit uses the value of the object's `type` property.
     */
    typeFunction?: TypeFunction;
    /**
     * A function to use to determine the ID of some edge from its data. By default the Toolkit uses the value of the object's `id` property.
     */
    edgeIdFunction?: IdFunction;
    /**
     * A function to use to determine the type of some edge from its data object. By default the Toolkit uses the value of the object's `type` property.
     */
    edgeTypeFunction?: TypeFunction;
    /**
     * A function to use to determine the ID of some port from its data. By default the Toolkit uses the value of the object's `id` property.
     */
    portIdFunction?: IdFunction;
    /**
     * A function to use to determine the type of some port from its data object. By default the Toolkit uses the value of the object's `type` property.
     */
    portTypeFunction?: TypeFunction;
    /**
     * A function to use to extract an array of ports from the data representing some node/group. Whenever a node/group is rendered, the Toolkit
     * will use this method, if provided, to determine a list of ports for that node/group. If you use this you probably also
     * want to define a `portUpdater`. Note that if you provide the `portDataProperty` then you do not need to set this.
     */
    portExtractor?: (o: ObjectData) => Array<ObjectData>;
    /**
     * A function to use to update a given node/group's list of ports. Note that if you provide the `portDataProperty` then you do not need to set this.
     */
    portUpdater?: Function;
}
/**
 * Options for data export.
 * @public
 */
export interface ExportOptions {
    /**
     * Specifies the data type in which to format the data. Defaults to `"json"`. This must match the name of an exporter registered with the given instance of the Toolkit.
     */
    type?: string;
    /**
     * Optional parameters to pass to the exporter. If you write a custom exporter you may wish to use this.
     */
    parameters?: Record<string, any>;
}
/**
 * Options for a save via ajax.
 * @public
 */
export interface SaveOptions extends ExportOptions {
    /**
     * URL to POST data to. Required.
     */
    url: string;
    /**
     * Optional callback to execute once the data has saved successfully.
     * @param r
     */
    success?: (r: any) => any;
    /**
     * Optional callback to execute if there was an error saving the data.
     * @param e
     * @param status
     */
    error?: (e: any, status?: any) => any;
    /**
     * Optional headers to set on the ajax request. By default, the Toolkit will send
     * a `Content-Type:"application/json"` header. If you provide your own headers this header will continue to be sent, unless
     * of course you override it.
     */
    headers?: Record<string, string>;
}
/**
 * Options for loading data.
 * @public
 */
export interface LoadOptions {
    /**
     * Specifies the data type of the data to load. Defaults to `json`. This must match the name of a loader registered with the given instance of the Toolkit.
     */
    type?: string;
    /**
     * Optional. JSON data to load directly.
     */
    data?: any;
    /**
     * URL to retrieve data from. Optional, but you need to supply either this or `data`.
     */
    url?: string;
    /**
     * Optional, defaults to false. Tells the Toolkit that the data is coming via JSON-P.
     */
    jsonp?: boolean;
    /**
     * Optional callback to execute once the data has loaded. Most often used when you are retrieving remote data (using `url` and possibly `jsonp`)
     */
    onload?: Function;
    /**
     * Optional parameters to pass to the loader.
     */
    parameters?: Record<string, any>;
    /**
     * Optional function to call on load error.
     * @param e
     * @param status
     */
    error?: (e: any, status?: any) => any;
    /**
     * Optional map of HTTP header values, if loading via URL.
     */
    headers?: Record<string, string>;
    /**
     * Optional dataType to pass in the request
     */
    dataType?: string;
}
/**
 * Options for a `connect` call.
 */
export interface ConnectOptions {
    source: any;
    target: any;
    geometry?: any;
    data?: Record<string, any>;
    cost?: number;
    directed?: boolean;
    doNotCreateMissingNodes?: boolean;
}
/**
 * Definition of a function that can act as a factory for model objects.
 * @public
 */
export declare type ObjectFactory = (type: any, data: any, continueCallback: (o: ObjectData) => any, abortCallback: () => any, params?: any) => boolean;
export declare const UPDATE_NODE_REASON_ADD_PORT = "addport";
export declare const UPDATE_NODE_REASON_ADD_NEW_PORT = "addnewport";
export declare const UPDATE_NODE_REASON_REMOVE_PORT = "removeport";
export declare const UPDATE_NODE_REASON_UPDATE_PORT = "updateport";
export declare const UPDATE_NODE_REASON_MOVED = "moved";
export declare type VertexUpdatedReason = typeof UPDATE_NODE_REASON_ADD_PORT | typeof UPDATE_NODE_REASON_ADD_NEW_PORT | typeof UPDATE_NODE_REASON_REMOVE_PORT | typeof UPDATE_NODE_REASON_UPDATE_PORT | typeof UPDATE_NODE_REASON_MOVED;
/**
 * Core functionality. When using JsPlumb this class is the one that you'll interact with the most - you can manage the data model, select/deselect objects, import/export data.
 *
 * This class is extended by renderer specific subclasses.
 * @public
 */
export declare abstract class JsPlumbToolkit extends OptimisticEventGenerator implements DataSource {
    graph: Graph;
    autoSaver: AutoSaver;
    idFunction: IdFunction;
    typeProperty: string;
    edgeTypeProperty: string;
    portTypeProperty: string;
    typeFunction: TypeFunction;
    edgeIdFunction: IdFunction;
    edgeTypeFunction: TypeFunction;
    portIdFunction: IdFunction;
    portTypeFunction: TypeFunction;
    portExtractor: Function;
    portUpdater: Function;
    portDataProperty: string;
    portOrderProperty: string;
    modelTopAttribute: string;
    modelLeftAttribute: string;
    modelWidthAttribute: string;
    modelHeightAttribute: string;
    model: DataModel;
    private _$_suspendGraph;
    private _$_dataLoading;
    private _$_originalData;
    private _$_originalDataType;
    debugEnabled: boolean;
    defaultObjectFactory: ObjectFactory;
    nodeFactory: ObjectFactory;
    edgeFactory: ObjectFactory;
    portFactory: ObjectFactory;
    groupFactory: ObjectFactory;
    autoSave: boolean;
    saveUrl: string;
    autoSaveDebounceTimeout: number;
    autoSaveHandler: (instance: JsPlumbToolkit) => any;
    saveHeaders: any;
    onAutoSaveSuccess: () => any;
    onAutoSaveError: () => any;
    doNotUpdateOriginalData: boolean;
    onBeforeAutoSave: () => any;
    onAfterAutoSave: () => any;
    portSeparator: string;
    defaultCost: number;
    defaultDirected: boolean;
    enableSubgraphs: boolean;
    undoRedo: UndoRedoManager;
    graphParams: {
        portSeparator: string;
        defaultCost: number;
        defaultDirected: boolean;
        enableSubgraphs: boolean;
    };
    beforeConnect: BeforeConnectInterceptor;
    beforeMoveConnection: BeforeMoveConnectionInterceptor;
    beforeStartConnect: BeforeStartConnectInterceptor;
    beforeDetach: BeforeDetachInterceptor;
    beforeStartDetach: BeforeStartDetachInterceptor;
    private readonly _$_currentSelection;
    _$_renderersById: Map<string, ToolkitRenderer<any>>;
    constructor(params?: JsPlumbToolkitOptions);
    private _$_createSelection;
    /**
     * Filter the dataset and return a Selection containing matches. You can optionally provide a type parameter to indicate the type of objects you expect
     * back in the Selection.
     * @param spec Either a function which is passed every object in the dataset and expected to return `true` to indicate inclusion, or an object containg key:value pairs to match in the backing data of each object in the dataset
     * @param includePartials If true, objects whose data matches one or more, but not all, of the pairs in `spec` will be included in the result. By default objects have to match all the pairs in `spec` to be included in the result.
     */
    filter<T = any>(spec: (o: Base) => boolean | ObjectData, includePartials?: boolean): Selection<T>;
    /**
     * Gets the model registered with this Toolkit instance, if any. Use the Toolkit's model to map data model event
     * handlers and other data model considerations such as the maximum number of connections a Port allows
     * @returns Current model. May be null.
     */
    getModel(): DataModel;
    /**
     * Sets whether operations on the underlying graph are suspended. When this is true, no changes will be made to
     * the underlying graph.
     * @param v
     * @public
     */
    setSuspendGraph(v: boolean): void;
    /**
     * Sets options for the auto save mechanism.
     * @param autoSaveOptions
     * @public
     */
    setAutoSave(autoSaveOptions: AutoSaveOptions): void;
    /**
     * Sets whether or not the original dataset will be updated whenever a node/edge is removed or added. This functionality is suspended
     * when a `load` operation is taking place. Note that for this functionality to work there must be a `manager` registered for the given
     * data type in jsPlumbToolkitIO. The Toolkit ships with a manager for the default `json` datatype, but if you have your own custom
     * datatype you will need to provide one of these to support this functionality. See the documentation on data loading for a full
     * discussion.
     * @param update True if you want the backing data to be updated, false otherwise.
     * @public
     */
    setDoNotUpdateOriginalData(update: boolean): void;
    /**
     * Returns the type function that is currently in use.
     * @returns Function currently being used to determine types of nodes from their data. The default is to look for a `type` member in the data.
     * @public
     */
    getTypeFunction(): TypeFunction;
    /**
     * Connects two nodes/ports (or a combination of the two), by ID.  This function does not know about the DOM: you cannot pass it DOM elements
     * or selectors. By default, this method will create nodes that are missing. Port ids are specified with a dotted syntax, eg `foo.bar` refers
     * to the port "bar" on the node "foo".
     * @param params Connect parameters.
     * @returns The new Edge.
     * @public
     */
    connect(params: ConnectOptions): Edge;
    /**
     * Fires a 'graphClearStart' event, clears the graph, then fires a `graphClearEnd` event.
     * @returns The current Toolkit instance.
     * @public
     */
    clear(): JsPlumbToolkit;
    /**
     * Returns the current Graph.
     * @returns The underlying Graph.
     * @public
     */
    getGraph(): Graph;
    /**
     * Returns the count of nodes in the Graph.
     * @returns The count of Nodes in the Graph.
     * @public
     */
    getNodeCount(): number;
    /**
     * Returns the Node at the given index.
     * @returns The Node at the given index, null if not found.
     * @public
     */
    getNodeAt(idx: number): Node;
    /**
     * Returns all the nodes in the Graph.
     * @returns All the Nodes in the graph.
     * @public
     */
    getNodes(): Array<Node>;
    /**
     * Iterates through all Nodes in the Toolkit one at a time. You should not perform destructive editing of
     * the dataset inside one of these loops.
     * @param fn A function that takes (index, node) as arguments and is applied for every Node in the Toolkit instance.
     * @public
     */
    eachNode(fn: (idx: number, node: Node) => void): void;
    /**
     * Iterates through all Groups in the Toolkit one at a time. You should not perform destructive editing of
     * the dataset inside one of these loops.
     * @param fn A function that takes (index, node) as arguments and is applied for every Node in the Toolkit instance.
     * @public
     */
    eachGroup(fn: (idx: number, group: Group) => void): void;
    /**
     * Combines eachNode and eachGroup into one method.
     * @param fn
     * @public
     */
    eachVertex(fn: (idx: number, vertex: Vertex) => void): void;
    /**
     * Iterates through all Edges in the Toolkit one at a time. You should not perform destructive editing of
     * the dataset inside one of these loops.
     * @param fn A function that takes (index, edge) as arguments and is applied for every Node in the Toolkit instance.
     * @public
     */
    eachEdge(fn: (idx: number, edge: Edge) => void): void;
    /**
     * Returns the total number of edges in the graph.
     * @public
     */
    getEdgeCount(): number;
    /**
     * Returns the total number of group in the Graph.
     * @public
     */
    getGroupCount(): number;
    /**
     * Returns the Group at the given index, null if not found.
     * @param idx Index into group list
     * @public
     */
    getGroupAt(idx: number): Group;
    /**
     * Returns all the Groups in the Graph.
     * @public
     */
    getGroups(): Array<Group>;
    /**
     * Calculates "clusters" of nodes (and groups), where a 'cluster' is a set of Nodes/Groups that
     * are connected. Direction of connections is not taken into account. Nodes that are children of Groups are
     * included in all cluster calculations, which might cause some weird situations, but this functionality
     * is mostly intended just for Nodes anyway.
     * @returns An array of arrays, each entry being a list of nodes in the cluster.
     * @public
     */
    getClusters(): Array<Cluster>;
    /**
     * Gets the id of the Node represented by the given arguments. If this is a JS object, we extract the id using the
     * current idFunction. Otherwise we just pass it back as-is.
     * @param node Object from which to retrieve id.
     * @public
     */
    getNodeId(node: ObjectData | string): string;
    /**
     * Gets the type of the Node represented by the given JS object. We first try for a return value from the current typeFunction,
     * but if that returns nothing we just return 'default'.
     * @param nodeData  Node's data. Note: this is NOT a Node object, it is the backing data. You can use
     * `getType` to get the type for some Toolkit object.
     * @returns Either the object's type, or `default`.
     * @public
     */
    getNodeType(nodeData: ObjectData): string;
    /**
     * Gets the id of the Edge represented by the given arguments. If this is a JS object, we extract the id using the
     * current edgeIdFunction. Otherwise we just pass it back as-is.
     * @param edge Edge from which to retrieve id.
     * @returns Edge's id, if we could resolve it, otherwise the object we were given.
     * @public
     */
    getEdgeId(edge: ObjectData): string;
    /**
     * Gets the type of the Edge represented by the given JS object.
     * @param edgeData Edge's data. Note: this is NOT an Edge object, it is the backing data. You can use
     * `getType` to get the type for some Toolkit object.
     * @returns Either the Edge's type, if set, or "default".
     * @public
     */
    getEdgeType(edgeData: ObjectData): string;
    /**
     * Gets the id of the Port represented by the given arguments. If this is a JS object, we extract the id using the
     * current portIdFunction. Otherwise we just pass it back as-is.
     * @returns Port's id, if we could resolve it, otherwise the object we were given.
     * @public
     */
    getPortId(port: ObjectData): string;
    /**
     * Gets the type of the Port represented by the given JS object
     * @returns Either the port's type, if set, or "default".
     * @public
     */
    getPortType(port: ObjectData): string;
    /**
     * Gets the type of the given Object. This is not a type such as `Node`, `Port` or `Edge` - this is the type of the
     * object as defined by your system to identify types; these are the types used to lookup objects in the view.
     * @param obj Object to retrieve type for
     * @returns The object's type.
     * @public
     */
    getType(obj: Base): string;
    /**
     * Sets the type of the given object. This will do two things:
     * 1. update the appropriate property in the object's data to this new value. You can set what properties define
     * types, but by default each of Node, Edge and Port use `type` as the property that indicates their type.
     * 2. attempt to apply a type definition for the new type, if one is found. NB this only applies to Edge objects,
     * as at version 1.1.0. Support for Nodes (including switching node templates) is a possible future enhancement.
     * @param obj Object to set the type for.
     * @param type Type to set on the object.
     * @public
     */
    setType(obj: Base, type: any): void;
    /**
     * Adds a Node with the given data. If the data is null, the Toolkit creates an empty object and assigns
     * a uuid as the Node's id.  If no id can be derived for the given data, the Toolkit creates a uuid and
     * sets it as the data object's 'id' member. This method also calls the current `portExtractor` function, if
     * one was supplied. Its purpose is to extract any Ports from the data for some given Node.
     * @param data The Node's backing data - from your data model.
     * @param eventInfo Optional data member that the Toolkit will pass into any registered event listeners. This can be used
     * by the UI layer, for instance, to track the position on screen of any newly added elements.
     * @returns A Node object.  Your original data is available via the `data` member. The Node's id is available via the `id` member.
     * @public
     */
    addNode(data: ObjectData, eventInfo?: any, doNotFireEvent?: boolean): Node;
    private _$_notifyNodeAdded;
    private _$_notifyGroupAdded;
    /**
     * Adds a Node by type, running the data generation for the node through the current NodeFactory.  This is
     * different from `addNode` in that with `addNode` you are supplying the final data and your NodeFactory is
     * not called. This method can be called with one, two or three arguments. A single argument is considered to be
     * the new Node's `type`, and a backing data object will be created with this set, and no callback will occur.
     * If you provide two arguments the second argument may be either the new Node's backing data OR a callback to
     * hit with the newly created Node. With three arguments the second argument is the Node's backing data and the
     * third is a callback to hit with the newly created Node.
     * @param type Required. Type of the object to create. `type` will be passed as the first argument to your node factory.
     * @param data Optional backing data for the Node.
     * @param continueCallback Optional function to call with the newly created Node.
     * @param abortCallback Optional function to call if the factory aborted the node add.
     * @public
     */
    addFactoryNode(type: string, data?: ObjectData, continueCallback?: Function, abortCallback?: Function): void;
    /**
     * Adds a list of Nodes.
     * @param nodeList An array of objects, one for each Node to be added.
     * @returns The current Toolkit instance.
     * @public
     */
    addNodes(nodeList: Array<ObjectData>): JsPlumbToolkit;
    _transientVertices: Record<string, {
        renderer: ToolkitRenderer<any>;
        vertex: Node;
    }>;
    _transientVerticesByRenderer: Record<string, Record<string, Node>>;
    private _getTransientVerticesForRenderer;
    /**
     * Add a node that some renderer considers to be transient - as an example, a renderer that supports
     * dragging new edges. A new edge will require a temporary vertex to exist as the target of the new
     * edge. This method does not invoke the render function of any registered renderers - a transient vertex is
     * considered to be something private to a specific renderer, with a short lifespan that the single threaded
     * nature of javascript will ensure the vertex is not referenced by other renderers.
     * @param renderer
     * @param data
     * @internal
     */
    addTransientVertex(renderer: ToolkitRenderer<any>, data?: ObjectData): Node;
    /**
     * Removes a transient vertex from the underlying dataset, and from the list of transient vertices for
     * the given renderer. Removes any edges attached to the transient node. None of these operations
     * occur within a transaction and none are propagated to all attached renderers: only the renderer that
     * invokes this method is notified of the deletion of edges and the node.
     * @param renderer
     * @param v
     */
    cleanupTransientVertex(renderer: ToolkitRenderer<any>, v: Node): void;
    /**
     * Adds a Group by type, running the data generation for the node through the current GroupFactory.  This is
     * different from `addGroup` in that with `addGroup` you are supplying the final data and your GroupFactory is
     * not called. This method can be called with one, two or three arguments. A single argument is considered to be
     * the new Group's `type`, and a backing data object will be created with this set, and no callback will occur.
     * If you provide two arguments the second argument may be either the new Group's backing data OR a callback to
     * hit with the newly created Group. With three arguments the second argument is the Group's backing data and the
     * third is a callback to hit with the newly created Group.
     * @param type Required. Type of the object to create. `type` will be passed as the first argument to your group factory.
     * @param data Optional backing data for the Group.
     * @param continueCallback Optional function to call with the newly created Group.
     * @param abortCallback Optional function to call if the group factory aborted
     * @public
     */
    addFactoryGroup(type: string, data?: ObjectData, continueCallback?: Function, abortCallback?: Function): void;
    /**
     * Adds a new Group.
     * @param data Backing data for the Group.
     * @param eventInfo Used internally, sometimes, by the Toolkit.
     * @param doNotFireEvent Internal usage.
     * @returns The Group that was added.
     * @public
     */
    addGroup(data: ObjectData, eventInfo?: any, doNotFireEvent?: boolean): Group;
    /**
     * Adds a Node/Group to a Group.
     * @param node Node to add
     * @param group Group to add the Node/Group to
     * @param sourceGroup Optional Group the Node previously belonged to.
     * @param position Optional previous position of the Node in `sourceGroup`.
     * @param source For internal use. Identifies the renderer that instigated this model change. This renderer will not subsequently respond to the model change, since it already knows about it and its UI has been changed accordingly already.
     * @returns True if added, false otherwise.
     * @public
     */
    addToGroup(node: Node | Group | string | ObjectData, group: Group | string | ObjectData, sourceGroup?: Group, position?: PointXY, source?: ToolkitRenderer<any>): boolean;
    /**
     * Removes a Node/Group from a Group.
     * @param node Node/Group to remove, or its id, or the data representing it.
     * @param doNotFireEvent For internal use. If true, a `group:removeMember` event will not be fired as a result of
     * this operation. Otherwise it will.
     * @param targetGroup For internal use. Group to which the Node is being moved, if that applies.
     * @param source For internal use. The renderer in which user activity caused this method to be called. We echo that out in the
     * event parameters, allowing renderers to not respond to events they raised.
     * @returns The Group from which the Node was removed.
     * @public
     */
    removeFromGroup(node: Node | Group | string | ObjectData, doNotFireEvent?: boolean, targetGroup?: Group, source?: ToolkitRenderer<any>): Group;
    private _$_notifyGroupRemoved;
    private _$_notifyNodeRemoved;
    /**
     * Removes the given Group from the dataset.
     * @param group Group or ID of Group to remove.
     * @param removeChildren If true, Nodes/Groups that are members of the Group will also be
     * removed. Defaults to false.
     * @param doNotFireEvent  If true, a `group:removed` will not be fired as a result of this
     * operation. Otherwise it will.
     * @public
     */
    removeGroup(group: string | Group, removeChildren?: boolean, doNotFireEvent?: boolean): void;
    /**
     * Gets the Node with the given id.
     * @param nodeId
     * @public
     */
    getNode(nodeId: string): Node;
    /**
     * Gets an Edge by id, or if the given object is already an Edge, hands that back.
     * @param edgeId ID of the Edge to retrieve.
     * @returns The requested Edge, if found, otherwise null.
     * @public
     */
    getEdge(edgeId: string): Edge;
    /**
     * Gets a Group by its ID, or if the object is already a Group, hands that back.
     * @param groupId
     * @returns The requested Group, if found, otherwise null.
     * @public
     */
    getGroup(groupId: string): Group;
    /**
     * gets the Vertex with the given id.
     * @param id
     * @public
     */
    getVertex(id: string): Node | Group;
    /**
     * Gets a port by its full id
     * @param portId ID of the Port to retrieve, in nodeId.portId syntax.
     * @returns The requested port, if found, otherwise null.
     * @public
     */
    getPort(portId: string): Port;
    /**
     * Returns whether or not object(s) exist for the given id(s).
     * @param objects List of ids to check existence for.  This method takes an arbitrary number of arguments.
     * @returns True if objects exist for all given ids, false otherwise.
     * @public
     */
    exists(...objects: Array<any>): boolean;
    /**
     * Removes the given Node, which may be passed in as the actual Node object, or its id.
     * @param node Either a Node, or its ID.
     * @returns The current Toolkit instance.
     * @public
     */
    removeNode(node: string | Vertex, doNotFireEvent?: boolean): JsPlumbToolkit;
    /**
     * Adds an Edge to the Graph.
     * @param params Options for the new edge
     * @param source The renderer that was the source of the action. Optional, used internally.
     * @param doNotFireEvent Optional. Won't fire an event if this is true. For internal use only.
     * @returns The Edge that was added.
     * @public
     */
    addEdge(params: AddEdgeOptions & {
        addedByMouse?: boolean;
    }, source?: ToolkitRenderer<any>, doNotFireEvent?: boolean): Edge;
    /**
     * Notify registered managers of edge removal, and fire event. used by a couple of call sites.
     * @param edge
     * @param source
     * @internal
     */
    private _$_notifyEdgeRemoved;
    /**
     * Removes an Edge from the Graph.
     * @param edge The Edge to remove, as either an Edge object or its id.
     * @param source The source for the removeEdge operation. For internal use.
     * @returns The current Toolkit instance.
     * @public
     */
    removeEdge(edge: string | Edge, source?: any): JsPlumbToolkit;
    /**
     * @internal
     * @param edge
     * @param obj
     * @param index
     */
    edgeMoved(edge: Edge, obj: string | Vertex, index: number): void;
    /**
     * Sets the target for the given edge to be the given vertex.
     * @param edge Edge to set target for.
     * @param o ID of vertex, or vertex.
     * @public
     */
    setTarget(edge: Edge, o: string | Vertex, doNotFireEvent?: boolean): any;
    /**
     * Sets the source for the given edge to be the given vertex.
     * @param edge Edge to set source for.
     * @param o ID of vertex, or vertex.
     * @public
     */
    setSource(edge: Edge, o: string | Vertex, doNotFireEvent?: boolean): any;
    /**
     * Adds a new Port to some Node. This will call the current `portFactory` to get the data for a new Port.
     * @param obj node/group or id of the node/group to add a new Port to.
     * @param type Type of Port to add.
     * @param portData Data to pass to the PortFactory.
     * @public
     */
    addNewPort(obj: string | Node | Group, type: string, portData?: ObjectData, doNotFireEvent?: boolean): void;
    /**
     * Adds a Port from existing data to some Node/Group. This is distinct from `addNewPort`, because in this
     * case the data for the Port already exists.
     * @param vertex Node/Group or id of the Node/Group to add the Port to.
     * @param data Data for the Port.
     * @returns The port that was added.
     * @public
     */
    addPort(vertex: string | Node | Group, data: ObjectData, doNotFireEvent?: boolean): Port;
    /**
     * Removes a Port from the dataset.
     * @param vertexOrId If a string is passed in here, it may represent the full ID of some port, ie in "vertex.port" notation,
     * or it may be the ID of the vertex on which the port to be removed resides. If you do not pass a string to this argument you can pass a Port instead, or you can
     * pass the Node/Group on which the port resides (in which case you'll also need to provide a value for `portId`)
     * @param portId Id of the port to remove from the given node. Only required if you did not provide a full port ID, or the Port itself, to `vertexOrId`.
     * @returns True if the port existed and was removed, false otherwise.
     * @public
     */
    removePort(vertexOrId: string | Node | Group | Port, portId?: string): boolean;
    /**
     * Attempts to identify the given argument as a model object, and, if successful, removes it.
     * @param obj A string representing the ID of some model object, or a model object of some type.
     * @public
     */
    remove(obj: any): void;
    /**
     * Suspends or re-enables rendering. This method simply round-robins all the registered renderers
     * and calls `setSuspendRendering` on each of them.
     * @param v True to suspend rendering, false to enable it.
     * @param thenRefresh Defaults to false. If true, a refresh will be called on all renderers after rendering is unsuspended.
     * @public
     */
    setSuspendRendering(v: boolean, thenRefresh?: boolean): void;
    /**
     * Suspends rendering and then runs the given function, unsuspending rendering afterwards and doing
     * a refresh. This method is just a convenience method that handles suspending
     * and subsequent enabling of rendering. You might use this if you're adding a whole load of Nodes or
     * Edges, or maybe you want to add a Node and one or more Edges before
     * the layout recomputes.
     * @param fn
     * @public
     */
    batch(fn: () => any): void;
    /**
     * Updates the given Group, notifying any Renderers to do a redraw. If autoSave is set, this method
     * will cause the dataset to be saved.
     * @param group Either a Group, a Group id, or the backing data for a Group.
     * @param updates An object with path->value pairs. Path can be in dotted notation.
     * You do not actually have to supply this, although in most cases you will want to. But there are edge
     * cases in which you might simply wish to kick off a repaint.
     * @public
     */
    updateGroup(group: Group | string | ObjectData, updates?: ObjectData): void;
    /**
     * Updates the given Node, notifying any Renderers to do a redraw. If autoSave is set, this method
     * will cause the dataset to be saved.
     * @param node Either a Node, a Node id, or the backing data for a Node.
     * @param updates An object with path->value pairs. Path can be in dotted notation. You do not actually have to supply this, although in most cases you will want to. But there are edge cases in which you might simply wish to kick off a repaint.
     * @public
     */
    updateNode(node: string | Node | ObjectData, updates?: ObjectData): void;
    /**
     * Updates the given Node/Group, notifying any Renderers to do a redraw. If autoSave is set, this method
     * will cause the dataset to be saved.
     * @param vertex Either a Node/Group, a Node/Group id, or the backing data for a Node/Group.
     * @param updates An object with path->value pairs. Path can be in dotted notation. You do not actually have to supply this, although in most cases you will want to. But there are edge cases in which you might simply wish to kick off a repaint.
     * @public
     */
    updateVertex(vertex: string | Node | Group | Port | ObjectData, updates?: ObjectData): void;
    /**
     * Updates the given Port, notifying any Renderers to do a redraw. If autoSave is set, this method
     * will cause the dataset to be saved.
     * @param port Either a Port, or a full Port id
     * @param updates An object with path->value pairs. Path can be in dotted notation. You do not actually have to supply this, although in most cases you will want to. But there are edge cases in which you might simply wish to kick off a repaint.
     * @public
     */
    updatePort(port: Port | string, updates?: ObjectData): void;
    /**
     * Updates the given Edge, notifying any Renderers to do a redraw. If autoSave is set, this method
     * will cause the dataset to be saved.
     * @param obj Either an Edge, an Edge id, or the backing data for an Edge.
     * @param updates An object with path->value pairs. Path can be in dotted notation. You do not actually have to supply this, although in most cases you will want to. But there are edge cases in which you might simply wish to kick off a repaint.
     * @public
     */
    updateEdge(obj: Edge | string, updates?: ObjectData): void;
    /**
     * Updates the given object, notifying any renderers to do a repaint.
     * @param object Either a Node, Group, Port or Edge, or, as a string, the id of some Node, Group, Port or Edge.
     * @param updates An object with path->value pairs. Path can be in dotted notation. You do not actually have to supply this, although in most cases you will want to. But there are edge cases in which you might simply wish to kick off a repaint.
     * @public
     */
    update(object: Base, updates?: ObjectData): void;
    /**
     * Sets the geometry for the given edge. The type of `geometry` depends on the connector being used to represent the edge in the UI.
     * @param edge The edge to update.
     * @param geometry New geometry for the given edge.
     * @param renderer The renderer that instigated this change.
     * @internal
     */
    setEdgeGeometry(edge: Edge, geometry: any, renderer: ToolkitRenderer<any>): void;
    /**
     * Gets a Path from some source vertex to some target vertex.
     * @param params Path spec params
     * @public
     */
    getPath(params: PathOptions): Path;
    /**
     * Finds the object that matches the given spec.
     * @param spec If a string, a Node/Port matching that id is retrieved. Otherwise if `spec` is already a Graph object (Node or Port), it is
     * returned.
     * @public
     */
    findGraphObject(spec: string | Vertex | Edge): Vertex | Edge | Graph;
    /**
     *
     * @param obj
     * @param append
     * @param _selection
     * @param fireSelectEvent
     * @internal
     */
    private _$_select;
    /**
     *
     * @param params Options for the edge selection.
     * @param edgeSelector
     * @param checkForPorts
     * @internal
     */
    private _selectEdges;
    /**
     * Updates the given vertex with the given data. For internal use.
     * @param obj
     * @param updates
     * @param evtId
     * @param generator
     * @internal
     */
    private _$_updateVertex;
    /**
     * After a change to a port, perhaps set the backing data for the associated node per the client app's portUpdater function. For internal use.
     * @param nodeOrGroup
     * @param reason
     * @internal
     */
    private _$_updateVertexAfterPortChange;
    /**
     * Gets a set of edges.
     * @param params Options for the edge selection
     * @public
     */
    getEdges(params?: EdgeSelectionParams): Array<Edge>;
    /**
     * Get all Edges in the Toolkit instance.
     * @public
     */
    getAllEdges(): Array<Edge>;
    /**
     * Gets all edges for the given Node, Port or Group.
     * @param obj Object to retrieve edges for.
     * @param filter Optional filter function for edge selection.
     * @public
     */
    getAllEdgesFor(obj: Vertex, filter?: (e: Edge) => boolean): Array<Edge>;
    /**
     * Gets all edges in the Toolkit instance as a Selection object.
     * @public
     */
    selectAllEdges(): Selection;
    /**
     * Adds all the Edges in the Toolkit instance to the Toolkit's current selection.
     * @public
     */
    addAllEdgesToSelection(): void;
    /**
     * Sets obj as the current selection for this instance of the jsPlumb Toolkit.
     * @param obj Object to select. May be a Node/Edge/Group or an array of any
     * of these, or a Node/Group id, or a Path.
     * @public
     */
    setSelection(obj: string | Base | Array<Base> | Path): void;
    /**
     * Gets an ad-hoc selection
     * @param obj Object to select. May be a Node/Group/Port/Edge or an array of any one
     * of these, or a Vertex id, a Selection, or a Path.
     * @param includeEdges If true, include edges between vertices
     * @public
     */
    select(obj: string | Array<string> | Base | Array<Base> | Path | Selection, includeEdges?: boolean): Selection;
    /**
     *
     * @param focus
     * @param selection
     * @param includeEdges
     * @param touched
     * @internal
     */
    private _$_descendants;
    /**
     * Selects all descendants of some Node or Group, and, optionally, the Node/Group itself.
     * @param obj Node/Group, or ID of Node/Group, to select
     * @param includeFocus Whether or not to include the focus node/group in the returned dataset. Defaults to false.
     * @param includeEdges Whether or not to include edges in the returned dataset. Defaults to false.
     * @public
     */
    selectDescendants(obj: string | Node | Group, includeFocus?: boolean, includeEdges?: boolean): Selection<Edge | Node | Group>;
    /**
     * @param obj
     * @internal
     */
    private _$_resolveObjectForSelection;
    /**
     * Appends `obj` to the current selection. If there is no current selection, `obj` becomes it.
     * @param obj Object to select. May be a Node/Group/Port/Edge or an array of any
     * of these, or a Vertex id, or a Path.
     * @public
     */
    addToSelection(obj: string | Base | Path | Array<Base> | Array<string>): void;
    /**
     * @internal
     * @param evt
     * @param objects
     */
    private _$_adhocSel;
    /**
     * Toggles whether or not the given `obj` forms part of the current selection.
     * @param obj Object to select. May be a Node/Group/Port/Edge or an array of any
     * of these, or a Vertex id, or a Path.
     * @public
     */
    toggleSelection(obj: string | Base | Path | Array<Base>): void;
    /**
     * Removes obj from the current selection
     * @param obj Object to deselect. May be a Node/Edge/Group/Port or an array of any
     * of these, or a Vertex id, or a Path.
     * @public
     */
    removeFromSelection(obj: string | Base | Array<Base> | Path): void;
    /**
     * Appends the Path from `source` to `target` to the current selection. If there is no current selection, `obj` becomes it.
     * If the Path does not exist, there is no selection.
     * @param params Path params
     * @param params.source ID of source, or source Node/Port
     * @param params.target ID of target, or target Node/Port
     * @public
     */
    addPathToSelection(params: {
        source: Vertex | string;
        target: Vertex | string;
        strict?: boolean;
        nodeFilter?: (n: Node) => boolean;
        edgeFilter?: (n: Edge) => boolean;
    }): void;
    /**
     * Clears the current selection and fires a `selectionCleared` event.
     * @public
     */
    clearSelection(): void;
    /**
     * Gets the current Selection for this Toolkit instance.
     * @returns Current Selection.
     * @public
     */
    getSelection(): Selection;
    /**
     * Sets the maximum number of nodes that may be selected at any one time. Default is Infinity.
     * @param maxNodes Max number of nodes allowed to be selected at once.
     * @public
     */
    setMaxSelectedNodes(maxNodes: number): void;
    /**
     * Sets the maximum number of edges that may be selected at any one time. Default is Infinity.
     * @param maxEdges Max number of edges allowed to be selected at once.
     * @public
     */
    setMaxSelectedEdges(maxEdges: number): void;
    /**
     * Sets The action taken when appending an edge or node that would
     * take the selection above its limit for that given type. Depends on the current `capacityPolicy`, which can be either
     * Selection.DISCARD_EXISTING (the default) or Selection.DISCARD_NEW.
     * @param policy One of `Selection.DISCARD_EXISTING` (which removes the 0th entry from the list before insertion of the new value) or `Selection.DISCARD_NEW`.
     * @public
     */
    setSelectionCapacityPolicy(policy: string): void;
    /**
     * @param endEvent
     * @internal
     */
    private _$_notifyDataLoaded;
    /**
     *
     * @param params
     * @param startEvent
     * @param endEvent
     * @internal
     */
    private _$_doLoad;
    /**
     * Loads some data, either via ajax, or directly from a JS object.
     * @param params Load options.
     * @returns The current instance of the Toolkit. If you provide data directly to this method you can then chain a load call with a subsequent `render`.
     * @public
     */
    load(params: LoadOptions): JsPlumbToolkit;
    /**
     * Appends some data to the dataset, either via ajax, or directly from a JS object. The only difference
     * between this and `load` is the events that are fired during the loading process.
     * @param params Append parameters.
     * @returns The current instance of the Toolkit. If you provide data directly to this method you can then chain a load call with a subsequent `render`.
     * @public
     */
    append(params: LoadOptions): JsPlumbToolkit;
    /**
     * Saves the current data via ajax POST to a given URL.
     * @param params Save parameters
     * @returns The current instance of the Toolkit. If you provide data directly to this method you can then chain a load call with a subsequent `render`.
     * @public
     */
    save(params: SaveOptions): JsPlumbToolkit;
    /**
     * Method stub for subclasses to implement for loading data.
     */
    protected abstract loadData(options: DataLoadOptions): void;
    /**
     * Exports the current data to JSON.
     * @param params Export parameters
     * @returns JSON payload.
     * @public
     */
    exportData(params?: ExportOptions): any;
    /**
     * Helper method to allow `JSON.stringify` to be called with an instance of the Toolkit as argument (JSON.stringify looks
     * for a `toJSON()` method on each object it is attempting to serialise). This method generates the same output as
     * calling `exportData()`.
     */
    toJSON(): any;
    /**
     * Gets a renderer by the `id` parameter supplied to the `render` call (which is by default null, and only renderers for which an `id` was supplied are retrievable via this method)
     * @param id ID of the renderer to retrieve.
     * @returns Either a Renderer that was registered against the given id, or null if none found.
     * @public
     */
    getRenderer<E>(id: string): ToolkitRenderer<E>;
    /**
     * Gets all renderers registered on this instance of the jsPlumb Toolkit.
     * @returns A map of `id-> ToolkitRenderer` pairs.
     * @public
     */
    getRenderers(): Map<string, ToolkitRenderer<any>>;
    private _$_dispatchToRenderers;
    /**
     * registers a renderer on the Toolkit instance. For internal use.
     * @param renderer
     * @param id
     * @internal
     */
    addRenderer(renderer: ToolkitRenderer<any>, id?: string): void;
    /**
     * Finds information related to the given object, which may be an existing Toolkit object, a Node/Group/Edge id, or the backing data for some object.
     * @param obj A Node/Group/Edge id, or Node, Port, Group or Edge
     * @returns A JS object containing `obj` (the Toolkit object), `id` (the Node/Port/Group/Edge ID), `type` ("Port", "Node", "Group", "Edge")
     * @public
     */
    getObjectInfo<T>(obj: string | Edge | Node | Port | Group | ObjectData): ObjectInfo<T>;
    /**
     * Undo the latest operation, if there is one. Otherwise does nothing.
     * @public
     */
    undo(): void;
    /**
     * Redo the latest operation that was undone, if there is one. Otherwise does nothing.
     * @public
     */
    redo(): void;
    /**
     * Opens a transaction and runs the given function within it, then commits the transaction. If your function returns
     * false (boolean false, not false-y), the transaction is rolled back instead of committed.
     * @param fn Function to run.
     * @param cleanupAction What to do if a transaction already exists.
     * @public
     */
    transaction(fn: () => any, cleanupAction?: TransactionCleanupAction): void;
    /**
     * Opens a transaction.
     * @param cleanupAction What to do if a transaction already exists. If you supply nothing, or an inappropriate value, here and there is a current transaction, then
     * an Error is thrown.
     * @param cleanupAction action to perform if a transaction already exists
     * @public
     */
    openTransaction(cleanupAction?: TransactionCleanupAction): void;
    /**
     * Rolls back the current transaction, undoing any changes to the data model made in the transaction. If there is no current transaction this method does nothing.
     * @public
     */
    rollbackTransaction(): void;
    /**
     * Commits any changes made in the current transaction to the undo stack. If there is no current transaction this method does nothing.
     * @public
     */
    commitTransaction(commitAll?: boolean): void;
    /**
     * Clears out the undo/redo stacks and discards (neither commits nor rolls back) any existing transaction.
     * @public
     */
    flushUndoRedo(): void;
}
