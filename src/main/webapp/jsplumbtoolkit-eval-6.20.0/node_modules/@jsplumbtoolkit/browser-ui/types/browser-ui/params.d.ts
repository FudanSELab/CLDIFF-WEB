import { Surface } from './surface';
import { PointXY } from "../ui-core/util/util";
import { Edge, Group, Port, Vertex, Node } from "../core/model/graph";
import { Connection } from "../ui-core/core/connector/connection-impl";
import { Geometry } from "../ui-core/common/connector";
import { GroupMemberAddedParams, GroupMemberRemovedParams } from "../core/params";
import { UIGroup } from "../ui-core/core/group/group";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
/**
 * Parent payload for a `node:removed` or `group:removed` event from the Surface.
 * @public
 */
export interface SurfaceVertexRemovedParams {
    el: Element;
    pos: PointXY;
    vertex: Vertex;
}
/**
 * Payload for a `node:removed` event from the Surface.
 * @public
 */
export interface SurfaceNodeRemovedParams extends SurfaceVertexRemovedParams {
}
/**
 * Payload for a `group:removed` event from the Surface.
 * @public
 */
export interface SurfaceGroupRemovedParams extends SurfaceVertexRemovedParams {
    childrenRemoved: boolean;
    childPositions: Record<string, PointXY>;
    children: Array<Node | Group>;
}
/**
 * Payload for a `port:removed` event from a Surface.
 * @public
 */
export interface SurfacePortRemovedParams {
    vertex: Node | Group;
    port: Port;
    portEl: Element;
    vertexEl: Element;
}
/**
 * Payload for a group:resize event from a surface.
 * @public
 */
export interface SurfaceGroupResizedParams {
    group: Group;
    el: Element;
    w: number;
    h: number;
}
/**
 * Payload for an edge:added event from a surface.
 * @public
 */
export interface SurfaceEdgeAddedParams {
    source: Vertex;
    target: Vertex;
    connection: Connection<BrowserElement>;
    edge: Edge;
    geometry: Geometry;
}
/**
 * Payload for a `node:added` or `group:added` event from the Surface.
 * @public
 */
export interface SurfaceVertexAddedParams {
    el: BrowserElement;
    id: string;
    vertex: Node | Group;
    pos?: PointXY;
}
/**
 * Payload for a `node:added` event from the Surface.
 * @public
 */
export interface SurfaceNodeAddedParams extends SurfaceVertexAddedParams {
}
/**
 * Payload for a `group:added` event from the Surface.
 * @public
 */
export interface SurfaceGroupAddedParams extends SurfaceVertexAddedParams {
}
/**
 * Payload for a `group:member:added` event from the Surface.
 * @public
 */
export interface SurfaceGroupMemberAddedParams extends GroupMemberAddedParams {
    el: Element;
    groupEl: Element;
    uigroup: UIGroup;
}
/**
 * Payload for a `group:member:removed` event from the Surface.
 * @public
 */
export interface SurfaceGroupMemberRemovedParams extends GroupMemberRemovedParams {
    el: Element;
    groupEl: Element;
    pos: PointXY;
}
/**
 * Payload for a pan/zoom event from a surface.
 * @public
 */
export interface SurfacePanZoomParams {
    /**
     * Current x pan value
     */
    x: number;
    /**
     * Current y pan value
     */
    y: number;
    /**
     * current zoom
     */
    zoom: number;
    /**
     * previous zoom
     */
    oldZoom: number;
    /**
     * Event that caused the pan. May be null.
     */
    event?: Event;
}
/**
 * Payload for the node:move:start event that is fired when a node/group has just begun to be moved.
 * @public
 */
export interface SurfaceVertexMoveStartParams {
    domEl: Element;
    pos: PointXY;
    elementId: string;
    originalPosition?: PointXY;
    vertex: Node | Group;
}
/**
 * Payload for a group:collapse event from a surface
 */
export interface SurfaceGroupCollapsedParams {
    group: Group;
    uigroup: UIGroup;
    renderer: Surface;
}
/**
 * Payload for a group:expand event from a surface
 * @public
 */
export interface SurfaceGroupExpandedParams extends SurfaceGroupCollapsedParams {
}
