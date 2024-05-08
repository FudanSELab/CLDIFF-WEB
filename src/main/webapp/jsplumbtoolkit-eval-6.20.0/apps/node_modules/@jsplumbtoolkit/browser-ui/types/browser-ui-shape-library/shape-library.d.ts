import { CompiledIconDefinition, ShapeGeneratorFunction, ShapeLibrary, ShapeSet, ShapeType } from "./shape-library-definitions";
import { ObjectData } from "../core/model/graph";
import { CustomTagOptions } from "../templates-2/custom-tag";
import { Recado } from "../templates-2/core";
import { AbstractEntry } from "../templates-2/abstract-entry";
/**
 * Default ShapeLibrary implementation. Use one of these to manage a set of shapes for rendering into
 * your vertices and/or for rendering as a palette from which the user can drag new objects.
 * @public
 */
export declare class ShapeLibraryImpl<T extends ObjectData> implements ShapeLibrary<T> {
    compiledShapes: Map<string, ShapeGeneratorFunction>;
    templateRenderer: Recado;
    shapeSetList: Array<ShapeSet>;
    shapeSets: Map<string, ShapeSet>;
    defaultCategoryId: string;
    iconContainerTemplate: string;
    iconContainerAst: Array<AbstractEntry>;
    /**
     * map of compiled icons. the keys of this map are set IDs. The values are maps of icon ids to compiled definitions.
     */
    compiledIcons: Map<string, Map<string, CompiledIconDefinition>>;
    /**
     * Also we keep a list of all compiled icons, but here we've stripped the category out. we use this in the event that
     * some data doesn't have a category. then it's a lucky dip. the user gets the first icon with a matching id.
     */
    compiledIconList: Array<CompiledIconDefinition>;
    constructor(shapeSets: ShapeSet | Array<ShapeSet>);
    /**
     * Gets the definition for some shape. May return null.
     * @param type
     * @param set
     */
    getShapeDefinition(type: string, set: string): ShapeType;
    /**
     * Gets the template for the given shape type in the given set. If no template is resolved then we return
     * DEFAULT_TEMPLATE (and log the issue to the console).
     * @param type Shape type
     * @param set Name of set. If not provided, the value of `DEFAULT_SET` is used as the set name.
     */
    getShapeTemplate(type: string, set: string): string;
    /**
     * Gets a compiled version of the given shape, creating and caching it if it does not already exist.
     * @param type Shape type.
     * @param category Category to use. Defaults to the ID of the first category provided in the shape list.
     */
    getCompiledShape(type: string, category?: string): ShapeGeneratorFunction;
    /**
     * TODO would this be better done via css?  or would that br a problem for headless scenarios?
     * @param el
     * @private
     */
    private _applyVectorEffect;
    /**
     * Render the given data with the appropriate template. A `fill` value is set on the resulting element,
     * and the `vector-effect` attribute is set to 'non scaling stroke', ie. when the shape is scaled due to
     * the element dimensions differing from the viewbox, the stroke does not change.
     * @param data
     * @param strokeWidth Stroke width to use. This is passed to the underlying template and is taken into
     * account by the shape template (or at least, it should be, because it has a bearing on the quality of
     * the result)
     */
    renderCompiledShape(data: ObjectData, strokeWidth?: number): HTMLElement | SVGElement;
    /**
     * Render a label element for the given data - an SVG text element.
     * @param data Data to extract label from
     * @param labelProperty Name of the property that provides the label. Defaults to "label"
     * @param strokeWidth Optional stroke width, defaults to `0.25px`
     */
    renderShapeLabel(data: ObjectData, labelProperty?: string, strokeWidth?: string): SVGTextElement;
    /**
     * @internal
     * @param type
     * @param category
     * @return {string}
     */
    _shapeKey(type: string, category?: string): string;
    private _shapesToFragments;
    /**
     * Returns a tag definition that can be used in a Surface's `tags` declaration. Note that this method
     * returns an object containing the tag's implementation, but not the name of the tag. You can call the tag whatever you like.
     * @public
     */
    getShapeTagDefinition(strokeWidth?: number, includeLabel?: boolean, labelAttribute?: string): CustomTagOptions;
    /**
     * @internal
     */
    _defaultTemplate(): string;
    /**
     * Resolve an icon by its id and set id. If set id is null we just look for the first icon in our list
     * from all sets with the given id. May return null.
     * @param id
     * @param setId
     * @internal
     */
    private _resolveIcon;
    /**
     * Check for any icons that were declared and render them.
     * @param el
     * @param data
     * @param instance
     * @param parent
     * @internal
     */
    private _maybeRenderIcons;
    parseDefs(): Array<Array<AbstractEntry>>;
    getDefsElements(): Array<Element>;
    getSvgDefsElement(): SVGElement;
}
