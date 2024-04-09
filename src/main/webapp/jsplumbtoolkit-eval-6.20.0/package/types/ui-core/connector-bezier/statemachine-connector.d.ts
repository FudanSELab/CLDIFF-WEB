import { BezierConnectorBase, AbstractBezierOptions } from "./abstract-bezier-connector";
import { PointXY } from "../util/util";
import { Connection } from "../core/connector/connection-impl";
export interface StateMachineOptions extends AbstractBezierOptions {
}
/**
 * This is v2. Retain this.
 */
export declare const CONNECTOR_TYPE_QUADRATIC_BEZIER = "StateMachine";
/**
 * This is v2. Retain this.
 */
export interface QuadraticBezierConnector extends BezierConnectorBase {
    _controlPoint: PointXY;
}
/**
 * This is v2. Retain this.
 * @param connection
 * @param params
 * @private
 */
export declare function _createQuadraticBezierConnector(connection: Connection<any>, params: StateMachineOptions): QuadraticBezierConnector;
/**
 * StateMachine connector.
 * In 7.x this will be removed and you'll need to use `CONNECTOR_TYPE_QUADRATIC_BEZIER` to refer to this connector type.
 * @deprecated
 */
export declare class StateMachineConnector {
    static type: string;
}
