import { Group, Node } from "../model/graph";
import { ToolkitRenderer } from "../renderer";
import { UndoRedoAction } from "./undo-redo";
import { PointXY } from "../../ui-core/util/util";
/**
 * @internal
 */
export declare class ToolkitRendererVertexRemovedAction implements UndoRedoAction {
    private renderer;
    vertex: Node | Group;
    pos: PointXY;
    constructor(renderer: ToolkitRenderer<any>, vertex: Node | Group, pos: PointXY);
    redo(): void;
    undo(): void;
    hasDeltas(): boolean;
}
