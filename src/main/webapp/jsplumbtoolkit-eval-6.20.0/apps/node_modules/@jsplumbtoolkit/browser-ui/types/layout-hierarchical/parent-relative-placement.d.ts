import { PointXY, Size } from "../ui-core/util/util";
import { DataSource, HasId } from "../core";
import { HierarchicalLayoutAlignment } from "./hierarchical-layout";
import { HierarchicalLayoutChildVerticesFunction } from "./abstract-hierarchical-layout";
export interface ParentRelativePlacementStrategyOptions<T extends HasId> {
    rootNode: any | Array<any>;
    compress?: boolean;
    axisIndex: number;
    invert?: boolean;
    padding: PointXY;
    alignment?: HierarchicalLayoutAlignment;
    idFunction: (v: any) => string;
    sizeFunction: (id: string) => Size;
    childVerticesFunction: HierarchicalLayoutChildVerticesFunction<T>;
    absolutePositionFunction: (v: any) => PointXY;
    absoluteBacked?: boolean;
}
/**
 * Places elements with respect to their parents, aligning them at parent start/end/center depending on the
 * value of `alignment`.
 * @internal
 */
export declare class ParentRelativePlacementStrategy<T extends HasId> {
    private toolkit;
    rootNodes: Array<any>;
    private readonly _compress;
    private readonly _invert;
    private readonly _hierarchy;
    private readonly _childGroups;
    private readonly _visitedNodes;
    private _padding;
    private readonly _axisPadding;
    private readonly _otherAxisPadding;
    private readonly _axisIndex;
    private readonly _otherAxisIndex;
    private readonly _horizontal;
    _absoluteBacked: boolean;
    _alignment: HierarchicalLayoutAlignment;
    _maximumPointer: number;
    _minimumPointer: number;
    private _axisPositionProperty;
    private _otherAxisPositionProperty;
    private _axisSizeProperty;
    private _otherAxisSizeProperty;
    private _maxSizes;
    positions: Map<string, {
        position: PointXY;
        layer: number;
    }>;
    _alignmentLocationCalculators: {
        [x: string]: (cg: any) => any;
    };
    private readonly _getId;
    private readonly _getSize;
    private readonly _getChildVertices;
    private readonly _absolutePositionFunction;
    layerInfo: {
        layerSizes: Array<{
            mainAxis: number;
            otherAxis: number;
        }>;
        biggestLayer: number;
        maximumPointer: number;
    };
    constructor(toolkit: DataSource, parameters: ParentRelativePlacementStrategyOptions<T>);
    execute(): Map<string, {
        position: PointXY;
        layer: number;
    }>;
    /**
     * set the position of the given element, and adjust the max/min pointers to account for it. note that for
     * max pointer we add the size of the element in the layout's axis.
     * @param id
     * @param pos
     * @param layer
     * @internal
     */
    private _setPosition;
    private _get;
    private _add;
    private _addChildGroup;
    _setGroupParentLocation(g: any, loc: any): void;
    private _getMaximumParentSizeInAxis;
    private _alignChildGroup;
    _parentAlignmentCalculators: {
        [x: string]: (cg: any, min: number, max: number) => number;
    };
    private _alignParent;
    private _alignParents;
    private _doOne;
}
