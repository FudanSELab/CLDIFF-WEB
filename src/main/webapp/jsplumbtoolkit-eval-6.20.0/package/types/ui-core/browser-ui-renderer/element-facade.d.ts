import { Drag } from "./collicat";
import { jsPlumbDOMInformation } from "./browser-jsplumb-instance";
import { jsPlumbElement } from "../core/core";
import { Endpoint } from "../core/endpoint/endpoint";
import { BrowserElement } from "./util";
export interface jsPlumbDOMElement extends HTMLElement, jsPlumbElement<BrowserElement> {
    _isJsPlumbGroup: boolean;
    _jsPlumbOrphanedEndpoints: Array<Endpoint<BrowserElement>>;
    offsetParent: jsPlumbDOMElement;
    parentNode: jsPlumbDOMElement;
    jtk: jsPlumbDOMInformation;
    _jsPlumbScrollHandler?: Function;
    _katavorioDrag?: Drag;
    cloneNode: (deep?: boolean) => jsPlumbDOMElement;
}
