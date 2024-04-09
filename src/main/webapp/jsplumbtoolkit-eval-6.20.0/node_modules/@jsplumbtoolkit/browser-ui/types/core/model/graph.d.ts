import { ShortestPathResult } from "./djikstra";
import { Cluster } from "./cluster";
export declare type IdFunction = (o: ObjectData) => string;
export declare type TypeFunction = (o: ObjectData) => string;
export declare type ObjectData = Record<string, any>;
export declare type HasId = {
    id: string;
};
export declare type HasType = {
    type: string;
};
export interface HasIdAndType extends HasId, HasType {
}
export interface Deletion {
    parentGroup?: Group;
    edges: Array<Edge>;
}
export interface NodeDeletion extends Deletion {
    node: Node;
}
export interface GroupDeletion extends Deletion {
    group: Group;
    nodes: Array<NodeDeletion>;
    nestedGroups: Array<GroupDeletion>;
    children: Array<Node | Group>;
}
/**
 * for the given vertex, resolves the id of the node/group it belongs to - the vertex might be a port, which has
 * a parent node or group.
 * @param v
 * @internal
 */
export declare function resolveNodeId(v: Vertex): string;
/**
 * For the given vertex, resolves the node/group it pertains to. If the vertex is already a node/group, it is returned. Otherwise, if
 * it is a port, the parent of the port is returned.
 * @param v
 */
export declare function resolveNode(v: Vertex): Node | Group;
/**
 * For the given vertex, resolve its port id. If it is not a port, null is returned. If it is a port, its id is returned (without the parent vertex's id prefixed to it)
 * @param v
 */
export declare function resolvePortId(v: Vertex): string;
export declare function isNode(obj: Base): obj is Node;
export declare function isNodeInsideAGroup(obj: Base): obj is Node;
export declare function isGroup(obj: any): obj is Group;
export declare function isNestedGroup(obj: Base): obj is Group;
export declare function isEdge(obj: Base): obj is Edge;
export declare function isPort(obj: Base): obj is Port;
export declare function isGroupVertex(v: Vertex): v is Group;
export declare function isNodeVertex(v: Vertex): v is Node;
export declare function isPortVertex(v: Vertex): v is Port;
export interface AddEdgeOptions {
    source: Vertex | string;
    target: Vertex | string;
    geometry?: any;
    data?: any;
    cost?: number;
    directed?: boolean;
}
export declare function defaultIdFunction(obj: ObjectData): string;
export interface GraphOptions {
    id?: string;
    defaultDirected?: boolean;
    defaultCost?: number;
    defaultIdFunction?: IdFunction;
    typeFunction?: TypeFunction;
    enableSubgraphs?: boolean;
    portSeparator?: string;
}
export interface GraphObject {
    getFullId(): string;
    data: any;
    objectType: string;
    id: string;
}
/**
 * Base class for objects in a Graph that can act as the terminus for an Edge.
 */
export interface AbstractEdgeTerminus extends GraphObject {
    getSourceEdges(): Array<Edge>;
    getTargetEdges(): Array<Edge>;
    getAllEdges(): Array<Edge>;
}
export declare class Graph {
    nodes: Array<Node>;
    id: string;
    edges: Array<Edge>;
    groups: Array<Group>;
    _nodeMap: Map<string, Node>;
    _edgeMap: Map<string, Edge>;
    _groupMap: Map<string, Group>;
    defaultDirected: boolean;
    defaultCost: number;
    _defaultIdFunction: IdFunction;
    typeFunction: TypeFunction;
    enableSubgraphs: boolean;
    portSeparator: string;
    _topLevelCache: Record<string, Vertex>;
    private _removeFromTopLevelCache;
    private _addToTopLevelCache;
    private _clearTopLevelCache;
    constructor(params: GraphOptions);
    getIdFunction(): IdFunction;
    setIdFunction(f: IdFunction): void;
    setTypeFunction(f: TypeFunction): void;
    /**
     * Gets the type for some data, by running it through the current typeFunction.
     * @param data Object to get type from.
     * @returns The calculated type for the given object.
     */
    getType(data: ObjectData): string;
    getId(data?: ObjectData, idFunction?: IdFunction): string;
    getTopLevelElements(): Record<string, Vertex>;
    /**
     * Sets whether or not Nodes are Graphs themselves, and can have child Nodes. If you enable this
     * then you cannot use slashes (/) in your Node ids, as they will be treated as components of a path
     * to a Node in a nested Graph.
     * @param enable True to enable, false to disable.
     */
    setEnableSubgraphs(enable: boolean): void;
    /**
     * Sets the character(s) used to separate ports from nodes in port ids. By default this is '.', ie a
     * port is addressed as `nodeId.portId`. This may need to be changed depending on the data in your model.
     * @param separator Separator to use.
     */
    setPortSeparator(separator: string): void;
    /**
     * Gets the current port separator.
     * @returns Port separator string. Default is "."
     */
    getPortSeparator(): string;
    /**
     * Splits the given port id using the current portSeparator.
     * @param portId Port ID to split.
     * @returns An array of [ vertexId, portId], or [] if the portId was null.
     */
    splitPortId(portId: string): Array<string>;
    /**
     * Looks up a vertex identified by the port id, which is in full port id (vertexId.portId) format, returning null if nothing found.
     * (Note that we show full port id format as vertexId.portId, but the '.' is just the default portSeparator; it is possible to change that
     * to some other character)
     * @param portId ID of the port to find a vertex for.
     */
    getVertexByPortId(portId: string): Vertex;
    getVertex(e: string | Base, createPortsIfMissing?: boolean): Vertex;
    clear(): void;
    /**
     * Gets all the nodes in the Graph.
     */
    getVertices(): Array<Node>;
    /**
     * Gets the count of nodes in the Graph.
     */
    getVertexCount(): number;
    /**
     * Returns the vertex at the given index (used for bulk init type purposes)
     * @param index Index of the Node to retrieve
     * @returns vertex at the given index.
     */
    getVertexAt(index: number): Node;
    /**
     * Returns the total number of Edges in the graph.
     * @returns The total number of Edges.
     */
    getEdgeCount(): number;
    /**
     * Adds an edge to the graph.
     * @param params
     * @param idFunction
     * @param connectableFilterFunction
     */
    addEdge(params: AddEdgeOptions, idFunction?: IdFunction, connectableFilterFunction?: Function): Edge;
    addNode(data?: ObjectData, idFunction?: IdFunction): Node;
    /**
     * Adds a list of Nodes to the Graph
     * @param data List of data objects, one for each Node to be added.
     * @param idFunction Optional function to use to retrieve ID from backing data. Defaults to retrieving `id` from data object.
     */
    addNodes(data: Array<ObjectData>, idFunction?: IdFunction): void;
    /**
     * Adds a Group to the Graph.
     * @param data
     * @param idFunction
     */
    addGroup(data: ObjectData, idFunction?: IdFunction): Group;
    getGroupCount(): number;
    /**
     * Returns the Group at the given index.
     * @param idx Index into group list
     * @returns a Group, or null if not found.
     */
    getGroupAt(idx: number): Group;
    /**
     * Gets the Groups in the graph.
     * @returns All the groups in the Graph.
     */
    getGroups(): Array<Group>;
    addMemberToGroup(v: Node, g: string | Group): void;
    addMembersToGroup(v: Array<Node>, g: Group): void;
    removeMemberFromGroup(v: string | Node): void;
    removeMembersFromGroup(v: Array<Node>): void;
    getGroup(group: string | Group): Group;
    /**
     * Deletes a Group
     * @param g Either a Group, or a Group id.
     * @param removeMembers If true, also remove all the Nodes/Groups that are members of the Group.
     */
    deleteGroup(g: string | Group, removeMembers?: boolean): GroupDeletion;
    /**
     * @internal
     * @param port
     */
    deletePort(port: Port): Array<Edge>;
    /**
     * Deletes a Node
     * @param vertex a Node
     * @internal
     */
    deleteNode(vertex: Node): NodeDeletion;
    /**
     * Deletes an Edge.
     * @param edge Edge, or ID of Edge, to delete.
     */
    deleteEdge(edge: string | Edge): void;
    /**
     * Gets an Edge by id, or if the given object is already an Edge, hands that back.
     * @param e ID of the Edge to retrieve, or an actual Edge, or some data from which an ID could be derived.
     * @returns The requested Edge, if found, otherwise null.
     */
    getEdge(e: string | Edge | any): Edge;
    /**
     * For some given node, get a subset of edges that match the given filter function.
     * @param params Method parameters
     * @param params.source If true, only match edges for which this node is the source.
     * @param params.target If true, only match edges for which this node is the target.
     * @param params.filter Optional edge filter.
     */
    getEdges(params?: {
        node?: Vertex | string;
        source?: boolean;
        target?: boolean;
        filter?: (e: Edge) => boolean;
    }): Array<Edge>;
    /**
     * Gets every edge in the Graph.
     */
    getAllEdges(): Array<Edge>;
    renamePort(port: Port, newId: string): boolean;
    /**
     * Gets a list of groups that are ancestors of the given node/group. The list of ancestors is ordered in terms of their
     * proximity to the focus, ie. the first entry is the focus vertex's immediate parent.
     * @param vertex
     */
    getAncestors(vertex: Node | Group): Array<Group>;
    /**
     * Returns whether or not `possibleAncestor` is in fact an ancestor of the given focus node/group
     * @param focus
     * @param possibleAncestor
     */
    isAncestor(focus: Node | Group, possibleAncestor: Group): boolean;
    /**
     * Finds the shortest path from source to target, using the Djikstra algorithm.
     * @param source Source Node or Node ID.
     * @param target Target Node or Node ID.
     * @param strict Defaults to true. Sets whether or not paths are searched strictly by the given source/target. If, for instance, you supply a node as the source, but there are only edges connected to ports on that node, by default these edges will be ignored. Switching `strict` to false will mean these edges are considered.
     * @param nodeFilter Optional function that is given each Node's backing data and asked to return true or false - true means include the Node, false means exclude it.
     * @param edgeFilter Optional function that is given each Edge's backing data and asked to return true or false - true means include the Edge, false means exclude it.
     * @returns A ShortestPathResult object.
     */
    findPath(source: string | Vertex, target: string | Vertex, strict?: boolean, nodeFilter?: Function, edgeFilter?: Function): ShortestPathResult;
    /**
     * Finds the distance between source and target.
     * @param source Source vertex or vertex ID.
     * @param target Target vertex or vertex ID.
     * @param strict Defauls to true. Sets whether or not paths are searched strictly by the given source/target. If, for instance, you supply a node as the source, but there are only edges connected to ports on that node, by default these edges will be ignored. Switching `strict` to false will mean these edges are considered.
     * @returns Distance from the source to the target.
     */
    getDistance(source: Vertex, target: Vertex, strict?: boolean): number;
    /**
     * Sets the target Group/Node/Port for some Edge.
     * @param edge The Edge to change the target for
     * @param o group/Node/Port/id for new Edge target
     */
    setTarget(edge: Edge, o: string | Vertex): {
        old?: Vertex;
        edge?: Edge;
        new?: Vertex;
        success: boolean;
    };
    /**
     * Sets the source Group/Node/Port for some Edge.
     * @param edge The Edge to change the source for
     * @param o Group/Node/Port or id for new Edge source
     */
    setSource(edge: Edge, o: string | Vertex): {
        old?: Vertex;
        new?: Vertex;
        success: boolean;
        edge?: Edge;
    };
    /**
     * Returns the path from source to target as a string.
     * @returns Printed path. Mostly useful for debugging.
     */
    printPath(source: string | Vertex, target: string | Vertex): string;
    /**
     * Returns the `diameter` of the Graph.
     * @param dontUseMax Whether or not to return Infinity if there is at least one pair of nodes for which there is no available path. Defaults to false.
     * @returns Diameter of the Graph.
     */
    getDiameter(dontUseMax?: boolean): number;
    getCentrality(node: Vertex | string): number;
    /**
     * Returns the indegree centrality of the given vertex (number of connections entering the vertex)
     * @param vertex Vertex, or Vertex ID, to retrieve indegree centrality for.
     * @returns Vertex's indegree centrality.
     */
    getIndegreeCentrality(vertex: Vertex | string): number;
    /**
     * Returns the outdegree centrality of the given vertex (number of connections exiting the vertex)
     * @param vertex Vertex, or Vertex ID, to retrieve outdegree centrality for.
     * @returns Vertex's indegree centrality.
     */
    getOutdegreeCentrality(vertex: Vertex | string): number;
    /**
     * Returns the Closeness centrality of the given vertex. This is the inverse of the vertex's farness.
     * @param vertex Vertex, or Vertex ID, to retrieve closeness for.
     * @returns Node's "closeness".
     * @see getFarness
     */
    getCloseness(vertex: Vertex | string): number;
    /**
     * Returns the farness centrality of the given node, ie. the sum of its distance from all other nodes, where the distance from one vertex to another is given by the associated cost of the Edge joining the two nodes.
     * @param vertex Vertex, or Vertex ID, to retrieve farness for.
     * @returns Vertex's "farness".
     */
    getFarness(vertex: Vertex | string): number;
    /**
     * Returns the betweenness centrality of the given node.
     * @param vertex Vertex, or Vertex ID, to retrieve betweenness centrality for.
     * @returns Vertex's "betweenness" centrality.
     */
    getBetweenness(vertex: Vertex | string): number;
    inspect(): string;
    /**
     * Serialize the graph.
     * @param includePorts
     */
    serialize(): any;
    /**
     * This is the original serialize method, which writes out ports, unnecessarily. From 6.12.0 onwards the serializer does
     * not write out ports, but you can - for the time being - use an export type of LEGACY_JSON to invoke this method.
     * @deprecated
     */
    legacySerialize(): any;
    /**
     * Calculates "clusters" of nodes (and groups), where a 'cluster' is a set of Nodes/Groups that
     * are connected. Direction of connections is not taken into account. Nodes that are children of Groups are
     * included in all cluster calculations, which might cause some weird situations, but this functionality
     * is mostly intended just for Nodes anyway.
     * @returns An array of arrays, each entry being a list of nodes in the cluster.
     */
    getClusters(): Array<Cluster>;
}
export declare abstract class Base {
    /** @internal */
    atts: Map<string, string>;
    /**
     * Type of the object
     */
    type: string;
    abstract objectType: string;
    abstract getFullId(): string;
    /**
     * Underlying data for the object.
     */
    data: ObjectData;
    /**
     * The underlying graph.
     */
    readonly graph: Graph;
    protected constructor(graph: Graph, data?: ObjectData);
    /**
     * Gets some attribute from the object.
     * @param key
     * @param value
     */
    setAttribute(key: string, value: string): void;
    /**
     * Sets some attribute on the object.
     * @param key
     */
    getAttribute(key: string): string;
    /** @internal */
    getType(): string;
    /** @internal */
    setType(t: string): void;
}
export declare abstract class Vertex extends Base implements AbstractEdgeTerminus, HasId {
    graph: Graph;
    private idFunction?;
    /**
     * The vertex's id. A string.
     */
    id: string;
    /**
     * Transient vertices are created at various points in the lifecycle of a renderer, such as dragging new edges,
     * and are not exported in the dataset
     */
    transient?: boolean;
    edges: Array<Edge>;
    protected indegreeCentrality: number;
    protected outdegreeCentrality: number;
    nestedGraphs: Array<Graph>;
    graphs: Array<Graph>;
    protected constructor(graph: Graph, data?: ObjectData, idFunction?: IdFunction);
    getIndegreeCentrality(): number;
    getOutdegreeCentrality(): number;
    /**
     * Adds a sub-graph to this vertex. If you provide an existing Graph instance that does not have
     * an id, one will be assigned.
          * @param Graph|string g Either a Graph instance, or the id you wish to assign to a new Graph.
     * @returns The Graph that was added.
     */
    addGraph(g: string | Graph): Graph;
    /**
     * Retrieves a sub-graph by id.
          * @returns Sub-graph with the given id, null if not found.
     */
    getGraph(id: string): Graph;
    /**
     * Gets the Vertex's id, which, for Nodes and Groups, is just the `id` property. This method is overridden by Ports.
     * @returns Vertex id
     */
    getFullId(): string;
    /**
     * Gets all edges where this vertex is either the source or the target of the edge.
     * Note that this does *not* retrieve edges on any ports associated with this Vertex - for that, @see #getAllEdges.
     * @param params.filter Optional function to test whether a given edge should be included.
     * @returns List of matching edges.
     */
    getEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
    /**
     * Gets all edges where this vertex - or any of its ports - are the source of target of the edge.
     * @param params
     */
    abstract getAllEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
    /**
     * Gets all Edges where this Vertex is the source.
     */
    getSourceEdges(): Array<Edge>;
    /**
     * Gets all Edges where this Vertex is the target.
     */
    getTargetEdges(): Array<Edge>;
    /**
     * Adds an Edge to the vertex.
          * @param edge The Edge to add.
     */
    addEdge(edge: Edge): void;
    /**
     * Deletes an Edge from the Vertex.
          * @param edge The Edge to delete.
     */
    deleteEdge(edge: Edge): boolean;
    /**
     * Returns a string representation of the Vertex.
          * @returns Vertex dumped to a string.
     */
    inspect(): string;
    isChildOf(v: Vertex | Graph | Edge): boolean;
}
export declare class Node extends Vertex {
    static objectType: string;
    objectType: string;
    ports: Array<Port>;
    group: Group;
    portMap: Record<string, Port>;
    private defaultInternalCost;
    private internalEdges;
    constructor(graph: Graph, data?: any, idFunction?: IdFunction);
    /**
     * Gets all of the edges connected to this node, both on the node itself and on all of its ports.
     * @param params Method parameters.
     * @param params.filter Optional Edge filter.
     */
    getAllEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
    /**
     * Gets all of the Edges connected to this Node, both on the Node itself and on all of its Ports, where this node/port is the source of edge
     */
    getAllSourceEdges(): Edge[];
    /**
     * Gets all of the Edges connected to this Node, both on the Node itself and on all of its Ports, where this node/port is the target of edge
     */
    getAllTargetEdges(): Edge[];
    /**
     * Gets all Edges directly connected to this Vertex, ie. not to one of the Ports on the Vertex. This is an alias for `getEdges`.
     * @param params Method parameters.
     * @param params.filter Optional Edge filter.
     */
    getDirectEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Edge[];
    /**
     * Gets all Edges directly connected to this Vertex, ie. not to one of the Ports on the Vertex, where this Vertex is the source.
     * This is an alias for `getSourceEdges`.
     */
    getDirectSourceEdges(): Edge[];
    /**
     * Gets all Edges directly connected to this Vertex, ie. not to one of the Ports on the Vertex, where this Vertex is the target.
     * This is an alias for `getTargetEdges`.
     */
    getDirectTargetEdges(): Edge[];
    /**
     * Gets all Edges that are connected to Ports on this Node, not directly to the Node itself.
     * @param params
     */
    getPortEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
    /**
     * Gets all Edges that are connected to Ports on this Node, not directly to the Node itself, where the Port on this Node is the source of the edge.
     */
    getPortSourceEdges(): Array<Edge>;
    /**
     * Gets all Edges that are connected to Ports on this Node, not directly to the Node itself, where the Port on this Node is the target of the edge.
     */
    getPortTargetEdges(): Array<Edge>;
    /**
     * Gets this Node's "indegree" centrality; a measure of how many other Nodes are connected to this Node as the target of some Edge.
     */
    getIndegreeCentrality(): number;
    /**
     * Gets this Node's "outdegree" centrality; a measure of how many other Nodes this Node is connected to as the source of some Edge.
     */
    getOutdegreeCentrality(): number;
    /**
     * Gets all Ports associated with this Node.
     */
    getPorts(): Array<Port>;
    /**
     * Adds a Port to the Node.
     * @param data Optional data backing the Port. This object can be of any type you like.
     * @param idFunction Optional function that can take a Port's data and return its ID. By default this looks for an `id` member in the backing data.
     */
    addPort(data: any, idFunction?: IdFunction): Port;
    /**
     * Sets the underlying data for the Port with the given id.  If the Port does not yet exist, it is created.
     * @param id Id of the Port for which to set data.
     * @param data Data to set for the Port.
     */
    setPort(id: string, data?: any): Port;
    /**
     * Gets the Port with the given id, null if nothing found.
     * @param portId Port id.
     */
    getPort(portId: string): Port;
    private _portId;
    renamePort(port: Port, newId: string): boolean;
    /**
     * Removes the given Port.
     * @param port Either a Port, or a port id.
     */
    removePort(port: string | Port): boolean;
    /**
     * Sets the default cost of travelling from one Port to another inside some Node. When a Node is created, this value is set to 1.
     * @param cost Default internal cost.
     */
    setDefaultInternalCost(cost: number): void;
    /**
     * Gets an "internal" Edge from one Port to another.
     * @param source Source Port.
     * @param target Target Port.
     */
    getInternalEdge(source: string | Port, target: string | Port): any;
    /**
     * Sets the cost and directedness of some internal Edge.
     * @param source Source Port.
     * @param target Target Port.
     * @param cost Cost to set. If you leave this as null, the default will be used.
     * @param directed Whether or not the internal Edge is directed.
     */
    setInternalEdge(source: string | Port, target: string | Port, cost?: number, directed?: boolean): Edge;
}
export declare class Port extends Vertex {
    protected parent: Node;
    static objectType: string;
    objectType: string;
    constructor(parent: Node, data?: any, idFunction?: IdFunction);
    /**
     * Gets the vertex this Port belongs to. Remember that Group extends Node, so this could be a Group, but Ports cannot have child Ports.
     */
    getParent(): Node;
    /**
     * Overrides the `getFullId` of Node to return a value in dotted notation of the form `nodeId.portId`.
     */
    getFullId(): string;
    /**
     * Returns whether or not this port is a child of the given object.
     * @param v Object to test if this is a child.
     */
    isChildOf(v: Vertex | Graph | Edge): boolean;
    /**
     * gets all the edges connected to this port, as source or target.
     * @param params
     */
    getAllEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
}
export declare class Group extends Node {
    static objectType: string;
    objectType: string;
    members: Array<Node>;
    _memberMap: Record<string, Node>;
    constructor(graph: Graph, data?: any, idFunction?: IdFunction);
    addMember(v: Node): boolean;
    getMemberCount(): number;
    getMembers(): Node[];
    removeMember(v: string | Node): boolean;
    getAllDirectEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
    /**
     * Gets all the edges from the group, any ports the Group has, and any edges connected to all child vertices
     * of the group. Prior to 5.13.0 this method did not exist and `getAllEdges` did what this method does.
     * @param params
     * @returns
     * @public
     */
    getInternalEdges(params?: {
        filter: (e: Edge) => boolean;
    }): Array<Edge>;
}
export interface EdgeOptions {
    graph: Graph;
    data?: any;
    source: Vertex;
    target: Vertex;
    cost?: number;
    directed?: boolean;
    id?: string;
    geometry?: any;
}
export declare class Edge extends Base {
    static objectType: string;
    objectType: string;
    /**
     * Source of the Edge.
     */
    source: Vertex;
    /**
     * Target of the Edge.
     */
    target: Vertex;
    /**
     * Edge cost. Defaults to 1.
     */
    cost: number;
    /**
     * Whether or not the edge is directed. Defaults to true.
     */
    directed: boolean;
    /**
     * ID of the edge. Your code should never change this value.
     */
    id: string;
    geometry: any;
    constructor(params: EdgeOptions);
    /**
     * Gets the cost for this edge. Defaults to 1.
     * @return Edge cost.
     */
    getCost(): number;
    /**
     * Sets the cost for this edge.
     * @param c Edge cost.
     */
    setCost(c: number): void;
    /**
     * Gets the id for this Edge.
          * @returns Edge id.
     */
    getId(): string;
    getFullId(): string;
    /**
     * For internal use only.
     * @internal
     */
    setId(id: string): void;
    /**
     * Gets whether or not the Edge is directed.
    * @returns True if the Edge is directed (unidirectional), false otherwise.
     */
    isDirected(): boolean;
    /**
     * Sets whether or not the Edge is directed.
    */
    setDirected(directed: boolean): void;
    /**
     * Returns a string representation of the Edge.
      * @returns Edge dumped to a string.
     */
    inspect(): string;
}
