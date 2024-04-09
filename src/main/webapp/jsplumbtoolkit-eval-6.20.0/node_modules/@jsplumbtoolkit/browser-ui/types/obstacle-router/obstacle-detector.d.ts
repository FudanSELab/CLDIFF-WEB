import { PointXY, Size } from "../ui-core/util/util";
import { Intersection, RegionEntry, TrackingRegion, VertexEntry, RegionSet } from "./definitions";
/**
 * Models a source dataset. These two methods are exposed by `AbstractLayout`, one of which was originally expected
 * in the constructor of the ObstacleDetector, but there's no real dependency on a layout, only these two methods, so
 * we introduced this interface. Now the obstacle router package only has a dependency on @jsplumb/core.
 */
interface ObstacleDetectorSource {
    getSizes(): Map<string, Size>;
    getPositions(): Map<string, PointXY>;
}
export declare class ObstacleDetector {
    sourceDataset: ObstacleDetectorSource;
    private regionOverlapThreshold;
    debug: boolean;
    idx: number;
    _contentBounds: Record<string, number>;
    _vertices: Array<VertexEntry>;
    _vertexMap: Record<string, VertexEntry>;
    _origin: PointXY;
    _intersections: Array<Intersection>;
    _intersectionMap: Record<string, Intersection>;
    private _boxes;
    _regions: Array<RegionEntry>;
    _regionMap: Record<string, RegionEntry>;
    _stack: Array<TrackingRegion>;
    _currentRegion: TrackingRegion;
    _finished: boolean;
    _regionIndex: number;
    _stepCounter: number;
    constructor(sourceDataset: ObstacleDetectorSource, regionOverlapThreshold?: number, debug?: boolean);
    execute(onComplete?: (regions: RegionSet) => any): void;
    /**
     * Find the overall bounds of the managed vertices
     * @internal
     */
    private _computeContentBounds;
    private _finish;
    private _reset;
    private _setCurrentRegion;
    private _popStack;
    private _pushStack;
    /**
     * Create a new TrackingRegion with the given details.
     * @param origin
     * @param bounds
     * @param referenceObstacle
     * @param adjacentRegion
     * @return a TrackingRegion
     * @internal
     */
    private _newRegion;
    /**
     * Create a new region with the given details and push it on the stack
     * @param origin
     * @param bounds
     * @param referenceObstacle
     * @param adjacentRegion
     * @param guard must not be boolean false for this push to occur
     * @internal
     */
    private _pushNewRegion;
    private _finaliseRegion;
    private _step;
    _updateStepCount(count: number): void;
    _feedback(str: string): void;
}
export {};
