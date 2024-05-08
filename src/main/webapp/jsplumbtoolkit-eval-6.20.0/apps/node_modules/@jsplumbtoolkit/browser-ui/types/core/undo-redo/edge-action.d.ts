/**
 * Superclass for edge add/remove.
 */
import { Edge } from "../model/graph";
import { JsPlumbToolkit } from "../toolkit";
import { UndoRedoManager, UndoRedoAction } from "./undo-redo";
/**
 * @internal
 */
export declare abstract class EdgeAction {
    protected obj: Edge;
    protected toolkit: JsPlumbToolkit;
    private manager;
    source: string;
    target: string;
    edgeId: string;
    sourcePort: string;
    targetPort: string;
    geometry: any;
    constructor(obj: Edge, toolkit: JsPlumbToolkit, manager: UndoRedoManager);
    generateSourceId(): string;
    generateTargetId(): string;
    protected _add(): void;
    protected _remove(): void;
    edgeChange(newEdge: Edge): void;
}
export declare class EdgeAddAction extends EdgeAction implements UndoRedoAction {
    undo(): void;
    redo(): void;
    hasDeltas(): boolean;
}
export declare class EdgeRemoveAction extends EdgeAction implements UndoRedoAction {
    undo(): void;
    redo(): void;
    hasDeltas(): boolean;
}
