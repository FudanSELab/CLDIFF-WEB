import { ViewEdgeOptions, ViewGroupOptions, ViewNodeOptions, ViewPortOptions } from "./browser-ui-instance";
/**
 * An entry in a view.
 */
export declare type ViewOptionsEntry<T> = Record<string, T>;
/**
 * View options for a surface
 */
export interface SurfaceViewOptions {
    /**
     * Optional mapping of node view options
     */
    nodes?: ViewOptionsEntry<ViewNodeOptions>;
    /**
     * Optional mapping of edges view options
     */
    edges?: ViewOptionsEntry<ViewEdgeOptions>;
    /**
     * Optional mapping of groups view options
     */
    groups?: ViewOptionsEntry<ViewGroupOptions>;
    /**
     * Optional mapping of port view options
     */
    ports?: ViewOptionsEntry<ViewPortOptions>;
}
