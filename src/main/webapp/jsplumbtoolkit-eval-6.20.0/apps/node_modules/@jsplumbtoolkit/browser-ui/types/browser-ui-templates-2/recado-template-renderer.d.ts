import { RecadoOptions } from "../templates-2/defs";
import { Recado } from "../templates-2/core";
import { Surface } from "../browser-ui/surface";
import { ObjectData, Vertex, Node } from "../core/model/graph";
import { TemplateRenderer } from "../browser-ui/browser-ui-instance";
import { DataSource } from "../core/datasource";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
/**
 * Options for the recado template engine. Extends RecadoOptions to take optional `tags` map.
 */
export interface RecadoTemplateRendererOptions extends RecadoOptions {
    tags?: Record<string, CustomTagRegistration>;
}
/**
 * A registration for a custom tag.
 */
export interface CustomTagRegistration {
    template: string;
    rendered?: (el: Element, data: any, instance: Recado, surface: Surface, obj: Vertex) => any;
    updated?: (el: Element, data: any, instance: Recado, surface: Surface, obj: Vertex) => any;
    fragments?: Record<string, Record<string, string>>;
}
/**
 * Template renderer that uses the Toolkit's templates-2 engine.
 */
export declare class RecadoTemplateRenderer implements TemplateRenderer<Element> {
    private recado;
    asynchronous: boolean;
    reactive: boolean;
    surface: Surface;
    currentVertex: Vertex;
    constructor(params?: RecadoTemplateRendererOptions);
    render(templateId: string, data: ObjectData, dataSource: DataSource, objectType: string, renderer: Surface, def: any, obj: Vertex, node: Node): void;
    private _cleanup;
    cleanupVertex(objId: string, el: BrowserElement): void;
    cleanupPort(objId: string, el: BrowserElement): void;
    addTemplate(id: string, content: string): void;
    registerTag(tagName: string, options: CustomTagRegistration): void;
    update(el: Element, data: Record<string, any>, v: Vertex, renderer: Surface): void;
}
