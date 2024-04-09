import { RecadoOptions } from "../templates-2/defs";
import { TemplateRenderer } from "../browser-ui/browser-ui-instance";
export * from './browser-ui-recado';
/**
 * Create a template renderer using the template-2 package.
 * @param params
 */
export declare function newTemplates2Renderer(params?: RecadoOptions): TemplateRenderer<Element>;
