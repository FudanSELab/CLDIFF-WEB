import { ShapeLibrary } from "./shape-library-definitions";
import { Surface } from "../browser-ui/surface";
import { Size } from "../ui-core/util/util";
import { ObjectData, Vertex } from "../core/model/graph";
import { BrowserUiRecado } from "../browser-ui-templates-2/browser-ui-recado";
import { DataGeneratorFunction, DropTargetInfo, SurfaceDropManager } from "../drop/jsplumbtoolkit-drop";
export declare const CLASS_PALETTE_SET = "jtk-shape-library-palette-set";
export declare const CLASS_PALETTE = "jtk-shape-library-palette";
export declare const CLASS_PALETTE_SET_FILTER = "jtk-shape-library-palette-filter";
export declare const CLASS_PALETTE_SHAPE = "jtk-shape-library-palette-shape";
export declare const CLASS_PALETTE_SET_TITLE = "jtk-shape-library-palette-set-title";
/**
 * Options for a shape library palette.
 * @public
 */
export interface ShapeLibraryPaletteOptions<T extends ObjectData> {
    /**
     * The element to draw the palette into.
     */
    container: HTMLElement;
    /**
     * The shape library to render.
     */
    shapeLibrary: ShapeLibrary<T>;
    /**
     * Surface to attach the drag/drop to.
     */
    surface: Surface;
    /**
     * Optional size to use for dragged elements.
     */
    dragSize?: Size;
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
     * Optional data generator to allow you to specify initial data for some element to be dragged. Note that you cannot
     * override the object's `type` with this function. The palette will set the new object's type to match the type of
     * the element that the user is dragging from the palette.
     */
    dataGenerator?: DataGeneratorFunction<T>;
    /**
     * Optional size to use for icons. Defaults to 150x100 pixels. If you provide this but not `dragSize` this size will
     * also be used for an icon that is being dragged.
     */
    iconSize?: Size;
    /**
     * Optional ID of the first set to show, hiding the others.
     */
    initialSet?: string;
    /**
     * Optional callback to invoke when a new vertex has been added
     * @param v
     * @param dropTarget
     */
    onVertexAdded?: (v: Vertex, dropTarget?: DropTargetInfo) => any;
}
/**
 * A palette for drag/drop that renders the contents of a shape library.
 * @public
 */
export declare class ShapeLibraryPalette<T extends ObjectData> {
    _$_templateEngine: BrowserUiRecado;
    _$_dropManager: SurfaceDropManager<T>;
    _$_userDataGenerator: DataGeneratorFunction<T>;
    private onVertexAdded;
    private palette;
    /**
     * Constructor for the palette.
     * @param options Options for the palette
     */
    constructor(options: ShapeLibraryPaletteOptions<T>);
    private _setVisibleSet;
}
