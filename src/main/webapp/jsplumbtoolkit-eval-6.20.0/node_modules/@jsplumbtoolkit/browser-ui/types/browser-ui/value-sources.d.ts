import { ObjectData } from "../core/model/graph";
/**
 * Definition of some object that can extract values from something. For internal use.
 * @internal
 */
export interface ValueSource<E> {
    value(name: string, _default?: string): string;
    findDataValues(portValues: any): void;
}
/**
 * Support class for extracting attribute values from an element. For internal use.
 * @internal
 */
export declare class AttributeExtractor<E> implements ValueSource<E> {
    el: Element;
    constructor(el: Element);
    value(name: string, _default?: string): string;
    findDataValues(portValues: any): void;
}
/**
 * Support class for extracting values from an object. For internal use.
 * @internal
 */
export declare class ObjectValueExtractor implements ValueSource<ObjectData> {
    private obj;
    stripPrefix: string;
    constructor(obj: ObjectData, stripPrefix?: string);
    value(name: string, _default?: string): string;
    findDataValues(portValues: any): void;
}
