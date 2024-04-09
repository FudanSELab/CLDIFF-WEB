import * as React from "react";
import { Surface, DataGeneratorFunction, DropManager, SurfaceDropManager, PointXY, Edge, Group, Node, BrowserElement } from "@jsplumbtoolkit/browser-ui";
import { BrowserUIReact } from "./browser-ui-react";
/**
 * Props for the `JsPlumbToolkitDragDropComponent`. Most users will probably want to use the `SurfaceDropComponent` instead.
 * @public
 */
export interface DragDropProps {
    /**
     * Function to call when an item is dropped on an edge.
     */
    onEdgeDrop?: (surface: Surface, data: any, edge: Edge, positionOnSurface: PointXY, e: BrowserElement, evt: Event, pageLocation: PointXY) => any;
    /**
     * Function to call when an item is dropped on whitespace in the canvas
     */
    onCanvasDrop?: (surface: Surface, data: any, position: PointXY) => any;
    /**
     * Function to call when an item is dropped on ane existing vertex.
     */
    onDrop?: (surface: Surface, data: any, target: Node | Group, position: PointXY, draggedElement: BrowserElement, e: Event) => any;
    /**
     * CSS 3 selector identifying what child elements of `container` are draggable.
     */
    selector: string;
    /**
     * The DOM element inside which to look for draggable elements.
     */
    container: Element;
    /**
     * The surface to attach to.
     */
    surface: Surface;
    /**
     * Function to use to get a dataset for an item that is being dragged.
     */
    dataGenerator?: DataGeneratorFunction<any>;
}
/**
 * State object for drag/drop component.
 * @public
 */
export interface DragDropState {
}
/**
 * Provides a React component wrapper around the Toolkit's DropManager.
 * @public
 */
export declare class JsPlumbToolkitDragDropComponent extends React.Component<DragDropProps, DragDropState> {
    surface: Surface;
    toolkit: BrowserUIReact;
    container: Element;
    dropManager: DropManager<any>;
    constructor(props: DragDropProps);
    componentDidMount(): void;
}
/**
 * Props for `SurfaceDropComponent`
 */
export interface SurfaceDropProps {
    /**
     * Surface to attach to
     */
    surface: Surface;
    /**
     * CSS 3 selector identifying what child elements of `container` are draggable.
     */
    selector: string;
    /**
     * The DOM element inside which to look for draggable elements.
     */
    container: Element;
    /**
     * Whether or not to allow drop on edge. Defaults to false.
     */
    allowDropOnEdge?: string;
    /**
     * Whether or not to allow drop on whitespace in the canvas. Defaults to true.
     */
    allowDropOnCanvas?: string;
    /**
     * Whether or not to allow drop on existing vertices. Defaults to true.
     */
    allowDropOnGroup?: string;
    /**
     * Function to use to get a dataset for an item that is being dragged.
     */
    dataGenerator?: DataGeneratorFunction<any>;
    /**
     * Function to use to get the type of an item that is being dragged.
     */
    typeGenerator?: (el: Element) => string;
    /**
     * Function to use to determine whether an item that is being dragged represents a group.
     */
    groupIdentifier?: (d: any, el: Element) => boolean;
}
export interface SurfaceDropState {
}
/**
 * Surface Drop Component - draggable nodes. This is an abstract component. You are expected to provide the `render` method.
 *
 * @param surface The surface component to attach to.
 * @param container The DOM element that contains the draggables.
 * @param selector CSS selector identifying elements to configure as draggables.
 * @param dataGenerator function to use to generate data for some dragged element.
 * @param typeGenerator Optional function to use to generate type for some element data; defaults to using the `type` member of the data.
 * @param groupIdentifier Optional function to use to distinguish between nodes/groups. Defaults to testing `jtk-is-group="true"` on the dragged element.
 * @param allowDropOnEdge Optional, defaults to true. When a node/group is dropped on an existing edge it is injected between the source and target of that edge and the original edge is removed.
 * @param allowDropOnCanvas Optional, defaults to true. When a node/group is dropped on the canvas, it is added to the dataset and rendered.
 * @param allowDropOnGroup Optional, defaults to true. When a node is dropped on a group it is rendered and added to the group.
 */
export declare class SurfaceDropComponent extends React.Component<SurfaceDropProps, SurfaceDropState> {
    surface: Surface;
    toolkit: BrowserUIReact;
    container: Element;
    dropManager: SurfaceDropManager<any>;
    constructor(props: SurfaceDropProps);
    componentDidMount(): void;
}
