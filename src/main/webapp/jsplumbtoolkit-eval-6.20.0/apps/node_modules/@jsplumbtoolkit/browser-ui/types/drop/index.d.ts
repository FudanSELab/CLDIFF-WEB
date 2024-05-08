import { SurfaceDropManagerOptions, SurfaceDropManager, DropManager, DropManagerOptions } from "./jsplumbtoolkit-drop";
export * from './jsplumbtoolkit-drop';
/**
 *
 * @param options Create a new SurfaceDropManager
 * @returns
 * @public
 */
export declare function createSurfaceDropManager<T>(options: SurfaceDropManagerOptions<T>): SurfaceDropManager<T>;
/**
 *
 * @param options Create a new DropManager
 * @returns
 * @public
 */
export declare function createDropManager<T>(options: DropManagerOptions<T>): DropManager<T>;
