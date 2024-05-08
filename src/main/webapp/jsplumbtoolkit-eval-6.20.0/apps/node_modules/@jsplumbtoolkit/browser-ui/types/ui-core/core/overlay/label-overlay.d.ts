import { Overlay } from "./overlay";
import { JsPlumbInstance } from "../core";
import { Size } from "../../util/util";
import { LabelOverlayOptions } from "../../common/overlay";
import { Connection } from "../connector/connection-impl";
export declare class LabelOverlay<E = any> extends Overlay<E> {
    instance: JsPlumbInstance;
    component: Connection<E>;
    label: string | Function;
    labelText: string;
    static type: string;
    type: string;
    cachedDimensions: Size;
    useHTMLElement: boolean;
    constructor(instance: JsPlumbInstance, component: Connection<E>, p: LabelOverlayOptions);
    getLabel(): string;
    setLabel(l: string | Function): void;
    getDimensions(): Size;
    updateFrom(d: any): void;
}
export declare function isLabelOverlay(o: Overlay): o is LabelOverlay;
