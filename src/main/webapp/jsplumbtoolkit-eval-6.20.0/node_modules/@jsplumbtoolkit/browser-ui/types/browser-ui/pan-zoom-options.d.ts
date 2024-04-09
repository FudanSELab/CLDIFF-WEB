import { Background } from "./background/background";
import { Viewport } from "../ui-core/core/viewport";
import { PointXY, Size } from "../ui-core/util/util";
/**
 * Models the minimum and maximum values in an allowed zoom range. These value are expressed decimals: 0.5 means 50%,
 * for instance.
 * @public
 */
export declare type ZoomRange = [number, number];
/**
 * Axes in which the canvas can be panned - x, y, or both.
 * @public
 */
export declare enum PanAxes {
    both = "both",
    x = "x",
    y = "y"
}
/**
 * Axes in which the canvas can be panned - x, y, or both.
 */
export declare type PanAxis = keyof typeof PanAxes;
/**
 * Options for how to respond to wheel events.
 * @public
 */
export interface WheelOptions {
    /**
     * Whether or not wheel zoom is enabled. Defaults to true.
     */
    zoom?: boolean;
    /**
     * Optional function to call to check if wheel zooming should be enabled for the current event target.
     * @param e Mouse event for the wheel
     */
    filter?: (e: MouseEvent) => boolean;
    /**
     * If true, the "meta" key (CMD on Mac, Ctrl on windows/linux) must be pressed in order for wheel zoom to
     * operate. This can be useful if your UI fills the screen in one or more axes and your users would not be able
     * to scroll past the Surface widget.
     */
    useMetaKey?: boolean;
    direction?: number;
    /**
     * How sensitive the wheel should be.
     */
    sensitivity?: number;
    /**
     * Whether or not to pan the display when the wheel is moved. Defaults to false.
     */
    pan?: boolean;
    /**
     * For use with pan:true - defines the axes in which the widget will pan in response to the wheel
     */
    axis?: PanAxis;
    /**
     * Defaults to false. If true, the zoom direction is reversed: wheel up zooms out, and wheel down zooms in.
     */
    reverse?: boolean;
}
/**
 * Options for the PanZoom widget. This widget is used internally by the Toolkit and is not something users of the library
 * will need to interact with.
 */
export interface PanZoomOptions {
    /**
     * The element to apply pan/zoom to.
     */
    canvasElement: Element;
    /**
     * The element that will act as the viewport for the canvas.
     */
    viewportElement: Element;
    /**
     * A function that can return the x,y location of the given element, relative to the origin of the canvas the pan zoom
     * is controlling.
     * @param el
     */
    getOffset: (el: Element) => PointXY;
    /**
     * A function that can return the x,y location of the given element, relative to the document origin
     * @param el
     */
    getOffsetRelativeToRoot: (el: Element) => PointXY;
    /**
     * Gets the size of some element
     */
    getSize: (el: Element) => Size;
    /**
     * Initial zoom for the widget. Defaults to 1.
     */
    zoom?: number;
    /**
     * Zoom range for the widget. Defaults to [0.05, 3].
     */
    zoomRange?: ZoomRange;
    /**
     * Whether to clamp when panning such that there is always content visible. Defaults to true.
     */
    clamp?: boolean;
    /**
     * Whether to clamp when zooming such that there is always content visible. Defaults to true.
     */
    clampZoom?: boolean;
    /**
     * Whether or not to clamp to the background image. This flag means the widget will always ensure at least some
     * of the background is visible. See `clampToBackgroundExtents` for a variant of this. Defaults to false.
     */
    clampToBackground?: boolean;
    /**
     * Clamps movement so that when zoomed out, the background image always fills the viewport. Defaults to false.
     */
    clampToBackgroundExtents?: boolean;
    /**
     * How far, in pixels, to pan on pan nudge. Defaults to 50 pixels.
     */
    panDistance?: number;
    /**
     * Whether or not pan is enabled. Defaults to true.
     */
    enablePan?: boolean;
    /**
     * Optional function which is called at the start of panning and can return false
     * to reject pan starting.
     */
    panFilter?: (el: Element) => boolean;
    /**
     * Defaults to false. When true, user must hold down meta key (ctrl on windows) to pan.
     */
    panWithMetaKey?: boolean;
    /**
     * Enable animations for panning. Defaults to true.
     */
    enableAnimation?: boolean;
    directRender?: boolean;
    viewport: Viewport<{
        E: Element;
    }>;
    /**
     * Function the widget can use to derive an ID for the given element.
     * @param e
     */
    idFunction: (e: Element) => string;
    /**
     * Options for the wheel.
     */
    wheel: WheelOptions;
    /**
     * Optional map of event handlers
     */
    events?: {
        /**
         * Optional function callback for when zoom changes.
         */
        zoom?: Function;
        /**
         * Optional function callback for when pan changes.
         */
        pan?: Function;
        /**
         * Optional function callback for mouseup event.
         */
        mouseup?: Function;
        /**
         * Optional function callback for mousedown event.
         */
        mousedown?: Function;
        /**
         * Optional interceptor for zoom. Returning false prevents zoom from occurring.
         */
        maybeZoom?: Function;
        /**
         * Optional function callback for mousemove event.
         */
        mousemove?: Function;
        /**
         * Optional function callback for transform origin change. This is given the [x,y] (in percent) of the new
         * origin, and the [left, top] (in absolute values) of the canvas.
         */
        transformOrigin?: Function;
    };
    /**
     * Useful for development: set this to false if you don't want the widget to consume context menu clicks.
     */
    consumeRightClick?: boolean;
    /**
     * NOT IMPLEMENTED. This is a placeholder for possible future functionality, which will mean that the lower zoom
     * bound refers to a multiple of the content bounds, not the viewport.
     */
    smartMinimumZoom?: boolean;
    /**
     * Whether or not the widget is enabled, ie. responding to mouse input. Defaults to true.
     */
    enabled?: boolean;
    /**
     * Optional filter that will be called on down event, with the event target and the event. Returning true
     * from this function means the widget should respond to the event.
     */
    filter?: Function;
    /**
     * Optional background. Can also be set via setBackground(..)
     */
    background?: Background;
}
