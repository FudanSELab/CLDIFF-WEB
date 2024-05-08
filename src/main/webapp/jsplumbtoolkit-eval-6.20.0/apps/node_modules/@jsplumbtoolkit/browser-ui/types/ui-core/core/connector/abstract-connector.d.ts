import { Connection } from './connection-impl';
import { Orientation } from '../factory/anchor-record-factory';
import { Endpoint } from '../endpoint/endpoint';
import { ViewportElement } from "../viewport";
import { Connector, ConnectorOptions, PaintAxis } from "../../common/connector";
import { AnchorPlacement } from "../../common/anchor";
/**
 * @internal
 */
export declare type ConnectorComputeParams = {
    sourcePos: AnchorPlacement;
    targetPos: AnchorPlacement;
    sourceEndpoint: Endpoint<any>;
    targetEndpoint: Endpoint<any>;
    strokeWidth: number;
    sourceInfo: ViewportElement<any>;
    targetInfo: ViewportElement<any>;
};
/**
 * @internal
 */
export interface PaintGeometry {
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    xSpan: number;
    ySpan: number;
    mx: number;
    my: number;
    so: Orientation;
    to: Orientation;
    x: number;
    y: number;
    w: number;
    h: number;
    segment: number;
    startStubX: number;
    startStubY: number;
    endStubX: number;
    endStubY: number;
    isXGreaterThanStubTimes2: boolean;
    isYGreaterThanStubTimes2: boolean;
    opposite: boolean;
    perpendicular: boolean;
    orthogonal: boolean;
    sourceAxis: PaintAxis;
    points: [number, number, number, number, number, number, number, number];
    stubs: [number, number];
    anchorOrientation?: string;
}
export declare function emptyPaintGeometry(): PaintGeometry;
/**
 * Helper method for connectors - AnchorPlacement is a common component of a connector geometry.
 * @internal
 * @param a
 * @param dx
 * @param dy
 * @internal
 */
export declare function transformAnchorPlacement(a: AnchorPlacement, dx: number, dy: number): AnchorPlacement;
/**
 * Base method to use when creating Connectors. This is v2. Retain this.
 * @param connection
 * @param params
 * @param defaultStubs
 * @private
 */
export declare function _createConnectorBase(type: string, connection: Connection<any>, params: ConnectorOptions, defaultStubs: [number, number]): Connector;
export declare function _setAnchorLocation(loc: AnchorPlacement, connection: Connection<any>, endpointIndex: number): void;
