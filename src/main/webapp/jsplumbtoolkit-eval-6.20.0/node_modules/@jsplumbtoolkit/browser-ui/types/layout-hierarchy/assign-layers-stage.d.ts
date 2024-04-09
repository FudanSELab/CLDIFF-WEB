import { HierarchyLayoutStage } from "./hierarchy-layout-stage";
import { Edge, Node } from "../core/model/graph";
import { SpanningEdgeNode } from "./definitions";
/**
 * @internal
 */
export declare class AssignLayersStage extends HierarchyLayoutStage {
    placedMap: Map<string, boolean>;
    done: boolean;
    currentLayer: any;
    unprocessedChildren: Array<[Node, number, SpanningEdgeNode]>;
    filteredEdges: Set<Edge>;
    countUnplacedAdjacentVertices(nodeId: string): number;
    _oneNode(root: Node, layer: number): void;
    cascadeEdgeNodes(): void;
    execute(currentNode: any): void;
}
