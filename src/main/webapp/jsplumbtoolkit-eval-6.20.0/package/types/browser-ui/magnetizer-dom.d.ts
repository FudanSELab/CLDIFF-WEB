/**
 * An extension of the Magnetizer that knows about the DOM, offering an `executeAtEvent` method that takes a MouseEvent
 * as the focus of the operation.
 */
import { Magnetizer, MagnetizerRunOptions } from "../core/magnetizer";
export declare class BrowserUIMagnetizer<T> extends Magnetizer<T> {
    executeAtEvent(e: MouseEvent, options?: MagnetizerRunOptions<T>): void;
}
