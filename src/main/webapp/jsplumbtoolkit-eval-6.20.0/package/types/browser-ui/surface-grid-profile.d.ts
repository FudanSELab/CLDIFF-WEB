/**
 * Options for the grid in a Surface.
 */
import { Grid } from "../ui-core/util/util";
/**
 * Options for the grid on a surface
 * @public
 */
export interface SurfaceGridOptions {
    /**
     * width/height of the grid
     */
    size?: Grid;
    /**
     * Whether or not to snap elements to the grid when dragging. Defaults to false.
     */
    snap?: boolean;
    /**
     * Whether or not to ensure calculated group sizes (from auto sized groups) are a multiple of the grid size in
     * each axis. Defaults to false.
     */
    fitGroupsToGrid?: boolean;
}
/**
 * models the behaviour of the grid.
 * @internal
 */
export declare class GridProfile {
    grid: Grid;
    snap: boolean;
    fitGroupsToGrid: boolean;
    constructor(opts: SurfaceGridOptions);
}
