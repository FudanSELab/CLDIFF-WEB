import { ATTRIBUTE_STROKE_DASHARRAY } from "../ui-core/browser-ui-renderer/svg-util";
import { PointXY, Size } from "../ui-core/util/util";
import { Edge, ObjectData } from "../core/model/graph";
import { ShapeLibrary } from "../browser-ui-shape-library/shape-library-definitions";
import { Surface } from "../browser-ui/surface";
import { Connection } from "../ui-core/core/connector/connection-impl";
import { Selection } from '../core/selection';
import { Path } from "../core/model/path";
import { DataSource } from "../core/datasource";
/**
 * Options for SVG export.
 * @public
 */
export interface SvgExportOptions {
    /**
     * Default fill color to use for vertices. Will be overridden by individual `fill` values in each node. Default value is white.
     */
    fill?: string;
    /**
     * Default outline color to use for vertices. Will be overridden by individual `outline` values in each node. Default value is black.
     */
    outline?: string;
    /**
     * Whether or not to display labels (using an SVG text element) on nodes. Defaults to false.
     */
    showLabels?: boolean;
    /**
     * If showing labels, the name of the property in each node that defines the label. Defaults to `label`.
     */
    labelAttribute?: string;
    /**
     * If showing labels, the stroke width to use when rendering them. Defaults to 0.25px.
     */
    labelStrokeWidth?: string;
    /**
     * Optional whitespace to place around the export. Defaults to 50px in x and y.
     */
    margins?: PointXY;
    /**
     * If showing labels, the default color to use. Will be overridden by individual `textColor` values in each node. Default value is black.
     */
    labelColor?: string;
    /**
     * Default stroke width to use for nodes. Will be overridden by individual `outlineWidth` values in each node. Default value is 2.
     */
    strokeWidth?: number;
    /**
     * Default size to use for nodes if their data does not have width/height properties.
     */
    defaultSize?: Size;
    /**
     * Optional style to set in a `style` element in the SVG header. You can provide the CSS for the style element as a string, or
     * you can provide a JS object.
     */
    style?: string | Record<string, any>;
    /**
     * Optional selection to render. If null, and path is null, the whole
     * dataset is exported.
     */
    selection?: Selection;
    /**
     * Optional path to render. If null, and selection is null, the whole
     * dataset is exported.
     */
    path?: Path;
}
/**
 * Options for the SVG export UI.
 * @public
 */
export interface SvgExportUIOptions extends SvgExportOptions {
    /**
     * Optional filename to use - defaults to `jsplumbtoolkit-export`.  You do not need to provide the extension.
     */
    filename?: string;
    /**
     * Optional label to use on the download button. Defaults to "Download".
     */
    downloadButtonLabel?: string;
}
/**
 * Options for an image export.
 * @public
 */
export interface ImageExportOptions extends SvgExportOptions {
    /**
     * Content type for the export. Defaults to `image/png`. Most modern browsers also support `image/jpeg`.
     */
    type?: string;
    /**
     * Optional quality of the resulting image - only used for jpeg.  Defaults to 1.0.
     */
    quality?: number;
    /**
     * Optional width for the export. The exported image's aspect ratio will always be honoured so if you provide both this
     * and `height`, height will be ignored. If you don't provide this the natural width of the underlying SVG will be used.
     */
    width?: number;
    /**
     * Optional height for the export. The exported image's aspect ratio will always be honoured so if you provide both this
     * and `width`, this will be ignored. If you don't provide this the natural height of the underlying SVG will be used.
     */
    height?: number;
}
/**
 * Options for the image export UI.
 * @public
 */
export interface ImageExportUIOptions extends ImageExportOptions {
    /**
     * Optional filename to use - defaults to `jsplumbtoolkit-export`.  You do not need to provide the extension.
     */
    filename?: string;
    /**
     * Optional label to use on the download button. Defaults to "Download".
     */
    downloadButtonLabel?: string;
    /**
     * Optional function to invoke after the UI has been displayed.
     * @param el
     */
    onShow?: (el: Element, width: number, height: number, url: string) => any;
    /**
     * Optional list of dimensions
     */
    dimensions?: Array<{
        width?: number;
        height?: number;
    }>;
    /**
     * Optional function to invoke when the user changes the selected dimensions.
     * @param width
     * @param height
     * @param url
     */
    onDimensionsChanged?: (width: number, height: number, url: string) => any;
}
export declare type ImageReadyFunction = (result: {
    url: string;
    width: number;
    height: number;
    contentType: string;
    element: SVGElement;
}) => any;
export declare const CLASS_EXPORT_UNDERLAY = "jtk-export-underlay";
export declare const CLASS_EXPORT_OVERLAY = "jtk-export-overlay";
export declare const CLASS_EXPORT_CANCEL = "jtk-export-cancel";
export declare const CLASS_EXPORT_DIMENSIONS = "jtk-export-dimensions";
export declare const CLASS_EXPORT_DOWNLOAD_TOOLS = "jtk-export-download-tools";
declare type OutputPathSpec = {
    d: string;
    transform: number[];
    stroke: string;
    fill: string;
    strokeWidth: number;
    [ATTRIBUTE_STROKE_DASHARRAY]?: string;
};
/**
 * @internal
 * @param str
 */
export declare function base64Encode(str: string): string;
/**
 * Output of the svg exporter.
 * @public
 */
export interface SvgExportOutput {
    /**
     * Width of the svg's content
     */
    width: number;
    /**
     * Height of the svg's content
     */
    height: number;
    /**
     * SVG. This is an SVG file that contains a viewBox as well as width/height attributes, which are of course superfluous in
     * many usage scenarios.  You can use the `viewBoxOnlySvg` to the the SVG without width/height.
     */
    svg: string;
    /**
     * Encoded data url of the SVG (including width/height), for use in a canvas or to export an image.
     */
    /**
     * SVG output containing a viewBox that defines the content bounds, but no width or height attributes.
     */
    viewBoxOnlySvg: string;
    /**
     * The element representing the SVG.
     */
    element: SVGElement;
}
/**
 * An exporter for Surfaces. This was first released in version 6.6.0 and currently has a few caveats attached to its usage:
 *
 * - Primarily, the exporter is expected to be used with a Surface that has a `ShapeLibrary` set on it. The shape library is used
 * to render appropriate SVG elements for each node. If you use this exporter on a Surface that does not have a ShapeLibrary attached,
 * a default SVG rectangle will be used to represent each node.
 *
 * - When using a shape library it is expected that your node data will contain `left`, `top`, `w` and `h` properties, defining the
 * dimensions of the node.
 *
 * - If you want to see labels on exported edges, you must ensure that you set `useHtmlElement` to "false" on a label overlay spec. Also, if you
 * use the `label` shorthand property you need to set `useHtmlLabel:false` on the edge definition.
 *
 * @since 6.6.0
 * @public
 */
export declare class SvgExporter {
    surface: Surface;
    shapeLibrary: ShapeLibrary<ObjectData>;
    minx: number;
    miny: number;
    maxx: number;
    maxy: number;
    style: string;
    options: SvgExportOptions;
    constructor(surface: Surface, shapeLibrary?: ShapeLibrary<ObjectData>);
    _setOptions(options: SvgExportOptions): void;
    private _processStyle;
    private _defaultRenderNode;
    private _renderNode;
    _processNodes(defaultSize: Size, selection?: DataSource): {
        data: ObjectData;
        g: SVGGElement;
        shape: SVGElement;
        lbl: SVGTextElement;
    }[];
    _resolveStrokeAttributes(pathElement: SVGPathElement, connection: Connection<any>): {};
    _processEdges(selection?: Selection): {
        edge: Edge | import("../core/model/graph").Node | import("../core/model/graph").Group;
        connector: import("..").Connector;
        connection: Connection<import("..").BrowserElement>;
        g: SVGGElement;
        outputPaths: OutputPathSpec[];
        outputTextGroups: {
            transform: number[];
            label: string;
            bg: {
                fill: string;
                stroke: string;
                x: string;
                y: string;
                width: string;
                height: string;
            };
            text: {
                fill: string;
                stroke: string;
                "stroke-width": string;
                x: string;
                y: string;
                "dominant-baseline": string;
                "text-anchor": string;
            };
        }[];
        x: number;
        y: number;
    }[];
    /**
     * Export the current selection for the underlying Toolkit
     * to an SVG file.
     * @param options
     * @public
     */
    exportCurrentSelection(options: SvgExportOptions): SvgExportOutput;
    /**
     * Export the contents of the Surface, a selection, or a path, to an SVG file.
     * @param options
     * @public
     */
    export(options: SvgExportOptions): SvgExportOutput;
}
/**
 * Exports the contents of some Surface as an image. The default supported image
 * type in browsers is `image/png` but you'll probably find `image/jpeg` also
 * works, although that is not under jsPlumb's control.
 *
 * @public
 */
export declare class ImageExporter {
    surface: Surface;
    shapeLibrary: ShapeLibrary<ObjectData>;
    svgExporter: SvgExporter;
    constructor(surface: Surface, shapeLibrary?: ShapeLibrary<ObjectData>);
    private _doExport;
    /**
     * Export to an image.
     * @param options
     * @param onready
     */
    export(options: ImageExportOptions, onready: ImageReadyFunction): void;
    exportCurrentSelection(options: ImageExportOptions, onready: ImageReadyFunction): void;
}
export declare class SvgExporterUI {
    underlay: HTMLElement;
    overlay: HTMLElement;
    surface: Surface;
    closeButton: HTMLElement;
    shapeLibrary: ShapeLibrary<ObjectData>;
    constructor(surface: Surface, shapeLibrary?: ShapeLibrary<ObjectData>);
    private _cancel;
    export(options?: SvgExportUIOptions): void;
}
export declare class ImageExporterUI {
    underlay: HTMLElement;
    overlay: HTMLElement;
    closeButton: HTMLElement;
    surface: Surface;
    shapeLibrary: ShapeLibrary<ObjectData>;
    constructor(surface: Surface, shapeLibrary?: ShapeLibrary<ObjectData>);
    private _cancel;
    private _export;
    export(options?: ImageExportUIOptions): void;
    /**
     * @internal
     * @param exporter
     * @param options
     * @param onready
     * @param width
     * @private
     */
    private _actuallyDoExport;
}
export {};
