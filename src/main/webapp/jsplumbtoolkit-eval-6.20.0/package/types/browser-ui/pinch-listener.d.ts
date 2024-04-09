import { PointXY } from "../ui-core/util/util";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
/**
 * Pinch listener for all touch browsers - ipad, android, and windows laptops/surfaces. Needless to say,
 * every browser does it differently. IE10+ uses PointerEvents; ipad safari/windows chrome/ipad chrome/
 * android chrome use TouchEvents.  The listener posts pinchstart, pinch happening, and pinch end events.
 */
export interface PinchListenerOptions {
    el: any;
    onPinchStart?: Function;
    onPinch?: Function;
    onPinchEnd?: Function;
    enableWheelZoom?: boolean;
}
export declare class PinchListener {
    isPointerDevice: boolean;
    isTouchDevice: boolean;
    center: PointXY;
    radius: number;
    startRadius: number;
    onPinchStart: Function;
    onPinch: Function;
    onPinchEnd: Function;
    eventManager: EventManager;
    constructor(params: PinchListenerOptions);
    private _fire;
    private _fireEnd;
    private bind;
    private unbind;
    listenerTypes: Record<string, (p: PinchListenerOptions) => void>;
    destroy(): void;
}
