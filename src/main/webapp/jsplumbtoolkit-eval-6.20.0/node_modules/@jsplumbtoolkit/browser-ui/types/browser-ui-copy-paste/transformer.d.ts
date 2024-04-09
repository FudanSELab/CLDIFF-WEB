/**
 * Default implementation of copy data transformer: supports transforming edge geometry, and supports retrieval
 * of vertex coordinates (relative to canvas root or to the vertex's parent)
 * @internal
 */
import { CopyDataTransformer } from "../copy-paste/copy-data";
import { Surface } from "../browser-ui/surface";
import { Edge, Vertex } from "../core/model/graph";
import { Geometry } from "../ui-core/common/connector";
import { RectangleXY } from "../ui-core/util/util";
export declare class EdgeGeometryTransformer implements CopyDataTransformer {
    surface: Surface;
    constructor(surface: Surface);
    transformGeometry(edge: Edge, dx: number, dy: number): Geometry;
    getCoordinates(vertex: Vertex, relativeToCanvasRoot?: boolean): RectangleXY;
}
