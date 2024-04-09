import { Base, Group, Vertex, Node } from "../model/graph";
import { PointXY, Size } from "../../ui-core/util/util";
import { ViewportElement } from "../../ui-core/core/viewport";
/**
 * Base class for an object that a layout can use to find information about the size and position of rendered elements,
 * as well as to filter elements it should handle. This is subclassed in `CanvasLayoutAdapter` and `GroupLayoutAdapter`
 * currently.
 * @internal
 */
export declare abstract class AbstractLayoutAdapter<E> {
    abstract filter(obj: Base): boolean;
    abstract getElements(): Array<Node | Group>;
    abstract getSize(el: E): Size;
    abstract getOffset(el: E): PointXY;
    abstract getViewportPosition(obj: Vertex): ViewportElement<any>;
    abstract getViewportPositionById(id: string): {
        r?: number;
        w: number;
        h: number;
    };
}
