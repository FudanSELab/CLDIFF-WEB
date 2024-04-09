import { Surface } from "../surface";
import { ViewportBounds } from '../pan-zoom';
/**
 * @internal
 */
export interface InternalSurfacePluginOptions {
    bounds?: ViewportBounds;
}
/**
 * Base interface for Surface plugin options.
 * @public
 */
export interface SurfacePluginOptions {
}
/**
 * Defines a surface plugin
 * @public
 */
export interface SurfacePlugin {
    initialise(surface: Surface, options: SurfacePluginOptions & InternalSurfacePluginOptions): boolean;
    destroy(): void;
    reset(): void;
}
/**
 * A full surface plugin spec - name and options.
 * @public
 */
export declare type FullPluginSpec = {
    type: string;
    options: any;
};
/**
 * A surface plugin spec - either just its name, or its name and options
 * @public
 */
export declare type SurfacePluginSpec = string | FullPluginSpec;
