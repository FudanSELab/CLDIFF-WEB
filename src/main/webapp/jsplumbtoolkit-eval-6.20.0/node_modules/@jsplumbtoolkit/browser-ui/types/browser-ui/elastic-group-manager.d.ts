import { ViewportElement } from "../ui-core/core/viewport";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
import { Extents, PointXY, RectangleXY, Size } from "../ui-core/util/util";
import { UIGroup } from "../ui-core/core/group/group";
import { AbstractLayout } from "../core/layout/abstract-layout";
import { Group, Node } from "../core/model/graph";
import { UIGroupDefinition } from "./browser-ui-model";
import { Surface } from "./surface";
/**
 * @internal
 */
export declare class ElasticGroupManager {
    private surface;
    parentGroup: Group;
    private groupDef;
    allowShrinkFromOrigin: boolean;
    groupEntry: ViewportElement<BrowserElement>;
    focusPosition: RectangleXY;
    siblingEntries: Array<ViewportElement<BrowserElement>>;
    xMinEntries: Array<RectangleXY>;
    xMaxEntries: Array<RectangleXY>;
    yMinEntries: Array<RectangleXY>;
    yMaxEntries: Array<RectangleXY>;
    uiGroup: UIGroup<BrowserElement>;
    frame: SVGElement;
    layout: AbstractLayout<any>;
    uiGroupContentArea: Element;
    layoutShiftX: number;
    layoutShiftY: number;
    width: number;
    height: number;
    _rightEdgeFixed: boolean;
    _bottomEdgeFixed: boolean;
    x: number;
    y: number;
    parent: ElasticGroupManager;
    constructor(surface: Surface, focus: Node | Group, parentGroup: Group, groupDef: UIGroupDefinition, allowShrinkFromOrigin: boolean);
    /**
     * Sort the child entries in each of the four directions. The head of each array is then the furthest point in the
     * given direction.
     * @internal
     * @private
     */
    _sortEntries(): void;
    /**
     * Sets the position of the current focus, and optionally changes its size, and the recomputes.
     * @internal
     * @param p
     * @param wh
     */
    setFocusPosition(p: PointXY, wh?: Size): void;
    private _$_recompute;
    getCurrentExtents(): Extents;
    /**
     * @internal
     */
    cleanup(): void;
    /**
     * Get computed values for some group. If the given group is not managed by this manager and there is a parent manager,
     * delegate to the parent. Otherwise return null.
     * @param groupId
     * @internal
     */
    getValues(groupId: string): {
        layoutShiftX: number;
        layoutShiftY: number;
        width: number;
        height: number;
    } | null;
}
