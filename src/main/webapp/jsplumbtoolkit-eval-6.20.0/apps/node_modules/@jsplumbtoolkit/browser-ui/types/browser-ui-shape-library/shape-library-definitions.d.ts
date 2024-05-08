/**
 * Default fill color for shapes.
 */
import { ObjectData } from "../core/model/graph";
import { CustomTagOptions } from "../templates-2/custom-tag";
import { AbstractEntry } from "../templates-2/abstract-entry";
/**
 * Default fill/stroke/text color for items in ShapeLibrary.
 */
export declare const ShapeLibraryDefaults: {
    FILL: string;
    STROKE: string;
    TEXT_COLOR: string;
};
/**
 * Defines a shape type. If you wish to supply custom shape types
 * you should extend this interface.
 * @public
 */
export interface ShapeType {
    type: string;
    template: string;
    label?: string;
    description?: string;
    square?: boolean;
}
export declare const ICON_ORIGIN_LEFT = "left";
export declare const ICON_ORIGIN_CENTER = "center";
export declare const ICON_ORIGIN_RIGHT = "right";
export declare type IconOrigin = typeof ICON_ORIGIN_LEFT | typeof ICON_ORIGIN_CENTER | typeof ICON_ORIGIN_RIGHT;
/**
 * Defines an icon that can be rendered in a shape.
 * @public
 */
export interface IconDefinition {
    template: string;
    label?: string;
    viewBox: {
        width: number;
        height: number;
    };
    origin?: IconOrigin;
}
/**
 * A compiled icon. For internal use.
 * @internal
 */
export interface CompiledIconDefinition {
    setId: string;
    id: string;
    def: IconDefinition;
    ast: Array<AbstractEntry>;
}
/**
 * Defines a set of shapes. This is the interface you should extend if you wish to supply custom shape
 * sets to the widget.
 * @public
 */
export interface ShapeSet {
    id: string;
    name: string;
    shapes: Record<string, ShapeType>;
    icons?: Record<string, IconDefinition>;
    defs?: Record<string, string>;
}
/**
 * Defines a library that acts as a factory for shapes.
 * @internal
 */
export interface ShapeLibrary<T extends ObjectData> {
    getShapeDefinition(type: string, set: string): ShapeType;
    renderCompiledShape(data: T, strokeWidth?: number): HTMLElement | SVGElement;
    renderShapeLabel(data: ObjectData, labelProperty?: string, strokeWidth?: string): SVGTextElement;
    shapeSetList: Array<ShapeSet>;
    getShapeTagDefinition(strokeWidth?: number, includeLabel?: boolean, labelAttribute?: string): CustomTagOptions;
    getDefsElements(): Array<Element>;
    getSvgDefsElement(): SVGElement;
    parseDefs(): Array<Array<AbstractEntry>>;
}
/**
 * Defines a function that can take a vertex's data object and return a document fragment with it rendered.
 */
export declare type ShapeGeneratorFunction = (data: ObjectData) => DocumentFragment;
/**
 * Name of the default shape set
 * @internal
 */
export declare const DEFAULT_SET_NAME = "Default";
/**
 * @internal
 */
export declare const DEFAULT_SET_DESCRIPTION = "Default shapes";
/**
 * @internal
 */
export declare const VIEW_BOX = "viewBox";
/**
 * @internal
 */
export declare const TAG_SHAPE = "jtk-shape";
/**
 * This class is assigned to svg text elements serving as shape labels.
 * @public
 */
export declare const CLASS_SHAPE_LABEL = "jtk-shape-label";
/**
 * This class is assigned to the parent SVG elements for shapes.
 * @public
 */
export declare const CLASS_SHAPE = "jtk-shape";
