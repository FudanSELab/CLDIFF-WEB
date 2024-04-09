/**
 * Models a Path - the series of edges and intermediate nodes between two vertices
 * in some instance of the Toolkit.
 */
import { JsPlumbToolkit } from "../toolkit";
import { Edge, Group, Node, Vertex } from "./graph";
import { ShortestPathComponent, ShortestPathResult } from "./djikstra";
import { FilterableDataset } from "../filterable-dataset";
/**
 * Path specification.
 */
export interface PathOptions {
    /**
     * Path source. Either a vertex (node/group/port) or a vertex id.
     */
    source: string | Vertex;
    /**
     * Path target. Either a vertex (node/group/port) or a vertex id.
     */
    target: string | Vertex;
    /**
     * Sets whether or not paths are searched strictly by the given source/target. If you supply a node as the source, but there are only edges connected to ports on that node, by default these edges will be ignored. Switching `strict` to false will mean these edges are considered.
     */
    strict?: boolean;
    /**
     * This function is given each Node/Group's backing data and asked to return true or false - true means include the Node/Group, false means exclude it.
     * @param n
     */
    nodeFilter?: (n: Node) => boolean;
    /**
     * This function is given each Edge's backing data and asked to return true or false - true means include the Edge, false means exclude it.
     * @param n
     */
    edgeFilter?: (n: Edge) => boolean;
}
/**
 * Models the path between two Nodes/Ports, which consists of a series of [Group/Node/Port, Edge] pairs.
 */
export declare class Path implements FilterableDataset {
    toolkit: JsPlumbToolkit;
    result: ShortestPathResult;
    private vertices;
    private vertexMap;
    /**
     * @param toolkit toolkit instance from which to get the path info.
     * @param params Path specification
     */
    constructor(toolkit: JsPlumbToolkit, params?: PathOptions);
    /**
     * Remove all of the edges in this path from the underlying Toolkit instance.
     */
    deleteEdges(): this;
    /**
     * Deletes all the nodes/groups in the path. As with the `contains` method, there is a special consideration here: if
     * a path passes through ports on a node/group, then that node/group will be, for the purposes of this method,
     * considered to be part of the path and it will be deleted.  If you instead wish to delete only the ports in a
     * path, use `deletePorts`.  Note that this method will, of course, have the effect of also deleting all the edges,
     * since the nodes/groups for those edges will no longer exist.
     */
    deleteVertices(): this;
    /**
     * Returns true if the path contains the given object (a node, group, port or edge), false otherwise.
     * @param obj Node/Port/Edge, or object id, of the element to test for.
     * @param doNotFuzzyMatchNodes By default,
     * if you pass a node/group in to this method and the path passes through a port on that node/group, this method
     * returns true. But if you set `doNotFuzzyMatchNodes` to true, then this method will return true only if the node/group itself is on the path.
     * @returns True if Path contains the object, false otherwise.
     */
    contains(obj: Edge | Vertex, doNotFuzzyMatchNodes?: boolean): boolean;
    /**
     * Get all the vertices in the path.
     */
    getVertices(): Array<Vertex>;
    /**
     * Retrieve the specified vertex from the path
     * @param obj Either a vertex ID or a node/group/port.
     * @returns A Vertex, if the given vertex is in the path, otherwise null.
     */
    getVertex(obj: string | Vertex): Vertex;
    /**
     * Gets all the edges in the path that are connected to the given vertex.
     * @param v Vertex to get edges for.
     */
    getAllEdgesFor(v: Vertex): Array<Edge>;
    filter(spec: any, includePartials?: boolean): void;
    private _each;
    /**
     * Iterates through the path one step at a time. Each step consists of an object containing a
     * `vertex`, and, for all entries except the first, an `edge` member, which supplies the Edge that links
     * to the Vertex (which is why it is null for the first entry).
     * @param fn Function to call for each step.
     */
    each(fn: (i: number, p: ShortestPathComponent) => any): void;
    /**
     * Iterates through the Nodes/Groups/Ports in the path one step at a time.
     * @param fn Function to call for each step.
     */
    eachVertex(fn: (idx: number, v: Vertex) => any): void;
    /**
     * Iterates through the Edges in the path one step at a time. There is always one fewer Edges than Nodes/Ports.
     * @param fn Function to call for each step.
     */
    eachEdge(fn: (i: number, e: Edge) => any): void;
    /**
     * Iterates through the Nodes in the path one step at a time.
     * @param fn Function to call for each step.
     */
    eachNode(fn: (i: number, n: Node) => void): void;
    /**
     * Iterates through the Groups in the path one step at a time.
     * @param fn Function to call for each step.
     */
    eachGroup(fn: (i: number, g: Group) => void): void;
    /**
     * Counts the number of vertices in the Path (including the start and end nodes/groups).  Note that for the
     * purposes of this calculation, a Port is considered a vertex, as is a Group.
     */
    getVertexCount(): number;
    /**
     * Gets the Vertex at the given index in the path.
     * @param idx Index of the vertex to retrieve.
     * @returns vertex at the given index, or null if no vertex exists at the given index.
     */
    getNodeAt(idx: number): Vertex;
    /**
     * Counts the number of edges in the path.  This may be zero, if the given path spec did not select a valid path in the Toolkit instance.
     */
    getEdgeCount(): number;
    /**
     * Gets the Edge at the given index in the Path.
     * @param idx Index of the Edge to retrieve. You can use negative numbers here: an index of -1 means get the last edge.
     * An index of -2 means get the last but one. etc.
     */
    getEdgeAt(idx: number): Edge;
    /**
     * Removes all vertices and edges in this path from the underlying Toolkit. This is an alias for `deleteVertices`, since
     * deleting a vertex causes its edges to also be deleted.
     */
    deleteAll(): void;
    /**
     * Returns whether or not a given path is empty
     * @returns True if path is empty, false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Gets the cost of the given path.  Edges in the Toolkit can have a cost associated with them (the default is 1), and so the cost of any given path is the sum of the cost of all of the edges in the path.
     * @returns Total cost of the Path. Null if path does not exist.
     */
    getCost(): number;
    /**
     * Returns whether or not a given path exists.
     * @returns True if path exists, false otherwise.
     */
    exists(): boolean;
}
