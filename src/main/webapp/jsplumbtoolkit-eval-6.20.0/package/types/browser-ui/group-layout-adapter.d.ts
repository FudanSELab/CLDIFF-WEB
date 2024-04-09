import { Surface } from "./surface";
import { BaseSurfaceLayoutAdapter } from "./base-surface-layout-adapter";
import { Base, Group, Node } from "../core/model/graph";
/**
 * Layout adapter that operates on a single group. `getElements` returns member of this group. `filter` filters out
 * vertices that are not children of this group.
 *
 * TODO why exactly does `filter` have to exist here? If `getElements` only returns group members, what's the
 * filter for?
 *
 * @internal
 */
export declare class GroupLayoutAdapter extends BaseSurfaceLayoutAdapter {
    protected group: Group;
    protected surface: Surface;
    constructor(group: Group, surface: Surface);
    getElements(): Array<Node | Group>;
    filter(obj: Base): boolean;
}
