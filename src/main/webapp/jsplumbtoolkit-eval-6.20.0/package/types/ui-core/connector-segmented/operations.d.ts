import { AnchorPlacement } from "../common/anchor";
import { PointXY } from "../util/util";
import { SegmentConnectorSegment, SegmentedConnector, SegmentedConnectorGeometry } from "./segmented-connector";
import { ConnectorComputeParams, PaintGeometry } from "../core/connector/abstract-connector";
/**
 * Compute the line angle for the given segment.
 * @param cs
 */
export declare function segmentLineAngle(cs: SegmentConnectorSegment): number;
/**
 * @internal
 * @private
 */
export declare function connectorSegmentLength(s: SegmentConnectorSegment): number;
/**
 * This is v2. Retain this.
 * @param sc
 * @param paintInfo
 * @param params
 * @internal
 */
export declare function computeSegmentedConnector(sc: SegmentedConnector, paintInfo: PaintGeometry, params: ConnectorComputeParams): void;
/**
 * This is v2. Retain this.
 * @param g
 * @param dx
 * @param dy
 * @internal
 */
export declare function transformSegmentedGeometry(g: SegmentedConnectorGeometry, dx: number, dy: number): SegmentedConnectorGeometry;
/**
 * This is v2. Retain this.
 * @param sc
 * @param geometry
 * @internal
 */
export declare function importSegmentedGeometry(sc: SegmentedConnector, geometry: {
    source: AnchorPlacement;
    target: AnchorPlacement;
    segments: Array<PointXY>;
}): boolean;
/**
 * @param segments
 * @internal
 */
export declare function transformSegmentedFromAbsolute(segments: Array<SegmentConnectorSegment>): Array<SegmentConnectorSegment>;
/**
 * @param sc
 * @internal
 */
export declare function exportSegmentedGeometry(sc: SegmentedConnector): SegmentedConnectorGeometry;
/**
 * @internal
 * @param sc
 * @private
 */
export declare function _updateSegmentedConnectorFromAbsolute(sc: SegmentedConnector): void;
