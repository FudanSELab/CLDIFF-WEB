import { BackgroundOptions } from "./background-options";
import { SurfacePlugin } from "../browser-ui/plugins/surface-plugin";
import { InternalBackgroundOptions } from "../browser-ui/background/background";
import { Surface } from "../browser-ui/surface";
/**
 * Offers a means to manage backgrounds for a Surface.
 * @public
 */
export declare class BackgroundPlugin implements SurfacePlugin {
    static type: string;
    private panZoom;
    private background;
    private _visible;
    /**
     * @internal
     * @param surface
     * @param backgroundOptions
     */
    initialise<T extends BackgroundOptions>(surface: Surface, backgroundOptions: InternalBackgroundOptions<T>): boolean;
    /**
     * @internal
     */
    destroy(): void;
    /**
     * @internal
     */
    reset(): void;
    /**
     * Sets the current image url.
     * @public
     * @param url
     */
    setUrl(url: string): void;
    /**
     * Sets the background to be visible.
     * @public
     */
    show(): void;
    /**
     * Sets the background to be invisible
     * @public
     */
    hide(): void;
    /**
     * Toggles the visible state of the background.
     * @public
     */
    toggle(): void;
    /**
     * Sets the visible state of the background
     * @param v
     * @public
     */
    setVisible(v: boolean): void;
}
