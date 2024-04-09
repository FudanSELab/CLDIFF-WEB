import { AttributeParseResult } from "./parser";
import { AbstractEntry } from './abstract-entry';
import { Recado } from "./core";
import { ElementEntry } from "./element-entry";
import { TemplateResolver } from "./defs";
import { Constructable } from "../ui-core/util/util";
/**
 * @internal
 */
export declare const Elements: {
    construct: (tag: string, ta: AttributeParseResult, instance: Recado, templateResolver: TemplateResolver, stack: Array<AbstractEntry>, parseIdStack: Array<string>) => ElementEntry;
    register: (name: string, conn: Constructable<ElementEntry>) => void;
    exists: (tag: string) => boolean;
};
