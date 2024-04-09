import { Curve } from "./bezier";
import { Segment, SegmentHandler, SegmentParams } from "../common/abstract-segment";
/**
 * @internal
 * @private
 */
export interface BezierSegmentParams extends SegmentParams {
    cp1x: number;
    cp2x: number;
    cp1y: number;
    cp2y: number;
}
/**
 * @internal
 * @private
 */
export declare const SEGMENT_TYPE_BEZIER = "Bezier";
/**
 * @internal
 * @private
 */
export interface BezierSegment extends Segment {
    curve: Curve;
    cp1x: number;
    cp1y: number;
    cp2x: number;
    cp2y: number;
    length: number;
}
/**
 * @internal
 * @private
 */
export declare const BezierSegmentHandler: SegmentHandler<BezierSegment, BezierSegmentParams>;
