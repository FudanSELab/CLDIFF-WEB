/**
 * The bezier connector's internal representation of a path.
 */
import { Connector, ConnectorOptions, Geometry } from "../common/connector";
import { PointXY } from "../util/util";
import { AnchorPlacement } from "../common/anchor";
import { Connection } from "../core/connector/connection-impl";
/**
 * Defines the geometry used by a cubic bezier connector.
 * @public
 */
export interface BezierConnectorGeometry extends Geometry {
    controlPoints: [
        PointXY,
        PointXY
    ];
    source: AnchorPlacement;
    target: AnchorPlacement;
}
/**
 * Base options interface for StateMachine and Bezier connectors.
 * @public
 */
export interface AbstractBezierOptions extends ConnectorOptions {
    /**
     * Whether or not to show connections whose source and target is the same element.
     */
    showLoopback?: boolean;
    /**
     * A measure of how "curvy" the bezier is. In terms of maths what this translates to is how far from the curve the control points are positioned.
     */
    curviness?: number;
    margin?: number;
    proximityLimit?: number;
    orientation?: string;
    loopbackRadius?: number;
}
/**
 * @internal
 * @private
 */
export interface BezierConnectorBase extends Connector {
    showLoopback: boolean;
    curviness: number;
    margin: number;
    proximityLimit: number;
    orientation: string;
    loopbackRadius: number;
    clockwise: boolean;
    isLoopbackCurrently: boolean;
    geometry: BezierConnectorGeometry;
}
/**
 * @param connection
 * @param params
 * @internal
 * @private
 */
export declare function createAbstractBezierConnector(type: string, connection: Connection<any>, params: AbstractBezierOptions): BezierConnectorBase;
