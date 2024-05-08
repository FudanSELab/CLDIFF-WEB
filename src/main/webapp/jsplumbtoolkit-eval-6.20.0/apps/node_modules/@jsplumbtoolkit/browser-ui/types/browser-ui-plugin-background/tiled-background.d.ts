import { ImageBackgroundOptions, TilingStrategy } from "./background-options";
import { ImageBackground, InternalBackgroundOptions } from "../browser-ui/background/background";
import { jsPlumbDOMElement } from "../ui-core/browser-ui-renderer/element-facade";
import { PanZoom } from "../browser-ui/pan-zoom";
import { Size } from "../ui-core/util/util";
import { Surface } from "../browser-ui/surface";
export declare type TileSpecs = {
    xCount: number;
    xSize: number;
    yCount: number;
    ySize: number;
};
declare class Layer {
    scaledImageSize: number;
    scaledImageSizeH: number;
    container: any;
    zoom: number;
    specs: TileSpecs;
    url: string;
    urlGenerator: (z: number, x: number, y: number) => string;
    apparentZoom: number;
    xTiles: number;
    yTiles: number;
    private _images;
    constructor(background: TiledBackground, params: InternalBackgroundOptions<TiledBackgroundOptions>, zoom: number);
    private _url;
    private _resolver;
    setActive(a: boolean): void;
    private _load;
    ensureLoaded(xo: number, yo: number, xf: number, yf: number): void;
}
export interface TiledBackgroundOptions extends ImageBackgroundOptions {
    /**
     * For tiled backgrounds, an optional function you can supply to generate the URL for a given tile. See `url` for
     * an explanation of the default syntax for urls when using a tiled background.
     * @param z
     * @param x
     * @param y
     */
    urlGenerator?: (z: number, x: number, y: number) => string;
    /**
     * For tiled backgrounds, provides the width and height of tiles. Every tile is assumed to have these dimensions,
     * even if the tile has whitespace in it. You must supply this if you set `type` to BackgroundTypes.tiled`.
     */
    tileSize?: Size;
    /**
     * Required for tiled backgrounds. Indicates the width of the full image.
     */
    width?: number;
    /**
     * Required for tiled backgrounds. Indicates the height of the full image.
     */
    height?: number;
    /**
     * Required for tiled backgrounds. Indicates the maximum zoom level. Zoom starts at 0 - fully zoomed out - and
     * increases in integer values from there. Each successive zoom level is twice the zoom of the previous level,
     * meaning two times as many tiles in each direction.
     */
    maxZoom?: number;
    /**
     * Default is TilingStrategies.logarithmic. See notes for `TilingStrategies` enum.
     */
    tiling?: TilingStrategy;
    /**
     * For tiled backgrounds, how long to wait after a pan before reloading tiles.
     */
    panDebounceTimeout?: number;
    /**
     * For tiled backgrounds, how long to wait after a zoom before reloading tiles.
     */
    zoomDebounceTimeout?: number;
}
export declare class TiledBackground implements ImageBackground {
    static type: string;
    type: string;
    canvas: jsPlumbDOMElement;
    viewport: jsPlumbDOMElement;
    private layers;
    private currentLayer;
    widgetZoom: number;
    zoomWidget: PanZoom;
    width: number;
    height: number;
    tileSize: Size;
    panDebounceTimeout: number;
    zoomDebounceTimeout: number;
    maxZoom: number;
    surface: Surface;
    tiling: TilingStrategy;
    urlGenerator: (z: number, x: number, y: number) => string;
    _debounceUpdateZoom: Function;
    _doEnsureVisibleTiles: Function;
    constructor(params: InternalBackgroundOptions<TiledBackgroundOptions>);
    private _mapZoomToLayer;
    private _calculateScale;
    private _ensureVisibleTiles;
    getCurrentLayer(): Layer;
    private debounce;
    private _doUpdateZoom;
    setZoom(z: number, doNotDebounce?: boolean): void;
    pan(): void;
    owns(el: any): boolean;
    getHeight(): number;
    getWidth(): number;
    destroy(): void;
    setUrl(url: string): void;
    getTileSpecs(zoom: number): TileSpecs;
    private _$_getTileSpecsAbsolute;
    private _$_getTileSpecsLogarithmic;
    _setVisible(v: boolean): void;
}
export {};
