import { BezierConnectorBase, BezierConnectorGeometry } from "./abstract-bezier-connector";
import { ConnectorComputeParams, PaintGeometry } from "../core/connector/abstract-connector";
/**
 * @internal
 * @private
 * @param bc
 */
export declare function exportBezierGeometry(bc: BezierConnectorBase): BezierConnectorGeometry;
/**
 * @internal
 * @private
 * @param bc
 * @param paintInfo
 * @param p
 */
export declare function computeBezierConnector(bc: BezierConnectorBase, paintInfo: PaintGeometry, p: ConnectorComputeParams): void;
/**
 * @internal
 * @private
 * @param g
 * @param dx
 * @param dy
 */
export declare function transformBezierGeometry(g: BezierConnectorGeometry, dx: number, dy: number): BezierConnectorGeometry;
/**
 * @internal
 * @private
 * @param bc
 * @param geometry
 */
export declare function importBezierGeometry(bc: BezierConnectorBase, geometry: BezierConnectorGeometry): boolean;
