import { BezierConnectorBase, AbstractBezierOptions } from "./abstract-bezier-connector";
import { Connection } from "../core/connector/connection-impl";
import { StateMachineOptions } from "./statemachine-connector";
/**
 * Options for the Bezier connector.
 * @public
 */
export interface BezierOptions extends AbstractBezierOptions {
}
/**
 * Defines the Bezier connector type. Since 6.9.0 this replaces `BezierConnector.type`.
 */
export declare const CONNECTOR_TYPE_CUBIC_BEZIER = "Bezier";
/**
 * @internal
 */
export interface CubicBezierConnector extends BezierConnectorBase {
    majorAnchor: number;
    minorAnchor: number;
    curviness: number;
}
/**
 * @param connection
 * @param params
 * @internal
 */
export declare function _createCubicBezierConnector(connection: Connection<any>, params: StateMachineOptions): CubicBezierConnector;
/**
 * Bezier connector.
 * In 7.x this will be removed and you'll need to use `CONNECTOR_TYPE_CUBIC_BEZIER` to refer to this connector type.
 * @deprecated
 */
export declare class BezierConnector {
    static type: string;
}
