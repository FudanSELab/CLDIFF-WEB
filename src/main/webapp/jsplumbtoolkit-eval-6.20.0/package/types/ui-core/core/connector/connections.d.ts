import { Endpoint } from "../endpoint/endpoint";
import { Connection } from "./connection-impl";
import { Connector, ConnectorSpec } from "../../common/connector";
import { PointXY } from "../../util/util";
import { Overlay } from "../overlay/overlay";
import { OverlaySpec } from "../../common/overlay";
import { LabelOverlay } from "../overlay/label-overlay";
import { EndpointSpec } from "../../common/endpoint";
import { AnchorSpec } from "../../common/anchor";
import { ConnectionTypeDescriptor } from "../type-descriptors";
export declare const _internalLabelOverlayId = "__label";
export declare const _internalLabelOverlayClass = "jtk-default-label";
export declare const TYPE_ITEM_OVERLAY = "overlay";
export declare const LOCATION_ATTRIBUTE = "labelLocation";
export declare function _isConnectionDetachable<E>(c: Connection<E>, ep?: Endpoint<E>): boolean;
export declare function _setConnectionDetachable<E>(c: Connection<E>, detachable: boolean): void;
export declare function _isConnectionReattach<E>(c: Connection<E>): boolean;
export declare function _setConnectionReattach<E>(c: Connection<E>, reattach: boolean): void;
/**
 * Add an overlay to the component.  This method is not intended for use by users of the API. You must `revalidate`
 * an associated element for this component if you call this method directly. Consider using the `addOverlay` method
 * of `JsPlumbInstance` instead, which adds the overlay and then revalidates.
 * @param overlay
 * @internal
 */
export declare function _addOverlay<E>(c: Connection<E>, overlay: OverlaySpec): Overlay;
/**
 * Get the Overlay with the given ID. You can optionally provide a type parameter for this method in order to get
 * a typed return value (such as `LabelOverlay`, `ArrowOverlay`, etc), since some overlays have methods that
 * others do not.
 * @param id ID of the overlay to retrieve.
 * @public
 */
export declare function _getOverlay<T extends Overlay, E>(c: Connection<E>, id: string): T;
/**
 * Gets all the overlays registered on this component.
 * @public
 */
export declare function _getOverlays<E>(c: Connection<E>): Record<string, Overlay>;
/**
 * Hide the overlay with the given id.
 * @param id
 * @public
 */
export declare function _hideOverlay<E>(c: Connection<E>, id: string): void;
/**
 * Hide all overlays, or a specific set of overlays.
 * @param ids optional list of ids to hide.
 * @public
 */
export declare function _hideOverlays<E>(c: Connection<E>, ...ids: Array<string>): void;
/**
 * Show a specific overlay (set it to be visible)
 * @param id
 * @public
 */
export declare function _showOverlay<E>(c: Connection<E>, id: string): void;
/**
 * Show all overlays, or a specific set of overlays.
 * @param ids optional list of ids to show.
 * @public
 */
export declare function _showOverlays<E>(c: Connection<E>, ...ids: Array<string>): void;
/**
 * Remove all overlays from this component.
 * @public
 */
export declare function _removeAllOverlays<E>(c: Connection<E>): void;
/**
 * Remove the overlay with the given id.
 * @param overlayId
 * @param dontCleanup This is an internal parameter. You are not encouraged to provide a value for this.
 * @internal
 */
export declare function _removeOverlay<E>(c: Connection<E>, overlayId: string, dontCleanup?: boolean): void;
/**
 * Remove the given set of overlays, specified by their ids.
 * @param overlays
 * @public
 */
export declare function _removeOverlays<E>(c: Connection<E>, ...overlays: string[]): void;
/**
 * Return this component's label, if one is set.
 * @public
 */
export declare function _getLabel<E>(c: Connection<E>): string;
/**
 * @internal
 */
export declare function _getLabelOverlay<E>(c: Connection<E>): LabelOverlay;
/**
 * Set this component's label.
 * @param l Either some text, or a function which returns some text, or an existing label overlay.
 * @public
 */
export declare function _setConnectionLabel<E>(c: Connection<E>, l: string | Function | LabelOverlay): void;
export declare const ACTION_ADD = "add";
export declare const ACTION_REMOVE = "remove";
/**
 * @internal
 */
export declare const TYPE_ITEM_ANCHORS = "anchors";
/**
 * @internal
 */
export declare const TYPE_ITEM_CONNECTOR = "connector";
export declare const Connections: {
    addClass(conn: Connection<any>, c: string, cascade?: boolean): void;
    removeClass(conn: Connection<any>, c: string, cascade?: boolean): void;
    setAbsoluteOverlayPosition(conn: Connection<any>, overlay: Overlay, xy: PointXY): void;
    /**
     * @internal
     */
    getAbsoluteOverlayPosition(conn: Connection<any>, overlay: Overlay): PointXY;
    setPreparedConnector(conn: Connection<any>, connector: Connector, doNotRepaint?: boolean, doNotChangeListenerComponent?: boolean, typeId?: string): void;
    makeEndpoint(conn: Connection<any>, isSource: boolean, el: any, elId: string, anchor?: AnchorSpec, ep?: Endpoint<any>): Endpoint<any>;
    /**
     * Replace the Endpoint at the given index with a new Endpoint.  This is used by the Toolkit edition, if changes to an edge type
     * cause a change in Endpoint.
     * @param idx 0 for source, 1 for target
     * @param endpointDef Spec for the new Endpoint.
     * @public
     */
    replaceEndpoint(conn: Connection<any>, idx: number, endpointDef: EndpointSpec): void;
    destroy(c: Connection<any>): void;
    applyType(conn: Connection<any>, t: ConnectionTypeDescriptor, typeMap: any): void;
    setVisible(c: Connection<any>, v: boolean): void;
    _prepareConnector<E>(c: Connection<E>, connectorSpec: ConnectorSpec, typeId?: string): Connector;
    _setConnector(conn: Connection<any>, connectorSpec: ConnectorSpec, doNotRepaint?: boolean, doNotChangeListenerComponent?: boolean, typeId?: string): void;
};
