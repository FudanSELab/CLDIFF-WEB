import { UndoRedoAction, RemoveAction } from "./undo-redo";
import { Port, Group, Node } from "../model/graph";
import { JsPlumbToolkit } from "../toolkit";
import { EdgeRemoveAction } from "./edge-action";
/**
 * @internal
 */
export declare abstract class PortAction {
    protected obj: Port;
    private parent;
    protected toolkit: JsPlumbToolkit;
    constructor(obj: Port, parent: Node | Group, toolkit: JsPlumbToolkit);
    _add(): void;
    _remove(): void;
    getTerminusId(): string;
}
export declare class PortAddAction extends PortAction implements UndoRedoAction {
    undo(): void;
    redo(): void;
    hasDeltas(): boolean;
}
export declare class PortRemoveAction extends PortAction implements RemoveAction {
    undo(): void;
    redo(): void;
    isConnectedTo(edgeRemoveAction: EdgeRemoveAction): boolean;
    hasDeltas(): boolean;
}
