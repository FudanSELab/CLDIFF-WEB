import { EdgeGeometryTransformer } from './transformer';
import { ClonedSet, CopyDataTransformer, PasteOptions } from "../copy-paste/copy-data";
import { Surface } from "../browser-ui/surface";
import { Clipboard } from '../copy-paste';
/**
 * Extension of paste options for use in a browser.
 * @public
 */
export interface BrowserUIPasteOptions extends PasteOptions {
    /**
     * Mouse event to use as the location for a paste.
     */
    event?: MouseEvent;
}
/**
 * A clipboard to use with a Surface widget, offering methods to copy data and to paste it.
 * @public
 */
export declare class BrowserUIClipboard extends Clipboard {
    private surface;
    transformer: EdgeGeometryTransformer;
    constructor(surface: Surface);
    /**
     * @internal
     */
    getCopyDataTransformer(): CopyDataTransformer;
    /**
     * Paste the clipboard's most recent entry, optionally removing it from the clipboard afterwards.
     * @param options - Options for the paste.
     * @public
     */
    paste(options?: BrowserUIPasteOptions): ClonedSet;
}
