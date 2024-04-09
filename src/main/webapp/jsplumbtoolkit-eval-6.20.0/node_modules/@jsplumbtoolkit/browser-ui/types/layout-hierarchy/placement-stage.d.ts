import { HierarchyLayoutModelLayer } from "./hierarchy-layout";
import { HierarchyLayoutAlignment } from "./definitions";
import { HierarchyLayoutModel } from "./model";
import { HierarchyLayoutStage } from "./hierarchy-layout-stage";
import { PointXY } from "../ui-core/util/util";
import { Group, Node } from "../core/model/graph";
export declare enum PlacementStageStrategyValues {
    /**
     * left (or top) align vertices in a level
     */
    start = "start",
    /**
     * right (or bottom) align vertices in a level
     */
    end = "end",
    /**
     * center align vertices in a level
     */
    center = "center",
    /**
     * Make a best effort at aligning groups of vertices relative to their parent vertex/vertices
     */
    parent = "parent"
}
export declare type PlacementStageStrategy = keyof typeof PlacementStageStrategyValues;
/**
 * Options for the placement stage in the layout.
 * @internal
 */
export interface PlacementStageOptions {
    /**
     * Padding to leave between vertices
     */
    padding?: PointXY;
    /**
     * provided internally when processing multiple roots: these are the results from the placement of the previous
     * root and its children.
     * @internal
     */
    lastPlacements?: PlacementsStageResults;
    /**
     * The strategy to use when placing vertices. Default is 'center', meaning every row is centered around the
     * axis orthogonal to the axis in which the vertices are laid out.
     */
    strategy?: PlacementStageStrategy;
    /**
     * Optional, defaults to `HierarchyLayoutAlignmentValues.center`. Instructs the layout how to place child nodes with
     * respect to their parent nodes. By default, a group of child nodes is centered on its parent. The layout also supports "start" and "end" for
     * this value, which work in much the same way as "flex-start" and "flex-end" do in CSS: for a layout
     * with the root at the top of the tree and the child nodes underneath, a value of "start" for align would cause the
     * first child of the root to be placed immediately under the root, with its first child immediately underneath, etc.
     * The remainder of the content would fan out to the right. This option also works in conjunction with invert and
     * axis:HierarchyLayoutAxisValues.vertical.
     */
    alignment?: HierarchyLayoutAlignment;
    /**
     * Optional size - in the main axis - to use for edge nodes, which are dummy nodes (not visible) that are inserted
     * on a layer to allow an edge to pass through to a layer below.
     */
    edgeNodeSize?: number;
    /**
     * If true root nodes that do not have children will be positioned adjacent to the last root node
     * that does have children. When false (which is the default), unattached roots are spaced apart so that they
     * do not overlap any child trees.
     */
    gatherUnattachedRoots?: boolean;
    /**
     * Amount of space to leave before each unattached root if `gatherUnattachedRoots` is true. Default is 150.
     */
    unattachedRootPadding?: number;
}
/**
 * The results of placing one root and its children.  Used internally when processing multiple roots.
 * @internal
 */
export interface PlacementsStageResults {
    rootId: string;
    rootPosition: number;
    rootSize: number;
    biggestLayer: number;
    maximumPointer: number;
}
/**
 * The final stage of the layout, in which vertices are placed, according to the layers and the ordering within the
 * layers that has been computed by the previous stages. Several different placement strategies are supported - each layer
 * can be aligned to the start/end of the layer, or to the center of the layout, and the `parent` strategy (which is now the default)
 * attempts to group children of some given vertex underneath that vertex.
 * @internal
 */
export declare class PlacementStage extends HierarchyLayoutStage {
    protected model: HierarchyLayoutModel;
    lastPlacements: PlacementsStageResults;
    currentLayer: HierarchyLayoutModelLayer;
    padding: PointXY;
    unattachedRootPadding: number;
    strategy: PlacementStageStrategy;
    alignment: HierarchyLayoutAlignment;
    edgeNodeSize: number;
    gatherUnattachedRoots: boolean;
    constructor(model: HierarchyLayoutModel, options: PlacementStageOptions);
    /**
     * compute the size in both axes of the given set of entries. this is used both to compute an entire layer when
     * the strategy is start/center/end, and also to compute the size of a set of entries that share a parent (or parents).
     * @param entries
     * @param paddingInMainAxis
     * @internal
     */
    private _entrySetSize;
    execute(rootNode: Node | Group): PlacementsStageResults;
    private _runDefaultPlacement;
    private _runParentRelativePlacement;
}
