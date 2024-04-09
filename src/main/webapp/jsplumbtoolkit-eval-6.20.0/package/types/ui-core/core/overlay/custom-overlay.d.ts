import { Overlay } from "./overlay";
import { JsPlumbInstance } from "../core";
import { OverlayOptions } from "../../common/overlay";
import { Connection } from "../connector/connection-impl";
export declare const OVERLAY_TYPE_CUSTOM = "Custom";
/**
 * @public
 */
export interface CustomOverlayOptions extends OverlayOptions {
    create: (c: Connection<any>) => any;
}
export declare class CustomOverlay extends Overlay {
    instance: JsPlumbInstance;
    component: Connection<any>;
    create: (c: Connection<any>) => any;
    constructor(instance: JsPlumbInstance, component: Connection<any>, p: CustomOverlayOptions);
    /**
     * @deprecated use `OVERLAY_TYPE_CUSTOM` constant instead.
     */
    static type: string;
    type: string;
    updateFrom(d: any): void;
}
export declare function isCustomOverlay(o: Overlay): o is CustomOverlay;
