import { AbstractEntry } from './abstract-entry';
import { Recado } from "./core";
/**
 * @internal
 */
export declare class CommentEntry extends AbstractEntry {
    type: string;
    comment: string;
    constructor(comment: string, instance: Recado);
}
