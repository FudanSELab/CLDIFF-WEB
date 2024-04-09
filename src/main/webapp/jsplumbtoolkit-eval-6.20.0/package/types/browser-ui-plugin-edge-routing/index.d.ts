import { SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { Surface } from "../browser-ui/surface";
import { PointXY, Size } from "../ui-core/util/util";
import { HierarchyLayout } from "../layout-hierarchy/hierarchy-layout";
import { JsPlumbToolkit } from "../core/toolkit";
import { OrthogonalRouterMode } from "../router/orthogonal-router";
import { ViewportBounds } from "../browser-ui/pan-zoom";
/**
 * Options for the edge routing plugin.
 * @public
 */
export interface EdgeRoutingPluginOptions extends SurfacePluginOptions {
    /**
     * Mode to use to draw edges. 'orthogonal' is like the orthogonal connector - segments that are either vertical or horizontal.
     * `direct` draws straight lines through regions. Both modes assign a separate anchor point to each edge.
     */
    mode: 'direct' | 'orthogonal';
    orthogonalMode?: OrthogonalRouterMode;
    orthogonalPadding?: number;
}
declare type RelayoutParams = {
    bounds: ViewportBounds;
    positions: Map<string, PointXY>;
    sizes: Map<string, Size>;
};
/**
 * A plugin that can ingest the RoutingInformation created by a HierarchyLayout (as of 6.9.0 only this layout generates
 * routing info), and then route edges according to the data.  You must be using a `Segmented` connector if you use this
 * plugin.
 * @public
 */
export declare class EdgeRoutingPlugin implements SurfacePlugin {
    static type: string;
    surface: Surface;
    toolkit: JsPlumbToolkit;
    layout: HierarchyLayout;
    mode: 'direct' | 'orthogonal';
    orthogonalMode: OrthogonalRouterMode;
    orthogonalPadding: number;
    layoutListener: (rp: RelayoutParams, e: Event) => void;
    destroy(): void;
    initialise(surface: Surface, options: EdgeRoutingPluginOptions): boolean;
    reset(): void;
}
export {};
