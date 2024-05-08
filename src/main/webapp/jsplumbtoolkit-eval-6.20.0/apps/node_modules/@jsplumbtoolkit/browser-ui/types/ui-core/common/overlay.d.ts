import { PaintStyle } from './paint-style';
/**
 * Base options for an overlay.
 * @public
 */
export interface OverlayOptions extends Record<string, any> {
    /**
     * Optional ID for the overlay. Can be used to retrieve the overlay from a connection.
     */
    id?: string;
    /**
     * Optional CSS class(es) to add to the overlay's element.
     */
    cssClass?: string;
    /**
     * Defaults to 0.5. See docs.
     */
    location?: number;
    /**
     * Optional event handlers to attach to the overlay.
     */
    events?: Record<string, (value: any, event?: any) => any>;
    /**
     * Optional custom attributes to write to the overlay's element.
     */
    attributes?: Record<string, string>;
}
/**
 * @public
 */
export interface ArrowOverlayOptions extends OverlayOptions {
    /**
     * Width of the arrow's baseline. Defaults to 20.
     */
    width?: number;
    /**
     * Length from the head to the baseline. Defaults to 20.
     */
    length?: number;
    /**
     * 1 to point forwards (the default), -1 to point backwards.
     */
    direction?: number;
    /**
     * How far, as a decimal, along the line from head to baseline to fold back into. Defaults to 0.623.
     */
    foldback?: number;
    /**
     * Optional paint style to use for the arrow.
     */
    paintStyle?: PaintStyle;
}
/**
 * @public
 */
export interface LabelOverlayOptions extends OverlayOptions {
    /**
     * String, or a function returning a string, for the label.
     */
    label: string | Function;
    /**
     * Optional name of the attribute that identifies this overlay's location on the path. Defaults to `location`.
     */
    labelLocationAttribute?: string;
    /**
     * Whether or not to use an HTML element. Defaults to false (uses an SVG element)
     */
    useHTMLElement?: boolean;
}
/**
 * An overlay specified by name and options.
 * @public
 */
export declare type FullOverlaySpec = {
    type: string;
    options: OverlayOptions;
};
/**
 * A specifier for an overlay.
 * @public
 */
export declare type OverlaySpec = string | FullOverlaySpec;
