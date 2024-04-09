/**
 * Extract a value from, or set a value into, an object. This static method can be used outside of Knockle.
 * @param inObj Object to extract value from or insert value into
 * @param path Path to the value to extract/insert, in dotted notation. This syntax also supports array indices,
 * such as `foo.bar[3]`.
 * @param value If provided, this method sets the value. Otherwise it extracts the current value.
 * @static
 * @returns Value for the given path, null if not found.
 */
import { PointXY, Size } from "../ui-core/util/util";
export declare function data(inObj: Record<string, any>, path: string, value?: any): any;
/**
 * Partitions a list into two lists - one for which the supplied partitioner returns true (the `left` list), and the other, the
 * `right` list, for which the supplied partitioner does not return true.
 * @param l List to partition
 * @param partitioner Function to use to partition the list.
 * @public
 */
export declare function partition<T, A extends T, B extends T>(l: ArrayLike<T>, partitioner: (candidate: T) => boolean): {
    left: Array<A>;
    right: Array<B>;
};
/**
 * Filters out empty or null values from the given list of strings
 * @public
 */
export declare function filterEmpty(l: Array<string>): Array<string>;
/**
 * Runs the given function for each value in the array that is not null and has a non-zero length.
 * @public
 */
export declare function eachNotEmpty(strings: Array<string>, fn: (idx: number, s: string) => any): void;
export declare type ClosestPointCandidate<T extends PointXY> = {
    p: T;
    idx: number;
    distance: number;
};
/**
 * Find the closest point out of `locations` to the given point on the given constraining rectangle.
 * @param pos An x,y location in pixel values
 * @param constrainRect Width/height of the bounding box, in pixels
 * @param locations A list of x/y logical locations, whose values are proportional lengths (anchor format).
 */
export declare function findClosestPoint<T extends PointXY>(pos: PointXY, constrainRect: Size, locations: Array<T>): ClosestPointCandidate<T>;
/**
 * Get, or insert then get, a value from the map.
 * @param map Map to get the value from.
 * @param key Key of the value to retrieve
 * @param valueGenerator Method used to generate a value for the key if it is not currently in the map.
 * @public
 */
export declare function getsert<K, V>(map: Map<K, V>, key: K, valueGenerator: () => V): V;
/**
 * Get, or insert then get, a value from the map.
 * @param map Map to get the value from.
 * @param key Key of the value to retrieve
 * @param valueGenerator Method used to generate a value for the key if it is not currently in the map.
 * @public
 */
export declare function recordGetsert<V>(map: Record<string, V>, key: string, valueGenerator: () => V): V;
