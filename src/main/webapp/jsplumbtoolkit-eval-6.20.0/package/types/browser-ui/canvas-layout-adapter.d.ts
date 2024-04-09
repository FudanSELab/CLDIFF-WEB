import { Surface } from "./surface";
import { BaseSurfaceLayoutAdapter } from "./base-surface-layout-adapter";
import { Base, Group, Node } from "../core/model/graph";
/**
 * Implementation of layout adapter that operates on a Surface canvas. Vertices that are a member of a group are
 * filtered, and `getElements` returns the list of all nodes and groups in the model, of course with those that
 * are in a group having been filtered.
 * @internal
 */
export declare class CanvasLayoutAdapter extends BaseSurfaceLayoutAdapter {
    protected surface: Surface;
    constructor(surface: Surface);
    filter(obj: Base): boolean;
    getElements(): Array<Node | Group>;
}
