import { BindingResult, Recado } from "./core";
import { AbstractEntry } from './abstract-entry';
import { CommentFacade, ElementFacade, FragmentFacade, SupportedElement, TextNodeFacade } from "./defs";
import { TextEntry } from './text-entry';
import { EachEntry } from './each-entry';
import { CustomTag } from "./custom-tag";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
/**
 * @internal
 */
export interface IExecution {
    id: string;
    children: Array<IExecution>;
    el?: ElementFacade | TextNodeFacade;
    updaters?: Array<Function>;
    type: string;
    entry: AbstractEntry;
}
/**
 * @internal
 */
export interface IExecutionWithBindings extends IExecution {
    bindings: Record<string, BindingResult>;
}
/**
 * @internal
 */
export interface IElementExecution extends IExecutionWithBindings {
    el: ElementFacade;
    type: "element";
}
/**
 * @internal
 */
export interface ITextNodeExecution extends IExecutionWithBindings {
    el: TextNodeFacade;
    entry: TextEntry;
    type: "text";
}
/**
 * @internal
 */
export interface IEachExecution extends IExecution {
    entryMap: Record<string, Array<IExecution>>;
    type: "each";
    placeholder: CommentFacade;
    entry: EachEntry;
}
/**
 * @internal
 */
export interface ITmplExecution extends IExecution {
    placeholder: CommentFacade;
    type: "tmpl";
}
/**
 * @internal
 */
export interface IRootExecution extends IExecutionWithBindings {
    type: "root";
    fragment: FragmentFacade;
}
/**
 * @internal
 */
export declare function setElementBindingResult(e: IElementExecution, name: string, value: string, isProperty: boolean): void;
/**
 * @internal
 */
export declare function setTextNodeBindingResult(e: ITextNodeExecution, value: string): void;
/**
 * @internal
 */
export declare function clearExecution(instance: Recado, e: IExecution): Array<SupportedElement>;
/**
 * @internal
 */
export declare function updateBindings(execution: IExecutionWithBindings, templateData: Record<string, any>, expander: (e: string) => any): void;
/**
 * @internal
 */
export declare type UpdateResult = {
    added: Array<{
        el: SupportedElement;
    }>;
    removed: Array<{
        el: SupportedElement;
    }>;
    elements: Array<[BrowserElement, CustomTag]>;
};
/**
 * @internal
 */
export declare function emptyUpdateResult(): UpdateResult;
