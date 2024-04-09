import { PointNearPath, Segment, SegmentHandler, SegmentParams } from "../../common/abstract-segment";
import { BoundingBox, PointXY } from "../../util/util";
export declare function _registerSegmentHandler<S extends Segment, SP extends SegmentParams>(type: string, handler: SegmentHandler<S, SP>): void;
export declare const Segments: {
    lineIntersection(segment: Segment, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
    boxIntersection(segment: Segment, x: number, y: number, w: number, h: number): Array<PointXY>;
    boundingBoxIntersection(segment: Segment, box: BoundingBox): Array<PointXY>;
    pointOnPath(segment: Segment, location: number, absolute?: boolean): PointXY;
    gradientAtPoint(segment: Segment, location: number, absolute?: boolean): number;
    pointAlongPathFrom(segment: Segment, location: number, distance: number, absolute?: boolean): PointXY;
    findClosestPointOnPath(segment: Segment, x: number, y: number): PointNearPath;
    getPath(segment: Segment, isFirstSegment: boolean): string;
};
/**
 * @internal
 * @param segment
 * @private
 */
export declare function _getSegmentLength(segment: Segment): number;
/**
 * @internal
 * @private
 */
export declare function _createSegment(type: string, params: SegmentParams): Segment;
