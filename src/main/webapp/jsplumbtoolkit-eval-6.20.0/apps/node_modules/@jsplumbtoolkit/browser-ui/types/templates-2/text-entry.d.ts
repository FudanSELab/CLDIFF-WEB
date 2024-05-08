import { Recado } from "./core";
import { AbstractEntry } from './abstract-entry';
/**
 * @internal
 */
export declare type TextEntryOptions = {
    value: string;
};
/**
 * @internal
 */
export declare class TextEntry extends AbstractEntry {
    type: string;
    static TEXT_BINDING_NAME: string;
    value: string;
    constructor(options: TextEntryOptions, instance: Recado);
}
