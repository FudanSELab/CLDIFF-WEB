import { jsPlumbDOMElement } from './element-facade';
import { Size } from "../util/util";
import { Overlay } from "../core/overlay/overlay";
import { JsPlumbInstance } from "../core/core";
import { ComponentBase } from "../core/component/component";
interface HTMLElementOverlayHolder extends Overlay {
    canvas: jsPlumbDOMElement;
    cachedDimensions: Size;
}
export declare class HTMLElementOverlay {
    instance: JsPlumbInstance;
    overlay: Overlay;
    protected htmlElementOverlay: HTMLElementOverlayHolder;
    constructor(instance: JsPlumbInstance, overlay: Overlay);
    static getElement(o: HTMLElementOverlayHolder, component?: ComponentBase, elementCreator?: (c: ComponentBase) => Element): Element;
    static destroy(o: HTMLElementOverlayHolder): void;
    static _getDimensions(o: HTMLElementOverlayHolder, forceRefresh?: boolean): Size;
}
export {};
