import { JsPlumbInstance } from "../core";
import { ConnectParams } from '../params';
import { Endpoint } from "../endpoint/endpoint";
import { Component, ComponentBase } from "../component/component";
import { Overlay } from "../overlay/overlay";
import { Extents, Merge, PointXY } from "../../util/util";
import { Connector } from "../../common/connector";
import { EndpointSpec } from "../../common/endpoint";
import { PaintStyle } from "../../common/paint-style";
import { Edge } from "../../../core/model/graph";
/**
 * @internal
 */
export declare type ConnectionOptions<E = any> = Merge<ConnectParams<E>, {
    source?: E;
    target?: E;
    sourceEndpoint?: Endpoint<E>;
    targetEndpoint?: Endpoint<E>;
    previousConnection?: Connection<E>;
    geometry?: any;
}>;
export declare const TYPE_ID_CONNECTION = "_jsplumb_connection";
/** @internal */
export interface Connection<E> extends ComponentBase {
    edge: Edge;
    pending: boolean;
    _forceDetach: boolean;
    _forceReattach: boolean;
    lastPaintedAt: string;
    suspendedElement: E;
    suspendedElementId: string;
    suspendedElementType: string;
    suspendedEndpoint: Endpoint<E>;
    suspendedIndex: number;
    sourceId: string;
    targetId: string;
    source: E;
    target: E;
    objectType: string;
    detachable: boolean;
    reattach: boolean;
    endpoints: [Endpoint<E>, Endpoint<E>];
    params: Record<string, any>;
    instance: JsPlumbInstance;
    /**
     * @internal
     */
    overlays: Record<string, Overlay>;
    /**
     * @internal
     */
    overlayPositions: Record<string, PointXY>;
    /**
     * @internal
     */
    overlayPlacements: Record<string, Extents>;
    data: Record<string, any>;
    /**
     * @internal
     */
    connector: Connector;
    proxies: Array<{
        ep: Endpoint<E>;
        originalEp: Endpoint<E>;
    }>;
    scope: string;
    /**
     * @internal
     */
    readonly endpointSpec: EndpointSpec;
    /**
     * @internal
     */
    readonly endpointsSpec: [EndpointSpec, EndpointSpec];
    endpointStyles: [PaintStyle, PaintStyle];
    /**
     * @internal
     */
    endpointStyle: PaintStyle;
    /**
     * @internal
     */
    endpointHoverStyle: PaintStyle;
    /**
     * @internal
     */
    readonly endpointHoverStyles: [PaintStyle, PaintStyle];
    /**
     * Connection's cost.
     * @public
     */
    cost: number;
    /**
     * Whether or not the connection is directed.
     * @public
     */
    directed: boolean;
}
/**
 * @internal
 */
export declare class ConnectionImpl<E = any> extends Component implements Connection<E> {
    instance: JsPlumbInstance;
    edge: Edge;
    objectType: string;
    /**
     * @internal
     */
    overlays: Record<string, Overlay>;
    /**
     * @internal
     */
    overlayPositions: Record<string, PointXY>;
    /**
     * @internal
     */
    overlayPlacements: Record<string, Extents>;
    /**
     * @internal
     */
    connector: Connector;
    /**
     * @internal
     */
    defaultLabelLocation: number;
    /**
     * @internal
     */
    scope: string;
    /**
     * @internal
     */
    typeId: string;
    /**
     * @internal
     */
    idPrefix: string;
    /**
     * @internal
     */
    getDefaultOverlayKey(): string;
    /**
     * @internal
     */
    getXY(): {
        x: number;
        y: number;
    };
    /**
     * @internal
     */
    previousConnection: Connection<E>;
    /**
     * The id of the source of the connection
     * @public
     */
    sourceId: string;
    /**
     * The id of the target of the connection
     * @public
     */
    targetId: string;
    /**
     * The element that is the source of the connection
     * @public
     */
    source: E;
    /**
     * The element that is the target of the connection
     * @public
     */
    target: E;
    /**
     * Whether or not this connection is detachable
     * @public
     */
    detachable: boolean;
    /**
     * Whether or not this connection should be reattached if it were detached via the mouse
     * @public
     */
    reattach: boolean;
    /**
     * Connection's cost.
     * @public
     */
    cost: number;
    /**
     * Whether or not the connection is directed.
     * @public
     */
    directed: boolean;
    /**
     * Source and target endpoints.
     * @public
     */
    endpoints: [Endpoint<E>, Endpoint<E>];
    /**
     * @internal
     */
    endpointStyles: [PaintStyle, PaintStyle];
    /**
     * @internal
     */
    readonly endpointSpec: EndpointSpec;
    /**
     * @internal
     */
    readonly endpointsSpec: [EndpointSpec, EndpointSpec];
    /**
     * @internal
     */
    endpointStyle: PaintStyle;
    /**
     * @internal
     */
    endpointHoverStyle: PaintStyle;
    /**
     * @internal
     */
    readonly endpointHoverStyles: [PaintStyle, PaintStyle];
    /**
     * @internal
     */
    suspendedEndpoint: Endpoint<E>;
    /**
     * @internal
     */
    suspendedIndex: number;
    /**
     * @internal
     */
    suspendedElement: E;
    /**
     * @internal
     */
    suspendedElementId: string;
    /**
     * @internal
     */
    suspendedElementType: string;
    /**
     * @internal
     */
    _forceReattach: boolean;
    /**
     * @internal
     */
    _forceDetach: boolean;
    /**
     * List of current proxies for this connection. Used when collapsing groups and when dealing with scrolling lists.
     * @internal
     */
    proxies: Array<{
        ep: Endpoint<E>;
        originalEp: Endpoint<E>;
    }>;
    /**
     * @internal
     */
    pending: boolean;
    /**
     * Connections should never be constructed directly by users of the library.
     * @internal
     * @param instance
     * @param params
     */
    constructor(instance: JsPlumbInstance, params: ConnectionOptions<E>);
    /**
     * Deprecated. Use `COMPONENT_TYPE_CONNECTION` constant instead.
     */
    static type: string;
}
