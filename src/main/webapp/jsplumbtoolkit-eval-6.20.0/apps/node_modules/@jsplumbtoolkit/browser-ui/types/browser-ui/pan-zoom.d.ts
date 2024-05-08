import { PanAxis, PanZoomOptions, ZoomRange } from './pan-zoom-options';
import { Background } from "./background/background";
import { PinchListener } from "./pinch-listener";
import { FixedElementConstraints, FixedLayer } from "./fixed-layer";
import { BoundingBox, Extents, PointXY, RectangleXY, Size } from "../ui-core/util/util";
import { jsPlumbDOMElement } from "../ui-core/browser-ui-renderer/element-facade";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
import { Viewport, ViewportElement } from "../ui-core/core/viewport";
export interface IntersectingObjectData {
    r: BoundingBox;
    id: string;
}
/**
 * Models the current bounds of a viewport, containing its left/top, width/height, padding and current zoom.
 */
export interface ViewportBounds {
    w: number;
    h: number;
    x: number;
    y: number;
    vw: number;
    vh: number;
    padding: number;
    z: number;
    zoom: number;
}
/**
 * Provides Pan/Zoom functionality. This component is not something with which users of the Toolkit are expected to
 * work directly (although in fact it is sufficiently decoupled from the Surface that it could serve as a stand-alone
 * widget for other use cases, which is something we've slated for future investigation). Each Surface widget is
 * backed by a ZoomWidget.
 * @internal
 */
export declare class PanZoom {
    canvasElement: jsPlumbDOMElement;
    viewportElement: jsPlumbDOMElement;
    private readonly _doWheelZoom;
    eventManager: EventManager;
    pinchListener: PinchListener;
    position: PointXY;
    zoom: number;
    transformOrigin: PointXY;
    panning: boolean;
    _panFilterFunction: (el: Element) => boolean;
    pinchZooming: boolean;
    zooming: boolean;
    zoomingWithWheel: boolean;
    downAt: PointXY;
    _viewportElementSize: Size;
    _canvasElementSize: Size;
    zoomRange: ZoomRange;
    zoomAtZoomStart: number;
    maximumZoomTravel: number;
    distanceAtZoomStart: number;
    lastDistance: number;
    canvasAtPanStart: PointXY;
    lastMouseX: number;
    lastMouseY: number;
    lastMovedAt: string;
    lastVelocity: number;
    lastAcceleration: number;
    onZoom: Function;
    onMaybeZoom: Function;
    onPan: Function;
    onMouseDown: Function;
    onMouseUp: Function;
    onMouseMove: Function;
    onSetTransformOrigin: Function;
    clamp: boolean;
    clampZoom: boolean;
    enablePan: boolean;
    directRender: boolean;
    enableWheelZoom: boolean;
    enableAnimation: boolean;
    panWithMetaKey: boolean;
    wheelFilter: (e: MouseEvent) => boolean;
    wheelZoomRequiresMetaKey: boolean;
    wheelDirection: number;
    wheelSensitivity: number;
    wheelPan: boolean;
    wheelPanAxis: PanAxis;
    background: PanZoomBackground;
    fixedLayer: FixedLayer;
    _mouseMove: Function;
    _mouseMoveEnd: Function;
    _mouseMoveReset: Function;
    _mouseDown: Function;
    _contextMenu: Function;
    viewport: Viewport<{
        E: Element;
    }>;
    private consumeRightClick;
    private smartMinimumZoom;
    private _renderingSuspended;
    idFunction: (e: Element) => string;
    getOffset: (el: Element) => PointXY;
    getOffsetRelativeToRoot: (el: Element) => PointXY;
    getSize: (el: Element) => Size;
    enabled: boolean;
    clampToBackground: boolean;
    clampToBackgroundExtents: boolean;
    filter: Function;
    private _suspendMap;
    constructor(params: PanZoomOptions);
    private _$_getViewportSize;
    private _$_getCanvasSize;
    private _animateToCanvasPosition;
    private _setCanvasPosition;
    private _moveCanvas;
    private _wheelPan;
    private _wheelZoom;
    private wheelPanOrZoom;
    /**
     * Sets whether or not rendering is suspended, which for the moment means that when updateBounds is
     * called, the widget doesn't sort the bounds, since we know there will be more changes to the
     * positions and/or sizes of elements.
     * @param val True to suspend rendering, false to re-enable rendering. If an update was called during the
     * time that rendering was suspended, the positions are sorted once rendering is re-enabled.
     */
    setSuspendRendering(val: boolean): void;
    private _cssAnimation;
    private _constructTransformProperty;
    private _writeTransform;
    /**
     * For browsers that support it, use an element animate to set the transform. For browsers that don't support it, just set the transform.
     * @param duration
     * @param onComplete
     * @internal
     */
    private _animateTransform;
    private _constructTransformOriginProperty;
    private _writeTransformOrigin;
    private _originHelper;
    private _setTransformHelper;
    /**
     * sets the canvas's transform-origin to the given x,y, which is a page location.
     * @param x X location in page.
     * @param y Y location in page.
     * @private
     * @internal
     */
    _setTransformOriginToPoint(x: number, y: number): void;
    /**
     * changes the transformOrigin of the canvas to be the point on the canvas at which the given event occurred, then shifts the canvas to account for this change (the user sees no shift)
     * @param e Event to use as the new transform origin.
     * @private
     * @internal
     */
    _setTransformOriginToEvent(e: Event): void;
    /**
     * Changes the transformOrigin of the canvas to be the given x,y, which is a point on the canvas.
     * @param x X location on the canvas.
     * @param y Y location on the canvas
     * @private
     * @internal
     */
    _setTransformOriginToCanvasPoint(x: number, y: number): void;
    /**
     * Calculate an allowable value for zoom from the desired value.
     * @param desiredZoom
     * @private
     */
    private _constrainZoom;
    private _zoom;
    private _zoomBy;
    private _zoomWithMappedRange;
    private _clamp;
    private _getPosition;
    private _apparentOffset;
    private _canStartPanning;
    private handlers;
    private _call;
    /**
     * Programmatically report a down event in order to kick the widget into action.
     * @param e Mouse event to use to kick things off.
     */
    private start;
    /**
     * Gets the current bounds for the pan zoom.
     * @param padding
     * @param paddingRatio
     */
    getBoundsInfo(padding?: number, paddingRatio?: number): ViewportBounds;
    isPinchZooming(): boolean;
    /**
     * Adds the given element to those that this widget is tracking.
     * @param el - Element to begin tracking.
     * @param id - Optional id of the element. This might be called from a context in which
     * the id is known already, so we can save some work.
     * @param pos - Optional location for the node.  If not provided, the position will be retrieved from a call to the DOM.
     */
    add(el: any, id?: string, pos?: PointXY, isDecoration?: boolean): void;
    suspend(el: any): void;
    isSuspended(el: any): boolean;
    restore(el: any): void;
    /**
     * Removes the given element from the list this widget is tracking. Note that this widget does
     * not remove the element from the DOM.
     * @param Selector|Element el Element to stop tracking.
     */
    remove(el: Element): void;
    /**
     * Removes all tracked elements and resets the widget.
     */
    reset(): void;
    /**
     * Zooms the display so that all the tracked elements fit inside the viewport. This method will also,
     * by default, increase the zoom if necessary - meaning the default behaviour is to adjust the zoom so that
     * the content fills the viewport. You can suppress zoom increase by setting `doNotZoomIfVisible:true` on the
     * parameters to this method.
     * @param params.padding Optional padding to leave around all elements. Defaults to 0.
     * @param params.fill Amount of the viewport to fill. By default, this method will zoom so that the content is 0.9 times the size of the viewport.
     * Aesthetically this makes for a more pleasing result than filling the viewport entirely.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotAnimate By default, the centering content step does not use animation. This is due to this method being used most often to initially setup a UI.
     * @param params.doNotZoomIfVisible If true, no action is taken if the content is currently all visible.
     * @param params.doNotFirePanEvent If true, a pan event will not be fired.
     */
    zoomToFit(params?: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
        doNotFirePanEvent?: boolean;
        padding?: number;
        fill?: number;
        doNotZoomIfVisible?: boolean;
    }): void;
    /**
     * Zooms the display so that all the tracked elements fit inside the viewport, but does not make any adjustments
     * to zoom if all the elements are currently visible (it still does center the content though).
     * @param params.padding Optional padding to leave around all elements.
     * @param params.fill Amount of the viewport to fill. By default, this method will zoom so that the content is 0.9 times the size of the viewport.
     * Aesthetically this makes for a more pleasing result than filling the viewport entirely.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotAnimate By default, the centering content step does not use animation. This is due to this method being used most often to initially setup a UI.
     */
    zoomToFitIfNecessary(params?: {
        padding?: number;
        fill?: number;
        onComplete?: Function;
        doNotAnimate?: boolean;
    }): void;
    /**
     * Zooms the display so that all the given elements fit inside the viewport.
     * @param zParams.elements List of DOM elements to zoom to.
     * @param zParams.fill A decimal indicating how much of the viewport to fill with the zoomed content. Defaults to 0.90.
     * @param zParams.doNotZoomIfVisible If true and the widget determines the entire selection is already
     * visible, the zoom will not be adjusted.
     * @param zParams.doNotAnimate=true By default the widget does not animate this operation. You can override that behaviour by setting doNotAnimate:false.
     */
    zoomToElements(zParams: {
        elements: Array<Element>;
        fill?: number;
        doNotZoomIfVisible?: boolean;
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
        doNotFirePanEvent?: boolean;
    }): void;
    /**
     * Zooms the display so that the background fits inside the viewport.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotAnimate If true, centering content will not use animation.
     */
    zoomToBackground(params: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
    }): void;
    /**
     * Sets (or clears) the filter that will be called if the widget needs to know whether to respond to an event that would
     * start a pan. By default, the widget responds to down events on the viewport or the canvas, but not on child nodes. You
     * can supply a function that the widget will call in the event that the down event did not occur on the viewport or the canvas
     * returning true from this function will cause the pan to begin.
     * @param filterFn Function to set as the filter; may be null if you wish to clear it. The function should return true if it wants to honour the down event on the given element.
     */
    setFilter(filterFn: Function): void;
    /**
     * Position the widget so the background is centered in the viewport, without changing the current zoom.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotAnimate If true, centering content will not use animation.
     */
    centerBackground(params: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
    }): void;
    /**
     * Positions the widget so that the edges of the background align with the viewport. This method is useful for
     * snapping to a corner of the background.
     * @param axes Spec for the axes to align to. This should be a space-separated string containing a value
     * for the x (allowed values `left` and `right`) and, optionally, y (allowed values `top` and `bottom`) axes. The
     * default value is `"left top"`.
     */
    alignBackground(axes: string, animationDuration?: number): void;
    /**
     * Places (using `style.left` and `style.top`) the given element at the given x,y, which is taken to
     * mean an x,y value on the canvas.  At zoom 1, with no panning, this will be the same as the given x,y value
     * relative to the viewport origin.  But once the canvas has been zoomed and panned we have to map
     * to the altered coordinates. This function also takes into account the difference between the offset of the
     * viewport in the page and the offset of the given element. It is assumed, just because of what this method
     * does, that the given element will be positioned `absolute`, but this method does nothing to ensure that.
     * @param el Element to position.
     * @param x X location on canvas to move element's left edge to.
     * @param y Y location on canvas to move element's top edge to.
     * @param xShift Optional absolute number of pixels to shift the element by in the x axis after calculating its position relative to the canvas. Typically you'd use this to place something other than the top left corner of your element at the desired location.
     * @param yShift Optional absolute number of pixels to shift the element by in the y axis after calculating its position relative to the canvas.
     * @param ensureOnScreen If true, will ensure that x and y positions are never negative.
     * @internal
     */
    positionElementAt(el: Element, x: number, y: number, xShift?: number, yShift?: number, ensureOnScreen?: boolean): void;
    /**
     * Places (using `style.left` and `style.top`) the given element at the given page x,y.  It is assumed, just because of what this method
     * does, that the given element will be positioned `absolute`, but this method does nothing to ensure that.
     * @param el - Element to position.
     * @param x - X location on canvas to move element's left edge to.
     * @param y - Y location on canvas to move element's top edge to.
     * @param xShift - Optional absolute number of pixels to shift the element by in the x axis after calculating its position relative to the canvas. Typically you'd use this to place something other than the top left corner of your element at the desired location.
     * @param yShift - Optional absolute number of pixels to shift the element by in the y axis after calculating its position relative to the canvas.
     */
    positionElementAtPageLocation(el: Element, x: number, y: number, xShift?: number, yShift?: number): void;
    /**
     * Places (using `style.left` and `style.top`) the given element at the page x,y corresponding to the given event.  It is assumed, just because of what this method
     * does, that the given element will be positioned `absolute`, but this method does nothing to ensure that.
     * @param el - Element to position.
     * @param evt - Event to position element at.
     * @param xShift - Optional absolute number of pixels to shift the element by in the x axis after calculating its position relative to the canvas. Typically you'd use this to place something other than the top left corner of your element at the desired location.
     * @param yShift - Optional absolute number of pixels to shift the element by in the y axis after calculating its position relative to the canvas.
     * @internal
     */
    positionElementAtEventLocation(el: Element, evt?: Event, xShift?: number, yShift?: number): void;
    /**
     * Zooms the component by the given increment, centered on the location at which the given event occurred.
     * @param e - Browser event
     * @param increment Amount to zoom by (a positive or negative number). If this takes the component out of the current zoom range, it will be clamped.
     * @internal
     */
    zoomToEvent(e: Event, increment: number): void;
    /**
     * Tells the widget that a relayout has occurred. If panning is
     * disabled, the widget will move the canvas element so that all
     * content is visible, and adjust the transform origin so that the ui
     * zooms from the apparent top left corner. Nothing happens as a result of
     * this method if panning is enabled.
     * @param extents Bounds information
     * @internal
     */
    relayout(extents: Extents): void;
    /**
     * Nudges the zoom by the given amount. Zoom will be clamped to the current zoom range in effect and the
     * value that was ultimately set is returned from this function.
     * @param delta Amount to change zoom by. The value you pass in here is multiplied by
     * 100 to give a percentage value: 1 is 100%, for instance, 0.05 is 5%. You can pass in negative numbers to
     * zoom out.
     * @param e Original event that caused the nudge. May be null.
     * @returns The zoom that was set. Zoom will be clamped to the allowed range.
     */
    nudgeZoom(delta: number, e?: Event): number;
    /**
     * Nudges the wheel zoom by the given amount. This function is intended for use by components that control
     * zoom via the mouse wheel, and not for general usage. See `nudgeZoom` for a more general version of this.
     * @param delta Amount to change zoom by.
     * @param e Original event that caused the nudge. May be null.
     */
    nudgeWheelZoom(delta: number, e?: Event): void;
    /**
     * Centers the tracked content inside the viewport, but does not adjust the current zoom.
     * @param params Method parameters.
     * @param params.bounds Bounds info. This is in an internal format and only used when this method is called by the widget itself. Otherwise it is calculated.
     * @param params.horizontal True by default. Indicates the content should be centered in the X axis.
     * @param params.vertical True by default. Indicates the content should be centered in the Y axis.
     * @param params.doNotAnimate If true, don't animate while centering.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotFirePanEvent If true, a pan event will not be fired.
     */
    centerContent(params?: {
        bounds?: ViewportBounds;
        horizontal?: boolean;
        vertical?: boolean;
        doNotFirePanEvent?: boolean;
        onComplete?: (p: PointXY) => any;
        doNotAnimate?: boolean;
        zoom?: number;
        animationDuration?: number;
    }): void;
    /**
     * Centers the tracked content inside the viewport horizontally, but does not adjust the current zoom.
     * @param params Method parameters.
     * @param params.bounds Bounds info. This is in an internal format and only used when this method is called by the widget itself. Otherwise it is calculated.
     * @param params.doNotAnimate If true, don't animate while centering.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotFirePanEvent If true, a pan event will not be fired.
     */
    centerContentHorizontally(params: any): void;
    /**
     * Centers the tracked content inside the viewport vertically, but does not adjust the current zoom.
     * @param params Method parameters.
     * @param params.bounds Bounds info. This is in an internal format and only used when this method is called by the widget itself. Otherwise it is calculated.
     * @param params.doNotAnimate If true, don't animate while centering.
     * @param params.onComplete Optional function to call on operation complete (centering may be animated).
     * @param params.doNotFirePanEvent If true, a pan event will not be fired.
     */
    centerContentVertically(params: any): void;
    /**
     * Centers the given element in the viewport, vertically and/or horizontally.
     * @param element Element, or element id, to center.
     * @param cparams Optional extra parameters.
     * @param cparams.horizontal Whether or not to center horizontally. Defaults to true.
     * @param cparams.vertical Whether or not to center vertically. Defaults to true.
     * @param cparams.doNotAnimate If true, animation will not be switched on for the operation.
     * @param cparams.onComplete Optional on complete callback
     */
    centerOn(element: Element, cparams?: {
        horizontal?: boolean;
        vertical?: boolean;
        doNotAnimate?: boolean;
        onComplete?: (xy: PointXY) => any;
        zoom?: number;
    }): void;
    /**
     * Centers the given element in the viewport, horizontally only.
     * @param element Element, or element id, to center.
     * @param cparams Optional extra parameters.
     * @param cparams.doNotAnimate If true, animation will not be switched on for the operation.
     * @param cparams.onComplete Optional on complete callback
     */
    centerOnHorizontally(element: Element, cparams: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
    }): void;
    /**
     * Centers the given element in the viewport, vertically only.
     * @param element Element, or element id, to center.
     * @param cparams Optional extra parameters.
     * @param cparams.doNotAnimate If true, animation will not be switched on for the operation.
     * @param cparams.onComplete Optional on complete callback
     */
    centerOnVertically(element: Element, cparams: {
        doNotAnimate?: boolean;
        onComplete?: (p: PointXY) => any;
    }): void;
    /**
     * Centers on the given element and then adjusts the zoom of the widget so that the short axis of the viewport
     * is [1 / fillRatio] larger than its corresponding axis on the centered node. `fillRatio` is basically
     * a measure of how much context you want to see around the node on which you centered.
     * @param element - Element, or element id, to center.
     * @param cparams Optional extra params
     * @param cparams.fillRatio - Proportional ratio of the corresponding node's edge to the viewport's short edge. Defaults to 0.6.
     * @param cparams.doNotAnimate - By default, this operation is animated.
     * @internal
     */
    centerOnAndZoom(element: Element, cparams: {
        fillRatio?: number;
        doNotAnimate?: boolean;
    }): void;
    /**
     * Gets the canvas location that corresponds to the center of the viewport.  Note that this may describe
     * a point outside of the content bounds.
     * @returns x,y location of the logical position on the canvas corresponding to the center of the viewport.
     */
    getViewportCenter(): PointXY;
    /**
     * Sets the location of the canvas such that the given point appears at the center of the viewport.
     * @param xy - location of the point on the canvas to position in the center of the viewport.
     */
    setViewportCenter(xy: PointXY): void;
    /**
     * Sets whether or not the widget clamps the movement of the canvas during pan/zoom
     * to ensure that the managed content never disappears from view.
     * @param c Whether or not to clamp movement.
     */
    setClamping(c: boolean): void;
    /**
     * Returns whether or not the widget clamps the movement of the canvas during pan/zoom/
     */
    isClamping(): boolean;
    /**
     * Sets the current zoom, clamping it to the allowed range.
     * @param z - Zoom value. If this is outside the allowed bounds it will be clamped.
     * @param animate - Whether to animate the change in zoom, or just go straight to the new zoom level.
     * @returns Current zoom. This may or may not be the value you asked for - it might have been clamped to the current allowed zoom range.
     */
    setZoom(z: number, animate?: boolean): number;
    /**
     * Sets the current zoom range. By default, this method checks if the current zoom is within
     * the new range, and if it is not then `setZoom` is called, which will cause the zoom to be clamped
     * to an allowed value in the new range. You can disable this by passing `true` for `doNotClamp`.
     *
     * @param zr New range, as an array consisting of [lower, upper] values. Lower must be less than upper.
     * @param doNotClamp If true, will not check the current zoom to ensure it falls within the new range.
     * @returns Array of [min, max] current zoom values.
     */
    setZoomRange(zr: ZoomRange, doNotClamp?: boolean): ZoomRange;
    /**
     * Gets the current zoom range.
     * @returns Array of [min, max] current zoom values.
     */
    getZoomRange(): ZoomRange;
    /**
     * Gets the current zoom.
     */
    getZoom(): number;
    /**
     * Gets the current position of the panned content.
     * @returns location, in pixels, of the panned content, where 0,0 is the origin of the viewport.
     */
    getPan(): PointXY;
    /**
     * Pans the content by dx and dy.
     * @param dx Amount to pan in X direction
     * @param dy Amount to pan in Y direction
     * @param animate Whether or not to animate the pan.
     * @param onComplete - function to call once the pan is complete
     */
    pan(dx: number, dy: number, animate?: boolean, onComplete?: (m: PointXY) => any): void;
    /**
     * Sets the position of the panned content's origin.
     * @param left - Position in pixels of the left edge of the panned content.
     * @param top - Position in pixels of the top edge of the panned content.
     * @param animate - Whether or not to animate the pan.
     * @param onComplete - If `animate` is set to true, an optional callback for the end of the pan. This function is
     * passed a PointArray containing the final position.
     */
    setPan(left: number, top: number, animate?: boolean, onComplete?: (p: PointXY) => any): PointXY;
    /**
     * Sets the current transform origin, in pixels. Used mainly to support save/restore state.
     * @param x - Position of the X coordinate of the transform origin.
     * @param y - Position of the Y coordinate of the transform origin.
     */
    setTransformOrigin(x: number, y: number): void;
    /**
     * Maps the given page location to a value relative to the viewport origin, allowing for
     * zoom and pan of the canvas. This takes into account the offset of the viewport in the page so that what
     * you get back is the mapped position relative to the target element's [left,top] corner. If
     * you wish, you can supply true for 'doNotAdjustForOffset', to suppress that behavior.
     * @param left X location
     * @param top Y location
     * @param doNotAdjustForOffset Whether or not to adjust for the offset of the viewport in the page.
     * @returns The mapped location, as a PointXY object.
     */
    fromPageLocation(left: number, top: number, doNotAdjustForOffset?: boolean): PointXY;
    /**
     * Maps the given location on the canvas to a point relative to the page origin, allowing for zoom and
     * pan of the canvas. This takes into account the offset of the viewport in the page so that what
     * you get back is the mapped position computed relative to the target element's [left,top] corner. If
     * you wish, you can supply true for 'doNotAdjustForOffset', to suppress that behavior.
     * @param left
     * @param top
     * @param doNotAdjustForOffset
     */
    toPageLocation(left: number, top: number, doNotAdjustForOffset?: boolean): PointXY;
    /**
     * Maps the page location of the given event to a value relative to the viewport origin, allowing for
     * zoom and pan of the canvas. This takes into account the offset of the viewport in the page so that what
     * you get back is the mapped position relative to the target element's [left,top] corner. If
     * you wish, you can supply true for 'doNotAdjustForOffset', to suppress that behavior.
     * @param event Browser event
     * @param doNotAdjustForOffset Whether or not to adjust for the offset of the viewport in the page.
     * @returns The mapped location, as {left:number, top:number}
     */
    mapEventLocation(event: Event, doNotAdjustForOffset?: boolean): PointXY;
    /**
     * Sets whether or not the component should respond to mouse events.
     * @param state Whether or not to respond to mouse events.
     */
    setEnabled(state: boolean): void;
    /**
     * Takes some element that is in the DOM and moves it so that it appears at the given x,y over the canvas,
     * allowing for the current zoom and pan.  It is expected that the element is not one that is currently
     * managed by the widget - a common use case for this is some dialog, which you do not want to append to
     * the canvas since it would have the zoom effect applied.
     * @param el Selector, DOM element or element id representing the element to move.
     * @param x X location to move to.
     * @param y Y location to move to.
     */
    showElementAt(el: HTMLElement, x: number, y: number): void;
    /**
     * Returns the apparent origin of the canvas inside the viewport - the coordinates, in real pixel
     * values, of where the origin of the canvas appears to be. This apparent origin is not necessarily the
     * same as the origin values of the canvas, because the transform origin and zoom values change
     * things.  This function can be used in conjunction with the content bounds by widgets such as the miniview,
     * to calculate what is actually visible in the viewport at some point in time.
     * @returns Position of the canvas, relative to the viewport's 0,0.
     */
    getApparentCanvasLocation(): PointXY;
    /**
     * Sets the apparent canvas location - see the notes for getApparentCanvasLocation.
     * @param left - Value in pixels for left edge of canvas.
     * @param top - Value in pixels for top edge of canvas.
     * @returns Position of the actual origin set, after clamping.
     */
    setApparentCanvasLocation(left: number, top: number): PointXY;
    /**
     * Appends an element to the viewport so that it floats above the content that is being zoomed and panned.
     * The element will have `position:absolute` set on it. You can float any element you like, but note that the
     * responsibility for setting an appropriate z index is yours.
     * @param el - Element to float.
     * @param pos - Position to float the element at.
     */
    floatElement(el: Element, pos: PointXY): void;
    /**
     * Appends an element to the viewport such that it is zoomed with everything else, but constrains pan
     * in one or both axes so that the element remains fixed with respect to the viewport origin.
     * @param el The DOM element to append.
     * @param pos Location of the element's origin.
     * @param constraints Flags to indicate optional constraint to each axis.
     * @internal
     */
    fixElement(el: Element, pos: PointXY, constraints?: FixedElementConstraints): void;
    /**
     * Unfixes an element.
     * @param el
     * @internal
     */
    unfixElement(el: Element): void;
    /**
     * Finds all nodes that intersect to any extent the rectangle defined by the given origin
     * and dimensions. This rectangle is taken to be in the coordinate space of the page, ie. a value
     * of [0,0] for the origin means the page's top/left corner. A future version could take an optional
     * third argument specifying the element whose origin to use.
     * @param origin Center of search. IMPORTANT: This is relative to the page origin.
     * @param dimensions Width and height of search area.
     * @param enclosed Defaults to false. If true, returns only nodes that are enclosed by the given search area. Otherwise returns nodes that both intersect and are enclosed.
     * @param filter Optional filter function. This is passed the (id, node, boundingRect) of some element and should return true for elements that should be included in results.
     * @returns A list of objects that either intersect or are enclosed by the search area.
     * @internal
     */
    findIntersectingElements(origin: PointXY, dimensions: Size, enclosed?: boolean, filter?: IntersectingElementsFilter): Array<IntersectingObjectData>;
    /**
     * Finds all nodes whose centers are within a rectangle with `origin` as its center, and
     * a width and height of `radius / 2`.
     * @param origin Location for center of search. IMPORTANT: This is relative to the page origin.
     * @param radius Radius of search.
     * @param mustBeInViewport If true, first check that the given origin is within the viewport.
     * @param filter Optional filter function. Should return true for elements that should be included in results.
     * @returns A list of objects containing {id:id, el:element, r:bounding rect}, sorted in ascending order of distance of the center of the bounding rectangle from the given origin.
     */
    findNearbyElements(origin: PointXY, radius: number, mustBeInViewport?: boolean, filter?: IntersectingElementsFilter): Array<any>;
    /**
     * Returns whether or not the given point (relative to page origin) is within the viewport for the widget.
     * @param x X location of point to test
     * @param y Y location of point to test
     * @returns true if the point is within the viewport, false if not.
     */
    isInViewport(x: number, y: number): boolean;
    /**
     * Sets the filter used to determine whether or not a given wheel event should be responded to.
     * @param f A function that will be given the current mouse event. You must return false from the function if you wish for the wheel event to be responded to.
     */
    setWheelFilter(f: (e: MouseEvent) => boolean): void;
    /**
     * Sets the background for the canvas element.
     * @internal
     */
    addBackground(background: Background): void;
    /**
     * removes the background from the canvas element
     * @internal
     */
    removeBackground(background: Background): void;
    /**
     * Gets the current background layer.
     * @returns current background layer. you can use the `getWidth` and `getHeight` methods on this object to find out the background size.
     * @internal
     */
    /**
     * Cleans up the pan zoom widget - removes all event bindings, and all elements from the DOM.
     */
    destroy(): void;
}
/**
 * @internal
 */
export declare type IntersectingElementsFilter = (e: ViewportElement<Element>, r: RectangleXY, /*el:any,*/ id: string) => boolean;
/**
 * Panzoom background can have multiple backgrounds.
 */
declare class PanZoomBackground implements Background {
    backgrounds: Array<Background>;
    addBackground(background: Background): void;
    removeBackground(background: Background): void;
    getWidth(): number;
    getHeight(): number;
    setZoom(z: number, doNotDebounce?: boolean): void;
    owns(el: any): boolean;
    pan(): void;
    destroy(): void;
    _setVisible(v: boolean): void;
}
export {};
