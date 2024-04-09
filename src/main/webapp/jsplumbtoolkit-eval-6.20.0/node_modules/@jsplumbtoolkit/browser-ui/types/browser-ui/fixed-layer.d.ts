import { PanZoom } from "./pan-zoom";
import { jsPlumbDOMElement } from "../ui-core/browser-ui-renderer/element-facade";
import { PointXY } from "../ui-core/util/util";
declare type FixedElement = {
    el: jsPlumbDOMElement;
    left: boolean;
    top: boolean;
    pos: PointXY;
};
declare const FixLeft = "left";
declare const FixTop = "top";
export declare type FixedElementConstraint = typeof FixLeft | typeof FixTop;
export declare type FixedElementConstraints = {
    [FixLeft]?: boolean;
    [FixTop]?: boolean;
};
/**
 * @internal
 */
export declare class FixedLayer {
    panZoom: PanZoom;
    fixedElements: Record<string, FixedElement>;
    constructor(panZoom: PanZoom);
    private _fixElements;
    pan(): void;
    append(el: Element, pos: PointXY, constraints?: FixedElementConstraints): void;
    /**
     * @internal
     * @param el
     */
    remove(el: Element): void;
    destroy(): void;
}
export {};
