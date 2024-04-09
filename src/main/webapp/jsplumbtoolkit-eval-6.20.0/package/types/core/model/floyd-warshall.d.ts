import { Graph, Vertex } from "./graph";
export interface FloydWarshallOptions {
    graph: Graph;
    focus?: Vertex;
}
export interface FloydWarshallResult {
    paths: any;
    parents: any;
}
export declare function floydWarshall(params: FloydWarshallOptions): FloydWarshallResult;
