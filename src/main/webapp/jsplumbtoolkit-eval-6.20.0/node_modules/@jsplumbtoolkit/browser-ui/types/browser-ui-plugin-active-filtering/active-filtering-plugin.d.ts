import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { JsPlumbToolkit } from "../core/toolkit";
import { Surface } from "../browser-ui/surface";
import { Vertex } from "../core/model/graph";
import { Connection } from "../ui-core/core/connector/connection-impl";
export interface ActiveFilteringPluginOptions extends SurfacePluginOptions {
}
export declare class ActiveFilteringPlugin implements SurfacePlugin {
    static type: string;
    toolkit: JsPlumbToolkit;
    surface: Surface;
    _stateMap: Record<string, Vertex>;
    _dragHandler: (p: Connection<Element>) => any;
    _dragStopHandler: (a: any, e?: any) => any;
    destroy(): void;
    private _testPair;
    dragHandler(p: Connection<Element>): void;
    dragStopHandler(): void;
    initialise(surface: Surface, options: ActiveFilteringPluginOptions & InternalSurfacePluginOptions): boolean;
    reset(): void;
}
