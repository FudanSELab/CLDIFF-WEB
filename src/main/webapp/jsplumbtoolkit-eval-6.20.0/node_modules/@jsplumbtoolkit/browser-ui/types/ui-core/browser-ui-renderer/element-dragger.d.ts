import { ConstrainFunction, ContainmentType } from "./collicat";
/**
 * Options for an ElementDragger
 * @public
 */
export interface ElementDraggerOptions {
    /**
     * CSS3 filter identifying parts of the elements that should not allow drag
     */
    filter?: string;
    /**
     * Function to constrain movement of the elements.
     */
    constrain?: ConstrainFunction;
    /**
     * Shortcut for some basic constrain scenarios - constrain to parent, constrain entirely to parent, dont allow movement into negative axes.
     */
    containment?: ContainmentType;
    /**
     * If `containment` is set, you can provide a value for padding here. Currently the default is 5 pixels.
     */
    containmentPadding?: number;
}
/**
 * A helper class that uses the Toolkit's drag management classes to offer a means to
 * make arbitrary DOM elements draggable.
 *
 * You can pass a single element or an array of elements to the constructor.
 *
 * @public
 */
export declare class ElementDragger {
    private collicat;
    private drags;
    constructor(el: ArrayLike<Element> | Element, options?: ElementDraggerOptions);
    /**
     * Unregister all event handlers etc and release resources.
     */
    destroy(): void;
}
