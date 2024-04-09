/**
 * One update action for all types
 */
import { UndoRedoAction } from "./undo-redo";
import { JsPlumbToolkit } from "../toolkit";
import { Edge, Group, Port, Node } from "../model/graph";
/**
 * @internal
 */
export declare class UpdateAction implements UndoRedoAction {
    protected obj: Node | Port | Group | Edge;
    protected toolkit: JsPlumbToolkit;
    newData: any;
    originalData: any;
    constructor(obj: Node | Port | Group | Edge, originalData: any, toolkit: JsPlumbToolkit);
    private _getMethod;
    undo(): void;
    redo(): void;
    hasDeltas(): boolean;
}
