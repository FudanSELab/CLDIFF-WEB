/**
 * @internal
 */
import { BoundingBox, Extents, PointXY } from "../util/util";
export interface SegmentParams {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}
/**
 * @internal
 */
export declare type PointNearPath = {
    s?: Segment;
    d: number;
    x: number;
    y: number;
    l: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
};
/**
 * Definition of a segment. This is an internal class that users of the API need not access.
 * @internal
 */
export interface Segment {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    type: string;
    extents: Extents;
}
export interface SegmentHandler<S extends Segment, SP extends SegmentParams> {
    lineIntersection(segment: S, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
    boxIntersection(segment: S, x: number, y: number, w: number, h: number): Array<PointXY>;
    boundingBoxIntersection(segment: S, box: BoundingBox): Array<PointXY>;
    getLength(segment: S): number;
    pointOnPath(segment: S, location: number, absolute?: boolean): PointXY;
    gradientAtPoint(segment: S, location: number, absolute?: boolean): number;
    pointAlongPathFrom(segment: S, location: number, distance: number, absolute?: boolean): PointXY;
    findClosestPointOnPath(segment: S, x: number, y: number): PointNearPath;
    getPath(segment: S, isFirstSegment: boolean): string;
    create(params: SP): S;
}
/**
 * Base class for segments in connectors.
 *
 * @internal
 */
/**
 * Finds the closest point on this segment to the given x/y, returning both the x and y of the point plus its distance from
 * the supplied point, and its location along the length of the path inscribed by the segment.  This implementation returns
 * Infinity for distance and null values for everything else subclasses are expected to override.
 * @param x - X location to find closest point to
 * @param y - Y location to find closest point to
 * @returns a `PointNearPath` object, which contains the location of the closest point plus other useful information.
 * @internal
 */
export declare function _defaultSegmentFindClosestPointOnPath(s: Segment, x: number, y: number): PointNearPath;
/**
 * Computes the list of points on the segment that intersect the given line.
 * @param x1 - X location of point 1
 * @param y1 - Y location of point 1
 * @param x2 - X location of point 2
 * @param y2 - Y location of point 2
 * @returns A list of intersecting points
 * @internal
 */
export declare function _defaultSegmentLineIntersection(s: Segment, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
/**
 * Computes the list of points on the segment that intersect the box with the given origin and size.
 * @param x - x origin of the box
 * @param y - y origin of the box
 * @param w - width of the box
 * @param h - height of the box
 * @returns A list of intersecting points
 * @internal
 */
export declare function _defaultSegmentBoxIntersection(s: Segment, x: number, y: number, w: number, h: number): Array<PointXY>;
/**
 * Computes the list of points on the segment that intersect the given bounding box.
 * @param box - Box to test for intersections.
 * @returns A list of intersecting points
 * @internal
 */
export declare function _defaultSegmentBoundingBoxIntersection(s: Segment, box: BoundingBox): Array<PointXY>;
/**
 * @internal
 * @param sp
 * @private
 */
export declare function _createBaseSegment(sp: SegmentParams): Segment;
