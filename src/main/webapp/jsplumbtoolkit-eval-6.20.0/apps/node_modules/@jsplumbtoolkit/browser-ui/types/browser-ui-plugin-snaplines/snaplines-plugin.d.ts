import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { Surface } from "../browser-ui/surface";
import { PanZoom } from "../browser-ui/pan-zoom";
import { ManagedElement } from "../ui-core/core/core";
import { jsPlumbDOMElement } from "../ui-core/browser-ui-renderer/element-facade";
/**
 * Options for the snaplines plugin.
 * @public
 */
export interface SnaplinesPluginOptions extends SurfacePluginOptions {
    /**
     * The tolerance either side of a snapline inside which an element must be before the snapline is activated.
     * Defaults to 10 pixels (either side of the line).
     */
    tolerance?: number;
    /**
     * Whether or not to show center snaplines. Defaults to true.
     */
    showCenters?: boolean;
    /**
     * Whether or not to show edge snaplines. Defaults to true.
     */
    showEdges?: boolean;
    /**
     * Defaults to true. If false, you can start the plugin in disabled mode.
     */
    enabled?: boolean;
}
declare const LEFT = "left";
declare const RIGHT = "right";
declare const TOP = "top";
declare const BOTTOM = "bottom";
declare const CENTER = "center";
declare const HORIZONTAL = "h";
declare const VERTICAL = "v";
interface SnapRange {
    start: number;
    end: number;
    objId: string;
    line: jsPlumbDOMElement;
    el: jsPlumbDOMElement;
    orientation: typeof HORIZONTAL | typeof VERTICAL;
}
interface VerticalSnapRange extends SnapRange {
    position: typeof TOP | typeof CENTER | typeof BOTTOM;
}
interface HorizontalSnapRange extends SnapRange {
    position: typeof LEFT | typeof CENTER | typeof RIGHT;
}
/**
 * Assigned to both horizontal and vertical snaplines when active
 * @public
 */
export declare const CLASS_SNAPLINE = "jtk-snapline";
/**
 * Assigned to vertical snaplines when active
 * @public
 */
export declare const CLASS_SNAPLINE_VERTICAL = "jtk-snapline-vertical";
/**
 * Assigned to horizontal snaplines when active
 * @public
 */
export declare const CLASS_SNAPLINE_HORIZONTAL = "jtk-snapline-horizontal";
/**
 * Assigned to both horizontal and vertical snaplines when the elements are exactly aligned
 * @public
 */
export declare const CLASS_SNAPLINE_EXACT = "jtk-snapline-exact";
/**
 * Assigned to an element attached to an active snapline
 * @public
 */
export declare const CLASS_SNAPLINE_ACTIVE = "jtk-snapline-active";
/**
 * Assigned to an element attached to an active snapline and the elements on the snapline are exactly aligned
 * @public
 */
export declare const CLASS_SNAPLINE_ACTIVE_EXACT = "jtk-snapline-active-exact";
/**
 * Shows snaplines when objects are being dragged.
 * @public
 */
export declare class SnaplinesPlugin implements SurfacePlugin {
    static type: string;
    /** @internal */
    surface: Surface;
    /** @internal */
    panZoom: PanZoom;
    /** @internal */
    tolerance: number;
    /** @internal */
    showCenters: boolean;
    /** @internal */
    showEdges: boolean;
    /** @internal */
    verticalRanges: Array<VerticalSnapRange>;
    /** @internal */
    horizontalRanges: Array<HorizontalSnapRange>;
    /** @internal */
    selectedRanges: Array<SnapRange>;
    /** @internal */
    focus: ManagedElement<Element>;
    private enabled;
    setEnabled(e: boolean): void;
    /**
     * @internal
     * @param surface
     * @param options
     */
    initialise(surface: Surface, options: SnaplinesPluginOptions & InternalSurfacePluginOptions): boolean;
    private _activateRange;
    private _clearSelectedRanges;
    private _createHorizontal;
    private _createVertical;
    /**
     * @internal
     */
    destroy(): void;
    /**
     * @internal
     */
    reset(): void;
}
export {};
