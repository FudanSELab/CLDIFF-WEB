import { Segment, SegmentHandler, SegmentParams } from "../../common/abstract-segment";
/**
 * @internal
 * @private
 */
export interface ArcSegmentParams extends SegmentParams {
    cx: number;
    cy: number;
    r: number;
    ac: boolean;
    startAngle?: number;
    endAngle?: number;
}
/**
 * @internal
 * @private
 */
export declare const SEGMENT_TYPE_ARC = "Arc";
/**
 * @internal
 * @private
 */
export interface ArcSegment extends Segment {
    cx: number;
    cy: number;
    radius: number;
    anticlockwise: boolean;
    startAngle: number;
    endAngle: number;
    sweep: number;
    length: number;
    circumference: number;
    frac: number;
}
/**
 * @internal
 * @private
 */
export declare const ArcSegmentHandler: SegmentHandler<ArcSegment, ArcSegmentParams>;
