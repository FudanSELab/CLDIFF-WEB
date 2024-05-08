import { AbsoluteBackedLayout, AbsoluteBackedLayoutParameters } from "../core/layout/absolute-layout";
import { JsPlumbToolkit } from "../core/toolkit";
import { Edge, HasId, Vertex } from "../core/model/graph";
import { InternalLayoutOptions } from "../core/layout/abstract-layout";
import { DataSource } from "../core/datasource";
/**
 * Defines the function used to find child edges from some vertex.
 * @public
 */
export declare type ChildEdgesFunction = (node: Vertex, layer: number, toolkit: JsPlumbToolkit) => Array<Edge>;
/**
 * Defines the function used to find child edges in some hierarchical layout.
 * @public
 */
export declare type HierarchicalLayoutChildVerticesFunction<T extends HasId> = (node: T, layer: number, toolkit: DataSource) => Array<T>;
/**
 * Base parameters for layouts that extend AbstractHierarchicalLayout.
 */
export interface AbstractHierarchicalLayoutParameters<T extends HasId> extends AbsoluteBackedLayoutParameters {
    /**
     * Defaults to true. If a loop is found during the layout it is usually ignored, unless this is set to true.
     */
    ignoreLoops?: boolean;
    /**
     * Optional, defaults to true. If false, multiple roots are not supported, and assuming you have not overridden getRootNode, the layout uses the first node found in the dataset (otherwise it still uses the result of your getRootNode function)
     */
    multipleRoots?: boolean;
    /**
     * Optional. A function that is given the Toolkit instance as argument and is expected to return either a single node/group, or an array of nodes/groups, to use as the root(s) for the layout
     * @param toolkit
     */
    getRootNode?: (toolkit: DataSource) => Array<Vertex>;
    /**
     * Defaults to false, meaning that ports are taken into account when figuring the list of edges from some vertex. If you set
     * this to `true`, ports will be ignored and the layout will only consider edges connected directly to each vertex.
     */
    ignorePorts?: boolean;
    /**
     *  Optional function used to determine the edges to traverse to find children from some node
     * @param node
     * @param toolkit
     */
    getChildVertices?: HierarchicalLayoutChildVerticesFunction<T>;
    /**
     * Optional. Defines the node/group to use as the root of the tree. This may be provided either as a node/group id or as a node/group object. If this parameter is not specified and multipleRoots is not false then the layout uses the result(s) of the `getRootNode` function; otherwise it uses the first node/group found in the dataset.
     */
    rootNode?: Array<Vertex>;
}
export declare abstract class AbstractHierarchicalLayout<P extends AbstractHierarchicalLayoutParameters<Vertex>> extends AbsoluteBackedLayout<P> {
    /**
     * @internal
     */
    _ignoreLoops: boolean;
    /**
     * @internal
     */
    _getRootNode: (toolkit: JsPlumbToolkit) => Array<Vertex>;
    /**
     * @internal
     */
    _multipleRoots: boolean;
    /**
     * @internal
     */
    _ignorePorts: boolean;
    /**
     * @internal
     */
    protected constructor(params: InternalLayoutOptions<P>);
    /**
     * @internal
     */
    begin(toolkit: DataSource, parameters: AbstractHierarchicalLayoutParameters<Vertex>): void;
}
