import { GridProfile } from "./surface-grid-profile";
import { Grid } from "../ui-core/util/util";
/**
 * Options for the magnetize functionality of the Surface.
 * @public
 */
export interface SurfaceMagnetizeOptions {
    /**
     * If true, magnetizer will be run after the layout is run.
     */
    afterLayout?: boolean;
    /**
     * If true, magnetizer will be run after a vertex is dragged.
     */
    afterDrag?: boolean;
    /**
     * If true, magnetizer will be run constantly as a vertex is being dragged, pushing other vertices out of the way of
     * the vertex that is being dragged
     */
    constant?: boolean;
    /**
     * If true, vertices moved by the magnetizer will be constrained to move within the visible viewport, which is a function
     * of the current zoom/pan of the surface. Otherwise, vertices will be able to be pushed out of the visible viewport.
     */
    constrainToViewport?: boolean;
    /**
     * If true, and `afterDrag` is true, when the magnetizer is run after a drag it will be the recently dragged element that moves
     * in precedence to the other elements. By default, the recently dragged element is _not_ moved by the magnetize operation - it stays
     * where you dragged it.
     */
    repositionDraggedElement?: boolean;
    /**
     * Defaults to false. Indicates the surface should magnetize/gather nodes around a newly resized group, regardless of whether the group size grew
     * or if it shrunk. This flag is the same as setting `afterGroupShrink` and `afterGroupGrow`
     */
    afterGroupResize?: boolean;
    /**
     * Defaults to false. Indicates the surface should magnetize/gather nodes around a newly resized group if the group size was reduced.
     */
    afterGroupShrink?: boolean;
    /**
     * Defaults to false. Indicates the surface should magnetize/gather nodes around a newly resized group if the group size was enlarged.
     */
    afterGroupGrow?: boolean;
    /**
     * Defaults to false. Indicates the surface should gather nodes around a newly collapsed group
     */
    afterGroupCollapse?: boolean;
    /**
     * Defaults to false. Indicates the surface should magnetize nodes around a newly expanded group
     */
    afterGroupExpand?: boolean;
}
/**
 * Models the behaviour of the magnetizer
 * @internal
 */
export declare class MagnetizeProfile {
    gridProfile: GridProfile;
    readonly afterGroupCollapse: boolean;
    readonly afterGroupExpand: boolean;
    readonly afterGroupResize: boolean;
    readonly afterGroupShrink: boolean;
    readonly afterGroupGrow: boolean;
    readonly afterLayout: boolean;
    readonly afterDrag: boolean;
    readonly constant: boolean;
    readonly constrainToViewport: boolean;
    readonly repositionDraggedElement: boolean;
    grid: Grid;
    constructor(opts: SurfaceMagnetizeOptions, gridProfile: GridProfile);
}
