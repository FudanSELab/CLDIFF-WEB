/**
 * @internal
 */
import { CommentFacade, ElementFacade, FragmentFacade, TextNodeFacade } from "./defs";
export declare class Fakement implements FragmentFacade {
    childNodes: Array<ElementFacade | TextNodeFacade | CommentFacade>;
    constructor();
    removeChild(n: FakeElement): void;
    appendChild(n: ElementFacade | TextNodeFacade): void;
    insertAfter(ref: TextNodeFacade | ElementFacade, element: TextNodeFacade | ElementFacade): void;
    insertBefore(ref: CommentFacade | ElementFacade, element: TextNodeFacade | ElementFacade): void;
    toString(): string;
}
export declare class FakeElement extends Fakement implements ElementFacade {
    nodeType: number;
    parentElement: FakeElement;
    tag: string;
    atts: Record<string, string>;
    style: Record<string, any>;
    constructor(tag: string);
    getAttribute(name: string): string;
    setAttributeNS(ns: string, name: string, value: string): void;
    setAttribute(name: string, value: string): void;
    toString(): string;
    after(element: TextNodeFacade | ElementFacade): void;
    before(element: TextNodeFacade | ElementFacade): void;
}
export declare class FakeTextNode implements TextNodeFacade {
    nodeValue: string;
    parentElement: FakeElement;
    constructor(nodeValue: string);
    toString(): string;
    after(element: TextNodeFacade | ElementFacade): void;
    nodeType: number;
}
export declare class FakeComment implements CommentFacade {
    nodeValue: string;
    parentElement: FakeElement;
    constructor(nodeValue: string);
    before(element: TextNodeFacade | ElementFacade): void;
    nodeType: number;
}
