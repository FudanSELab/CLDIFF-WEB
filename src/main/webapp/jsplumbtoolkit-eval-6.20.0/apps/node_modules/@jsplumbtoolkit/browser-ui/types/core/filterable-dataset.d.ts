import { Node, Edge, Group, Vertex } from "./model/graph";
/**
 * Extension of dataset that offers operation to perform operations on the contents, and to filter the contents.
 * @public
 */
export interface FilterableDataset {
    eachNode(fn: (i: number, n: Node) => void): void;
    eachEdge(fn: (i: number, e: Edge) => void): void;
    eachGroup(fn: (i: number, e: Group) => void): void;
    eachVertex(fn: (i: number, e: Vertex) => void): void;
    filter(spec: any, includePartials?: boolean): void;
}
/**
 * @internal
 * @param obj
 */
export declare function isFilterableDataset(obj: any): obj is FilterableDataset;
