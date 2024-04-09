import * as React from 'react';
import { DataGeneratorFunction, JsPlumbToolkit, ObjectData, ShapeLibraryImpl, Size, Surface } from "@jsplumbtoolkit/browser-ui";
/**
 * @public
 */
export interface ShapeLibraryPaletteProps {
    /**
     * Surface to attach the drag/drop to.
     */
    surface: Surface;
    /**
     * The shape library to render.
     */
    shapeLibrary: ShapeLibraryImpl<ObjectData>;
    /**
     * Optional data generator to allow you to specify initial data for some element to be dragged. Note that you cannot
     * override the object's `type` with this function. The palette will set the new object's type to match the type of
     * the element that the user is dragging from the palette.
     */
    dataGenerator?: DataGeneratorFunction<ObjectData>;
    /**
     * Optional size to use for dragged elements.
     */
    dragSize?: Size;
    /**
     * Optional size to use for icons.
     */
    iconSize?: Size;
    /**
     * Optional fill color to use for dragged elements. This should be in RGB format, _not_ a color like 'white' or 'cyan' etc.
     */
    fill?: string;
    /**
     * Optional color to use for outline of dragged elements. Should be in RGB format.
     */
    outline?: string;
    /**
     * Message to use for the 'show all' option in the shape set drop down when there is more than one set of shapes.
     * Defaults to `Show all`.
     */
    showAllMessage?: string;
    /**
     * When true (which is the default), a newly dropped vertex will be set as the underlying Toolkit's selection.
     */
    selectAfterDrop?: boolean;
    /**
     * Stroke width to use for shapes dropped on canvas. Defaults to 2.
     */
    canvasStrokeWidth?: number;
    /**
     * Stroke width to use for shapes in palette. Defaults to 1.
     */
    paletteStrokeWidth?: number;
    /**
     * ID of the initial set to show, if any. When you have multiple shapes in a set you may want the palette to
     * open up showing just one set.
     */
    initialSet?: string;
}
export interface ShapeLibraryPaletteState {
}
export declare class ShapeLibraryPaletteComponent extends React.Component<ShapeLibraryPaletteProps, ShapeLibraryPaletteState> {
    surface: Surface;
    toolkit: JsPlumbToolkit;
    _container: HTMLElement;
    shapeLibrary: ShapeLibraryImpl<ObjectData>;
    _initialSet: string;
    constructor(props: ShapeLibraryPaletteProps);
    render(): JSX.Element;
    componentDidMount(): void;
}
