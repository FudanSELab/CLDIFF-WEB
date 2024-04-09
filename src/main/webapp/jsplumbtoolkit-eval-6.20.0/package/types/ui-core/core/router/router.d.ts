import { Connection } from '../connector/connection-impl';
import { Endpoint } from '../endpoint/endpoint';
import { AnchorComputeParams, Face, LightweightContinuousAnchor, Orientation } from "../factory/anchor-record-factory";
import { AnchorPlacement, AnchorSpec } from "../../common/anchor";
import { PointXY } from "../../util/util";
export interface RedrawResult {
    c: Set<Connection<any>>;
    e: Set<Endpoint<any>>;
}
export interface Router<T extends {
    E: unknown;
}, A> {
    reset(): void;
    redraw(elementId: string, timestamp?: string, offsetToUI?: PointXY): RedrawResult;
    computePath(connection: Connection<T["E"]>, timestamp: string): void;
    computeAnchorLocation(anchor: A, params: AnchorComputeParams): AnchorPlacement;
    getEndpointLocation(endpoint: Endpoint<any>, params: AnchorComputeParams): AnchorPlacement;
    getAnchorOrientation(anchor: A, endpoint?: Endpoint<T["E"]>): Orientation;
    getEndpointOrientation(endpoint: Endpoint<T["E"]>): Orientation;
    setAnchorOrientation(anchor: A, orientation: Orientation): void;
    setAnchor(endpoint: Endpoint<T["E"]>, anchor: A): void;
    prepareAnchor(params: AnchorSpec | Array<AnchorSpec>): A;
    setConnectionAnchors(conn: Connection<T["E"]>, anchors: [A, A]): void;
    isDynamicAnchor(ep: Endpoint<T["E"]>): boolean;
    isFloating(ep: Endpoint<T["E"]>): boolean;
    setCurrentFace(a: LightweightContinuousAnchor, face: Face, overrideLock?: boolean): void;
    lock(a: A): void;
    unlock(a: A): void;
    anchorsEqual(a: A, b: A): boolean;
    selectAnchorLocation(a: A, coords: {
        x: number;
        y: number;
    }): boolean;
}
