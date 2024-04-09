import { Surface, BrowserUIBase, SurfaceRenderOptions, JsPlumbToolkitOptions } from "@jsplumbtoolkit/browser-ui";
/**
 * Extension of the Toolkit suitable for use with the React integration.
 */
export declare class BrowserUIReact extends BrowserUIBase {
    render(container: Element, options?: SurfaceRenderOptions): Surface;
}
/**
 * Creates a new instance of the Toolkit for use with the React integration.
 * @param options
 */
export declare function newInstance(options?: JsPlumbToolkitOptions): BrowserUIReact;
