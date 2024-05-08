import { Recado } from "./core";
import { AbstractEntry } from './abstract-entry';
import { ElementFacade } from "./defs";
/**
 * Options for a custom tag
 * @public
 */
export interface CustomTagOptions {
    template: string;
    rendered?: (el: any, data: any, instance: Recado, parent: ElementFacade) => void;
    updated?: (el: any, data: any, instance: Recado) => void;
    fragments?: Record<string, Record<string, string>>;
    defaultableFragmentKeys?: Array<string>;
}
/**
 * @internal
 */
export declare class CustomTag {
    instance: Recado;
    tagName: string;
    options: CustomTagOptions;
    id: string;
    template: string;
    rendered: (el: ElementFacade, data: any, instance: Recado, parent: ElementFacade) => void;
    updated: (el: ElementFacade, data: any, instance: Recado) => void;
    fragments: Record<string, Record<string, Array<AbstractEntry>>>;
    defaultableFragmentKeys: Array<string>;
    private fragmentKeys;
    private parsedTemplates;
    constructor(instance: Recado, tagName: string, options: CustomTagOptions);
    private _parseDefault;
    private extractTemplateData;
    getAST(templateData: Record<string, any>): AbstractEntry[];
    private _replaceAST;
}
