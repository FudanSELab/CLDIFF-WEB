import { JsPlumbToolkit, JsPlumbToolkitOptions } from "../core/toolkit";
export * from './browser-ui';
export interface JsPlumbToolkitGlobal {
    newInstance: (options?: JsPlumbToolkitOptions) => JsPlumbToolkit;
    ready: (f: Function) => void;
}
export declare function ready(f: Function): void;
