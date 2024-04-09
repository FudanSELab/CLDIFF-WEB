import { RemoveAction, UndoRedoAction } from "./undo-redo";
import { Group, Node, ObjectData } from "../model/graph";
import { JsPlumbToolkit } from "../toolkit";
import { EdgeRemoveAction } from "./edge-action";
import { GroupRemovedParams } from "../params";
import { Size } from "../../ui-core/util/util";
import { ToolkitRenderer } from "../renderer";
/**
 * @internal
 */
export declare abstract class NodeGroupAction {
    protected obj: Node | Group;
    protected toolkit: JsPlumbToolkit;
    constructor(obj: Node | Group, toolkit: JsPlumbToolkit);
    protected _add(): void;
    protected _remove(): void;
    getTerminusId(): string;
    hasDeltas(): boolean;
}
export declare class TerminusAddAction extends NodeGroupAction implements UndoRedoAction {
    undo(): void;
    redo(): void;
}
export declare class TerminusRemoveAction extends NodeGroupAction implements UndoRedoAction, RemoveAction {
    undo(): void;
    redo(): void;
    isConnectedTo(edgeRemoveAction: EdgeRemoveAction): boolean;
}
export declare class GroupRemoveAction extends TerminusRemoveAction {
    private params;
    childrenRemoved: boolean;
    orphanedChildren: Array<ObjectData>;
    constructor(params: GroupRemovedParams, t: JsPlumbToolkit);
    _add(): void;
}
export interface GroupSizeChangedParams {
    group: Group;
    originalGroupSize: Size;
    newGroupSize: Size;
    source: ToolkitRenderer<any>;
}
export declare class GroupSizeChangedAction implements UndoRedoAction {
    private group;
    private originalGroupSize;
    private newGroupSize;
    private toolkit;
    private source;
    constructor(group: Group, originalGroupSize: Size, newGroupSize: Size, toolkit: JsPlumbToolkit, source: ToolkitRenderer<any>);
    hasDeltas(): boolean;
    redo(): void;
    undo(): void;
    private _fire;
}
