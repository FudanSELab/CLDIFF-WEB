import { Recado } from "./core";
import { AttributeParseResult, ParseStack } from "./parser";
import { AbstractEntry } from './abstract-entry';
import { TemplateResolver } from "./defs";
/**
 * @internal
 */
export declare class ElementEntry extends AbstractEntry {
    protected templateResolver: TemplateResolver;
    protected stack: ParseStack;
    protected parseIdStack: Array<string>;
    type: string;
    namespace: string;
    atts: Record<string, string>;
    custom: boolean;
    constructor(ta: AttributeParseResult, instance: Recado, templateResolver: TemplateResolver, stack: ParseStack, parseIdStack: Array<string>);
}
