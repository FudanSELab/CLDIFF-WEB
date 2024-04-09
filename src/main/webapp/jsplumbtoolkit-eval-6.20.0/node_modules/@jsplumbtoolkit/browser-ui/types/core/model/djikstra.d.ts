import { Graph, Vertex, Edge } from "./graph";
export interface DjikstraOptions {
    graph: Graph;
    source: Vertex;
    target: Vertex;
    sourceId?: string;
    targetId?: string;
    nodeFilter?: Function;
    edgeFilter?: Function;
    processAll?: boolean;
    strict?: boolean;
}
export interface ShortestPathComponent {
    vertex: Vertex;
    cost: number;
    edge: Edge;
}
export interface ShortestPathResult {
    path?: Array<ShortestPathComponent>;
    pathDistance?: number;
    dist?: Record<string, number>;
    edges?: Record<string, Edge>;
    previous?: Record<string, Vertex>;
}
export declare function djikstra(params: DjikstraOptions): ShortestPathResult;
