import { ElementEntry } from "./element-entry";
import { AttributeParseResult, ParseStack } from "./parser";
import { Recado } from "./core";
/**
 * @internal
 */
export declare class TmplEntry extends ElementEntry {
    templateId: string;
    lookup: string;
    default: string;
    static tag: string;
    constructor(ta: AttributeParseResult, instance: Recado, templateResolver: (id: string) => string, stack: ParseStack, parseIdStack: Array<string>);
}
