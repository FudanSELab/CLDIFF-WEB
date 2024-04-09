import { ElementDragHandler } from "./element-drag-handler";
import { GhostProxyingDragHandler } from "./drag-manager";
import { BrowserJsPlumbInstance } from "./browser-jsplumb-instance";
import { jsPlumbDOMElement } from './element-facade';
import { ConstrainFunction, Drag } from "./collicat";
import { DragSelection } from "./drag-selection";
import { UIGroup } from "../core/group/group";
import { ViewportElement } from "../core/viewport";
export declare class GroupDragHandler extends ElementDragHandler implements GhostProxyingDragHandler {
    protected instance: BrowserJsPlumbInstance;
    protected dragSelection: DragSelection;
    selector: string;
    doRevalidate: (el: jsPlumbDOMElement) => void;
    currentGroup: UIGroup;
    currentChildPositions: Map<string, ViewportElement<Element>>;
    currentGroupEntry: ViewportElement<Element>;
    constructor(instance: BrowserJsPlumbInstance, dragSelection: DragSelection);
    reset(): void;
    private _revalidate;
    init(drag: Drag): void;
    useGhostProxy(container: any, dragEl: Element): boolean;
    /**
     * Makes the element that acts as a ghost proxy.
     * @param el
     */
    makeGhostProxy(el: Element): Element;
    getConstrainFunction(): ConstrainFunction;
}
