/**
 * CSS classes, attributes and attribute values for Dialogs.
 * @public
 */
export declare const DialogConstants: {
    Classes: {
        DIALOG: string;
        UNDERLAY: string;
        OVERLAY: string;
        TITLE: string;
        CONTENT: string;
        BUTTONS: string;
        OVERLAY_VISIBLE: string;
        BUTTON: string;
        BUTTON_OK: string;
        BUTTON_CANCEL: string;
        OVERLAY_TOP: string;
        OVERLAY_BOTTOM: string;
        OVERLAY_LEFT: string;
        OVERLAY_RIGHT: string;
        OVERLAY_X: string;
        OVERLAY_Y: string;
    };
    Attributes: {
        POSITION: string;
        AXIS: string;
        JTK_CANCEL: string;
        JTK_COMMIT: string;
        MULTIPLE: string;
        JTK: string;
        TITLE: string;
        FOCUS: string;
        TYPE: string;
        CANCEL: string;
        ID: string;
    };
    Values: {
        BLOCK: string;
        VISIBLE: string;
        HIDDEN: string;
        FIXED: string;
        ABSOLUTE: string;
        TOP: string;
        BOTTOM: string;
        X: string;
        Y: string;
        TRUE: string;
        FALSE: string;
        NONE: string;
        PX: string;
    };
    Events: {
        RESIZE: string;
        CLICK: string;
        KEYUP: string;
        SCROLL: string;
    };
    Elements: {
        BUTTON: string;
        DIV: string;
        TEXT: string;
        RADIO: string;
        CHECKBOX: string;
        SELECT: string;
        TEXTAREA: string;
        COLOR: string;
        HIDDEN: string;
        INPUT: string;
        NUMBER: string;
    };
};
/**
 * @internal
 */
export declare function attSel(att: string): string;
