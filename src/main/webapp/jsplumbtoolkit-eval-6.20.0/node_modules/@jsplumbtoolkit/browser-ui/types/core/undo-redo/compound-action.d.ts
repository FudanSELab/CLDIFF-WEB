/**
 * Compounds a set of actions into one. An example of this is a node remove, in which all of its edges and ports are also
 * removed.
 */
import { UndoRedoAction } from "./undo-redo";
import { Edge } from "../model/graph";
/**
 * @internal
 */
export declare class CompoundAction implements UndoRedoAction {
    readonly actions?: Array<UndoRedoAction>;
    constructor(actions?: Array<UndoRedoAction>);
    addAction(action: UndoRedoAction, insertAtStartOfTransaction?: boolean): void;
    undo(): void;
    redo(): void;
    edgeChange(previousId: string, newEdge: Edge): void;
    hasDeltas(): boolean;
}
