import { PointXY, Size } from "../ui-core/util/util";
/**
 * @internal
 * @param gates
 */
export declare function createGateMap(gates: Array<Gate>): Record<string, Gate>;
/** @internal */
export declare type RouterLine = {
    source: PointXY;
    target: PointXY;
    id: string;
};
/**
 * @internal
 * @param line
 */
export declare function routerLineSgn(line: RouterLine, axis: 0 | 1): number;
/**
 * @internal
 * @param line1
 * @param line2
 */
export declare function routerLineIntersects(line1: RouterLine, line2: RouterLine, axis: 0 | 1): boolean;
/** @internal */
export interface RouterEdge {
    id: string;
    pathDirection: number;
    sourceId: string;
    targetId: string;
    path: Array<GateId>;
}
/**
 * @internal
 * @param edges
 * @param gates
 * @param gateMap
 * @param getVertexPosition
 * @param getVertexSize
 */
export declare function sortAndPlaceEdges(edges: Array<RouterEdge>, gates: Array<Gate>, gateMap: Record<string, Gate>, getVertexPosition: (id: string) => PointXY, getVertexSize: (id: string) => Size): void;
/** @internal */
export interface RoutingInformation<T extends RouterRegion = RouterRegion> {
    gateMap?: Record<string, Gate>;
    gates: Array<Gate>;
    edges: Array<RouterEdge>;
    regions: Array<T>;
    edgeMap: Record<string, RouterEdge>;
}
/** @internal */
export interface RouterOptions<T extends RouterRegion = RouterRegion> extends RoutingInformation<T> {
    getVertexPosition: (id: string) => PointXY;
    getVertexSize: (id: string) => Size;
}
/** @internal */
export interface RouterRegion {
    id: string;
    left: number;
    top: number;
    width: number;
    height: number;
    lines: Array<RouterLine>;
}
/** @internal */
export declare type GateId = string;
/**
 * The gate between two regions. A gate is a region in the plane of either the x or y axis (axis === 0 for x, 1 for y), and
 * consists of a segment that is a line in that axis, having a start and end point.
 *
 * @internal
 */
export interface Gate<E extends RouterEdge = RouterEdge> {
    id: GateId;
    a: {
        id: string;
        type: string;
    };
    b: {
        id: string;
        type: string;
    };
    axis: number;
    segment: {
        point1: number;
        point2: number;
    };
    length: number;
    otherAxisLocation: number;
    midpoint: PointXY;
    edges: Array<{
        edge: E;
        next: Gate;
        location?: number;
    }>;
}
/** @internal */
export declare type GatedPath = Array<Gate>;
/** @internal */
export declare function populateRegions(edges: Array<RouterEdge>, regions: Array<RouterRegion>, gateMap: Record<string, Gate>): void;
