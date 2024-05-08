import { BoundingBox, Grid, PointXY, RectangleXY, Size } from "../ui-core/util/util";
/** @internal */
export interface MagnetizerRunOptions<T> {
    /**
     * Optional value for the padding to leave between elements. Defaults to 20 pixels in each axis.
     */
    padding?: PointXY;
    /**
     * Optional origin to use for magnetization process. If not provided, the computed center of the all elements to be magnetized
     * will be used instead.
     */
    origin?: PointXY;
    /**
     * List of elements to magnetize. If not provided, the magnetizer's current element list is used.
     */
    elements?: Record<string, T> | Array<T>;
    /**
     * Optional function used to filter elements from being affected by the magnetizer. They are still taken into account when magnetizing the other elements,
     * unless you set `excludeFocus:true`.
     */
    filter?: FilterFunction<T>;
    /**
     * Number of iterations to run for.  More iterations takes longer but does better magnetizing.
     */
    iterations?: number;
    /**
     * Optional function used to determine which elements to completely exclude from the magnetizer - they are treated as if they do not exist, and
     * other elements may end up positioned intersecting them.
     */
    exclude?: FilterFunction<T>;
    /**
     * Defaults to false. If true, the magnetizer works in reverse: elements are gathered together (without overlapping)
     */
    gather?: boolean;
    /**
     * Optional function used to constrain the movement of elements when the magnetizer is being applied. An example of this in use in the Toolkit is in
     * the label spacer module, in which the magnetizer is used to ensure labels do not overlap, but their movement is limited to travel along the path
     * inscribed by the connector to which they belong.
     */
    constrain?: MagnetizerConstrainFunction;
    grid?: Grid;
}
/** @internal */
export interface MagnetizerOptions<T> {
    debug?: boolean;
    /**
     * Optional value for the padding to leave between elements. Defaults to 20 pixels in each axis.
     */
    padding?: PointXY;
    /**
     * List of elements to magnetize. If not provided, the magnetizer's current element list is used.
     */
    elements?: Record<string, T> | Array<T>;
    container?: any;
    getContainerPosition?: (c: any) => PointXY;
    getSize: (el: T) => Size;
    getId: (el: T) => string;
    getPosition: (el: T) => PointXY;
    setPosition: (el: T, p: PointXY) => any;
    /**
     * Optional function used to constrain the movement of elements when the magnetizer is being applied. An example of this in use in the Toolkit is in
     * the label spacer module, in which the magnetizer is used to ensure labels do not overlap, but their movement is limited to travel along the path
     * inscribed by the connector to which they belong.
     */
    constrain?: MagnetizerConstrainFunction;
    /**
     * Optional function used to filter elements from being affected by the magnetizer. They are still taken into account when magnetizing the other elements,
     * unless you set `excludeFocus:true`.
     */
    filter?: FilterFunction<T>;
    /**
     * Optional function used to determine which elements to completely exclude from the magnetizer - they are treated as if they do not exist, and
     * other elements may end up positioned intersecting them.
     */
    exclude?: FilterFunction<T>;
}
export declare function calculateSpacingAdjustment(r1: BoundingBox, r2: BoundingBox): PointXY;
/** @internal */
export declare type MagnetizerConstrainFunction = (id: string, current: PointXY, delta: PointXY) => PointXY;
export declare type FilterFunction<T> = (id: string, v: T) => boolean;
declare type ElementPosition<T> = {
    bounds: RectangleXY;
    id: string;
    element: T;
};
/**
 * Offers a means to apply 'magnetization' to some list of elements, pushing them apart so that they do not overlap. For a given run of the magnetizer there
 * is the concept of a "focus" rectangle. The center of this rectangle is the point from which magnetization occurs, with elements being pushed out radially from this
 * point.  There are a few different scenarios:
 *
 * - execute magnetizer with a given origin, and affect all elements
 * - execute magnetizer on all elements, having first computed the center of them
 * - execute magnetizer using a specific element as the focus
 *
 * @internal
 */
export declare class Magnetizer<T> {
    origin: PointXY;
    elements: Array<T>;
    debug: boolean;
    container: any;
    getContainerPosition: (c: any) => PointXY;
    originDebugMarker: any;
    constrain: MagnetizerConstrainFunction;
    padding: PointXY;
    filter: FilterFunction<T>;
    exclude: FilterFunction<T>;
    currentFocus: string;
    focusElement: {
        id: string;
        bounds: RectangleXY;
    };
    getSize: (el: T) => Size;
    getId: (el: T) => string;
    getPosition: (el: T) => PointXY;
    setPosition: (el: T, p: PointXY) => T;
    positionArray: Array<ElementPosition<T>>;
    positions: Map<string, RectangleXY>;
    originalPositions: Map<string, RectangleXY>;
    sizes: Map<string, Size>;
    constructor(params: MagnetizerOptions<T>);
    /**
     * Run the magnetizer using the specified origin.
     * @param origin
     * @param options
     */
    executeAtPoint(origin: PointXY, options?: MagnetizerRunOptions<T>): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Run the magnetizer using an origin computed to be the center of all elements.
     * @param options
     */
    executeAtCenter(options?: MagnetizerRunOptions<T>): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Run the magnetizer with the given element as its focus - the focus element will not be shifted.
     * @param focus
     * @param options
     */
    executeWithFocus(focus: string, options?: MagnetizerRunOptions<T>): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    /**
     * Snaps all elements to a grid. Returns a map of element IDs, representing all the elements that were moved.
     * @param grid
     */
    snapToGrid(grid: Grid): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    setElements(_els: Array<T>): Magnetizer<T>;
    addElement(el: T, doNotTestForDuplicates?: boolean): this;
    addElements(els: Array<T>, doNotTestForDuplicates?: boolean): this;
    removeElement(el: T): Magnetizer<T>;
    reset(): void;
    private setOrigin;
    private _updatePositions;
    private _computeExtents;
    private _run;
    /**
     * Snap the given box to the given grid, returning true if the box was moved.
     * @param pos
     * @param grid
     * @internal
     */
    private _snapPositionToGrid;
    private _gather;
    private _magnetize;
    private _positionElements;
}
export {};
