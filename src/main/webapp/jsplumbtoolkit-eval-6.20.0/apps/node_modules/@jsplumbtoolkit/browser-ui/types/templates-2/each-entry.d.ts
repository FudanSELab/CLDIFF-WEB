import { ElementEntry } from "./element-entry";
import { Recado } from "./core";
import { AttributeParseResult, ParseStack } from "./parser";
import { TemplateResolver } from "./defs";
import { UpdateResult, IExecution, IRootExecution, IEachExecution } from "./executions";
/**
 * An `r-each` tag.
 * @internal
 */
export declare class EachEntry extends ElementEntry {
    key: string;
    type: string;
    static tag: string;
    constructor(data: AttributeParseResult, instance: Recado, templateResolver: TemplateResolver, stack: ParseStack, parseIdStack: Array<string>);
}
/**
 * @internal
 */
export declare function addEntryToEachExecution(e: IEachExecution, key: string, execution: IExecution): void;
/**
 * @internal
 */
export declare function addNewExecutionToEachExecution(ie: IEachExecution, execution: IRootExecution, key: string, updateResult: UpdateResult): void;
