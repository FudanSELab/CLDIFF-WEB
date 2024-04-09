import { Segment, SegmentHandler, SegmentParams } from "../../common/abstract-segment";
export declare type StraightSegmentCoordinates = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
/**
 * @internal
 */
export interface StraightSegmentParams extends SegmentParams {
}
/**
 * Constant identifying a Straight segment.
 * @internal
 */
export declare const SEGMENT_TYPE_STRAIGHT = "Straight";
/**
 * @internal
 */
export interface StraightSegment extends Segment {
    length: number;
    m: number;
    m2: number;
}
/**
 * @internal
 */
export declare const StraightSegmentHandler: SegmentHandler<StraightSegment, StraightSegmentParams>;
