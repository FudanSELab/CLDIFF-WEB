import { ArrowOverlay } from "./arrow-overlay";
import { JsPlumbInstance } from "../core";
import { Overlay } from "./overlay";
import { ArrowOverlayOptions } from "../../common/overlay";
import { Connection } from "../connector/connection-impl";
export declare class PlainArrowOverlay extends ArrowOverlay {
    instance: JsPlumbInstance;
    static type: string;
    type: string;
    constructor(instance: JsPlumbInstance, component: Connection<any>, p: ArrowOverlayOptions);
}
export declare function isPlainArrowOverlay(o: Overlay): o is PlainArrowOverlay;
