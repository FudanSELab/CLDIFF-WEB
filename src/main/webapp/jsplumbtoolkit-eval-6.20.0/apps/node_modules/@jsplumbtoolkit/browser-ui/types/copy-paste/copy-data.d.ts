/**
 * Options for a paste operation.
 * @public
 */
import { PointXY, RectangleXY } from "../ui-core/util/util";
import { AddEdgeOptions, Edge, Group, ObjectData, Vertex, Node } from "../core/model/graph";
import { Selection } from '../core/selection';
import { Geometry } from "../ui-core/common/connector";
import { JsPlumbToolkit } from "../core/toolkit";
export interface PasteOptions {
    /**
     * Origin to use when pasting the data. Each item's location will be translated when copied accordingly.
     */
    origin?: PointXY;
    /**
     * Defaults to true. Indicates that the paste should only paste edges whose source and target vertex are in the CopyData
     * object that is being pasted. When this is set to false, all edges in the CopyData will be pasted, but edges to/from some vertex
     * not in the CopyData will attach to the pasted vertex from the CopyData on one end, and the existing vertex outside the CopyData
     * on the other.
     */
    hermetic?: boolean;
    /**
     * Defaults to false. If true, nested nodes/groups will not be copied when their parents are copied.
     */
    shallow?: boolean;
    /**
     * If true, the clipboard will be cleared after this paste operation. Defaults to false.
     */
    clear?: boolean;
}
/**
 * The return value from a paste. Contains a list of nodes, groups and edges that were pasted, as well as a map
 * of previous edge/vertex ids to their new ids, the computed origin of the copied vertices, and the amount by which
 * the set of objects was translated for the paste (so the paste location is origin + transform).
 * @public
 */
export interface ClonedSet {
    nodes: Array<ObjectData>;
    groups: Array<ObjectData>;
    edges: Array<AddEdgeOptions>;
    vertexMap: Map<string, string>;
    edgeMap: Map<string, string>;
    origin: PointXY;
    transform: PointXY;
}
/**
 * Provides helper methods to transform geometry and to retrieve coordinates.
 * @internal
 */
export interface CopyDataTransformer {
    transformGeometry(edge: Edge, dx: number, dy: number): Geometry;
    getCoordinates(vertex: Vertex, relativeToCanvasRoot?: boolean): RectangleXY;
}
/**
 * A set of data to be copied.
 * @internal
 */
export declare class CopyData {
    toolkit: JsPlumbToolkit;
    _nodes: Array<Node>;
    _groups: Array<Group>;
    _edges: Array<Edge>;
    static from(selection: Selection): CopyData;
    constructor(toolkit: JsPlumbToolkit);
    /**
     * @internal
     * @param transformer
     * @param options
     */
    paste(transformer: CopyDataTransformer, options?: PasteOptions): ClonedSet;
    /**
     * @internal
     * @param transformer
     * @param newOrigin
     * @param hermetic
     * @param shallow
     */
    private _cloneEntries;
}
