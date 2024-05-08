import { Size } from "../ui-core/util/util";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
/**
 * Options for a Dialogs instance.
 * @public
 */
export interface DialogsOptions {
    /**
     * Selector identifying dialog elements. If not provided, the value '.jtk-dialog' is used by default.
     */
    selector?: string;
    /**
     * Optional object of button labels. See documentation.
     */
    labels?: Record<string, string>;
    /**
     * Optional object of global callbacks, keyed by event id.
     */
    globals?: Record<string, Function>;
    /**
     * Optional object containing dialogs. Use this instead of providing a selector if you wish to supply dialog information via JS and not as templates in the HTML Each entry is in the form {template:string, title:string, cancelable:boolean}
     */
    dialogs?: Record<string, {
        template: string;
        title: string;
        cancelable: boolean;
    }>;
}
/**
 * Defines the function called when a user commits a dialog.
 * @public
 */
export declare type CommitFunction = (data: Record<string, any>) => any;
/**
 * Defines the function called when a user cancels a dialog.
 * @public
 */
export declare type CancelFunction = () => any;
/**
 * Defines the callback invoked when a dialog has opened
 * @public
 */
export declare type OpenFunction = (el: HTMLElement) => any;
/**
 * Defines the interceptor invoked prior to a user closing
 * a dialog, to allow you to allow or reject the operation
 * @public
 */
export declare type MaybeCloseFunction = (data: any) => boolean;
/**
 * Defines the function invoked after a dialog has closed.
 * @public
 */
export declare type CloseFunction = () => any;
/**
 * Defines the allowed options to the `show` method.
 * @public
 */
export interface ShowOptions {
    /** @internal */
    id: string;
    /**
     * Data to bind to the dialog.
     */
    data?: Record<string, any>;
    /**
     * Handler for when the user presses OK
     */
    onOK?: CommitFunction;
    /**
     * Handler for when the user presses Cancel.
     */
    onCancel?: CancelFunction;
    /**
     * Callback invoked after the dialog has been displayed.
     */
    onOpen?: OpenFunction;
    /**
     * Interceptor that can be used to prevent dialog from being closed (by returning false).
     */
    onMaybeClose?: MaybeCloseFunction;
    /**
     * Callback invoked after the dialog has been closed.
     */
    onClose?: CloseFunction;
    /**
     * If true, reposition the dialogs when a scroll or resize event has occurred.
     */
    reposition?: boolean;
    /**
     * "top" or "bottom" - where to show the dialog in the viewport. Defaults to "top".
     */
    position?: string;
    /**
     * parent element for dialog elements. Defaults to document body.
     */
    container?: string | Element;
    /**
     * Optional title for the dialog.
     */
    title?: string;
    /**
     * Optional message to show in the dialog.
     */
    msg?: string;
    /**
     * If true (which is the default), an enter keypress on an input field, or a ctrl+enter keypress on a textarea, will close
     * the dialog as if the user had pressed OK.
     */
    autoCommit?: boolean;
}
interface DialogsGlobals {
    onCancel?: CancelFunction;
    onClose?: CloseFunction;
    onMaybeClosed?: MaybeCloseFunction;
    onOK?: CommitFunction;
    onOpen?: OpenFunction;
}
/**
 * Simple dialog library. Created for use in the Toolkit demonstrations.
 */
export declare abstract class DialogsBase {
    eventManager: EventManager;
    cache: Record<string, {
        content: string;
        title: string;
        cancelable: boolean;
        el?: any;
    }>;
    current: any;
    underlay: any;
    overlay: HTMLElement;
    title: any;
    content: any;
    buttons: any;
    onOK: CommitFunction;
    onCancel: CancelFunction;
    onOpen: OpenFunction;
    onMaybeClose: MaybeCloseFunction;
    onClose: CloseFunction;
    btnOk: any;
    btnCancel: any;
    labels: Record<string, any>;
    container: HTMLElement;
    visible: boolean;
    globals: DialogsGlobals;
    reposition: boolean;
    templates: Record<string, string>;
    _positionOverlayListener: EventListenerObject;
    _positioners: {
        x: (docElem: any, isBody: boolean, s: Size) => void;
        y: (docElem: any, isBody: boolean, s: Size) => void;
    };
    /**
     * Initialize all the dialogs found on the page.
     * @param params Options for the dialogs instance.
     */
    constructor(params: DialogsOptions);
    protected abstract render(templateId: string, data: Record<string, any>): any;
    private _positionOverlay;
    private _resolveContainer;
    private _setCurrent;
    private keyListener;
    private _createButtons;
    private _cleanupButtons;
    /**
     * Show the dialog with the given id, optionally rendering it with some provided data.
     * @param params Method parameters
     */
    show(params: ShowOptions): void;
    /**
     * Hide the current dialog as if the cancel button was pressed.
     */
    hide(): void;
    /**
     * Clears the given set
     */
    clear(els: ArrayLike<any>, source?: any): void;
    /**
     * applies the given data object to the given element, using `jtk-att` as the match attributes
     */
    apply(data: any, el: any): void;
    /**
     * extracts a data object from the given element, using `jtk-att` as the match attributes
     */
    extract(el: any): Record<string, any>;
    _close(wasCancelled?: boolean): void;
}
export {};
