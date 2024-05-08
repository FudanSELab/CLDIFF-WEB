import { PanZoom } from "../pan-zoom";
import { Surface } from "../surface";
import { jsPlumbDOMElement } from "../../ui-core/browser-ui-renderer/element-facade";
/**
 * Definition of a Background. This is an internal class that users of the SDK won't need to access unless they are
 * writing their own background type.
 * @internal
 */
export interface Background {
    setZoom(zoom: number, doNotDebounce?: boolean): void;
    getWidth(): number;
    getHeight(): number;
    owns(el: any): boolean;
    pan(): void;
    destroy(): void;
    _setVisible(v: boolean): void;
}
/**
 * @internal
 */
export interface ImageBackground extends Background {
    setUrl(url: string): void;
}
/**
 * @internal
 */
export interface InternalBackgroundOptions<T> {
    type: string;
    zoomWidget: PanZoom;
    canvas: jsPlumbDOMElement;
    viewport: jsPlumbDOMElement;
    surface: Surface;
    options: T;
    visible: boolean;
}
