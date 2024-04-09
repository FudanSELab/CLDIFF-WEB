import { Surface } from "../browser-ui/surface";
import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { EventGenerator } from "../ui-core/util/event-generator";
export interface StatePluginOptions extends SurfacePluginOptions {
    handle?: string;
}
export declare class StatePlugin extends EventGenerator implements SurfacePlugin {
    static type: string;
    surface: Surface;
    handle: string;
    destroy(): void;
    initialise(surface: Surface, options: StatePluginOptions & InternalSurfacePluginOptions): boolean;
    shouldFireEvent(event: string, value: any, originalEvent?: Event): boolean;
    /**
     * Saves the current state of the Surface we are attached to, either to local storage or a cookie, depending on the browser's capabilities.
     */
    saveState(handle?: string): void;
    serializeState(): string;
    deserializeState(value: string): void;
    /**
     * Restores the current state of the UI, either from local storage or a cookie, depending on the browser's capabilities.
     * @param handle The handle to restore the state from, If this is not supplied, and `stateHandle` was supplied as a constructor parameter, that is used instead.
     */
    restoreState(handle?: string): void;
    /**
     * Clears the state stored by the given handle.
     * @param handle The handle to restore the state from. If this is not supplied, and `stateHandle` was supplied as a constructor parameter, that is used instead.
     */
    clearState(handle?: string): void;
    clearAllState(): void;
    reset(): void;
}
