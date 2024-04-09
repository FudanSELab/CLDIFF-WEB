import { Recado } from "./core";
import { AbstractEntry } from './abstract-entry';
import { ParsedExpression } from "./expressions";
/**
 * @internal
 * @param d
 * @param attributesRe
 */
export declare function parseAttributes(d: string, attributesRe: RegExp): Array<string>;
/**
 * @internal
 * @param a
 */
export declare function peek<T>(a: Array<T>): T;
/**
 * @internal
 * @param stack
 */
export declare function isLoopPresent(stack: ParseStack): boolean;
/**
 * @internal
 */
export declare type AttributeParseResult = {
    el: string;
    atts: Record<string, string>;
    bindings: Record<string, any>;
};
/**
 * eg [ "$\{sourceExpression\}", "sourceExpression" ] - an array with the original source, and then the expression that has been extracted by stripping the delimiters.
 * @internal
*/
export declare type BindingExpression = [string, string];
/**
 * @internal
 */
export declare type Binding = {
    w: string;
    expressions: Array<BindingExpression>;
    id: string;
};
/**
 * add a variable expansion binding.
 * @param bindingId
 * @param match
 * @param entry
 * @param predicate
 * @param instance
 * @internal
 */
export declare function _addBinding(bindingId: string, match: string, entry: any, predicate: any, instance: Recado): string;
/**
 * Register, and expand a binding for, the given attribute.
 * @param id
 * @param value
 * @param output
 * @param predicate
 * @param instance
 * @internal
 */
export declare function _bindOneAtt(id: string, value: string, output: AttributeParseResult, predicate: any, instance: Recado): void;
/**
 * @internal
 * @param el
 * @param instance
 */
export declare function parseAtts(el: string, instance: Recado): AttributeParseResult;
/**
 * @internal
 */
export declare type ParseStack = Array<AbstractEntry>;
/**
 * A binding that has been compiled into an expression AST.
 * @internal
 */
export interface CompiledBinding {
    id: string;
    name: string;
    expressions: Array<{
        source: string;
        expression: ParsedExpression;
    }>;
}
