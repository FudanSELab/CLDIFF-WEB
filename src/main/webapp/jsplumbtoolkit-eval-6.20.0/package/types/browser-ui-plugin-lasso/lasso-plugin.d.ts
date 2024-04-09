import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { Edge, Vertex } from "../core/model/graph";
import { Surface } from "../browser-ui/surface";
/**
 * @public
 */
export interface LassoPluginOptions extends SurfacePluginOptions {
    /**
     * Optional function to call when lasso selection starts.
     */
    onStart?: Function;
    /**
     * Optional function to call when lasso selection ends.
     */
    onEnd?: Function;
    /**
     * Optional function to call when one or more objects has been selected by the lasso.
     */
    onSelect?: Function;
    /**
     * Defaults to false, meaning the lasso is drawn as a rectangle. If true, the lasso is drawn as a set of masks,
     * with the lasso area drawn as a "hole" in the masks.
     */
    invert?: boolean;
    /**
     * Optional CSS3 filter identifying elements you do not want to lasso.
     */
    filter?: string;
    /**
     * Defaults to false. If true, edges are included in the lasso selection.
     */
    includeEdges?: boolean;
    /**
     * Optional filter that is passed every vertex/edge that the lasso would ordinarily select, and if this function returns false
     * then the vertex/edge is not added to the selection
     * @param o - Edge or Vertex to possibly filter.
     */
    selectionFilter?: (o: Edge | Vertex) => boolean;
}
/**
 * A plugin that allows the user to select multiple elements with the mouse.
 * @public
 */
export declare class LassoPlugin implements SurfacePlugin {
    static type: string;
    surface: Surface;
    private lasso;
    onStart: Function;
    onEnd: Function;
    onSelect: Function;
    selectionFilter: (o: Edge | Vertex) => boolean;
    lassoSelections: Array<any>;
    destroy(): void;
    initialise(surface: Surface, options: LassoPluginOptions & InternalSurfacePluginOptions): boolean;
    reset(): void;
    activated(): void;
    deactivated(): void;
}
