import { ComponentTypeDescriptor } from '../type-descriptors';
import { JsPlumbInstance } from "../core";
import { Endpoint } from "../endpoint/endpoint";
import { BeforeDropParams } from '../callbacks';
import { PointXY } from "../../util/util";
import { PaintStyle } from "../../common/paint-style";
import { Connection } from "../connector/connection-impl";
export declare type ComponentParameters = Record<string, any>;
export declare function isConnection(c: any): c is Connection<any>;
export declare function isEndpoint(c: any): c is Endpoint<any>;
export declare const COMPONENT_TYPE_ENDPOINT = "endpoint";
export declare const COMPONENT_TYPE_CONNECTION = "connection";
/**
 * @internal
 */
export declare function _removeTypeCssHelper<E>(component: ComponentBase, typeId: string): void;
/**
 * helper method to update the hover style whenever it, or paintStyle, changes.
 * we use paintStyle as the foundation and merge hoverPaintStyle over the top.
 * @internal
*/
export declare function _updateHoverStyle<E>(component: ComponentBase): void;
/**
 * Defines the method signature for the callback to the `beforeDetach` interceptor. Returning false from this method
 * prevents the connection from being detached. The interceptor is fired by the core, meaning that it will be invoked
 * regardless of whether the detach occurred programmatically, or via the mouse.
 * @public
 */
export declare type BeforeConnectionDetachInterceptor = (c: Connection<any>) => boolean;
/**
 * Defines the method signature for the callback to the `beforeDrop` interceptor.
 * @public
 */
export declare type BeforeConnectionDropInterceptor = (params: BeforeDropParams) => boolean;
/**
 * The parameters passed to a `beforeDrag` interceptor.
 * @public
 */
export interface BeforeDragParams<E> {
    endpoint: Endpoint<E>;
    source: E;
    sourceId: string;
    connection: Connection<any>;
}
/**
 * The parameters passed to a `beforeStartDetach` interceptor.
 * @public
 */
export interface BeforeStartConnectionDetachParams<E> extends BeforeDragParams<E> {
}
/**
 * Defines the method signature for the callback to the `beforeDrag` interceptor. This method can return boolean `false` to
 * abort the connection drag, or it can return an object containing values that will be used as the `data` for the connection
 * that is created.
 * @public
 */
export declare type BeforeDragInterceptor<E = any> = (params: BeforeDragParams<E>) => boolean | Record<string, any>;
/**
 * Defines the method signature for the callback to the `beforeStartDetach` interceptor.
 * @public
 */
export declare type BeforeStartConnectionDetachInterceptor<E = any> = (params: BeforeStartConnectionDetachParams<E>) => boolean;
/**
 * @internal
 */
export interface ComponentOptions {
    parameters?: Record<string, any>;
    hoverClass?: string;
    scope?: string;
    cssClass?: string;
    data?: any;
    id?: string;
}
/**
 * @internal
 */
export declare const ADD_CLASS_ACTION = "add";
/**
 * @internal
 */
export declare const REMOVE_CLASS_ACTION = "remove";
/**
 * @internal
 */
export declare type ClassAction = typeof ADD_CLASS_ACTION | typeof REMOVE_CLASS_ACTION;
/** @internal */
export interface ComponentBase {
    id: string;
    deleted: boolean;
    instance: JsPlumbInstance;
    /**
     * @internal
     */
    _typeCache: {};
    objectType: string;
    visible: boolean;
    /**
     * @internal
     */
    paintStyle: PaintStyle;
    /**
     * @internal
     */
    hoverPaintStyle: PaintStyle;
    /**
     * @internal
     */
    paintStyleInUse: PaintStyle;
    _hover: boolean;
    getXY(): PointXY;
    hoverClass: string;
    cssClass: string;
    _types: Set<string>;
    data: Record<string, any>;
    parameters: Record<string, string>;
    _defaultType: ComponentTypeDescriptor;
}
/**
 * Base class for Endpoint and Connection.
 * @public
 */
export declare abstract class Component implements ComponentBase {
    instance: JsPlumbInstance;
    /**
     * @internal
     */
    abstract objectType: string;
    /**
     * @internal
     * @deprecated overlays not supported on endpoints from 6.9.0
     */
    abstract getDefaultOverlayKey(): string;
    /**
     * @internal
     */
    abstract idPrefix: string;
    /**
     * @internal
     */
    abstract getXY(): PointXY;
    /**
     * @internal
     */
    defaultLabelLocation: number | [number, number];
    /**
     * @internal
     */
    clone: () => ComponentBase;
    /**
     * @internal
     */
    deleted: boolean;
    /**
     * @internal
     */
    segment: number;
    /**
     * @internal
     */
    x: number;
    /**
     * @internal
     */
    y: number;
    /**
     * @internal
     */
    w: number;
    /**
     * @internal
     */
    h: number;
    /**
     * @internal
     */
    id: string;
    /**
     * @internal
     */
    visible: boolean;
    typeId: string;
    /**
     * @internal
     */
    params: Record<string, any>;
    /**
     * @internal
     */
    paintStyle: PaintStyle;
    /**
     * @internal
     */
    hoverPaintStyle: PaintStyle;
    /**
     * @internal
     */
    paintStyleInUse: PaintStyle;
    /**
     * @internal
     */
    _hover: boolean;
    /**
     * @internal
     */
    lastPaintedAt: string;
    /**
     * @internal
     */
    data: Record<string, any>;
    /**
     * @internal
     */
    _defaultType: ComponentTypeDescriptor;
    /**
     * @internal
     */
    events: any;
    /**
     * @internal
     */
    parameters: ComponentParameters;
    /**
     * @internal
     */
    _types: Set<string>;
    /**
     * @internal
     */
    _typeCache: {};
    /**
     * @internal
     */
    cssClass: string;
    /**
     * @internal
     */
    hoverClass: string;
    protected constructor(instance: JsPlumbInstance, idPrefix: string, params?: ComponentOptions);
}
export declare const Components: {
    create(instance: JsPlumbInstance, idPrefix: string, params?: ComponentOptions): ComponentBase;
    addClass(c: ComponentBase, clazz: string, cascade?: boolean): void;
    /**
     * Removes a css class from the component
     * @param clazz Class to remove. May be a space separated list.
     * @param cascade This is for subclasses to use, if they wish to. For instance, a Connection might want to optionally cascade a css class
     * removal down to its endpoints.
     * @public
     */
    removeClass(c: ComponentBase, clazz: string, cascade?: boolean): void;
    cacheTypeItem(c: ComponentBase, key: string, item: any, typeId: string): void;
    reapplyTypes(c: ComponentBase, params?: any): void;
    /**
     * @internal
     */
    hasType(c: ComponentBase, typeId: string): boolean;
    removeType(c: ComponentBase, typeId: string, params?: any): void;
    /**
     * @internal
     */
    addType(c: ComponentBase, typeId: string, params?: any): void;
    /**
     * @internal
     */
    getCachedTypeItem(c: ComponentBase, key: string, typeId: string): any;
    setPaintStyle(c: ComponentBase, style: PaintStyle): void;
    /**
     * @internal
     */
    setHoverPaintStyle(c: ComponentBase, style: PaintStyle): void;
    getType(c: ComponentBase): string[];
    toggleType(c: ComponentBase, typeId: string, params?: any): void;
    clearTypes(c: ComponentBase, params?: any): void;
    setType(c: ComponentBase, typeId: string, params?: any): void;
    applyType(c: ComponentBase, t: any, params?: any): void;
    appendToDefaultType(c: ComponentBase, obj: Record<string, any>): void;
    mergeParameters(c: ComponentBase, p: ComponentParameters): void;
    /**
     * Gets any backing data stored against the given component.
     * @public
     */
    getData(c: ComponentBase): Record<string, any>;
    /**
     * Sets backing data stored against the given component, overwriting any current value.
     * @param d
     * @public
     */
    setData(c: ComponentBase, d: any): void;
    /**
     * Merges the given backing data into any current backing data.
     * @param d
     * @public
     */
    mergeData(c: ComponentBase, d: any): void;
    destroy(c: ComponentBase): void;
    setVisible(c: ComponentBase, v: boolean): void;
};
