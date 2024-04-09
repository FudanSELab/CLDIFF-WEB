import { JsPlumbInstance } from "../core";
import { FullOverlaySpec, OverlayOptions, OverlaySpec } from "../../common/overlay";
import { EventGenerator } from "../../util/event-generator";
import { Connection } from "../connector/connection-impl";
/**
 * Returns whether or not the given overlay spec is a 'full' overlay spec, ie. has a `type` and some `options`, or is just an overlay name.
 * @param o
 */
export declare function isFullOverlaySpec(o: OverlaySpec): o is FullOverlaySpec;
/**
 * Convert the given input into an object in the form of a `FullOverlaySpec`
 * @param spec
 */
export declare function convertToFullOverlaySpec(spec: string | OverlaySpec): FullOverlaySpec;
export declare abstract class Overlay<E = any> extends EventGenerator {
    instance: JsPlumbInstance;
    component: Connection<E>;
    id: string;
    abstract type: string;
    cssClass: string;
    visible: boolean;
    location: number;
    events: Record<string, (value: any, event?: any) => any>;
    attributes: Record<string, string>;
    /**
     * Set internally when this overlay came into being via a programmatic addition, and should not be managed by the
     * types system.
     * @internal
     * @param instance
     * @param component
     * @param p
     */
    ignoreTypes: boolean;
    constructor(instance: JsPlumbInstance, component: Connection<E>, p: OverlayOptions);
    setLocation(l: number | string): void;
    shouldFireEvent(event: string, value: any, originalEvent?: Event): boolean;
    setVisible(v: boolean): void;
    isVisible(): boolean;
    abstract updateFrom(d: any): void;
}
export interface OverlayMouseEventParams {
    e: Event;
    overlay: Overlay;
}
