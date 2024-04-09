import { RouterLine, RouterOptions, RouterRegion } from "./common";
import { PointXY } from "../ui-core/util/util";
/**
 * Available values for `OrthogonalRouteMode`.
 * @public
 */
export declare enum OrthogonalRouterModes {
    bus = "bus",
    separate = "separate"
}
/**
 * How to draw edges in 'orthogonal' mode in the edge router plugin. `bus` collates lines that are traversing a segment together
 * into one line. `separate` draws lines that are traversing a segment together as parallel lines.
 * @public
 */
export declare type OrthogonalRouterMode = keyof typeof OrthogonalRouterModes;
/**
 * @internal
 */
export interface OrthogonalRouterOptions extends RouterOptions<OrthogonalRouterRegion> {
    axis: 0 | 1;
    mode?: OrthogonalRouterMode;
    pad?: number;
}
/**
 * @internal
 */
export interface OrthogonalRouterRegion extends RouterRegion {
    lineSets: Array<Array<RouterLine>>;
}
/**
 * Route a set of orthogonal lines through a series of regions.
 * @param gates
 * @param edges
 * @param vertices
 * @param regions
 * @param mode
 * @internal
 */
export declare function orthogonalRouter(options: OrthogonalRouterOptions): Record<string, Array<PointXY>>;
