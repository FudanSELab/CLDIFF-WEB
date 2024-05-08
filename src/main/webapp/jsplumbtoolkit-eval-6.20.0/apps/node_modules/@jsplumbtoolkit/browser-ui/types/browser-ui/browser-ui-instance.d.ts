import { Surface } from "./surface";
import { SurfaceRenderOptions } from './surface-render-options';
import { JsPlumbToolkit } from "../core/toolkit";
import { DataLoadOptions } from "../core/io";
import { Base, Group, ObjectData, Vertex, Node } from "../core/model/graph";
import { DataSource } from "../core/datasource";
import { LayoutParameters } from "../core/layout/abstract-layout";
import { PointXY, Size } from "../ui-core/util/util";
import { AnchorSpec, ArrayAnchorSpec } from "../ui-core/common/anchor";
import { PaintStyle } from "../ui-core/common/paint-style";
import { EndpointSpec, EndpointStyle } from "../ui-core/common/endpoint";
import { ConnectorSpec } from "../ui-core/common/connector";
import { OverlaySpec } from "../ui-core/common/overlay";
import { ObjectAnchorSpec } from "./browser-ui-model";
/**
 * Base instance of the Toolkit that uses ajax to load data asynchronously. This class is extended in the various `browser-ui-***` integrations and
 * in this package as `BrowserUI`.
 */
export declare abstract class BrowserUIBase extends JsPlumbToolkit {
    loadData(options: DataLoadOptions): void;
    abstract render(container: Element, options?: SurfaceRenderOptions): Surface;
}
/**
 * Defines a template renderer
 * @public
 */
export interface TemplateRenderer<E> {
    /**
     * Whether or not vertices are rendered asynchronously, or in the current event loop. The vanilla renderer and certain
     * other library integrations such as Angular and Vue2 or not asynchronous. But Vue3 and React 18 are.
     */
    asynchronous: boolean;
    /**
     * Whether or not the Surface can expect the renderer to detect data model changes that require a refresh of a given
     * vertex's DOM representation. For vanilla and Svelte this is false; all the other library integrations set this to true.
     */
    reactive: boolean;
    render(templateId: string, data: ObjectData, dataSource: DataSource, objectType: string, renderer: Surface, def: any, obj: Base, node: Node, eventInfo?: any): void;
    cleanupVertex(objId: string, el: E): void;
    cleanupPort(objId: string, el: E): void;
    addTemplate?(id: string, content: string): void;
    update(el: E, data: ObjectData, v: Vertex, renderer: Surface): void;
}
/**
 * @internal
 */
export declare function attWithValue(att: string, value: any): string;
/**
 * This method is not intended to be used by a library user - you should use the `render` method on the Toolkit instance instead.
 *
 * Configures the given element as a Surface, registering it so that it reflects any changes to the underlying data. If
 * there is any data in the Toolkit at the time of this call it is rendered; any data subsequently loaded is automatically
 * rendered. You can supply layout arguments to this method (layout type + layout specific parameters), as well as jsPlumb rules for
 * endpoints, paint styles etc.
 * @param toolkit The JsPlumbToolkit to render
 * @param container The Element to render into
 * @param renderer Template renderer to use - abstracts out the Toolkit's own templates vs Angular/React/Vue etc
 * @param options Render options
 * @internal
 */
export declare function render(toolkit: BrowserUIBase, container: Element, renderer: TemplateRenderer<any>, options?: SurfaceRenderOptions): Surface;
export declare type BindableEvent = "click" | "dblclick" | "mouseover" | "mouseout" | "mousedown" | "mouseup" | "tap" | "dbltap" | "contextmenu";
export declare type SurfaceEvent = "node:add" | "node:render" | "node:remove" | "node:move:start" | "node:move:end" | "edge:add" | "edge:remove" | "port:add" | "port:remove" | "anchorChanged" | "modeChanged" | "objectRepainted" | "pan" | "zoom" | "canvasClick" | "canvasDblClick" | "relayout";
export declare type SurfaceBindableEvent = BindableEvent | SurfaceEvent;
export declare type ViewEventOptions = {
    [K in BindableEvent]?: Function;
};
export interface SurfaceSelector {
    selector: string;
    source?: boolean;
    target?: boolean;
    portId?: string;
    portType?: string;
    edgeType?: string;
}
/**
 * Common options for edge/node/group/port definitions in a view.
 * @public
 */
export interface ViewOptionsCommon {
    /**
     * Optional ID of one or more edge definitions to include in this definition. The child definition is merged on top of
     * the parent definition(s). Circular references are not allowed and will throw an error.
     */
    parent?: string | Array<string>;
    /**
     * Optional map of event bindings.
     */
    events?: ViewEventOptions;
    /**
     * When merging a type description into its parent(s), values in the child for `connector`, `anchor` and `anchors` will
     * always overwrite any such values in the parent. But other values, such as `overlays`, will be merged with their
     * parent's entry for that key. You can force a child's type to override _every_ corresponding value in its parent by
     * setting `mergeStrategy:'override'`.
     */
    mergeStrategy?: string;
}
/**
 * Base view definition options for nodes and ports (and groups, since they extend nodes)
 * @public
 */
export interface ViewNodeOrPortOptions extends ViewOptionsCommon {
    /**
     * Whether or not to allow edges from this vertex back to itself. Defaults to true.
     * This flag will not prevent an edge from a port back to the node/group to
     * which it belongs - for that, see `allowVertexLoopback`.
     */
    allowLoopback?: boolean;
    /**
     * ID of the template to use for a vertex of this type. This is only for 'vanilla' Toolkit: if you are using an integration such as React/Angular/Vue, you
     * will not need to provide this. This parameter is distinct from `template` in that when you provide `templateId` you are expecting the Toolkit to resolve
     * the template for you, either from a `templates` block in a `render` call, or by looking for a script element in the DOM with the appropriate ID. If you
     * provide this and also `template`, `template` will take precedence.
     */
    templateId?: string;
    /**
     * Template to use for a vertex of this type. This is only for 'vanilla' Toolkit: if you are using an integration such as React/Angular/Vue/Svelte, you
     * will not need to provide this. If you provide this and also `templateId`, this will take precedence.
     */
    template?: string;
    /**
     * Whether or not to allow edges from a port back to the vertex it belongs to. Defaults to true.
     */
    allowVertexLoopback?: boolean;
    /**
     * Optional function to call on connection drop, to determine the location for the target anchor for the new connection. Returning null
     * from this indicates no preference, and the Toolkit will use its own computed value. Note that the return value from this method is `ArrayAnchorSpec`,
     * meaning an array in the format [ x, y, orientationX, orientationY, offsetX, offsetY ]. Note also that `offsetX` and `offsetY` are optional,
     * and will be defaulted to 0.
     * @param el
     * @param pos
     * @param vertex
     * @param def
     * @param evt
     */
    anchorPositionFinder?: (el: Element, pos: PointXY, vertex: Node | Group, def: ViewNodeOptions, evt: Event) => ArrayAnchorSpec | null;
    /**
     * A map of parameters that the template engine will merge with the backing data when rendering the vertex.
     */
    parameters?: Record<string, any>;
    /**
     * Maximum number of connections this vertex supports. Default is 1. A value of -1 means no limit.
     */
    maxConnections?: number;
    /**
     * Optional array of anchor positions to use.
     */
    anchorPositions?: Array<ObjectAnchorSpec>;
}
/**
 * The mapping for the definition of a node inside a view.
 * @public
 */
export interface ViewNodeOptions extends ViewNodeOrPortOptions {
    /**
     * Optional default size to use for the vertex. This is not used to set the size in the DOM for a vertex - it is used
     * to insert `width` and `height` values into the backing data for any vertex of this type that does not have them set.
     */
    defaultSize?: Size;
}
/**
 * The mapping for the definition of an edge inside a view.
 * @public
 */
export interface ViewEdgeOptions extends ViewOptionsCommon {
    /**
     * Name/definition of the connector to use. If you omit this, the default connector will be used.
     */
    connector?: ConnectorSpec;
    /**
     * Spec for the anchor to use for both source and target for edges of this type.
     */
    anchor?: AnchorSpec;
    /**
     * [source, target] anchor specs edges of this type.
     */
    anchors?: [AnchorSpec, AnchorSpec];
    /**
     * Paint style to use for the edge.
     */
    paintStyle?: PaintStyle;
    /**
     * Paint style to use for the edge when the pointer is hovering over it.
     */
    hoverPaintStyle?: PaintStyle;
    /**
     * Array of overlays to add to edges of this type.
     */
    overlays?: Array<OverlaySpec>;
    /**
     * Optional spec to use for both the source and target endpoints for edges of this type.
     */
    endpoint?: EndpointSpec;
    /**
     * Optional specs for the [source, target] endpoints for edges of this type.
     */
    endpoints?: [EndpointSpec, EndpointSpec];
    /**
     * Optional paint style to use for both the source and target endpoints for edges of this type.
     */
    endpointStyle?: EndpointStyle;
    /**
     * Optional paint styles to use for the [source, target] endpoints for edges of this type.
     */
    endpointStyles?: [EndpointStyle, EndpointStyle];
    /**
     * Optional paint style to use for hover on both the source and target endpoints for edges of this type.
     */
    endpointHoverStyle?: EndpointStyle;
    /**
     * Optional paint style to use for hove on the [source, target] endpoints for edges of this type.
     */
    endpointHoverStyles?: [EndpointStyle, EndpointStyle];
    /**
     * CSS class to add to edges of the type in the UI
     */
    cssClass?: string;
    /**
     * Whether or not edges of this type should be detachable with the mouse. Defaults to true.
     */
    detachable?: boolean;
    /**
     * Optional label to use for the edge. If this is set, a label overlay will be created and the value of `label` will be used
     * as the overlay's label. This value can be parameterised, in order to extract a value from the edge's backing data, eg. if you set `label:"{{name}}"`
     * then the Toolkit would attempt to extract a property with key `name` from the edge's backing data, and use that property's value as
     * the label.
     */
    label?: string;
    /**
     * Optional css class to set on the label overlay created if `label` is set. This is a static string and does not support
     * parameterisation like `label` does.
     */
    labelClass?: string;
    /**
     * Optional location for the label. If not provided this defaults to 0.5, but the label location can be controlled via the
     * `labelLocationAttribute`.
     */
    labelLocation?: number;
    /**
     * This defaults to `labelLocation`, and indicates the name of a property whose value can be expected to hold the location at
     * which the label overlay should be located. The default value for this is `labelLocation`, but the key here is that the Toolkit
     * looks in the edge data for `labelLocation`, so the location is dynamic, and can be changed by updating `labelLocation`.
     * This parameter allows you to change the name of the property that the Toolkit will look for in the edge data.
     */
    labelLocationAttribute?: string;
    /**
     * Optional width of the edge's outline. Defaults to 0.
     */
    outlineWidth?: number;
    /**
     * Whether or not when a user detaches a edge of this type it should be automatically
     * reattached. Defaults to false.
     */
    reattach?: boolean;
    useHTMLLabel?: boolean;
}
/**
 * The mapping for the definition of a group inside a view.
 * @public
 */
export interface ViewGroupOptions extends ViewNodeOptions {
    /**
     * True by default - indicates that nodes/groups may be dropped onto the group, either from some other group or from the main canvas.
     */
    droppable?: boolean;
    /**
     * False by default - nodes/groups may be dragged outside of the bounds of the group. When you do drag a node/group outside of the bounds of its parent, what happens next depends on the other flags you have set and where you have dropped it. `orphan:true`, for instance, will cause the node/group to be removed from its parent group. `revert` will reinstate the node/group's position inside its parent, unless it was dropped on another group.
     */
    constrain?: boolean;
    /**
     * True by default - a node/group dragged outside of its parent group will, unless dropped on another group, revert back to its position inside the group.
     */
    revert?: boolean;
    /**
     * False by default. If true, Nodes dropped outside of the Group (and not dropped onto another Group) are removed from the dataset (not just the Group...the entire dataset).
     */
    prune?: boolean;
    /**
     * False by default. If true, nodes/groups dropped outside of the group (and not dropped onto another group) are removed from the group (but remain in the dataset). When you set this to `true`, `revert` is automatically forced to `false`.
     */
    orphan?: boolean;
    /**
     * False by default. If true, Nodes dropped onto other Groups first have any rules established by this Group applied. For instance, if the Groups stated `prune:true`, then the Node would be removed from the dataset rather than be dropped onto another Group.
     */
    dropOverride?: boolean;
    /**
     * Spec for the endpoint to use for connections to children of the group when they are transferred to the group in its collapsed state.
     */
    endpoint?: EndpointSpec;
    /**
     * Spec for the anchor to use for connections to children of the group when they are transferred to the group in its collapsed state.
     */
    anchor?: AnchorSpec;
    /**
     * False by default. From version 6.10.0 onwards this flag switches on both `autoShrink` and `autoGrow` and also enables support for shrinking a group from
     * its left or top edge, a feature that was not available in previous versions. If you're on 6.10.0+ and you want to setup your UI to be how it used to be with
     * just this flag set, also set `autoShrink` to false. If you previously had `autoShrink` set to true but you don't like the shrink from left/top functionality,
     * set `allowShrinkFromOrigin` to false.
     */
    autoSize?: boolean;
    /**
     * False by default.  If true indicates that if a child member is dragged/added/removed and the group's size is recalculated to be smaller than
     * the previous size, the new size should be applied. From 6.10.0 this also works if the group needs to shrink from its left and/or top edge. If you don't
     * want that behaviour, set `allowShrinkFromOrigin` to false.
     */
    autoShrink?: boolean;
    /**
     * When `autoShrink` or `autoSize` is set to true, this is also implicitly true, meaning that a group can be shrunk from its left/top edge. Set this to
     * default if you do not want that behaviour.
     */
    allowShrinkFromOrigin?: boolean;
    /**
     * Defaults to false, meaning that the group will not be resized if an item addition/removal or drag causes the bounds of the child members to change
     * and the new size is greater than the previous size.
     */
    autoGrow?: boolean;
    /**
     * Similar to autoGrow, but with a couple of differences:
     *
     * - elements cannot be dragged out of the group, unless the user holds down SHIFT while dragging
     * - shows a visual prompt when a group will be resized as a result of
     */
    elastic?: boolean;
    /**
     * Maximum size the group can grow to. If not specified the group can grow to an arbitrary size. Note that this behaviour
     * can also be enforced via CSS.
     */
    maxSize?: Size;
    /**
     * Minimum size the group can be. This is only used when
     */
    minSize?: Size;
    /**
     * Optional padding to set inside a group when computing an auto size.
     */
    padding?: number;
    /**
     * Options for the group's layout.
     */
    layout?: {
        type: string;
        options?: LayoutParameters;
    };
    /**
     * Whether or not to show a 'ghost' element when an element inside the group is dragged to the point that it
     * extends outside the bounds of the group. The original element remains inside the group. Defaults to false.
     */
    ghost?: boolean;
    ghostProxyParent?: any;
}
/**
 * Definition of a port inside a view.
 * @public
 */
export interface ViewPortOptions extends ViewNodeOrPortOptions {
    /**
     * Type of edges generated by this port.
     */
    edgeType?: string;
    /**
     * Whether or not the port can act as a source for dragged connections. Defaults to false.
     */
    isSource?: boolean;
    /**
     * Whether or not the port can act as a target for dragged connections. Defaults to false.
     */
    isTarget?: boolean;
    /**
     * If true, the port is rendered as an endpoint. By default this is false (meaning the port is represented by
     * some DOM element that you have rendered).
     */
    isEndpoint?: boolean;
    /**
     * If `isEndpoint` is set to true, you can provide a spec for the endpoint with this parameter.
     */
    endpoint?: EndpointSpec;
    /**
     * Spec for anchors connected to this port
     */
    anchor?: AnchorSpec;
    /**
     * Normally, each time a new connection is established a port on which `isEndpoint` is set to true, a new
     * endpoint is created for that connection. Setting this flag will cause the Toolkit to only ever create a
     * single endpoint for the port, to which all connections should be attached. Note that you may wish to
     * consider the `maxConnections` parameter if you use this, as by default the endpoint will be created with
     * a limit of 1 connection.
     */
    uniqueEndpoint?: boolean;
    /**
     * If `isEndpoint` is set to true, you can provide a spec for the endpoint's paint style with this parameter.
     */
    paintStyle?: PaintStyle;
    /**
     * If `isEndpoint` is set to true, you can provide a spec for the endpoint's hover paint style with this parameter.
     */
    hoverPaintStyle?: PaintStyle;
    /**
     * The x location of any anchors created for this port. Allows you to specify where, in proportional
     * values, the anchor should be located in the x axis. For a full discussion of how to use
     * this (and the other anchor properties in this interface), see the documentation for anchors.
     */
    anchorX?: number;
    /**
     * The y location of any anchors created for this port. Allows you to specify where, in proportional
     * values, the anchor should be located in the y axis.
     */
    anchorY?: number;
    /**
     * The orientation in the x axis for connections attached to an anchor created for this port.
     */
    anchorOrientationX?: number;
    /**
     * The orientation in the y axis for connections attached to an anchor created for this port.
     */
    anchorOrientationY?: number;
    /**
     * Offset, in pixels, to apply to the position in the x axis after the `anchorX` value has been
     * used to compute its default position.
     */
    anchorOffsetX?: number;
    /**
     * Offset, in pixels, to apply to the position in the y axis after the `anchorY` value has been
     * used to compute its default position.
     */
    anchorOffsetY?: number;
}
