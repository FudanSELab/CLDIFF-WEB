import { AbstractEdgeTerminus, Edge, Group, HasId, HasIdAndType, Node } from "../core/model/graph";
import { JsPlumbToolkit } from "../core/toolkit";
import { AbsoluteBackedLayoutParameters } from "../core/layout/absolute-layout";
import { PlacementStageStrategy } from "./placement-stage";
import { Size } from "../ui-core/util/util";
import { EDGE, VERTEX } from "./model";
import { GatedPath } from "../router/common";
import { HierarchyLayout } from "./hierarchy-layout";
/**
 * Definition of a function that can retrieve child vertices of some vertex.
 * @public
 */
export declare type ChildVerticesFunction<T extends HasId> = (node: T, layer: number, toolkit: JsPlumbToolkit) => Array<T>;
/**
 * Allowed values for hierarchy layout axis.
 * @public
 */
export declare enum HierarchyLayoutAxisValues {
    horizontal = "horizontal",
    vertical = "vertical"
}
/**
 * Hierarchy layout axis.
 * @public
 */
export declare type HierarchyLayoutAxis = keyof typeof HierarchyLayoutAxisValues;
/**
 * Allowed values for hierarchy layout alignment
 * @public
 */
export declare enum HierarchyLayoutAlignmentValues {
    start = "start",
    center = "center",
    end = "end"
}
/**
 * Hierarchy layout alignment.
 * @public
 */
export declare type HierarchyLayoutAlignment = keyof typeof HierarchyLayoutAlignmentValues;
/**
 * The default hierarchy layout alignment.
 * @public
 */
export declare const DEFAULT_HIERARCHY_LAYOUT_ALIGNMENT = HierarchyLayoutAlignmentValues.center;
/**
 * Optional parameters for a Hierarchy layout
 * @public
 */
export interface HierarchyLayoutParameters extends AbsoluteBackedLayoutParameters {
    /**
     * Either `horizontal` (the default, groups of child vertices are laid out in rows) or `vertical` (groups of child vertices are
     * laid out in columns)
     */
    axis?: HierarchyLayoutAxis;
    /**
     * Number of iterations to try rearranging the graph without an improvement in legibility before accepting the current state.
     * Defaults to 2.
     */
    maxIterationsWithoutImprovement?: number;
    /**
     * Maximum number of iterations to run. Defaults to 24.
     */
    maxIterations?: number;
    /**
     * Optional node to use as the root. If this is not provided the layout calculates the best candidate based upon incoming and outgoing edges for each vertex.
     */
    rootNode?: any;
    /**
     * Optional function you can provide that will dynamically be invoked to get the root node to use.
     */
    getRootNode?: () => AbstractEdgeTerminus;
    /**
     * Defaults to false. If true, the layout generates routing information for the channels between
     * layers and edge nodes, and for edge routing.
     */
    generateRouting?: boolean;
    /**
     * The strategy to use when placing vertices. Default is 'center', meaning every row is centered around the
     * axis orthogonal to the axis in which the vertices are laid out.
     */
    placementStrategy?: PlacementStageStrategy;
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
     * @internal
     */
    edgeNodeSize?: number;
    /**
     * Optional filter for edges. If provided, this function will be used to filter the edges that identify links between vertices.
     * All filtered edges are gathered
     * @param e
     */
    edgeFilter?: (e: Edge) => boolean;
    filteredEdgeProcessor?: FilteredEdgeProcessor;
    /**
     * If true, the layout will be inverted in its perpendicular axis. For instance, if `axis` is "horizontal" and `invert` is
     * true, the root nodes of the layout will be placed at the bottom of the layout, and their children will be placed above them.
     */
    invert?: boolean;
    /**
     * If true, the layout will take into account 'directed' edges, and attempt to place the source of any given edge in a higher
     * layer than the edge's target. This flag also has the effect of positioning any nodes that act only as the source of one or
     * more edges on the root layer of the layout.
     *
     * It isn't always possible to place the source of some edge in a higher layer than the edge's target, due to the graph's topology,
     * but this flag will ensure the layout makes every effort to do so.
     */
    respectEdgeDirection?: boolean;
    /**
     * If true root nodes that do not have children will be positioned adjacent to the last root node
     * that does have children. When false (which is the default), unattached roots are spaced apart so that they
     * do not overlap any child trees.
     */
    gatherUnattachedRoots?: boolean;
}
/**
 * List of edges that were filtered by an `edgeFilter` and which were not used in the calculation of the layout.
 *
 */
export declare type UnprocessedEdgeList = Array<{
    sourceEntry: LayerEntry;
    sourceEntryIndex: number;
    targetEntry: LayerEntry;
    targetEntryIndex: number;
    edge: Edge;
}>;
export declare type FilteredEdgeProcessor = (edges: UnprocessedEdgeList, layout: HierarchyLayout) => any;
/**
 * Models an edge that spans more than one level. Used internally in assign layers, crossings and edge routing stages.
 * @internal
 */
export interface SpanningEdgeNode extends HasIdAndType {
    /**
     * The underlying edge.
     */
    edge: Edge;
    /**
     * The source node/group for the edge. If the edge's source is a Port, this will be the Port's parent.
     */
    sourceNode: Node | Group;
    /**
     * The target node/group for the edge. If the edge's target is a Port, this will be the Port's parent.
     */
    targetNode: Node | Group;
    /**
     * Index of the edge's root layer
     */
    rootLayer: number;
    /**
     * Index of the edge's target layer
     */
    targetLayer: number;
    /**
     * Span of the edge, which of course you can calculate via targetLayer - rootLayer.
     */
    span: number;
    /**
     * The individual entries making up the path followed by this edge.
     */
    entries: Array<EdgeEntry>;
}
/**
 * @internal
 */
export interface ResultSet {
    node: Node | Group;
    edgeNodes: Array<EdgeEntry>;
    paths: Record<string, GatedPath>;
}
/**
 * @internal
 */
export interface LayerEntry<T extends HasIdAndType = HasIdAndType> extends HasIdAndType {
    obj: T;
    id: string;
    size: Size;
    type: string;
    layer: number;
    leaf: boolean;
}
/**
 * A single entry in the layout
 * @internal
 */
export interface VertexEntry extends LayerEntry<Node | Group> {
    obj: Node | Group;
    adjacent: Array<{
        id: string;
        edges: Set<Edge>;
    }>;
    sourceEdges: Array<{
        id: string;
        edges: Set<Edge>;
    }>;
    targetEdges: Array<{
        id: string;
        edges: Set<Edge>;
    }>;
    type: typeof VERTEX;
}
/**
 * Models an edge entry in a layer.
 * @internal
 */
export interface EdgeEntry extends LayerEntry<SpanningEdgeNode> {
    obj: SpanningEdgeNode;
    previous?: EdgeEntry;
    next?: EdgeEntry;
    type: typeof EDGE;
    leaf: false;
}
