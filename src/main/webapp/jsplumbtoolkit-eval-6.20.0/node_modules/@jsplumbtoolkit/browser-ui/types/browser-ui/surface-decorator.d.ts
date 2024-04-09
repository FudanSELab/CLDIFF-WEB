import { Decorator } from "./decorators";
import { Surface } from "./surface";
export declare type FullDecoratorSpec = {
    type: string;
    options: Record<string, any>;
};
export declare type DecoratorSpec = string | FullDecoratorSpec;
/**
 * @internal
 * @param dlist
 * @param adapter
 * @param container
 */
export declare function _initialiseDecorators(dlist: Array<DecoratorSpec | Decorator>, adapter: Surface, container: Element): Array<Decorator>;
