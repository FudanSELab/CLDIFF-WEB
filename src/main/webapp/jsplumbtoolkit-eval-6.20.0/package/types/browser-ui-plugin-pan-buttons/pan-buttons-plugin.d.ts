/**
 * Options for the pan buttons plugin.
 * @public
 */
import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { Surface } from "../browser-ui/surface";
import { PanZoom } from "../browser-ui/pan-zoom";
/**
 * Options for the pan buttons plugin.
 */
export interface PanButtonsPluginOptions extends SurfacePluginOptions {
    /**
     * Time in milliseconds after the mouse button is pressed before panning should start. Defaults to 150.
     */
    startPanTimeout?: number;
    /**
     * Time in milliseconds between successive adjustment to the pan. Defaults to 60.
     */
    panRepeatInterval?: number;
    /**
     * Amount in pixels to adjust pan by each time the timer fires. Defaults to 10.
     */
    panRepeatDistance?: number;
    /**
     * Amount in pixels to pan the surface by when one of the buttons is pressed and released. Defaults to 50.
     */
    panDistance: number;
}
export declare class PanButtonsPlugin implements SurfacePlugin {
    static type: string;
    startPanTimeout: number;
    panRepeatInterval: number;
    panRepeatDistance: number;
    _panButtons: Array<HTMLDivElement>;
    _startTimer: number;
    _repeatTimer: number;
    currentPanButton: any;
    surface: Surface;
    panZoom: PanZoom;
    panDistance: number;
    eventManager: any;
    private _justPanned;
    private _clearPanTimer;
    private _endPanRepeat;
    initialise(surface: Surface, options: PanButtonsPluginOptions & InternalSurfacePluginOptions): boolean;
    private curryPanButton;
    private startPanTimer;
    private makePanButton;
    destroy(): void;
    reset(): void;
}
