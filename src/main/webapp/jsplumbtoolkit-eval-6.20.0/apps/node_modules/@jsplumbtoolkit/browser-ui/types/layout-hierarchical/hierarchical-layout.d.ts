import { AbstractHierarchicalLayout, AbstractHierarchicalLayoutParameters, HierarchicalLayoutChildVerticesFunction } from "./abstract-hierarchical-layout";
import { Vertex } from "../core/model/graph";
import { InternalLayoutOptions } from "../core/layout/abstract-layout";
import { PointXY, Size } from "../ui-core/util/util";
import { DataSource } from "../core/datasource";
interface ChildGroup {
    nodes: Array<any>;
    loc: number;
    size: number;
    parents: Array<any>;
    depth: number;
    children: Array<any>;
}
/**
 * @deprecated
 * @internal
 */
interface HierarchicalLayoutEntry {
    root?: boolean;
    node: Vertex;
    parents: Array<HierarchicalLayoutEntry>;
    childGroup: ChildGroup;
    childGroupIndex: number;
    loc: number;
    index: number;
    dimensions: Size;
    size: number;
    children: Array<HierarchicalLayoutEntry>;
}
/**
 * @deprecated
 * @internal
 */
interface HierarchicalLayoutLayer {
    entries: Array<HierarchicalLayoutEntry>;
    pointer: number;
    otherAxis: number;
    otherAxisSize: number;
}
/**
 * Constants for defining the `align` option on a Hierarchical layout.
 * @public
 * @deprecated From 6.1.0 use the `Hierarchy` layout instead
 */
export declare const ALIGN: {
    center: string;
    start: string;
    end: string;
};
/**
 * Possible values for the `align` option on a Hierarchical layout.
 * @deprecated From 6.1.0 use the `Hierarchy` layout instead
 */
export declare type HierarchicalLayoutAlignment = typeof ALIGN.center | typeof ALIGN.start | typeof ALIGN.end;
/**
 * Constants for defining the `spacing` option on a Hierarchical layout.
 * @public
 */
export declare const SPACING: {
    compress: string;
    auto: string;
};
/**
 * Defines the type of the `spacing` option on a Hierarchical layout.
 * @deprecated From 6.1.0 use the `Hierarchy` layout instead
 */
export declare type HierarchicalLayoutSpacing = typeof SPACING.compress | typeof SPACING.auto;
export declare const DEFAULT_HIERARCHICAL_LAYOUT_ALIGNMENT: string;
/**
 * Axis orientations for hierarchical layout
 * @public
 * @deprecated From 6.1.0 use the `Hierarchy` layout instead
 */
export declare enum HierarchicalLayoutOrientations {
    horizontal = "horizontal",
    vertical = "vertical"
}
/**
 * Possible values for hierarchical layout orientation. `horizontal` means that the layers of vertices are arranged
 * horizontally. `vertical` means the layers of vertices are arranged vertically.
 * @public
 * @deprecated From 6.1.0 use the `Hierarchy` layout instead
 */
export declare type HierarchicalLayoutOrientation = keyof typeof HierarchicalLayoutOrientations;
/**
 * Parameters for the Hierarchical Layout.
 * @public
 * @deprecated From 6.1.0 use the `Hierarchy` layout instead
 */
export interface HierarchicalLayoutParameters extends AbstractHierarchicalLayoutParameters<Vertex> {
    /**
     * Optional, defaults to "vertical". Valid values are "vertical" and "horizontal".
     */
    orientation?: HierarchicalLayoutOrientation;
    /**
     * Optional, defaults to false. If true, the layout will be inverted, ie. the root node will be at the bottom for horizontal layouts, and to the right for vertical layouts
     */
    invert?: boolean;
    /**
     * Optional, defaults to "auto". Valid values are:
     * "auto" (`Spacing.auto`) Spaces each node and its parent according to the size of the biggest node in the given node's level.
     * "compress" (`Spacing.compress`) Uses a regular spacing between each node and its parent
     */
    spacing?: HierarchicalLayoutSpacing;
    /**
     * Optional, defaults to "center". Instructs the layout how to place child nodes with respect to their parent nodes.
     * By default, a group of child nodes is centered on its parent. The layout also supports "start" and "end" for
     * this value, which work in much the same way as "flex-start" and "flex-end" do in CSS: for a hierarchical layout
     * with the root at the top of the tree and the child nodes underneath, a value of "start" for align would cause the
     * first child of the root to be placed immediately under the root, with its first child immediately underneath, etc.
     * The remainder of the content would fan out to the right. This option also works in conjunction with invert and
     * orientation:"vertical"
     */
    align?: HierarchicalLayoutAlignment;
}
/**
 * A layout that places vertices into a series of layers.
 * @public
 * @deprecated From 6.1.0 onwards use the `Hierarchy` layout instead.  This layout will not be included in 7.x versions
 * of the Toolkit.
 */
export declare class HierarchicalLayout extends AbstractHierarchicalLayout<HierarchicalLayoutParameters> {
    static type: string;
    readonly type: string;
    orientation: HierarchicalLayoutOrientation;
    private _horizontal;
    private _axisIndex;
    private _axisDimension;
    private _otherAxisIndex;
    private _axisPositionProperty;
    private _otherAxisPositionProperty;
    private _axisSizeProperty;
    private _otherAxisSizeProperty;
    private _axisPadding;
    private _otherAxisPadding;
    compress: boolean;
    invert: boolean;
    _alignment: HierarchicalLayoutAlignment;
    spacing: string;
    _maxSizes: Array<number>;
    _hierarchy: Array<HierarchicalLayoutLayer>;
    _childGroups: Array<any>;
    _visitedNodes: Record<string, any>;
    _getChildVertices: HierarchicalLayoutChildVerticesFunction<Vertex>;
    constructor(params: InternalLayoutOptions<HierarchicalLayoutParameters>);
    getDefaultParameters(): HierarchicalLayoutParameters;
    begin(toolkit: DataSource, parameters: HierarchicalLayoutParameters): void;
    step(dataSource: DataSource, parameters: Record<string, any>): void;
    _id(v: Vertex): string;
    /**
     * Gets the computed hierarchy. This is returned as an array of objects, one for each level, inside which
     * there is a `nodes` array.
     */
    getHierarchy(): Array<HierarchicalLayoutLayer>;
    /**
     * Gets the orientation of the layout - "horizontal" or "vertical".
     * @returns "horizontal" or "vertical"
     */
    getOrientation(): HierarchicalLayoutOrientation;
    getPadding(): PointXY;
    vertexRemoved(v: Vertex, doNotCalculateExtents: boolean): void;
}
export {};
