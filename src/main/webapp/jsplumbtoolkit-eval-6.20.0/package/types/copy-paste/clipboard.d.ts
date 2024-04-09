import { ClonedSet, CopyDataTransformer, PasteOptions } from "./copy-data";
import { JsPlumbToolkit } from "../core/toolkit";
import { Base } from "../core/model/graph";
import { Path } from "../core/model/path";
import { Selection } from '../core/selection';
/**
 * Offers methods to copy and paste data from/to a Toolkit instance. This class is abstract and is subclassed to
 * concrete implementations by UI specific packages, of which currently there is only `@jsplumbtoolkit/browser-ui-copy-paste`.
 * In the future if alternate renderers are written for the Toolkit it is expected that an implementation of the Clipboard
 * would be one of the inclusions.
 * @public
 */
export declare abstract class Clipboard {
    toolkit: JsPlumbToolkit;
    private stack;
    protected constructor(toolkit: JsPlumbToolkit);
    /**
     * Copy some set of objects into the clipboard.
     * @param obj - The object, or objects, to copy in to the clipboard.
     * @public
     */
    copy(obj: Base | Array<Base> | Path | Selection): void;
    /**
     * Paste the clipboard's most recent entry, optionally removing it from the clipboard afterwards.
     * @param options - Options for the paste.
     * @public
     */
    paste(options?: PasteOptions): ClonedSet;
    /**
     * Removes all entries from the clipboard.
     * @public
     */
    clear(): void;
    /**
     * Copies the contents of the associated Toolkit instance's current selection into the clipboard.
     * @public
     */
    copyCurrentSelection(): void;
    /**
     * Copies and pastes the contents of the associated Toolkit instance's current selection into the clipboard.
     * This method is equivalent to calling `copyCurrentSelection()` first and then calling `paste(..)`.
     * @param options - Options for the paste.
     * @public
     */
    pasteCurrentSelection(options?: PasteOptions): ClonedSet;
    /**
     * @internal
     */
    abstract getCopyDataTransformer(): CopyDataTransformer;
}
