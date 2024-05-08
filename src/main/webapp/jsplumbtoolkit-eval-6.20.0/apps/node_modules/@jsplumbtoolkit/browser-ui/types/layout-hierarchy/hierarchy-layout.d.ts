import { HierarchyLayoutModel } from "./model";
import { PlacementStageStrategy } from "./placement-stage";
import { AbsoluteBackedLayout } from "../core/layout/absolute-layout";
import { PointXY, Size } from "../ui-core/util/util";
import { AbstractEdgeTerminus, Edge } from "../core/model/graph";
import { InternalLayoutOptions } from "../core/layout/abstract-layout";
import { EdgeEntry, FilteredEdgeProcessor, HierarchyLayoutAlignment, HierarchyLayoutParameters, LayerEntry, ResultSet, VertexEntry } from "./definitions";
import { RouterOptions } from "../router/common";
import { DataSource } from "../core/datasource";
/**
 * Returns whether or not the given entry represents an edge.
 * @internal
 * @param entry
 */
export declare function isEdgeNodeEntry(entry: any): entry is EdgeEntry;
export declare function isVertexNodeEntry(entry: any): entry is VertexEntry;
/**
 * Hierarchy layout type. Use this when referencing a hierarchy layout in render params.
 * @public
 */
export declare const LAYOUT_TYPE_HIERARCHY = "Hierarchy";
/**
 * A new version of a hierarchy layout, which can better handle upstream links and multiple parents. This layout runs in 3 stages -
 *
 * 1. placement of nodes into layers
 * 2. reordering nodes in layers to minimise edge crossing
 * 3. placement of nodes into final layout
 *
 * @public
 */
export declare class HierarchyLayout extends AbsoluteBackedLayout<HierarchyLayoutParameters> {
    /**
     * @deprecated use `LAYOUT_TYPE_HIERARCHY` constant instead
     */
    static type: string;
    readonly type = "Hierarchy";
    unattachedRootPadding: number;
    axis: number;
    oAxis: number;
    maxIterationsWithoutImprovement: number;
    maxIterations: number;
    invert: boolean;
    respectEdgeDirection: boolean;
    gatherUnattachedRoots: boolean;
    getRootNode: () => AbstractEdgeTerminus;
    rootNode: AbstractEdgeTerminus;
    model: HierarchyLayoutModel;
    /**
     * @internal
     */
    _alignment: HierarchyLayoutAlignment;
    /**
     * @internal
     */
    _placementStrategy: PlacementStageStrategy;
    _generateRouting: boolean;
    /**
     * @internal
     */
    _edgeNodeSize: number;
    edgeFilter: (e: Edge) => boolean;
    filteredEdgeProcessor: FilteredEdgeProcessor;
    resultSets: Array<ResultSet>;
    constructor(params: InternalLayoutOptions<HierarchyLayoutParameters>);
    begin(toolkit: DataSource, parameters: HierarchyLayoutParameters): void;
    defaultMagnetized: boolean;
    canMagnetize(id: string): boolean;
    end(toolkit: DataSource, parameters: HierarchyLayoutParameters, wasMagnetized: boolean): void;
    reset(): void;
    getDefaultParameters(): HierarchyLayoutParameters;
    step(): void;
    setRootNode(node: any): void;
    getRoutingInformation(): RouterOptions;
}
/**
 * Models a layer in the layout. For internal use.
 * @internal
 */
export declare type HierarchyLayoutModelLayer = {
    layer: number;
    entries: Array<LayerEntry>;
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
};
/**
 * @internal
 */
export declare type LayerSet = Array<HierarchyLayoutModelLayer>;
/**
 * Options for the underlying model. For internal use.
 * @internal
 */
export interface HierarchyLayoutModelOptions {
    padding: PointXY;
    axis?: number;
    getSize: (id: string) => Size;
    setPosition: (id: string, x: number, y: number) => void;
    rootNode?: any;
    invert?: boolean;
    unattachedRootPadding: number;
    edgeNodeSize: number;
    edgeFilter: (e: Edge) => boolean;
}
