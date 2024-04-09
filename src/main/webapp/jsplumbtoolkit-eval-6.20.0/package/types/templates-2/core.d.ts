import { CommentFacade, ElementFacade, FragmentFacade, RecadoOptions, TextNodeFacade } from "./defs";
import { TemplateResolver } from "./defs";
import { CompiledBinding } from "./parser";
import { AbstractEntry } from './abstract-entry';
import { CustomTag, CustomTagOptions } from "./custom-tag";
import { IRootExecution, UpdateResult } from "./executions";
/**
 * @internal
 */
export interface BindingResult {
    id: string;
    binding: CompiledBinding;
    results: Array<{
        source: string;
        result: any;
    }>;
    originalValue: any;
    type: "attribute" | "text";
}
/**
 * @internal
 */
export declare abstract class Recado {
    templateResolver: TemplateResolver;
    defaultTemplate: string;
    macros: Record<string, (d: any) => string>;
    entries: Record<string, AbstractEntry>;
    customTags: Record<string, CustomTag>;
    cache: Map<string, any>;
    templateCache: Map<string, Array<AbstractEntry>>;
    openRe: RegExp;
    closeRe: RegExp;
    openCloseRe: RegExp;
    tokenizerRe: RegExp;
    commentRe: RegExp;
    attributesRe: RegExp;
    helperExpressionRe: RegExp;
    isBrowser: boolean;
    private readonly _templates;
    abstract _getDefaultTemplateResolver(): TemplateResolver;
    constructor(options: RecadoOptions);
    /**
     * Lookup a template by ID.
     * @param id
     * @internal
     */
    resolveTemplate(id: string): string;
    setAttribute(el: any, a: string, v: string): void;
    clearCache(): void;
    namespaceHandlers: Record<string, (tag: string) => ElementFacade>;
    namespaces: Record<string, string>;
    /**
     * Create a Fragment for the current environment
     */
    abstract cf(): FragmentFacade;
    /**
     * Create a text node for the current environment
     * @param value
     */
    abstract ctn(value: string): TextNodeFacade;
    /**
     * Create an element for the current environment
     * @param tag
     */
    abstract ce(tag: string): ElementFacade;
    /**
     * Create a comment element. Used as placeholders for loop/control structures.
     * @param content
     */
    abstract cc(content: string): CommentFacade;
    abstract removeElement(e: ElementFacade): void;
    abstract removeTextNode(e: TextNodeFacade): void;
    parseAttributes(el: string): string[];
    /**
     * @internal
     * @param resolver
     * @param forceReload
     */
    _wrapCache(resolver: TemplateResolver, forceReload?: boolean): TemplateResolver;
    getTemplate(id: string): Array<AbstractEntry>;
    /**
     * Add a template. The template is not parsed until such time as someone asks for it.
     * @param id
     * @param content
     * @internal
     */
    addTemplate(id: string, content: string): void;
    template(id: string, data: Record<string, any>, templateResolver?: TemplateResolver, forceReload?: boolean): FragmentFacade;
    /**
     * Resolve, parse and then cache the template with the given id. If the template has already been resolved and parsed,
     * return the parsed value, unless `forceReload` is set to true.
     * @param templateId
     * @param templateResolver
     * @param forceReload
     */
    parseAndCache(templateId: string, templateResolver?: TemplateResolver, forceReload?: boolean): Array<AbstractEntry>;
    /**
     * Get, or set, a value from/to an object.
     * @param inObj Object to operate on
     * @param path Path to the value to get/set
     * @param value If null, this method gets a value. Otherwise, this method sets a value.
     */
    data(inObj: Record<string, any>, path: string, value?: any): any;
    each(l: any, fn: Function, loopUuid: string, ctx: string, key: string): void;
    update(el: any, templateData: Record<string, any>): UpdateResult;
    onUpdate(el: any, fn: Function): void;
    private _updateExecution;
    /**
     * Removes the given element from this Recado instance, and optionally removes it from the DOM too.
     * @param el Element to remove.
     * @param removeFromDOM Whether or not to also remove from the DOM.
     * @internal
     */
    remove(el: any, removeFromDOM?: boolean): void;
    /**
     * Register a custom tag.
     * @param tagName
     * @param handlers
     * @public
     */
    registerTag(tagName: string, handlers: CustomTagOptions): void;
    /**
     * Parse the given template into an AST.
     * @param str
     * @param templateResolver
     * @param extraProperties
     * @param parseIdStack
     * @internal
     */
    parse(str: string, templateResolver?: TemplateResolver, extraProperties?: any, parseIdStack?: Array<string>): Array<AbstractEntry>;
    /**
     * Run the given macro, if found.
     * @param expansionId
     * @param data
     * @internal
     */
    _expand(expansionId: string, data: Record<string, any>): string;
    /**
     * Render the given AST using the given data.
     * @param p
     * @param templateData
     * @param templateResolver
     */
    render(p: Array<AbstractEntry>, templateData?: Record<string, any>, templateResolver?: TemplateResolver): IRootExecution;
}
