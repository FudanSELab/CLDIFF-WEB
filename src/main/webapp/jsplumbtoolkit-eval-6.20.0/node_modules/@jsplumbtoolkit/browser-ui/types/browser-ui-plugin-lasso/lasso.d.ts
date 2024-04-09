import { Surface } from "../browser-ui/surface";
import { PointXY } from "../ui-core/util/util";
export interface LassoOptions {
    canvas: Element;
    onStart?: Function;
    onEnd?: Function;
    onSelect?: Function;
    invert?: boolean;
    surface: Surface;
    filter?: string;
}
export declare class Lasso {
    el: HTMLElement;
    masks: Record<string, HTMLElement>;
    origin: PointXY;
    onStart: Function;
    onEnd: Function;
    onSelect: Function;
    down: boolean;
    moving: boolean;
    invert: boolean;
    surface: Surface;
    private readonly _filter;
    private eventManager;
    downListener: Function;
    upListener: Function;
    moveListener: Function;
    downEvent: string;
    upEvent: string;
    moveEvent: string;
    enabled: boolean;
    constructor(options: LassoOptions);
    private _position;
    private _setVisible;
    private _downListener;
    private _moveListener;
    private _upListener;
    private _createMasks;
    /**
     * Returns whether or not the lasso is active.
          * @returns true if active, false otherwise.
     */
    isActive(): boolean;
    /**
     * Sets whether or not the lasso responds to mouse events.
          * @param e Enabled state.
     */
    setEnabled(e: boolean): void;
}
