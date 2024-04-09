import { jsPlumbDOMElement } from './element-facade';
import { PointXY } from "../util/util";
import { BrowserElement } from "./index";
export declare function matchesSelector(el: jsPlumbDOMElement, selector: string, ctx?: Element): boolean;
/**
 * Consume the given event, using `stopPropagation()` if present or `returnValue` if not, and optionally
 * also calling `preventDefault()`.
 * @param e
 * @param doNotPreventDefault
 */
export declare function consume(e: Event, doNotPreventDefault?: boolean): void;
export declare function findParent(el: jsPlumbDOMElement, selector: string, container: Element, matchOnElementAlso: boolean): jsPlumbDOMElement;
export declare function getEventSource(e: Event): jsPlumbDOMElement;
export declare function isNodeList(el: any): el is NodeListOf<BrowserElement>;
export declare function isArrayLike(el: any): el is ArrayLike<BrowserElement>;
export declare function getClass(el: BrowserElement): string;
export declare function addClass(el: BrowserElement | NodeListOf<BrowserElement>, clazz: string): void;
export declare function hasClass(el: BrowserElement, clazz: string): boolean;
export declare function removeClass(el: BrowserElement | NodeListOf<BrowserElement>, clazz: string): void;
export declare function toggleClass(el: BrowserElement | NodeListOf<BrowserElement>, clazz: string): void;
export declare function getSelector(ctx: string | BrowserElement, spec?: string): ArrayLike<jsPlumbDOMElement>;
export declare function createElement(tag: string, style?: Record<string, any>, clazz?: string, atts?: Record<string, string>): jsPlumbDOMElement;
export declare function createElementNS(ns: string, tag: string, style?: Record<string, any>, clazz?: string, atts?: Record<string, string | number>): jsPlumbDOMElement;
/**
 * Gets the position of the given element relative to the browser viewport's origin. This method is safe for
 * both HTML and SVG elements.
 * @param el
 * @internal
 */
export declare function offsetRelativeToRoot(el: Element, doNotRound?: boolean): PointXY;
export declare enum ElementTypes {
    SVG = "SVG",
    HTML = "HTML"
}
export declare type ElementType = keyof typeof ElementTypes;
export declare function getElementType(el: Element): ElementType;
export declare function isSVGElement(el: Element): boolean;
