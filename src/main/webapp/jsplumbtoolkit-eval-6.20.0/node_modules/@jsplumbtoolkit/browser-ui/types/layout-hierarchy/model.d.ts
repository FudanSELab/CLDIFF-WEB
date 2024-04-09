import { HierarchyLayout, HierarchyLayoutModelOptions, LayerSet } from "./hierarchy-layout";
import { EdgeEntry, SpanningEdgeNode, LayerEntry, VertexEntry } from './definitions';
import { HierarchyLayoutOrdering } from "./crossing-stage";
import { Group, Node, Edge, HasIdAndType } from "../core/model/graph";
import { Size } from "../ui-core/util/util";
import { Gate, RouterEdge } from "../router/common";
import { DataSource } from "../core/datasource";
export declare const EDGE = "edge";
export declare const VERTEX = "vertex";
/**
 * Models a set of vertices that are adjacent to some given vertex.
 * @internal
 */
export declare type AdjacentVerticesSet = {
    vertices: Array<{
        id: string;
        edges: Set<Edge>;
    }>;
    source: Array<{
        id: string;
        edges: Set<Edge>;
    }>;
    target: Array<{
        id: string;
        edges: Set<Edge>;
    }>;
    filteredEdges: Set<Edge>;
};
/**
 * Underlying model for the hierarchy layout.
 * @internal
 */
export declare class HierarchyLayoutModel {
    instance: DataSource;
    layout: HierarchyLayout;
    private padding;
    /**
     * The main axis of the layout. 0 for horizontal, 1 for vertical, where 'horizontal' means that the layout consists of
     * a set of layers whose vertices are placed in a horizontal row.
     */
    axis: number;
    /**
     * The opposite axis of the layout.
     */
    oAxis: number;
    vertexMap: Record<string, Node | Group>;
    sizes: Record<string, Size>;
    forcedRootNode: any;
    invert: boolean;
    /**
     * list of all vertex entries
     */
    entries: Array<VertexEntry>;
    entryMap: Record<string, LayerEntry>;
    unattachedRootPadding: number;
    assignedVertices: Map<string, number>;
    vertexEntryMap: Map<string, VertexEntry>;
    readonly edgeEntryMap: Map<string, EdgeEntry>;
    entryNodes: Array<VertexEntry>;
    entryNodeMap: Map<string, VertexEntry>;
    layers: LayerSet;
    edgeFilter: (e: Edge) => boolean;
    edgeNodes: Array<SpanningEdgeNode>;
    edgeNodeMap: Map<string, SpanningEdgeNode>;
    gateMap: Record<string, Gate>;
    /**
     * list of nodes the assign layers stage could not retrieve and which should now be ignored by the rest of the process.
     */
    excludedNodes: Record<string, boolean>;
    /**
     * @internal
     */
    _doGetSize: (id: string) => Size;
    /**
     * @internal
     */
    _doSetPosition: (id: string, x: number, y: number, layer: number) => void;
    regions: Array<any>;
    gates: Array<Gate>;
    edgeRoutingMap: Record<string, RouterEdge>;
    edgeRouting: Array<RouterEdge>;
    edgeNodeSize: number;
    /**
     * @internal
     */
    constructor(instance: DataSource, options: HierarchyLayoutModelOptions, layout: HierarchyLayout);
    /**
     * Find the next unplaced node that has no edges where it is a target.
     * @internal
     */
    nextRoot(): Node | Group;
    /**
     * Add another node to the current root layer.
     * @param node
     * @internal
     */
    addExtraRoot(node: HasIdAndType): void;
    /**
     * @internal
     */
    getVertex(vertexId: string): any;
    /**
     * @internal
     */
    setRootNode(node: Node): void;
    /**
     * @internal
     */
    getLayer(node: HasIdAndType): number;
    /**
     * @internal
     */
    getLayerForId(id: string): number;
    /**
     * @internal
     */
    get layerCount(): number;
    /**
     * @internal
     */
    getSize(node: HasIdAndType): Size;
    /**
     * Get the given entry's size in the main axis.
     * @param node
     * @internal
     */
    getNodeSizeInMainAxis(node: HasIdAndType): number;
    /**
     * Get the given entry's size in the other axis.
     * @param node
     * @internal
     */
    getNodeSizeInOtherAxis(node: HasIdAndType): number;
    /**
     * @internal
     */
    private _$_setPositionAndUpdateLayer;
    /**
     * @internal
     */
    setPositionById(id: string, x: number, y: number, layer: number): void;
    /**
     * @internal
     */
    setPosition(node: Node | Group, x: number, y: number, layer: number): void;
    /**
     * @internal
     */
    private _ensureLayer;
    /**
     * @internal
     */
    addToLayer(layerIdx: number, node: HasIdAndType, atStart?: boolean): LayerEntry;
    private _initialEdgeNodeSize;
    /**
     * Inserts an initial SpanningEdgeNode into some given layer, calculating whether its best to put the
     * edge at the start or at the end of the layer. This method may benefit from some fine tuning.
     * @internal
     */
    insertEdgeNodeInLayer(layerIdx: number, edgeNode: SpanningEdgeNode, atStart?: boolean): EdgeEntry;
    /**
     * @internal
     */
    removeFromLayer(layerIdx: number, entry: LayerEntry): void;
    /**
     * @internal
     */
    adjacentVertices: Record<string, AdjacentVerticesSet>;
    /**
     * @internal
     */
    getSizeInMainAxis(s: Size): number;
    /**
     * @internal
     */
    getSizeInOtherAxis(s: Size): number;
    /**
     * @internal
     */
    getPaddingInMainAxis(): number;
    /**
     * @internal
     */
    getPaddingInOtherAxis(): number;
    /**
     * @internal
     */
    initialize(): void;
    /**
     * @internal
     */
    isEmpty(): boolean;
    /**
     * @internal
     * @param ordering
     * @param layerIndex
     * @param entry
     */
    getAdjacentEntries(ordering: HierarchyLayoutOrdering, layerIndex: number, entry: LayerEntry): Array<[LayerEntry, number]>;
    /**
     * Finds the entries in the layer at `layerIndex` that are connected to the given entry. This is used in the
     * crossing stage and also in the placement stage.
     * @param entries List of entries to look for matches in.
     * @param entry
     * @internal
     */
    getAdjacentEntriesInLayer(entries: Array<LayerEntry>, entry: LayerEntry): Array<{
        entry: LayerEntry;
        index: number;
    }>;
    /**
     * @internal
     * tests if the two entries are connected.
     * @param entry1
     * @param entry2
     */
    areConnected(entry1: LayerEntry, entry2: LayerEntry): boolean;
    /**
     * @internal
     * @param node1Id
     * @param node2Id
     */
    areAdjacent(node1Id: string, node2Id: string): boolean;
    /**
     * @internal
     * @param nodeId
     */
    getAdjacentVertices(nodeId: string): AdjacentVerticesSet;
    /**
     * @internal
     * @param id
     */
    isLeaf(id: string): boolean;
    /**
     * @internal
     * @param e
     * @param i
     * @private
     */
    private _dumpEntry;
    /**
     * @internal
     * @param ordering
     */
    dumpLayers(ordering: HierarchyLayoutOrdering): void;
}
