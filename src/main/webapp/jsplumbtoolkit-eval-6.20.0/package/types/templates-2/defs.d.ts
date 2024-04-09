/**
 * Resolves the content for some template, via id.
 * @public
 */
export declare type TemplateResolver = (id: string) => string;
/**
 * Constructor options for Recado instance.
 * @internal
 */
export interface RecadoOptions {
    templateResolver?: TemplateResolver;
    templates?: Record<string, string>;
    defaultTemplate?: string;
    templateMacros?: Record<string, (d: any) => string>;
}
/**
 * @internal
 */
export declare const ATTRIBUTE_CONTEXT = "context";
/**
 * @internal
 */
export declare const ATTRIBUTE_LOOKUP = "lookup";
/**
 * @internal
 */
export declare const ATTRIBUTE_DEFAULT = "default";
/**
 * @internal
 */
export declare const TYPE_ELEMENT = "element";
/**
 * @internal
 */
export declare const TYPE_TEXT = "text";
/**
 * @internal
 */
export declare const TYPE_TMPL = "tmpl";
/**
 * @internal
 */
export declare const TYPE_EACH = "each";
/**
 * @internal
 */
export declare const TYPE_IF = "if";
/**
 * @internal
 */
export declare const TYPE_ROOT = "root";
/**
 * @internal
 */
export declare const ATTRIBUTE_CLASS = "class";
/**
 * @internal
 */
export declare const ATTRIBUTE_STYLE = "style";
/**
 * @internal
 */
export declare const PLACEHOLDER_VALUE = "$value";
/**
 * @internal
 */
export declare const PLACEHOLDER_KEY = "$key";
/**
 * @internal
 */
export declare const TYPE_ATTRIBUTE = "attribute";
/**
 * @internal
 */
export interface FragmentFacade {
    toString(): string;
    appendChild(el: TextNodeFacade | ElementFacade | CommentFacade): void;
    childNodes: ArrayLike<SupportedElement>;
}
/**
 * @internal
 */
export interface ElementFacade {
    childNodes: Array<ElementFacade | TextNodeFacade | CommentFacade>;
    getAttribute(name: string): string;
    setAttributeNS(ns: string, name: string, value: string): void;
    setAttribute(name: string, value: string): void;
    toString(): string;
    appendChild(el: TextNodeFacade | ElementFacade | FragmentFacade | CommentFacade): void;
    removeChild(el: TextNodeFacade | ElementFacade): void;
    parentElement: ElementFacade;
    after(el: TextNodeFacade | ElementFacade): void;
    before(el: TextNodeFacade | ElementFacade | CommentFacade): void;
    style: Record<string, any>;
    nodeType: number;
}
/**
 * @internal
 */
export interface TextNodeFacade {
    toString(): string;
    nodeValue: string;
    parentElement: ElementFacade;
    after(el: TextNodeFacade | ElementFacade): void;
    nodeType: number;
}
/**
 * @internal
 */
export interface CommentFacade {
    before(el: TextNodeFacade | ElementFacade | CommentFacade | FragmentFacade): void;
    nodeType: number;
}
/**
 * @internal
 */
export declare type SupportedElement = ElementFacade | TextNodeFacade | CommentFacade;
