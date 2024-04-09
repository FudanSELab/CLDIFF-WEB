import { BackgroundOptions } from "./background-options";
import { Grid } from "../ui-core/util/util";
import { Background, InternalBackgroundOptions } from "../browser-ui/background/background";
import { Surface } from "../browser-ui/surface";
import { ViewportBounds } from "../browser-ui/pan-zoom";
export declare enum GridTypes {
    dotted = "dotted",
    lines = "lines"
}
export declare type GridType = keyof typeof GridTypes;
/**
 * Options for the generated grid background. This background is still in beta as of 5.10.6.
 * @public
 */
export interface GeneratedGridBackgroundOptions extends BackgroundOptions {
    /**
     * The grid to use. This is optional; if you do not supply one the background will
     * attempt to read the grid definition from the Surface. If that is also not set
     * then a default grid of 50x50 pixels will be used.
     */
    grid?: Grid;
    /**
     * Whether or not to show a thick border around the entire background. Defaults to false.
     */
    showBorder?: boolean;
    /**
     * The minimum width for the grid. The value you provided is divided by 2 and then the grid is guaranteed to always at
     * least span the range of (-minWidth / 2) - (minWidth / 2).
     */
    minWidth?: number;
    /**
     * The minimum height for the grid. The value you provided is divided by 2 and then the grid is guaranteed to always at
     * least span the range of (-minHeight / 2) - (minHeight / 2).
     */
    minHeight?: number;
    /**
     * If true (which is the default), the grid will also draw tick marks between the grid lines.
     */
    showTickMarks?: boolean;
    /**
     * Number of tick marks to draw per cell. Defaults to 2.
     */
    tickMarksPerCell?: number;
    /**
     * The maximum width for the grid. The value you provided is divided by 2 and then the grid is guaranteed to never
     * exceed the range of (-maxWidth / 2) - (maxWidth / 2).  maxWidth takes precedence over minWidth.
     */
    maxWidth?: number;
    /**
     * The maximum height for the grid. The value you provided is divided by 2 and then the grid is guaranteed to never
     * exceed the range of (-maxHeight / 2) - (maxHeight / 2).  maxHeight takes precedence over minHeight.
     */
    maxHeight?: number;
    /**
     * Defaults to true, and instructs the grid that if the grid has grown beyond any minimum value set in either axis,
     * if the content bounds subsequently shrink in that axis below the minimum, the grid should shrink back to
     * the minimum. If you set this to false the grid will never shrink back to its minimum values once they have
     * been exceeded.
     */
    autoShrink?: boolean;
    /**
     * Type of grid - lines or dots. Defaults to lines.
     */
    gridType?: GridType;
    /**
     * The radius for dots representing grid positions (when gridType id GridTypes.dotted). Defaults to 2.
     */
    dotRadius?: number;
    /**
     * The radius for dots representing grid tick marks (when gridType id GridTypes.dotted). Defaults to 1.
     */
    tickDotRadius?: number;
    /**
     * Whether or not the background is initially visible. Defaults to true.
     */
    visible?: boolean;
}
/**
 * The grid that will be used in the absence of a grid in the background options
 * or a grid set on the surface.
 * @internal
 */
export declare const DEFAULT_GRID: Grid;
/**
 * The default number of tick marks per cell.
 * @internal
 */
export declare const DEFAULT_TICK_MARKS_PER_CELL = 2;
export declare const DEFAULT_TICK_LINE_STROKE = "#ddd";
export declare const DEFAULT_LINE_STROKE = "#ddd";
/**
 * The css class that will be added to a grid background's main element
 * @public
 */
export declare const CLASS_BACKGROUND = "jtk-background";
/**
 * the css class that will be added to a grid background's border
 * @public
 */
export declare const CLASS_BACKGROUND_BORDER = "jtk-background-border";
/**
 * the css class that will be added to the major and minor dots/lines in a grid
 * @public
 */
export declare const CLASS_BACKGROUND_GRID = "jtk-background-grid";
/**
 * The class that will be added to the lines representing grid tick marks (when gridType is GridTypes.lines)
 * @public
 */
export declare const CLASS_BACKGROUND_GRID_MINOR = "jtk-background-grid-minor";
/**
 * The class that will be added to the lines representing grid lines (when gridType is GridTypes.lines)
 * @public
 */
export declare const CLASS_BACKGROUND_GRID_MAJOR = "jtk-background-grid-major";
/**
 * The class that will be added to the dots representing grid lines (when gridType is GridTypes.dotted)
 * @public
 */
export declare const CLASS_BACKGROUND_GRID_DOT_MAJOR = "jtk-background-grid-dotted-major";
/**
 * The class that will be added to the dots representing grid tick marks (when gridType is GridTypes.dotted)
 * @public
 */
export declare const CLASS_BACKGROUND_GRID_DOT_MINOR = "jtk-background-grid-dotted-minor";
/**
 * A background that generates an SVG grid based upon the current content bounds,
 * ensuring that there is always a grid visible underneath the content. The grid may consist of
 * lines or dots - control this via the `gridType` option.
 *
 * The size of the grid can be mandated in the options for the background, or
 * it can be extracted from the surface.
 *
 * You can hide/show the background grid via the `hide()`, `show()`, `toggle()` or `setVisible(boolean)`
 * methods.
 *
 * @public
 */
export declare class GeneratedGridBackground implements Background {
    _suspended: boolean;
    static type: string;
    type: string;
    grid: Grid;
    surface: Surface;
    showBorder: boolean;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    showTickMarks: boolean;
    tickMarksPerCell: number;
    autoShrink: boolean;
    dotRadius: number;
    tickDotRadius: number;
    gridType: GridType;
    currentBounds: ViewportBounds;
    _maximumExtentsReached: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
    backgroundContainer: SVGElement;
    private readonly _$_majorGridId;
    private readonly _$_minorGridId;
    constructor(params: InternalBackgroundOptions<GeneratedGridBackgroundOptions>);
    owns(el: any): boolean;
    getWidth(): number;
    getHeight(): number;
    setZoom(zoom: number, doNotDebounce?: boolean): void;
    pan(): void;
    destroy(): void;
    private _recompute;
    private _$_minorLinesGrid;
    private _$_majorLinesGrid;
    private _$_minorDotsGrid;
    private _$_majorDotsGrid;
    private _$_generateGridPattern;
    private _$_generateGrid;
    /**
     * Sets the visible state of the grid
     * @param v
     * @public
     */
    _setVisible(v: boolean): void;
}
