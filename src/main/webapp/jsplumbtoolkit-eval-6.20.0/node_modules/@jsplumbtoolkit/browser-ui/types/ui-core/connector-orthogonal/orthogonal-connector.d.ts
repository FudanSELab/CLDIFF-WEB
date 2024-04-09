/**
 * @internal
 */
import { PointXY } from "../util/util";
import { AnchorPlacement } from "../common/anchor";
import { Connector, ConnectorOptions, Geometry } from "../common/connector";
import { Connection } from "../core/connector/connection-impl";
/**
 * @internal
 */
export declare const VERTICAL = "v";
/**
 * @internal
 */
export declare const HORIZONTAL = "h";
/**
 * @internal
 */
export declare const NEGATIVE = -1;
/**
 * @internal
 */
export declare type AxisOrientation = "h" | "v";
/**
 * @internal
 */
export declare type Direction = -1 | 1;
/**
 * @internal
 */
export declare type OrthogonalSegment = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    o: AxisOrientation;
    ax1: number;
    ay1: number;
    ax2: number;
    ay2: number;
};
/**
 * @internal
 */
export declare type AnchorFace = "top" | "left" | "bottom" | "right";
/**
 * @internal
 */
export declare type SegmentContext = {
    segment: OrthogonalSegment;
    prev?: OrthogonalSegment;
    next?: OrthogonalSegment;
    index: number;
    orientation: AxisOrientation;
    left?: [OrthogonalSegment, number];
    right?: [OrthogonalSegment, number];
};
/**
 * @internal
 */
export declare type SegmentMoveResult = {
    ctx: SegmentContext;
    segments: Array<OrthogonalSegment>;
    index: number;
};
/**
 * Options for an orthogonal connector.
 * @public
 */
export interface OrthogonalConnectorOptions extends ConnectorOptions {
    /**
     * The point to use as the halfway point between the source and target. Defaults to 0.5.
     */
    midpoint?: number;
    /**
     * Defaults to true, meaning always draw a stub of the desired length, even when the source and target elements are very close together.
     */
    alwaysRespectStubs?: boolean;
    /**
     * Optional curvature of the corners in the connector. Defaults to 0.
     */
    cornerRadius?: number;
    /**
     * For a loopback connection, the size of the loop.
     */
    loopbackRadius?: number;
    /**
     * If true, and a cornerRadius is set, the lines are drawn in such a way that they look slightly hand drawn. This
     * effect was something we stumbled across, ie. a mistake, but it was charming in its own way so we decided to leave it in as
     * an option.
     */
    slightlyWonky?: boolean;
    /**
     * Defaults to false. Use this flag if you are migrating from 2.x to 5.x and you have connector data stored in the 2.x
     * format that you wish to load.
     */
    supportLegacyConnectorData?: boolean;
    /**
     * Whether or not to avoid vertices during path edits and when dragging vertices connected to an edited path. Defaults to true.
     */
    vertexAvoidance?: boolean;
}
/**
 * The format used internally to store an orthogonal connector's geometry.
 * @internal
 */
export interface InternalOrthogonalConnectorGeometry extends Geometry {
    segments: Array<OrthogonalSegment>;
    quadrant?: number;
    source: AnchorPlacement;
    target: AnchorPlacement;
}
/**
 * The format used to load/export orthogonal connector geometry
 * @public
 */
export interface OrthogonalConnectorGeometry extends Geometry {
    segments: Array<PointXY>;
    source: AnchorPlacement;
    target: AnchorPlacement;
}
/**
 * Defines the Orthogonal connector type. Since 6.9.0 this constant replaces `OrthogonalConnector.type`.
 * @public
 */
export declare const CONNECTOR_TYPE_ORTHOGONAL = "Orthogonal";
/**
 * An Orthogonal connector.
 * @internal
 */
export interface OrthogonalConnector extends Connector {
    midpoint: number;
    alwaysRespectStubs: boolean;
    lastx: number;
    lasty: number;
    lastOrientation: number;
    cornerRadius: number;
    loopbackRadius: number;
    isLoopbackCurrently: boolean;
    geometry: InternalOrthogonalConnectorGeometry;
    slightlyWonky: boolean;
    supportLegacyConnectorData: boolean;
    orthogonalSegments: Array<OrthogonalSegment>;
    vertexAvoidance: boolean;
}
/**
 * @internal
 * @param connection
 * @param params
 * @private
 */
export declare function _createOrthogonalConnector(connection: Connection<any>, params: OrthogonalConnectorOptions): OrthogonalConnector;
/**
 * Orthogonal connector.
 * In 7.x this will be removed and you'll need to use `CONNECTOR_TYPE_ORTHOGONAL` to refer to this connector type.
 * @deprecated
 */
export declare class OrthogonalConnector {
    static type: string;
}
