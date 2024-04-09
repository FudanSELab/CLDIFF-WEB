/**
 * Available background types. 'simple' is a single image. 'tiled' allows you to serve the image in tiles.
 * @deprecated Use the `type` member of the specific background you want, eg `TiledBackground.type`, `GeneratedGridBackground.type`, `SimpleBackground.type`
 * @public
 */
import { Background } from "../browser-ui/background/background";
import { Surface } from "../browser-ui/surface";
export declare enum BackgroundTypes {
    simple = "simple",
    tiled = "tiled",
    grid = "grid"
}
/**
 * Type of a background - the values from the BackgroundTypes enum.
 * @deprecated See note in BackgroundTypes enum.
 * @public
 */
export declare type BackgroundType = keyof typeof BackgroundTypes;
/**
 * Defines how the tiles are arranged.
 *
 * With `logarithmic` each layer is assumed to have a maximum of (2^level+1) tiles in each axis (for instance at level 0,
 * 2 tiles). This setup is how apps like Google maps arrange their tiles.
 *
 * With `absolute` tiling, the number of tiles in each axis is computed as the size of the image in that axis
 * divided by the tile size in that axis. Thus, for each zoom level, there are the same number of tiles.
 * @public
 */
export declare enum TilingStrategies {
    logarithmic = "logarithmic",
    absolute = "absolute"
}
/**
 * Tiling strategy - the values from the TilingStrategies enum
 * @public
 */
export declare type TilingStrategy = keyof typeof TilingStrategies;
/**
 * Callback from the SimpleBackground when the background image has loaded.
 * @public
 */
export declare type OnBackgroundReadyCallback = (bg: Background, surface: Surface) => any;
/**
 * Base options for background
 * @public
 */
export interface BackgroundOptions {
    /**
     * Type of background to render.
     */
    type: string;
    /**
     * Optional function to call when the image has loaded (or otherwise claims to be ready)
     */
    onBackgroundReady?: OnBackgroundReadyCallback;
    /**
     * Whether or not the background should initially be visible. Defaults to true.
     */
    visible?: boolean;
}
/**
 * Options for an image background
 * @public
 */
export interface ImageBackgroundOptions extends BackgroundOptions {
    /**
     * URL for the background. When `type` is set to `BackgroundTypes.simple` you can supply either this, or an Image. When `type` is set to
     * `BackgroundTypes.tiled`, you can supply this, or you can supply a `urlGenerator` function instead. If you supply `url` and no `urlGenerator`, the
     * url you supply is treated as a template for the url for any given tile, and is expected to contain `{z}`, `{x}` and `{y}` placeholders.
     * The form of the URL can be anything you like as long as it has the placeholders for z, x and y.  For instance:
     *
     * http://foo.com/{z}/{x}/{y}
     * https://bar.com?zoom={z}&x={x}&y={y}
     *
     * etc
     */
    url?: string;
    /**
     * For `simple` backgrounds, the image to use. Optional; you can also supply a url.
     */
    img?: HTMLImageElement;
}
