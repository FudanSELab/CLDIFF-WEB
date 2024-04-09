import { Extents } from "../../util/util";
import { JsPlumbInstance } from "../core";
import { Endpoint } from "./endpoint";
import { EndpointRepresentationParams } from "../../common/endpoint";
/**
 * Superclass for all types of Endpoint. This class is renderer
 * agnostic, as are any subclasses of it.
 */
export declare abstract class EndpointRepresentation<C> {
    endpoint: Endpoint<any>;
    typeId: string;
    x: number;
    y: number;
    w: number;
    h: number;
    computedValue: C;
    bounds: Extents;
    classes: Array<string>;
    instance: JsPlumbInstance;
    abstract type: string;
    protected constructor(endpoint: Endpoint<any>, params?: EndpointRepresentationParams);
    addClass(c: string): void;
    removeClass(c: string): void;
    setVisible(v: boolean): void;
}
