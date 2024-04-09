import { FakeElement } from "./fake-dom";
import { Recado } from "./core";
import { CommentFacade, ElementFacade, FragmentFacade, TextNodeFacade } from "./defs";
/**
 * @internal
 */
export declare class HeadlessRecado extends Recado {
    _getDefaultTemplateResolver(): (id: string) => string;
    ce(tag: string): ElementFacade;
    cf(): FragmentFacade;
    ctn(value: string): TextNodeFacade;
    cc(content: string): CommentFacade;
    removeElement(e: FakeElement): void;
    removeTextNode(e: TextNodeFacade): void;
}
