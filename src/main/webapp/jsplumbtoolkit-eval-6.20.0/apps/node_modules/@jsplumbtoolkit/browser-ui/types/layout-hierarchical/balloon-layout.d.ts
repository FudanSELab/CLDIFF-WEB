import { AbstractHierarchicalLayout, AbstractHierarchicalLayoutParameters, ChildEdgesFunction } from "./abstract-hierarchical-layout";
import { Vertex } from "../core/model/graph";
import { PointXY } from "../ui-core/util/util";
import { Magnetizer } from "../core/magnetizer";
import { InternalLayoutOptions } from "../core/layout/abstract-layout";
import { DataSource } from "../core/datasource";
/**
 * Models a cluster of elements. Used internally by a few layouts.
 * @internal
 */
export declare class ElementCluster {
    focus: any;
    children: Set<Vertex>;
    private positions;
    private incidentAngles;
    group: Array<any>;
    extents: [number, number, number, number];
    offsets: Record<string, PointXY>;
    constructor(focus: any);
    setPosition(id: string, x: number, y: number): void;
    getPosition(id: string): PointXY;
    getIncidentAngle(id: string): number;
    setIncidentAngle(id: string, theta: number): void;
    getPositions(): Map<string, PointXY>;
}
/**
 * Constructor parameters for a Balloon layout.
 */
export interface BalloonLayoutParameters extends AbstractHierarchicalLayoutParameters<Vertex> {
    /**
     * Minimum distance between a group of vertices and its neighbours. Defaults to 100 pixels.
     */
    groupPadding?: number;
}
export declare class BalloonLayout extends AbstractHierarchicalLayout<BalloonLayoutParameters> {
    static type: string;
    readonly type: string;
    _getChildEdges: ChildEdgesFunction;
    private _clusters;
    clusterMagnetizer: Magnetizer<ElementCluster>;
    groupPadding: number;
    constructor(params: InternalLayoutOptions<BalloonLayoutParameters>);
    getDefaultParameters(): BalloonLayoutParameters;
    begin(toolkit: DataSource, parameters: BalloonLayoutParameters): void;
    private _one;
    step(toolkit: DataSource, parameters: BalloonLayoutParameters): void;
}
