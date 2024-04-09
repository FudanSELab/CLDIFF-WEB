/**
 * @internal
 */
import { PointXY } from "../ui-core/util/util";
import { Group, Node, Vertex } from "../core/model/graph";
import { AbsoluteBackedLayout, AbsoluteBackedLayoutParameters } from "../core/layout/absolute-layout";
import { InternalLayoutOptions } from "../core/layout/abstract-layout";
import { DataSource } from "../core/datasource";
/**
 * Parameters for the force directed layout
 * @public
 */
export interface ForceDirectedLayoutParameters extends AbsoluteBackedLayoutParameters {
    /**
     * Maximum number of iterations to run. Defaults to 50. Increasing this number may result in a nicer output,
     * at the expense of run time.
     */
    iterations?: number;
    /**
     * Ideal spacing to leave between elements. Defaults to 250px, but this does not mean that elements end up separated
     * by exactly 250px.
     */
    spacing?: number;
    /**
     * The amount of travel to impose on each element every time a repulsion or attraction event occurs during the
     * calculation of the layout. This is expressed as a fraction of the distance the two elements would travel in order
     * to be `spacing` pixels apart.  Defaults to 0.25. A value of 1 here may seem desirable but in general will not provide
     * the best results: moving one pair of elements by their ideal amount can negatively affect many others. It is better
     * to provide a fractional value here and allow the layout to compromise.
     */
    r?: number;
}
/**
 * A layout that treats edges as springs, and places each vertex in proximity to other vertices to which it is connected. This is a rewrite of the
 * original Spring layout, with several placement enhancements and typically a shorter run time. As of 5.7.0, existing users of the Spring
 * layout are encouraged to switch to this layout, and new users are encouraged to prefer this layout over the Spring layout.
 * @public
 */
export declare class ForceDirectedLayout extends AbsoluteBackedLayout<ForceDirectedLayoutParameters> {
    /**
     * @internal
     */
    private currentIteration;
    static type: string;
    readonly type: string;
    /**
     * @internal
     */
    private _elements;
    /**
     * @internal
     */
    private _moveCount;
    /**
     * @internal
     */
    private readonly _absoluteBacked;
    /**
     * @internal
     */
    private minx;
    /**
     * @internal
     */
    private maxx;
    /**
     * @internal
     */
    private miny;
    /**
     * @internal
     */
    private maxy;
    /**
     * @internal
     */
    private _cache;
    /**
     * @internal
     */
    private _edgeLists;
    defaultMagnetized: boolean;
    /**
     * @internal
     */
    private currentParameters;
    /**
     * @internal
     */
    private adjustment;
    constructor(params: InternalLayoutOptions<ForceDirectedLayoutParameters>);
    /**
     * Get default values for the layout
     */
    getDefaultParameters(): ForceDirectedLayoutParameters;
    /**
     * @internal
     * @param id
     * @param x
     * @param y
     */
    _vertexMoved(id: string, x: number, y: number): void;
    /**
     * @internal
     * @param rec
     * @param x
     * @param y
     */
    private _update;
    _vertexRemoved(obj: Vertex): void;
    _vertexAdded(params: {
        el: any;
        pos?: PointXY;
        vertex: Node | Group;
        parameters?: any;
    }, eventInfo: any): PointXY;
    /**
     * @internal
     */
    reset(): void;
    /**
     * @internal
     */
    begin(toolkit: DataSource, parameters: ForceDirectedLayoutParameters): void;
    /**
     * @internal
     * @param obj
     */
    private _get;
    /**
     * Get an element record from the cache, priming the cache if necessary. The cache is cleared when reset is called.
     * This method also populated the list of edges for the given node.
     * @param idx
     * @internal
     */
    private _getCached;
    /**
     * @internal
     */
    step(toolkit: DataSource, parameters: ForceDirectedLayoutParameters): void;
    /**
     * @internal
     */
    end(toolkit: DataSource, parameters: ForceDirectedLayoutParameters, wasMagnetized: boolean): void;
    /**
     * Updates the position for the given element, as well as the current layout bounds.
     * @param node
     * @param x
     * @param y
     * @internal
     */
    private _setElementPosition;
    /**
     * Writes final positions.
     * @internal
     */
    private _finalisePositions;
    /**
     * @internal
     */
    private _repulsion;
    /**
     * @internal
     */
    private _attraction;
}
