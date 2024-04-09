import { PaintStyle } from "../common/paint-style";
import { Extents, PointXY } from "../util/util";
import { Overlay } from "../core/overlay/overlay";
import { Component } from "../core/component/component";
import { LabelOverlay } from "../core/overlay/label-overlay";
/**
 * @internal
 * @since 6.6.0
 */
export interface SvgOverlayPaintParams extends Extents, PaintStyle {
    component: Component;
    d?: any;
}
/**
 * @internal
 * @since 6.6.0
 */
export interface SVGLabelOverlayPaintParams {
    d: {
        loc: PointXY;
    };
}
/**
 * @internal
 * @since 6.6.0
 */
export declare function paintSVGPathOverlay(o: SVGElementOverlay, path: string, params: SvgOverlayPaintParams, extents: Extents): void;
/**
 * @internal
 * @since 6.6.0
 */
export declare function ensureSVGPathElement(o: SVGElementOverlay): SVGElement;
/**
 * @internal
 * @since 6.6.0
 */
export declare function ensureSVGLabelElements(o: SVGLabelOverlay): SVGElement;
/**
 * @internal
 * @since 6.6.0
 */
export declare function paintSVGLabelOverlay(o: SVGLabelOverlay, params: SVGLabelOverlayPaintParams, extents: Extents): void;
/**
 * @internal
 * @since 6.6.0
 */
export declare function destroySVGOverlay(o: SVGElementOverlay, force?: boolean): void;
export declare abstract class SVGElementOverlay extends Overlay {
    contentElement: SVGElement;
    backgroundContentElement: SVGElement;
}
export interface SVGLabelOverlay extends SVGElementOverlay, LabelOverlay {
    labelText: string;
    textElement: SVGTextElement;
    bgElement: SVGRectElement;
}
