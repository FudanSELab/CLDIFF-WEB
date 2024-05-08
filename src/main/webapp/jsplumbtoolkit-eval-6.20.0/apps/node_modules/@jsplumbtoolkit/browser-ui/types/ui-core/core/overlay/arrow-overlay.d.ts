import { Overlay } from "./overlay";
import { JsPlumbInstance } from "../core";
import { ArrowOverlayOptions } from "../../common/overlay";
import { PointXY, Size } from "../../util/util";
import { PaintStyle } from "../../common/paint-style";
import { Connector } from "../../common/connector";
import { Connection } from "../connector/connection-impl";
export declare class ArrowOverlay extends Overlay {
    instance: JsPlumbInstance;
    component: Connection<any>;
    width: number;
    length: number;
    foldback: number;
    direction: number;
    location: number;
    paintStyle: PaintStyle;
    static type: string;
    type: string;
    cachedDimensions: Size;
    constructor(instance: JsPlumbInstance, component: Connection<any>, p: ArrowOverlayOptions);
    draw(connector: Connector, currentConnectionPaintStyle: PaintStyle, absolutePosition?: PointXY): any;
    updateFrom(d: any): void;
}
export declare function isArrowOverlay(o: Overlay): o is ArrowOverlay;
