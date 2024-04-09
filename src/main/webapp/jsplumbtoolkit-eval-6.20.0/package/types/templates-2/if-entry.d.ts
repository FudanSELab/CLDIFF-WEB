import { AttributeParseResult, ParseStack } from "./parser";
import { Recado } from "./core";
import { ElementEntry } from './element-entry';
import { CommentFacade, TemplateResolver } from "./defs";
import { ParsedExpression } from "./expressions";
import { IExecution } from "./executions";
/**
 * @internal
 */
export declare class IfEntry extends ElementEntry {
    type: string;
    static tag: string;
    tag: string;
    test: string;
    expression: ParsedExpression;
    constructor(data: AttributeParseResult, instance: Recado, templateResolver: TemplateResolver, stack: ParseStack, parseIdStack: Array<string>);
}
export interface IIfExecution extends IExecution {
    resolution: boolean;
    entry: IfEntry;
    type: "if";
    placeholder: CommentFacade;
}
export declare function resolveIfExecution(e: IIfExecution, templateData: Record<string, any>, expander: (e: string) => any): boolean;
