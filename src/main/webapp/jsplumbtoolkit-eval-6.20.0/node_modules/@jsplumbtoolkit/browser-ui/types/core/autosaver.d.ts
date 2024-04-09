import { JsPlumbToolkit } from "./toolkit";
declare type ABinding = [string, Function];
export interface AutoSaveOptions {
    autoSave?: boolean;
    saveUrl?: string;
    autoSaveDebounceTimeout?: number;
    saveHeaders?: any;
    onAutoSaveSuccess?: () => any;
    onAutoSaveError?: () => any;
    onBeforeAutoSave?: () => any;
    onAfterAutoSave?: () => any;
    autoSaveHandler?: (instance: JsPlumbToolkit) => any;
    type?: string;
}
export declare class AutoSaver {
    instance: JsPlumbToolkit;
    bindings: Array<ABinding>;
    timer: any;
    constructor(instance: JsPlumbToolkit, options: AutoSaveOptions);
    discard(): void;
}
export declare class CatchAllEventHandler {
    instance: JsPlumbToolkit;
    bindings: Array<any>;
    constructor(instance: JsPlumbToolkit);
}
export {};
