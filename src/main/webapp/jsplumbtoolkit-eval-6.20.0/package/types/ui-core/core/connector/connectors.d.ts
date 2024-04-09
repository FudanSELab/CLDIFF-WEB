import { ConnectorComputeParams, PaintGeometry } from "./abstract-connector";
import { Connection } from "./connection-impl";
import { Connector, ConnectorOptions, Geometry } from "../../common/connector";
import { Segment } from "../../common/abstract-segment";
import { BoundingBox, PointXY } from "../../util/util";
/**
 * Definition of an object that can create instances of some connector type, and perform a few
 * housekeeping tasks on connectors of that type.
 */
export interface ConnectorHandler {
    compute: (connector: Connector, geometry: PaintGeometry, params: ConnectorComputeParams) => void;
    create: <T extends ConnectorOptions, E>(connection: Connection<E>, params: T) => Connector;
    setAnchorOrientation(connector: Connector, idx: number, orientation: number[]): void;
    geometryImporter: (c: Connector, g: Geometry) => boolean;
    geometryExporter: (c: Connector) => Geometry;
    transformGeometry(g: Geometry, dx: number, dy: number): Geometry;
}
export declare const Connectors: {
    /**
     * Prepare a connector using the given name and args.
     * @internal
     * @param connection
     * @param name
     * @param params
     */
    get: <E>(connection: Connection<E>, name: string, params: any) => Connector;
    register: (name: string, handler: ConnectorHandler) => void;
    compute: (ac: Connector, geometry: PaintGeometry, params: ConnectorComputeParams) => void;
    exportGeometry(ac: Connector): Geometry;
    importGeometry(ac: Connector, g: Geometry): boolean;
    transformGeometry(ac: Connector, g: Geometry, dx: number, dy: number): Geometry;
    setAnchorOrientation(ac: Connector, idx: number, orientation: number[]): void;
    setGeometry(ac: Connector, g: Geometry, internal: boolean): void;
};
export declare function defaultExportGeometry(ac: Connector): Geometry;
/**
 * Subclasses can override this. By default we just set the given geometry as our internal representation.
 */
export declare function defaultImportGeometry(ac: Connector, g: Geometry): boolean;
/**
 * @internal
 * @param ac
 * @param segment
 */
export declare function _updateConnectorBounds(ac: Connector, segment: Segment): void;
export declare function _clearConnectorSegments(c: Connector): void;
export declare function _addConnectorSegment(c: Connector, type: string, params: any): void;
/**
* returns [segment, proportion of travel in segment, segment index] for the segment
* that contains the point which is 'location' distance along the entire path, where
* 'location' is a decimal between 0 and 1 inclusive. in this connector type, paths
* are made up of a list of segments, each of which contributes some fraction to
* the total length.
* From 1.3.10 this also supports the 'absolute' property, which lets us specify a location
* as the absolute distance in pixels, rather than a proportion of the total path.
 * @internal
*/
export declare function _findConnectorSegmentForLocation(c: Connector, location: number, absolute?: boolean): {
    segment: Segment;
    proportion: number;
    index: number;
};
/**
 * @internal
 * @param c
 * @param location
 * @param absolute
 */
export declare function _connectorPointOnPath(c: Connector, location: number, absolute?: boolean): PointXY;
/**
 * @internal
 * @param c
 * @param location
 * @param absolute
 * @private
 */
export declare function _connectorGradientAtPoint(c: Connector, location: number, absolute?: boolean): number;
/**
 * @internal
 * @param c
 * @param location
 * @param distance
 * @param absolute
 * @private
 */
export declare function _connectorPointAlongPathFrom(c: Connector, location: number, distance: number, absolute?: boolean): PointXY;
/**
 * @internal
 * @param c
 * @private
 */
export declare function _updateConnectorSegmentProportions(c: Connector): void;
export declare function _computeConnector(c: Connector, params: ConnectorComputeParams): void;
export declare function _resetConnectorGeometry(c: Connector): void;
/**
 * @internal
 * @param c
 * @private
 */
export declare function _resetConnectorBounds(c: Connector): void;
/**
 * @internal
 */
declare type SegmentForPoint = {
    d: number;
    s: Segment;
    x: number;
    y: number;
    l: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    index: number;
    connectorLocation: number;
};
/**
 * Function: findSegmentForPoint
 * Returns the segment that is closest to the given [x,y],
 * null if nothing found.  This function returns a JS
 * object with:
 *
 *   d   -   distance from segment
 *   l   -   proportional location in segment
 *   x   -   x point on the segment
 *   y   -   y point on the segment
 *   s   -   the segment itself.
 *   @internal
 */
export declare function _findConnectorSegmentForPoint(c: Connector, x: number, y: number): SegmentForPoint;
/**
 * @internal
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export declare function _connectorLineIntersection(c: Connector, x1: number, y1: number, x2: number, y2: number): Array<PointXY>;
/**
 * @internal
 * @param x
 * @param y
 * @param w
 * @param h
 */
export declare function _connectorBoxIntersection(c: Connector, x: number, y: number, w: number, h: number): Array<PointXY>;
/**
 * @internal
 * @param box
 */
export declare function _connectorBoundingBoxIntersection(c: Connector, box: BoundingBox): Array<PointXY>;
export declare function isConnector(c: {
    typeDescriptor: string;
}): c is Connector;
export {};
