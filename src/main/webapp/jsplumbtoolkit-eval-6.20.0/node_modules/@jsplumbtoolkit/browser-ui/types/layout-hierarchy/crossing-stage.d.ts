import { HierarchyLayoutModel } from "./model";
import { HierarchyLayoutStage } from "./hierarchy-layout-stage";
import { LayerEntry } from "./definitions";
/**
 * @internal
 */
export interface CrossingStageOptions {
    maxIterations?: number;
    maxIterationsWithoutImprovement?: number;
}
/**
 * @internal
 */
export declare type HierarchyLayoutOrdering = Array<Array<LayerEntry>>;
/**
 * @internal
 */
export declare type Crossings = {
    total: number;
    layers: number[];
    ordering: HierarchyLayoutOrdering;
};
/**
 * @internal
 */
export declare type EnhancedCrossing = {
    sourceLayer: number;
    targetLayer: number;
    sourceVertex: number;
    targetVertex: number;
};
/**
 * @internal
 */
export declare type EnhancedCrossings = {
    total: number;
    layers: Array<Array<EnhancedCrossing>>;
    ordering: HierarchyLayoutOrdering;
};
/**
 * @internal
 */
export declare class CrossingStage extends HierarchyLayoutStage {
    protected model: HierarchyLayoutModel;
    maxIterations: number;
    maxIterationsWithoutImprovement: number;
    constructor(model: HierarchyLayoutModel, options: CrossingStageOptions);
    /**
     * @internal
     */
    private computeInitialOrdering;
    /**
     * @internal
     */
    execute(rootNode: any): void;
    /**
     * @internal
     * @param ordering
     */
    private computeTotalEnhancedCrossings;
    /**
     * Compute the total enhanced crossings in the given layer. in this version, we get the
     * index of the source and target vertices.
     * @param i
     * @param ordering
     * @internal
     */
    private computeLayerEnhancedCrossing;
    /**
     * Computes a reordering of the given model. Nodes in each layer are positioned at the average
     * index of the nodes in either the next or previous layer to which the given node is connected. This is non
     * destructive: a new model is returned, and the model passed in is not altered.
     * @param iteration
     * @param ordering
     * @internal
     */
    private computeAverageWeighting;
    /**
     * Computes a reordering of the layer at `layerIndex` in the given model. For each node in the layer we compute the average of the indices of
     * the nodes in the other layer to which the node is connected. This is an improvement over the median approach: consider one node attached to nodes 0 and 1
     * in the other layer, and a node attached to node 1 in the other layer. The median value in the other layer for both of these is 1, when we use
     * the right most, and so then ordering the nodes in the focus layer is indeterminate. But it's clear the node attached to [0] and [1] should be on the left, so
     * if we use the average, we get, for the node attached to [0] and [1], and average of 0.5, and for the node attached only to [1], an average of [1]. When we
     * order these averages everything lines up how we want it.
     * @param layerIndex The layer to rearrange
     * @param ordering The entire model
     * @param downwards If true, the layer after layerIndex is used as the comparison layer. If false, the layer before layerIndex is
     * used as the comparison layer.  When trying to compute an optimum set of crossings, the main algorithm flips this value each time
     * it runs a sweep through the layers.
     * @internal
     */
    private computeLayerArrangedByAverage;
}
