import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { JsPlumbToolkit } from "../core/toolkit";
import { Surface } from "../browser-ui/surface";
import { BrowserJsPlumbInstance } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { Grid, RectangleXY } from "../ui-core/util/util";
import { Vertex, ObjectData } from "../core/model/graph";
/**
 * Options for the drawing tools plugin
 * @public
 */
export interface DrawingToolsPluginOptions extends SurfacePluginOptions {
    /**
     * Attribute to use for vertex width - defaults to 'width'
     */
    widthAttribute?: string;
    /**
     * Attribute to use for vertex height - defaults to 'height'
     */
    heightAttribute?: string;
    /**
     * Attribute to use for vertex left position - defaults to 'left'
     */
    leftAttribute?: string;
    /**
     * Attribute to use for vertex top position - defaults to 'top'
     */
    topAttribute?: string;
    /**
     * Optional callback invoked after an edit has occurred
     */
    onEdit?: () => any;
    /**
     * Defaults to false, meaning the drawing tool plugin switches on whenever a new vertex is
     * selected.
     */
    onDemand?: boolean;
    /**
     * Minimum height the user can shrink a vertex to. Defaults to 30.
     */
    minimumHeight?: number;
    /**
     * Minimum width the user can shrink a vertex to. Defaults to 30.
     */
    minimumWidth?: number;
    /**
     * Defaults to false, meaning size changes conform to an underlying grid, if present
     */
    ignoreGrid?: boolean;
    /**
     * Defaults to true, meaning groups will not be shrunk to the point that one or more of their child vertices
     * is no longer visible.
     */
    constrainGroups?: boolean;
}
export declare class DrawingToolsPlugin implements SurfacePlugin {
    static type: string;
    surface: Surface;
    toolkit: JsPlumbToolkit;
    jsp: BrowserJsPlumbInstance;
    widthAtt: string;
    heightAtt: string;
    leftAtt: string;
    topAtt: string;
    xAxis: boolean;
    yAxis: boolean;
    onEdit: (o: any) => any;
    onDemand: boolean;
    skeletons: Record<string, any>;
    private downAt;
    private handler;
    private toolkitDragObject;
    private x1;
    private x2;
    private y1;
    private y2;
    minimumHeight: number;
    minimumWidth: number;
    currentMinimumWidth: number;
    currentMinimumHeight: number;
    ignoreGrid: boolean;
    grid: Grid;
    _constrainGroups: boolean;
    _moving: boolean;
    destroy(): void;
    initialise(surface: Surface, options: DrawingToolsPluginOptions & InternalSurfacePluginOptions): boolean;
    /**
     * Gets the origin and size of an element that is being managed by the Surface.
     * @param el Vertex id, element, or Vertex to get position for.
     * @returns A RectangleXY if element was found, otherwise null.
     */
    getCoordinates(el: string | Element | Vertex): RectangleXY;
    reset(): void;
    private _minWidth;
    private _minHeight;
    private _create;
    private _remove;
    private _deselect;
    private _select;
    private _dim;
    _dragHandlers: Record<string, (dx: number, dy: number) => ObjectData>;
    edit(obj: any): void;
}
