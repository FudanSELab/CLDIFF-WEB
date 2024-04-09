import { AbstractLayout, InternalLayoutOptions, LayoutParameters } from "./abstract-layout";
import { Node, Group, Vertex } from "../model/graph";
import { PointXY } from "../../ui-core/util/util";
import { DataSource } from "../datasource";
/**
 * Parameters for a layout that extends AbsoluteBackedLayout
 * @public
 */
export interface AbsoluteBackedLayoutParameters extends LayoutParameters {
    /**
     * Defaults to false. If true, then the layout will use any position values found in the data for a given vertex.
     */
    absoluteBacked?: boolean;
}
/**
 * Base class for layouts that want to be backed with an absolute layout, ie. if for a given vertex there is positioning
 * data available in the dataset, that positioning data should be used instead of the layout's computed position.
 * @public
 */
export declare abstract class AbsoluteBackedLayout<P extends AbsoluteBackedLayoutParameters> extends AbstractLayout<P> {
    private _$_suppliedLocationFunction;
    /**
     * @internal
     */
    defaultMagnetized: boolean;
    /**
     * @internal
     */
    absoluteBacked: boolean;
    /**
     * @internal
     */
    constructor(params: InternalLayoutOptions<P>);
    /**
     * @internal
     */
    _vertexAdded(params: {
        el: any;
        pos?: PointXY;
        vertex: Vertex;
        parameters?: LayoutParameters;
    }, eventInfo?: any): PointXY;
    private _defaultLocationFunction;
    private _$_findLocation;
    /**
     * @internal
     */
    begin(toolkit: DataSource, parameters: AbsoluteBackedLayoutParameters): void;
    /**
     * @internal
     */
    step(toolkit: DataSource, parameters: AbsoluteBackedLayoutParameters): void;
    /**
     * @internal
     */
    canMagnetize(id: string): boolean;
    /**
     * @internal
     */
    end(toolkit: DataSource, parameters: AbsoluteBackedLayoutParameters, wasMagnetized: boolean): void;
    /**
     * @internal
     */
    reset(): void;
    /**
     * Gets the position for the given Node/Group as dictated by either the `left`/`top` properties, or some other nominated pair, in the Node/Group's data.
     * This position is what the Absolute layout uses itself, and this method exposes the absolute position for subclasses that wish to make use
     * of the absolute backing.
     * @param v Node/Group to get absolute position for.
     * @param parameters Constructor parameters. May contain a custom `locationFunction`.
     * @public
     */
    getAbsolutePosition(v: Node | Group, parameters?: LayoutParameters): PointXY;
}
/**
 * Constructor parameters for an AbsoluteLayout.
 * @public
 */
export interface AbsoluteLayoutParameters extends AbsoluteBackedLayoutParameters {
}
/**
 * This layout uses `left` and `top` positions in your data model to position elements, unless you provide a `locationFunction` in its
 * options.
 * @public
 */
export declare class AbsoluteLayout extends AbsoluteBackedLayout<AbsoluteLayoutParameters> {
    /**
     * Defines the AbsoluteLayout type. You can use this reference in render params.
     * @public
     */
    static type: string;
    /**
     * @internal
     */
    readonly type: string;
    /**
     * @internal
     */
    constructor(params: InternalLayoutOptions<AbsoluteLayoutParameters>);
    /**
     * @internal
     */
    getDefaultParameters(): Record<string, any>;
}
