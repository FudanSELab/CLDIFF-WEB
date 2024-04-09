import { ConnectorComputeParams, PaintGeometry } from "./abstract-connector";
import { AnchorPlacement } from "../../common/anchor";
import { Connection } from "./connection-impl";
import { Connector, ConnectorOptions } from "../../common/connector";
export interface StraightConnectorGeometry {
    source: AnchorPlacement;
    target: AnchorPlacement;
}
export declare const CONNECTOR_TYPE_STRAIGHT = "Straight";
export interface StraightConnector extends Connector {
}
/**
 * @internal
 * @param sc
 * @param paintInfo
 * @param p
 */
export declare function computeStraightConnector(sc: StraightConnector, paintInfo: PaintGeometry, p: ConnectorComputeParams): void;
/**
 * @internal
 * @param g
 * @param dx
 * @param dy
 */
export declare function transformStraightGeometry(g: StraightConnectorGeometry, dx: number, dy: number): StraightConnectorGeometry;
/**
 * Create a Straight connector. This is v2. Retain this.
 * @param connection
 * @param params
 * @private
 */
export declare function _createStraightConnector(connection: Connection<any>, params: ConnectorOptions): StraightConnector;
/**
 * Straight connector.
 * In 7.x this will be removed; you can use CONNECTOR_TYPE_SEGMENTED instead.
 * @deprecated
 */
export declare class StraightConnector {
    static type: string;
}
