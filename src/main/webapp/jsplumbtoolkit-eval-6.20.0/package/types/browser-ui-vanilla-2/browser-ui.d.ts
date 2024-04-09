/**
 * Custom tags let you define your own tags and attach behaviour to them.
 * @public
 */
import { Vertex } from "../core/model/graph";
import { Surface } from "../browser-ui/surface";
import { Recado } from "../templates-2/core";
import { SurfaceRenderOptions } from "../browser-ui/surface-render-options";
import { TemplateResolver } from "../templates-2/defs";
import { BrowserUIBase, TemplateRenderer } from "../browser-ui/browser-ui-instance";
import { JsPlumbToolkitOptions } from "../core/toolkit";
export interface CustomTagDefinition {
    /**
     * Template for the tag. Must have a single root element.
     */
    template: string;
    /**
     * This function is called whenever the tag is encountered during rendering. `el` is the root element for a fragment rendered
     * using the definition's `template`. Note that at the time this is called, `el` is not yet in the DOM.
     * @param el
     * @param data
     * @param instance
     * @param surface
     * @param vertex
     */
    rendered: (el: Element, data: any, instance: Recado, surface: Surface, vertex: Vertex) => any;
    /**
     * This function is called whenever the tag is updated during an update call.
     * @param el
     * @param data
     * @param instance
     * @param surface
     * @param vertex
     */
    updated: (el: Element, data: any, instance: Recado, surface: Surface, vertex: Vertex) => any;
    /**
     * If set to true, the element rendered for this tag is removed from the DOM. The Toolkit uses this capability internally
     * to add endpoints to the DOM.
     */
    remove?: boolean;
}
/**
 * Constructor options for the BrowserUI class.
 * @public
 */
export interface VanillaSurfaceRenderOptions extends SurfaceRenderOptions {
    /**
     * Optional template resolver to use. It is unlikely you will want to provide this; it is mostly exposed for testing purposes.
     */
    templateResolver?: TemplateResolver;
    /**
     * Optional map of custom tags to support in the templates.
     */
    tags?: Record<string, CustomTagDefinition>;
    /**
     * Optional map of template macros - small functions that can generate values for templates. Macros are a means for you
     * to extract logic from the templates.
     */
    templateMacros?: Record<string, (d: any) => string>;
}
/**
 * Concrete instance of JsPlumbToolkit that uses the `templates-2` package as its renderer.
 * @public
 */
export declare class BrowserUI extends BrowserUIBase {
    /**
     * Configures the given element as a Surface, registering it so that it reflects any changes to the underlying data. If
     * there is any data in the Toolkit at the time of this call it is rendered; any data subsequently loaded is automatically
     * rendered. You can supply layout arguments to this method (layout type + layout specific parameters), as well as jsPlumb rules for
     * endpoints, paint styles etc.
     * @param container The Element to render into
     * @param options Render options
     * @param templateRenderer Optional template renderer to use.  This is exposed for the library integrations to attach their own template renderer and is not something a user of the vanilla package is expected to provide.
     * @public
     */
    render(container: Element, options?: VanillaSurfaceRenderOptions, templateRenderer?: TemplateRenderer<any>): Surface;
}
/**
 * Create a new instance of the Toolkit.
 * @param options
 * @public
 */
export declare function newInstance(options?: JsPlumbToolkitOptions): BrowserUI;
