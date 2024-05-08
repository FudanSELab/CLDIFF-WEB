/**
 * Returns the position of the given element as calculated by reading its `x` and `y` attributes
 * @internal
 * @param el
 */
import { PointXY, Size } from "../util/util";
import { BrowserJsPlumbInstance } from "./browser-jsplumb-instance";
import { BrowserElement } from "./util";
/**
 * Gets the size of the element, which is calculated in various different ways depending on what sort of element is
 * passed in. This method is the one we use most often.
 * padding et
 * @param el
 * @param instance
 * @internal
 */
export declare function getElementSize(el: Element, zoom: number): Size;
/**
 * Gets the "internal" size of the element. This method is a bit niche and differs only from getElementSize in that
 * when the given element is an HTML element we use its `clientWidth` and `clientHeight` properties instead
 * of its `offsetWidth` and `offsetHeight`. For other element types - svg, g - we use the same approach as
 * that which getElementSize does for those elements.
 * @param el
 * @param instance
 * @internal
 */
export declare function getElementInternalSize(el: Element, instance: BrowserJsPlumbInstance): Size;
export declare function getPosition(el: Element): PointXY;
export declare function setPosition(el: Element, p: PointXY): void;
/**
 * Gets the size of the element, which is calculated in various different ways depending on what sort of element is
 * passed in. This method is the one we use most often.
 * padding et
 * @param el
 * @param w
 * @param h
 * @internal
 */
export declare function setElementSize(el: BrowserElement, w: number, h: number): void;
/**
 * Sets the position and size of the given element. This method is equivalent to first calling `setAbsolutePosition` and then `setSize` on
 * the given element.
 * @param element
 * @param origin
 * @param size
 */
export declare function setBoundingRect(element: BrowserElement, origin: PointXY, size: Size): void;
/**
 * Gets the size of this element, in container coordinates. Note that we divide the size values from
 * getBoundingClientRect by the current zoom, as getBoundingClientRect() returns values that
 * correspond to what the user sees.
 * @param el
 * @internal
 */
export declare function getBoundingClientRectElementSize(el: Element, zoom: number): Size;
/**
 * Gets the position of this element with respect to the container's origin, in container coordinates.
 *
 * Previously, drag handlers would use getOffset method from the underlying instance but as part of updating the code
 * to support dragging SVG elements this method, using getBoundingClientRect, has been introduced. Ideally this
 * method would be what all the positioning code uses, but there are a few edge cases, particularly
 * involving scrolling, that need to be investigated.
 *
 * Note that we divide the position coords by the current zoom, as getBoundingClientRect() returns values that
 * correspond to what the user sees.
 *
 * Note also that currently this method fails when an element is rotated, as getBoundingClientRect() returns the
 * rotated bounds. In fact "fails" is perhaps not precise: it fails at behaving the way the previous getOffset method
 * worked, but depending on the use case, it may be desirable to get the rotated bounds. Currently this method is used
 * by endpoint drag code, in which we know the elements are not rotated.
 *
 * @param el
 * @internal
 */
export declare function getElementPosition(el: Element, instance: BrowserJsPlumbInstance): {
    x: number;
    y: number;
};
/**
 * Gets the offset width and offset height of the given element. Not safe for SVG elements. This method was previously
 * exported as `size` but has been renamed in order to reflect the fact that it uses offsetWidth and offsetHeight,
 * which are not set on SVG elements.
 * @param el
 * @public
 */
export declare function getOffsetSize(el: Element): Size;
/**
 * gets the element's "client" size, that which is reported by the `clientWidth` and `clientHeight` properties.
 * @param el
 */
export declare function getClientSize(el: HTMLElement): Size;
/**
 * Gets the position of the given element as calculated by reading its offsetLeft and offsetTop properties.
 * @param el
 */
export declare function getOffsetPosition(el: any): PointXY;
export declare function setOffsetPosition(el: HTMLElement, p: PointXY): void;
export declare function getSvgXYPosition(el: Element): PointXY;
/**
 * Sets the position of the given element by writing values to its `x` and `y` attributes.
 * @param el
 * @param p
 */
export declare function setSvgXYPosition(el: Element, p: PointXY): void;
/**
 * Gets the size of an svg element by reading its `width` and `height` properties.
 * @param el
 */
export declare function getSvgWidthHeightSize(el: Element): Size;
/**
 * Returns the position of the given element as calculated by reading its `translate` property.
 * @internal
 * @param el
 */
export declare function getSvgTranslatePosition(el: SVGElement): PointXY;
export declare function setSvgTranslatePosition(el: SVGElement, p: PointXY): void;
