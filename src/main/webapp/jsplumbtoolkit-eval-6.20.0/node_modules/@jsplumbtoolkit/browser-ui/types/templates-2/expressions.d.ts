/**
 * @internal
 */
export interface StackEntry {
    t: string;
    c: Array<StackEntry>;
    e?: string;
    v: any;
    index?: number;
}
/**
 * @internal
 */
export interface ParsedExpression {
    left: StackEntry;
    right: StackEntry;
    comparator?: string;
}
/**
 Split the expression into its terms, nesting groups as necessary. The output of this is an object of the form
 @internal
 */
export declare function parseExpression(expression: string): StackEntry;
/**
 * Entry point for parsing expressions.
 * @param expression
 * @internal
 */
export declare function processExpression(expression: string): ParsedExpression;
/**
 * Evaluate a parsed expression. If the parsed expression has a comparator defined, the left and right expressions are
 * evaluated separately, and then compared according to the comparator. Otherwise, the left expression is evaluated and its
 * value is returned.
 * @param expression
 * @param variableResolver
 * @internal
 */
export declare function evaluateExpression(expression: ParsedExpression, variableResolver: (v: string) => any, expander: (e: string) => any): any;
/**
 * Evaluate a single expression, ie. an expression that is known to not contain a comparator. This is exposed for testing
 * but is internal.
 * @param expression
 * @param variableResolver
 * @internal
 */
export declare function evaluateSingleExpression(expression: Array<StackEntry>, variableResolver: (v: string) => any, expander: (v: string) => any): any;
