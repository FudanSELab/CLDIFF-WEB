/**
 * @internal
 */
export declare const DASHSTYLE = "dashstyle";
/**
 * @internal
 */
export declare const FILL = "fill";
/**
 * @internal
 */
export declare const STROKE = "stroke";
/**
 * @internal
 */
export declare const STROKE_WIDTH = "stroke-width";
/**
 * @internal
 */
export declare const LINE_WIDTH = "strokeWidth";
/**
 * @internal
 */
export declare const ELEMENT_SVG = "svg";
/**
 * @internal
 */
export declare const ELEMENT_DEFS = "defs";
/**
 * @internal
 */
export declare const ELEMENT_PATH = "path";
/**
 * @internal
 */
export declare const ELEMENT_TEXT = "text";
/**
 * @internal
 */
export declare const ELEMENT_RECT = "rect";
/**
 * @internal
 */
export declare const ELEMENT_G = "g";
/**
 * @internal
 */
export declare const ATTRIBUTE_VERSION = "version";
/**
 * @internal
 */
export declare const ATTRIBUTE_XMLNS = "xmlns";
/**
 * @internal
 */
export declare const ATTRIBUTE_FILL = "fill";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_DASHARRAY = "stroke-dasharray";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_LINEJOIN = "stroke-linejoin";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_LINECAP = "stroke-linecap";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_MITERLIMIT = "stroke-miterlimit";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_DASHOFFSET = "stroke-dashoffset";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_OPACITY = "stroke-opacity";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE = "stroke";
/**
 * @internal
 */
export declare const ATTRIBUTE_STROKE_WIDTH = "stroke-width";
/**
 * @internal
 */
export declare const ATTRIBUTE_VECTOR_EFFECT = "vector-effect";
/**
 * @internal
 */
export declare const ATTRIBUTE_VALUE_NON_SCALING_STROKE = "non-scaling-stroke";
/**
 * @internal
 */
export declare const ATTRIBUTE_TEXT_ANCHOR = "text-anchor";
export declare type ElementAttributes = Record<string, string | number>;
export declare const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export declare const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
export declare const XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
export declare function _attr(node: SVGElement, attributes: ElementAttributes): void;
export declare function _node(name: string, attributes?: ElementAttributes): SVGElement;
export declare function _pos(d: [number, number]): string;
export declare function _applyStyles(node: SVGElement, style: any): void;
export declare function _appendAtIndex(svg: SVGElement, path: SVGElement, idx: number): void;
export declare function _size(svg: SVGElement, x: number, y: number, w: number, h: number): void;
export declare const svg: {
    attr: typeof _attr;
    node: typeof _node;
};
