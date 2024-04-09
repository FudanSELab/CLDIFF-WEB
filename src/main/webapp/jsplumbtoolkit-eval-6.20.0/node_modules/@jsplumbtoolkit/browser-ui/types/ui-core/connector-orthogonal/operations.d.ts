import { ConnectorComputeParams, PaintGeometry } from "../core/connector/abstract-connector";
import { PointXY } from "../util/util";
import { AxisOrientation, Direction, OrthogonalConnector, OrthogonalConnectorGeometry, OrthogonalSegment, SegmentMoveResult } from "./orthogonal-connector";
import { AnchorPlacement } from "../common/anchor";
import { ViewportElement } from "../core/viewport";
/**
 * @internal
 */
export declare const ORIENTATION_PERPENDICULAR = "perpendicular";
/**
 * @internal
 */
export declare const ORIENTATION_ORTHOGONAL = "orthogonal";
/**
 * @internal
 */
export declare const ORIENTATION_OPPOSITE = "opposite";
/**
 * @internal
 * @private
 * @param g
 * @param dx
 * @param dy
 */
export declare function transformOrthogonalGeometry(g: OrthogonalConnectorGeometry, dx: number, dy: number): OrthogonalConnectorGeometry;
/**
 * @internal
 * @private
 * @param oc
 */
export declare function _exportOrthogonalGeometry(oc: OrthogonalConnector): {
    segments: {
        x: number;
        y: number;
    }[];
    source: AnchorPlacement;
    target: AnchorPlacement;
};
/**
 * Returns whether or not the given value lies between v1 and v2.
 * @param value Value to compare
 * @param v1 One bound of the range. This method orders the bounds as needed.
 * @param v2 Other bound of the range. This method orders the bounds as needed.
 * @param inclusive If true, value can also equal v1 or v2 (ie the range is inclusive)
 */
export declare function valueInRange(value: number, v1: number, v2: number, inclusive?: boolean): boolean;
/**
 * @internal
 * @private
 * @param segments
 */
export declare function transformOrthogonalFromAbsolute(segments: Array<OrthogonalSegment>): Array<OrthogonalSegment>;
/**
 * @internal
 * @param oc
 * @param geometry
 * @private
 */
export declare function _importOrthogonalGeometry(oc: OrthogonalConnector, geometry: {
    source: AnchorPlacement;
    target: AnchorPlacement;
    segments: Array<PointXY>;
}): boolean;
/**
 * @internal
 * @private
 * @param segments
 * @param dir
 * @param axis
 * @param segment
 */
export declare function findSegment(segments: Array<OrthogonalSegment>, dir: Direction, axis: AxisOrientation, segment?: OrthogonalSegment): [OrthogonalSegment, number];
/**
 * @internal
 * @private
 */
export declare function orthogonalSegmentLength(s: OrthogonalSegment): number;
/**
 * @internal
 * @private
 * @param segment
 */
export declare function segmentDirections(segment: OrthogonalSegment): [number, number];
/**
 * @internal
 * @param oc
 * @param paintInfo
 * @param params
 * @private
 */
export declare function _computeOrthogonalConnector(oc: OrthogonalConnector, paintInfo: PaintGeometry, params: ConnectorComputeParams): void;
/**
 * @internal
 * @param oc
 * @param segment
 * @param pos
 * @private
 */
export declare function _setOrthogonalSegmentPosition(oc: OrthogonalConnector, segment: OrthogonalSegment, pos: [number, number], sourceInfo: ViewportElement<any>, targetInfo: ViewportElement<any>): SegmentMoveResult;
/**
 * @internal
 * @param oc
 * @private
 */
export declare function _trimOrthogonalConnector(oc: OrthogonalConnector): void;
/**
 * @internal
 * @param oc
 * @param idx
 * @param orientation
 * @private
 */
export declare function _setOrthogonalAnchorOrientation(oc: OrthogonalConnector, idx: number, orientation: number[]): void;
