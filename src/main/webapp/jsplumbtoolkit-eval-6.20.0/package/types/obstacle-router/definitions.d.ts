import { BoundingBox, PointXY } from "../ui-core/util/util";
import { Edge } from "../core/model/graph";
import { Face } from "../ui-core/core/factory/anchor-record-factory";
export declare enum AreaTypes {
    vertex = "vertex",
    region = "region"
}
export declare type AreaType = keyof typeof AreaTypes;
/**
 * Models the intersection between two Regions - the axis of the intersection, the line segment
 * that is common between the two, the value in the axis of intersection at which the two lines join,
 * the midpoint of the intersection, and the two areas involved in the intersection.
 * The areas are labelled `a` and `b`. For axis=x, `a` is the area on the left of the intersection. For
 * axis=y, `a` is the area on the top of the intersection.
 * The `positioning` member provides information on the positioning between the two vertices, and works like
 * orientation does for anchors: for each of x and y, a value of 0 means "no preference", 1 means "below" or "to the right of",
 * and -1 means "above" or "to the left of". This information is used when tracing paths through regions.
 * @internal
 */
export interface Intersection {
    id: string;
    a: {
        id: string;
        type: AreaType;
        face: Face;
    };
    b: {
        id: string;
        type: AreaType;
        face: Face;
    };
    axis: IntersectionAxis;
    segment: {
        point1: number;
        point2: number;
    };
    otherAxisLocation: number;
    midpoint: PointXY;
    positioning: {
        x: number;
        y: number;
    };
}
/**
 * An area, either a Vertex or a Region.
 * @internal
 */
export interface AreaEntry extends BoundingBox {
    id: string;
    adjacentRegions: Array<{
        region: RegionEntry;
        intersection: Intersection;
    }>;
    x2: number;
    y2: number;
}
/**
 * @internal
 */
export interface VertexEntry extends AreaEntry {
    type: AreaTypes.vertex;
}
/**
 * @internal
 */
export interface RegionEntry extends AreaEntry {
    type: AreaTypes.region;
    adjacentVertices: Array<{
        vertex: VertexEntry;
        intersection: Intersection;
    }>;
}
/**
 * The bounds object used for a tracking region - we just need right/bottom.
 * @internal
 */
export interface TrackingRegionBounds {
    right: number;
    bottom: number;
}
/**
 * A region that is currently being computed. Once computation is finished we create a Region
 * from this and stash it.
 * @internal
 */
export interface TrackingRegion {
    origin: PointXY;
    cursor: PointXY;
    bounds: TrackingRegionBounds;
    id: string;
    obstacles: Array<AreaEntry>;
    adjacentRegions: Array<TrackingRegion>;
}
/**
 * @internal
 */
export interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
    area: AreaEntry;
    id: string;
}
/**
 * @internal
 */
export declare enum IntersectionAxis {
    x = "x",
    y = "y"
}
/**
 * Definition of the dataset produced by the obstacle detector, and also by certain layouts such as
 * the Hierarchy layout.
 * @internal
 */
export interface RegionSet {
    regionMap: Record<string, RegionEntry>;
    regions: Array<RegionEntry>;
    vertexMap: Record<string, VertexEntry>;
    vertices: Array<VertexEntry>;
    intersectionMap: Record<string, Intersection>;
    intersections: Array<Intersection>;
}
/**
 * @internal
 */
export interface PathSet extends RegionSet {
    edges: Array<{
        edge: Edge;
        path: Array<Intersection>;
    }>;
}
