import { Group, Node, ObjectData, Port, Edge, Vertex } from "./model/graph";
import { VertexUpdatedReason } from "./toolkit";
import { ToolkitRenderer } from "./renderer";
import { PointXY } from "../ui-core/util/util";
export interface NodeAddedParams {
    node: Node;
    eventInfo?: any;
    parentGroup?: Group;
}
export interface PortAddedParams {
    vertex: Node | Group;
    data: ObjectData;
    port: Port;
}
export interface GroupMemberAddedParams {
    vertex: Node | Group;
    group: Group;
    pos?: PointXY;
    sourceGroup?: Group;
    source?: ToolkitRenderer<any>;
    vertexIsNew?: boolean;
}
export interface GroupMemberRemovedParams {
    vertex: Node | Group;
    group: Group;
    source?: ToolkitRenderer<any>;
    targetGroup?: Group;
}
export interface GroupAddedParams {
    group: Group;
    eventInfo?: any;
    parentGroup?: Group;
}
export interface GroupRemovedParams {
    group: Group;
    removeChildren?: boolean;
    children: Array<Node | Group>;
    parentGroup?: Group;
    parentGroupIsBeingRemoved: boolean;
}
export interface NodeRemovedParams {
    node: Node;
    edges: Array<Edge>;
    parentGroup?: Group;
    parentGroupIsBeingRemoved: boolean;
}
export interface VertexUpdatedParams {
    vertex: Node | Group;
    updates: ObjectData;
    originalData: ObjectData;
    originalId?: string;
    originalPortId?: string;
    reason: VertexUpdatedReason;
    port?: Port;
}
export interface PortRemovedParams {
    vertex: Node | Group;
    port: Port;
    edges: Array<Edge>;
}
export interface PortUpdatedParams {
    vertex: Node | Group;
    port: Port;
    updates: ObjectData;
    originalData: ObjectData;
    originalId: string;
    originalPortId?: string;
}
export interface EdgeAddedParams {
    edge: Edge;
    source?: ToolkitRenderer<any>;
    geometry: any;
    addedByMouse?: boolean;
}
export interface VertexMovedParams<T> {
    el: T;
    vertex: Node | Group;
    pos: PointXY;
    e: Event;
    originalPosition: PointXY;
    type: string;
    renderer: ToolkitRenderer<any>;
}
export interface EdgeUpdatedParams {
    edge: Edge;
    updates: ObjectData;
    originalData: ObjectData;
}
export interface RendererAddedParams {
    renderer: ToolkitRenderer<any>;
    id: string;
}
export interface UndoRedoUpdateParams {
    undoCount: number;
    redoCount: number;
}
export interface EdgePathEditedParams {
    renderer: ToolkitRenderer<any>;
    edge: Edge;
    geometry: any;
    originalGeometry: any;
}
export interface EdgePathRestoredParams {
    renderer: ToolkitRenderer<any>;
    edge: Edge;
    geometry: any;
}
export interface EdgeRemovedParams {
    edge: Edge;
    source?: any;
}
export interface EdgeVertexChangedParams {
    old?: Vertex;
    new?: Vertex;
    edge?: Edge;
    success: boolean;
}
export interface EdgeTargetChangedParams extends EdgeVertexChangedParams {
}
export interface EdgeSourceChangedParams extends EdgeVertexChangedParams {
}
export interface EdgeSelectionParams {
    source?: string | Vertex;
    target?: string | Vertex;
    element?: string | Vertex;
    filter?: (e: Edge) => boolean;
}
