import { LayoutParameters } from "../core/layout/abstract-layout";
/**
 * GridLayout type. You can use this in a layout spec for a Surface's render parameters.
 * @public
 */
export declare const LAYOUT_TYPE_GRID = "Grid";
/**
 * Options for grid layout orientation.
 * @see GridLayoutParameters
 * @public
 */
export declare enum GridLayoutOrientations {
    row = "row",
    column = "column"
}
/**
 * Grid layout orientation
 * @see GridLayoutParameters
 * @public
 */
export declare type GridLayoutOrientation = keyof typeof GridLayoutOrientations;
/**
 * Possible values for grid layout vertical alignment
 * @see GridLayoutParameters
 * @public
 */
export declare enum GridLayoutVerticalAlignments {
    top = "top",
    bottom = "bottom",
    center = "center"
}
/**
 * Possible values for grid layout horizontal alignment
 * @see GridLayoutParameters
 * @public
 */
export declare enum GridLayoutHorizontalAlignments {
    left = "left",
    right = "right",
    center = "center"
}
/**
 * Vertical alignment for cells in grid layout.
 * @see GridLayoutParameters
 */
export declare type GridLayoutVerticalAlignment = keyof typeof GridLayoutVerticalAlignments;
/**
 * Horizontal alignment for cells in grid layout.
 * @see GridLayoutParameters
 */
export declare type GridLayoutHorizontalAlignment = keyof typeof GridLayoutHorizontalAlignments;
/**
 * Options for the GridLayout.
 * @public
 */
export interface GridLayoutParameters extends LayoutParameters {
    /**
     * Whether to lay out items row first or column first. Additionally, this
     * setting will determine where any extra items are placed if the dataset does
     * not conform to a grid of equal width and height
     */
    orientation?: GridLayoutOrientation;
    /**
     * Optional fixed number of rows.  By default this is set to -1 - meaning not fixed - which will result in the layout
     * making its best effort at drawing a grid of equal width and height.
     */
    rows?: number;
    /**
     * Optional fixed number of columns.  By default this is set to -1 - meaning not fixed - which will result in the layout
     * making its best effort at drawing a grid of equal width and height
     */
    columns?: number;
    /**
     * Optional alignment for vertical placement in cells. Defaults to center.
     */
    verticalAlignment?: GridLayoutVerticalAlignment;
    /**
     * Optional alignment for horizontal placement in cells. Defaults to center.
     */
    horizontalAlignment?: GridLayoutHorizontalAlignment;
}
