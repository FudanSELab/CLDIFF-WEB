import { UndoRedoAction } from "./undo-redo";
import { Group, Node } from "../model/graph";
import { JsPlumbToolkit } from "../toolkit";
import { ToolkitRenderer } from "../renderer";
/**
 * @internal
 */
declare abstract class GroupAction {
    protected node: Node;
    protected group: Group;
    protected toolkit: JsPlumbToolkit;
    constructor(node: Node, group: Group, toolkit: JsPlumbToolkit);
    hasDeltas(): boolean;
}
export declare class AddGroupMemberAction extends GroupAction implements UndoRedoAction {
    redo(): void;
    undo(): void;
}
export declare class RemoveGroupMemberAction extends GroupAction implements UndoRedoAction {
    redo(): void;
    undo(): void;
}
export declare class GroupCollapseAction implements UndoRedoAction {
    group: Group;
    renderer: ToolkitRenderer<any>;
    constructor(group: Group, renderer: ToolkitRenderer<any>);
    redo(): void;
    undo(): void;
    hasDeltas(): boolean;
}
export declare class GroupExpandAction implements UndoRedoAction {
    group: Group;
    renderer: ToolkitRenderer<any>;
    constructor(group: Group, renderer: ToolkitRenderer<any>);
    redo(): void;
    undo(): void;
    hasDeltas(): boolean;
}
export {};
