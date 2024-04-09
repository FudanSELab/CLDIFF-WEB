import { HierarchyLayoutModel } from "./model";
import { PointXY } from "../ui-core/util/util";
import { GatedPath } from "../router/common";
export declare class EdgeRoutingStage {
    private model;
    private axis;
    private positions;
    _vertexRegions: Record<string, any>;
    constructor(model: HierarchyLayoutModel, axis: number, positions: Map<string, PointXY>);
    execute(): Record<string, GatedPath>;
    /**
     * Adds a gate, first computing the appropriate values
     * based upon the current axis.
     * @param entry
     * @param position
     * @param r1
     * @param r2
     * @param atEndInOtherAxis
     * @private
     */
    private _addGateForAxis;
    private _addGate;
}
