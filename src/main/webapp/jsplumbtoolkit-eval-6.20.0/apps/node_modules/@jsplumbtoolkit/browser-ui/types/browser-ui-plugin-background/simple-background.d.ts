import { ImageBackgroundOptions, OnBackgroundReadyCallback } from "./background-options";
import { ImageBackground, InternalBackgroundOptions } from "../browser-ui/background/background";
import { Surface } from "../browser-ui/surface";
/**
 * @internal
 */
export interface SimpleBackgroundOptions extends ImageBackgroundOptions {
}
/**
 * A background consisting of a single image.
 * @public
 */
export declare class SimpleBackground implements ImageBackground {
    static type: string;
    type: string;
    canvas: HTMLElement;
    onBackgroundReady: OnBackgroundReadyCallback;
    imagePlaceholder: HTMLImageElement;
    surface: Surface;
    protected image: HTMLImageElement;
    protected url: string;
    constructor(params: InternalBackgroundOptions<SimpleBackgroundOptions>);
    protected _init(params: SimpleBackgroundOptions): void;
    setUrl(url: string): void;
    owns(el: any): boolean;
    getWidth(): number;
    getHeight(): number;
    setZoom(zoom: number, doNotDebounce?: boolean): void;
    pan(): void;
    destroy(): void;
    _setVisible(v: boolean): void;
}
