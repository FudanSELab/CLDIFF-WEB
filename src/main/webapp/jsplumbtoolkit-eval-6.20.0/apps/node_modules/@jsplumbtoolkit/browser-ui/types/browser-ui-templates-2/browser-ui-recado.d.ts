import { CommentFacade, ElementFacade, FragmentFacade, RecadoOptions, TemplateResolver, TextNodeFacade } from "../templates-2/defs";
import { Recado } from "../templates-2/core";
/**
 * Default implementation of TemplateResolver for use in browsers.
 * @param tid
 * @internal
 */
export declare function InBrowserTemplateResolver(tid: string): string;
/**
 * Implementation of Knockle for use with the browser-ui package.
 * @internal
 */
export declare class BrowserUiRecado extends Recado {
    constructor(options: RecadoOptions);
    /**
     * create an element with the given tag name
     * @internal
     * @param tag
     */
    ce(tag: string): ElementFacade;
    /**
     * create a fragment
     * @internal
     */
    cf(): FragmentFacade;
    /**
     * create a text node
     * @internal
     * @param value
     */
    ctn(value: string): TextNodeFacade;
    /**
     * create a comment.
     * @param content
     */
    cc(content: string): CommentFacade;
    /**
     * @internal
     */
    _getDefaultTemplateResolver(): TemplateResolver;
    removeElement(e: ElementFacade): void;
    removeTextNode(e: TextNodeFacade): void;
}
/**
 * @internal
 * @param options
 */
export declare function newRecadoInstance(options?: RecadoOptions): Recado;
