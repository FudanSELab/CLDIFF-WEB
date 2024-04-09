import { Edge } from "../model/graph";
import { JsPlumbToolkit } from "../toolkit";
import { EdgeRemoveAction } from "./edge-action";
/**
 * @internal
 */
export interface UndoRedoAction {
    undo(): void;
    redo(): void;
    hasDeltas(): boolean;
}
/**
 * @internal
 */
export interface TerminusAction extends UndoRedoAction {
    getTerminusId(): string;
}
/**
 * @internal
 */
export interface RemoveAction extends TerminusAction {
    isConnectedTo(edgeRemoveAction: EdgeRemoveAction): boolean;
}
/**
 * @internal
 */
export declare type OnChangeFunction = (undoRedo: UndoRedoManager, undoStackSize: number, redoStackSize: number) => void;
/**
 * Constructor params for an UndoRedoManager.
 * @internal
 */
export declare type UndoRedoParams = {
    /**
     * Toolkit instance to attach to
     */
    toolkit: JsPlumbToolkit;
    /**
     * Maximum size of stack. Defaults to 50.
     */
    maximumSize?: number;
    /**
     * Optional function to call when a change occurs.
     */
    onChange?: OnChangeFunction;
};
/**
 * Manager for undo/redo operations on a JsPlumbToolkit instance. An instance of JsPlumbToolkit creates one of these automatically so
 * there is no need for library users to instantiate one.
 * @internal
 */
export declare class UndoRedoManager {
    toolkit: JsPlumbToolkit;
    maximumSize: number;
    suspend: boolean;
    onChange: OnChangeFunction;
    private readonly undoStack;
    private readonly redoStack;
    private currentTransaction;
    private appendStack;
    constructor(params: UndoRedoParams);
    private _setSuspended;
    dataLoadStart(): void;
    dataLoadEnd(): void;
    /**
     * Bind listeners to the events in the Toolkit we are interested in.
     * @internal
     */
    private _bindListeners;
    /**
     * Fire the on change event, if there's a listener registered.
     * @internal
     */
    private _fireUpdate;
    /**
     * add a command to the undo stack, clearing the redo stack.
     * @param action
     * @internal
     */
    private command;
    /**
     * Notification that some edge has been replaced with a copy. This occurs when an edge removed is undone or an edge add is
     * redone. we need to update all references to the previous edge with this new one, as the toolkit no longer knows about
     * the old edge. This is not a method that should be called from outside of the undo manager.
     * @param previousId
     * @param newEdge
     * @internal
     */
    edgeChange(previousId: string, newEdge: Edge): void;
    /**
     * Execute undo on the last command in the undo stack, if it isn't empty.
     */
    undo(): void;
    /**
     * Re-execute the last command in the redo stack, if it isn't empty.
     */
    redo(): void;
    /**
     * Clears both stacks and fires an update event.
     */
    clear(): void;
    /**
     * Run a series of operations as a single transaction in the undo stack, meaning that they will all be undone/redone
     * at once.
     * @param fn - Series of operations to run as a transaction.
     * @param cleanupAction - Optional directive specifying what to do if there is a current transaction when this method is called.
     * @public
     */
    transaction(fn: (...args: any[]) => any, cleanupAction?: TransactionCleanupAction): any;
    private _createNewTransaction;
    /**
     * Open a new transaction. If a transaction is currently open this method will check the value of the
     * `cleanupAction` parameter. If it is null, an error will be thrown. Otherwise the appropriate action
     * will be taken (see @TransactionCleanupAction).
     * @param cleanupAction
     */
    openTransaction(cleanupAction?: TransactionCleanupAction): boolean;
    /**
     * Rollback the current transaction, if there is one.
     * @public
     */
    rollbackTransaction(): void;
    /**
     * Commit the current transaction.
     * @public
     */
    commitTransaction(commitAll?: boolean): void;
    /**
     * Checks the last action in the stack to see if it was a compound action, and if so, pushes this
     * action onto it. If it wasn't a compound action, a new compound action is created with the original stack head as its
     * first action, and then this action is pushed into it. That new compound action then replaces the head of the stack.
     * @param action
     * @internal
     */
    _attach(action: UndoRedoAction): void;
}
/**
 * Directive to commit the current transaction if a new one has been opened before the current one has been closed.
 * @public
 */
export declare const COMMIT_CURRENT = "commitCurrent";
/**
 * Directive to rollback the current transaction if a new one has been opened before the current one has been closed.
 * @public
 */
export declare const ROLLBACK_CURRENT = "rollbackCurrent";
/**
 * Directive to append the operations in the new transaction to the current transaction, if a new one has been opened before the current one has been closed.
 * @public
 */
export declare const APPEND_TO_CURRENT = "appendToCurrent";
/**
 * Defines the available actions in response to a new transaction being opened when one is currently open.
 * @public
 */
export declare type TransactionCleanupAction = typeof COMMIT_CURRENT | typeof ROLLBACK_CURRENT | typeof APPEND_TO_CURRENT;
