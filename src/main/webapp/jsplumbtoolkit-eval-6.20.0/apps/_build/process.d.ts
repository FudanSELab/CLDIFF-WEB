import { JsPlumbToolkit } from "@jsplumbtoolkit/browser-ui";
/**
 * This is the processor for the image pipeline. It listens to various events on the Toolkit and either runs the whole
 * pipeline or just some node and its descendants, as necessary.
 */
export declare class Processor {
    toolkit: JsPlumbToolkit;
    model: any;
    onComplete: (value: unknown) => unknown;
    onError: Function;
    _loading: boolean;
    constructor(toolkit: JsPlumbToolkit, model: any, onComplete: (value: unknown) => unknown, onError: Function);
    /**
     * Run the processor, and invoke the onComplete handler afterwards.
     * @param force
     */
    run(force?: boolean): Promise<void>;
    /**
     * For a given node, mark everything downstream for processing.
     * @param obj
     * @param touched
     * @private
     */
    private _clearDownstream;
    /**
     * Mark a node for processing: clear everything downstream, compute the node, and if a value was returned, propagate to children.
     * @param obj
     * @private
     */
    private _markDirty;
    /**
     * Run the processor.
     * @param force
     */
    private execute;
}
