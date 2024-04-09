import { Node, Group } from './model/graph';
import { EdgeAddedParams, GroupAddedParams, GroupRemovedParams, NodeAddedParams, NodeRemovedParams, VertexUpdatedParams } from "./params";
export interface ToolkitRenderer<E> {
    id: string;
    bind(evt: string, payload: any): void;
    onDestroy(cb: (r: ToolkitRenderer<E>) => any): void;
    setPosition(vertex: Node | Group | E, x: number, y: number): void;
    expandGroup(group: Group): void;
    collapseGroup(group: Group): void;
    _nodeAdded(p: NodeAddedParams): void;
    _groupAdded(p: GroupAddedParams): void;
    _edgeAdded(data: EdgeAddedParams): void;
    _nodeRemoved(node: NodeRemovedParams): void;
    _groupRemoved(group: GroupRemovedParams): void;
    _vertexUpdated(p: VertexUpdatedParams): void;
    _graphClearStart(): void;
    _graphClearEnd(): void;
}
