import { Surface } from "./surface";
import { AbstractLayoutAdapter } from "../core/layout/abstract-layout-adapter";
import { Vertex } from "../core/model/graph";
import { ViewportElement } from "../ui-core/core/viewport";
import { PointXY, Size } from '../ui-core/util';
/**
 * Implementation of layout adapter that is the parent of the `CanvasLayoutAdapter` and `GroupLayoutAdapter`, providing
 * the functionality shared by those two classes.
 * @internal
 */
export declare abstract class BaseSurfaceLayoutAdapter extends AbstractLayoutAdapter<Element> {
    protected surface: Surface;
    constructor(surface: Surface);
    getOffset(el: Element): PointXY;
    getViewportPosition(obj: Vertex): ViewportElement<Element>;
    getViewportPositionById(id: string): ViewportElement<Element>;
    getSize(el: Element): Size;
}
