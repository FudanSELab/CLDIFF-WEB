/**
 * Searches children of the given element to find elements that have a `jtk-att` set. For each of those, if the `checkValidity` method is defined,
 * this method executes it. If it returns false, this method returns false. If no elements have `checkValidity` or no `checkValidity()` call
 * returns false, this method returns true.
 *
 * `checkValidity` is a method defined in input elements and textareas, when a `pattern` is defined on the element (or if it is marked
 * required and has no valuer set)
 * @param el
 * @internal
 */
export declare function checkValidity(el: HTMLElement): boolean;
/**
 * Extracts a dataset from the given element by finding child elements that have a `jtk-att` attribute set, and extracting from those elements
 * their value. When the same `jtk-att` value appears more than once as a child of `el`, the values are stored in an array for that field.
 * @param el - Element to extract values from.
 * @param unresolvedElementGetter - Optional function to use when an element with an unknown tag has a `jtk-att` declared on it. This function is given the element and whatever it
 * returns - even null - will be set on the outgoing data.
 * @internal
 */
export declare function extract(el: HTMLElement, unresolvedElementGetter?: (el: Element) => any): Record<string, any>;
/**
 * Extract the value represented by the given element.
 * @param el - Element to extract value from.
 * @param unresolvedElementGetter- Optional function to use when an element with an unknown tag has a `jtk-att` declared on it. This function is given the element and whatever it
 * returns - even null - will be the return value.
 * @internal
 */
export declare function extractValueFromElement(el: HTMLElement, unresolvedElementGetter?: (el: Element) => any): any;
/**
 * Apply the given object to the given DOM element. This method will find all child elements of `el` that have a `jtk-att`
 * attribute set, and then attempt to set the value of any found DOM element with a value extracted from `dataset`.
 * @param dataset
 * @param el
 * @param autoCommitHandler
 * @internal
 */
export declare function apply(dataset: Record<string, any>, el: any, autoCommitHandler?: (e: Element) => any, unresolvedElementSetter?: (e: Element, value: any) => any): void;
/**
 * @internal
 */
export declare function clear(els: ArrayLike<any>, source?: any): void;
