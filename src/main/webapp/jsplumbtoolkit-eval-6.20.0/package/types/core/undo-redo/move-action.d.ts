import { UndoRedoAction } from "./undo-redo";
import { Node, Group } from "../model/graph";
import { ToolkitRenderer } from "../renderer";
import { PointXY } from "../../ui-core/util/util";
/**
 * @internal
 */
export declare class MoveAction implements UndoRedoAction {
    protected obj: Node | Group;
    protected originalPosition: PointXY;
    protected pos: PointXY;
    protected renderer: ToolkitRenderer<any>;
    constructor(obj: Node | Group, originalPosition: PointXY, pos: PointXY, renderer: ToolkitRenderer<any>);
    redo(): void;
    undo(): void;
    hasDeltas(): boolean;
}
