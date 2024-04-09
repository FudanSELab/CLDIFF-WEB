import * as React from 'react';
import { Surface, Node, Group } from "@jsplumbtoolkit/browser-ui";
import { BrowserUIReact } from "./browser-ui-react";
/**
 * Props for the miniview component.
 * @public
 */
export interface MiniviewProps {
    /**
     * Surface to attach to. Required.
     */
    surface: Surface;
    /**
     * Optional filter to decide which elements to show in the miniview.
     * @param obj
     */
    elementFilter?: (obj: Node | Group) => boolean;
    /**
     * Optional function to use to decorate miniview elements with a `jtk-miniview-type` attribute. Can be used for simple styling.
     * @param obj
     */
    typeFunction?: (obj: Node | Group) => string;
    /**
     * Defaults to true, meaning the miniview actively updates as nodes/groups are dragged on the related surface. If this is set
     * to false, the miniview only updates after mouseup.
     */
    activeTracking?: boolean;
    /**
     * Defaults to true, meaning a click on a node/group in the miniview will cause that node/group to be centered in the related surface.
     */
    clickToCenter?: boolean;
}
export interface MiniviewState {
}
/**
 * jsPlumb Toolkit Miniview Component
 * @public
 */
export declare class JsPlumbToolkitMiniviewComponent extends React.Component<MiniviewProps, MiniviewState> {
    toolkit: BrowserUIReact;
    surface: Surface;
    _container: any;
    elementFilter: (obj: Node | Group) => boolean;
    typeFunction: (obj: Node | Group) => string;
    activeTracking: boolean;
    clickToCenter: boolean;
    constructor(props: MiniviewProps);
    render(): JSX.Element;
    componentDidMount(): void;
}
