import { Surface } from "./surface";
import { Constructable, Extents, PointXY } from "../ui-core/util/util";
import { AbstractLayoutAdapter } from "../core/layout/abstract-layout-adapter";
import { AbstractLayout } from "../core/layout/abstract-layout";
import { JsPlumbToolkit } from "../core/toolkit";
/**
 * Parameters for a decorator
 * @public
 */
export declare type DecorateParams = {
    surface: Surface;
    adapter: AbstractLayoutAdapter<Element>;
    layout: AbstractLayout<any>;
    append: (el: Element, id: string, pos: PointXY) => void;
    setAbsolutePosition: (el: Element, xy: PointXY) => void;
    toolkit: JsPlumbToolkit;
    bounds: Extents;
    positions: Map<string, PointXY>;
};
/**
 * @internal
 */
export declare abstract class Decorator {
    protected adapter: Surface;
    protected container: Element;
    protected constructor(params: Record<string, any>, adapter: Surface, container: Element);
    abstract reset(params: any): void;
    abstract decorate(params: DecorateParams): void;
}
/**
 * Decorator factory. Call `register` to add a new decorator type.
 * @public
 */
export declare const Decorators: {
    /**
     * @internal
     */
    get: (name: string, params: Record<string, any>, adapter: Surface, container: Element) => Decorator;
    /**
     * Register a decorator type, which you can then reference by name.
     * @param name
     * @param dec
     * @public
     */
    register: (name: string, dec: Constructable<Decorator>) => void;
};
