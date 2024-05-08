import { Vertex } from "./graph";
export declare class Cluster {
    vertices: Array<Vertex>;
    constructor(seed: Vertex);
    addVertex(v: Vertex): void;
}
