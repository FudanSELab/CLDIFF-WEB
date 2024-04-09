import { Recado } from "./core";
import { Binding, CompiledBinding } from "./parser";
/**
 * @internal
 */
export declare abstract class AbstractEntry {
    instance: Recado;
    abstract type: string;
    tag: string;
    remove: boolean;
    uuid: string;
    children: Array<AbstractEntry>;
    elements: Array<any>;
    bindings: Record<string, Binding>;
    context: string;
    compiledBindings: Record<string, CompiledBinding>;
    protected constructor(instance: Recado);
    protected _processBindings(bindings: Record<string, Binding>): void;
}
