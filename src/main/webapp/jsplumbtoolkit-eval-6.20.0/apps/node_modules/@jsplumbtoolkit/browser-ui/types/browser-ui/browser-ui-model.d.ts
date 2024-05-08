import { ViewEdgeOptions, ViewGroupOptions, ViewNodeOptions, ViewPortOptions } from "./browser-ui-instance";
import { SurfaceViewOptions } from './surface-view-options';
import { Group, Node, Port, Vertex } from "../core/model/graph";
import { NodeDefinition, VertexDefinition } from "../core/datamodel/vertex-definition";
import { TypeDescriptor } from "../ui-core/core/type-descriptors";
import { PointXY } from "../ui-core/util/util";
import { JsPlumbToolkit } from "../core/toolkit";
import { DataModel } from "../core/datamodel/data-model";
import { JsPlumbInstance } from "../ui-core/core/core";
import { ArrayAnchorSpec } from "../ui-core/common/index";
import { AnchorOrientationHint } from "../ui-core/core/factory/anchor-record-factory";
export declare const DEFAULT_LABEL_LOCATION_ATTRIBUTE = "labelLocation";
export interface ModelOptions {
    nodes?: Record<string, UINodeDefinition>;
    edges?: Record<string, EdgeDefinition>;
    groups?: Record<string, UIGroupDefinition>;
    ports?: Record<string, UIPortDefinition>;
    states?: any;
}
/**
 * The mapping for the definition of an edge inside a view.
 * @internal
 */
export interface EdgeDefinition extends ViewEdgeOptions, TypeDescriptor {
    /**
     * Whether or not to ignore (ie. exclude from the display) edges of this type.
     */
    ignore?: boolean;
}
/**
 * Allowed event bindings for vertices in a view.
 * @public
 */
export declare type VertexDefinitionEvents<T> = {
    click: (p: {
        e: Event;
        el: Element;
        obj: T;
        renderer: any;
        toolkit: any;
    }) => any;
    mousemove: (p: {
        e: Event;
        el: Element;
        obj: T;
        renderer: any;
        toolkit: any;
    }) => any;
    dblclick: (p: {
        e: Event;
        el: Element;
        obj: T;
        renderer: any;
        toolkit: any;
    }) => any;
    tap: (p: {
        e: Event;
        el: Element;
        obj: T;
        renderer: any;
        toolkit: any;
    }) => any;
    dbltap: (p: {
        e: Event;
        el: Element;
        obj: T;
        renderer: any;
        toolkit: any;
    }) => any;
};
/**
 * Base interface for node, group and port definitions in a view.
 * @internal
 */
export interface UIVertexDefinition<T> extends ViewNodeOptions, VertexDefinition {
    ignore?: boolean;
}
export interface UINodeDefinition extends UIVertexDefinition<Node>, NodeDefinition {
}
/**
 * Definition of a port type.
 * @internal
 */
export interface UIPortDefinition extends UIVertexDefinition<Port>, ViewPortOptions {
}
/**
 * Definition of an Endpoint to be added to some Vertex. This is largely the same as a PortDefinition in the view,
 * with the exception that an EndpointDefinition supports `portId` (which is used to look up a PortDefinition, if found),
 * and also `portId`.
 * @internal
 */
export interface EndpointDefinition extends ViewPortOptions {
    /**
     * Optional ID to assign to the port backing this endpoint.
     */
    portId?: string;
    /**
     * Optional port type to use for ports backing this endpoint.
     */
    portType?: string;
}
/**
 * Definition of a group in the view.
 * @internal
 */
export interface UIGroupDefinition extends UIVertexDefinition<Group>, ViewGroupOptions {
}
declare type ModelDefinitionMap = {
    nodes: Map<string, UINodeDefinition>;
    edges: Map<string, EdgeDefinition>;
    groups: Map<string, UIGroupDefinition>;
    ports: Map<string, UIPortDefinition>;
};
/**
 * @internal
 */
export declare function shouldOverrideEndpoints(p: string, from: any): boolean;
/**
 * Extract the definition(s) with the given type and merge them,
 * @param type Type, or types, to extract. If a single type is specified that is what will be returned. If an array of types are specified they will all be merged together.
 * @param map Map from which to retrieve individual types
 * @param shouldOverride
 */
export declare function mergeWithParents<T extends {
    mergeStrategy?: string;
}>(type: Array<string> | string, map: Record<string, T>, shouldOverride?: (p: string, from: any) => boolean): any;
export declare type ObjectAnchorSpec = {
    x: number;
    y: number;
    ox: AnchorOrientationHint;
    oy: AnchorOrientationHint;
    offsetX?: number;
    offsetY?: number;
    portId?: string;
};
/**
 * @internal
 */
export declare function createFinderFromAnchorPositions(positions: Array<ObjectAnchorSpec>): (el: Element, pos: PointXY, vertex: Node | Group) => ArrayAnchorSpec | null;
/**
 * A Model describes the appearance and behaviour of a set of nodes, edges, ports and groups. You do not create one of these directly; instead you
 * pass a definition to a `render(...)` or `newInstance()` call. Although the Model has the same syntax in each context, you are
 * encouraged to configure model-specific things in the Model you pass to the `newInstance` method (such as,
 * which nodes/ports can be connected to which others, what is the maximum number of connections, etc), and
 * view-specific things (such as css classes, paint styles, connector appearance etc) to the model you pass to
 * the `render` method. The `render` method automatically merges in a node/port/edge definition from a model
 * defined on the associated Toolkit, if there is one. Only the Surface component provides this. The Toolkit instance creates a Model but it is headless.
 * @public
 */
export declare class BrowserUIModel {
    private toolkit;
    viewOptions: SurfaceViewOptions;
    defMap: ModelDefinitionMap;
    private readonly nodes;
    private readonly edges;
    private readonly groups;
    private readonly ports;
    /**
     * @internal
     */
    constructor(toolkit: JsPlumbToolkit, dataModel: DataModel, viewOptions: SurfaceViewOptions, _jsPlumb?: JsPlumbInstance);
    getEdgeDefinition(typeId: string): EdgeDefinition;
    getNodeDefinition(typeId: string): UINodeDefinition;
    getPortDefinition(typeId: string): UIPortDefinition;
    getGroupDefinition(typeId: string): UIGroupDefinition;
    getTypeDefinition<T extends Vertex>(obj: Vertex): UIVertexDefinition<T>;
}
export {};
