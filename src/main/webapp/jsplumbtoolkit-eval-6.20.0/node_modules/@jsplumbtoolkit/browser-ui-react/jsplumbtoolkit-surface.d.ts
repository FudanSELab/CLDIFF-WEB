import * as React from 'react';
import { SurfaceViewOptions, Surface, Vertex, SurfaceRenderOptions, BrowserElement } from "@jsplumbtoolkit/browser-ui";
import { BrowserUIReact } from "./browser-ui-react";
/**
 * Props for the Surface component. You are expected to provide, at a minimum, an instance of `BrowserUIReact` to this component (as the prop 'toolkit'), and
 * in practise you will also almost certainly want to pass a `view` and `renderParams`.
 *
 * @public
 */
export interface SurfaceProps {
    /**
     * Render parameters such as layout, drag options etc
     */
    renderParams?: SurfaceRenderOptions;
    /**
     * The toolkit to render. Required.
     */
    toolkit: BrowserUIReact;
    /**
     * Mappings of vertex types to components/jsx and edge types.
     */
    view?: any;
    /**
     * Any props to pass to children.
     */
    childProps?: any;
}
/**
 * @internal
 */
export interface SurfaceState {
    vertices: Array<VertexRepresentation>;
}
/**
 * @internal
 */
interface VertexRepresentationPayload {
    data: Record<string, any>;
    toolkit: BrowserUIReact;
    surface: Surface;
    surfaceComponent: JsPlumbToolkitSurfaceComponent;
    componentId: string;
    vertex: Vertex;
    props: any;
    element: Element;
    eventInfo: any;
}
/**
 * @internal
 */
interface VertexRepresentation {
    data: Record<string, any>;
    def: any;
    payload: VertexRepresentationPayload;
    domElement: BrowserElement;
    key: string;
    node: Vertex;
    hydrated: boolean;
}
/**
 * Provides a React component that fronts a surface widget.
 *
 * See the Toolkit documentation for usage.
 *
 * @public
 */
export declare class JsPlumbToolkitSurfaceComponent extends React.Component<SurfaceProps, SurfaceState> {
    /** @internal */
    view: SurfaceViewOptions;
    toolkit: BrowserUIReact;
    /** @internal */
    renderParams: any;
    surface: Surface;
    /** @internal */
    _container: Element;
    /** @internal */
    mounted: boolean;
    /** @internal */
    private _vertices;
    /** @internal */
    _temporaryContainer: HTMLElement;
    /** @internal */
    constructor(props: any);
    /** @internal */
    componentDidMount(): void;
    /** @internal */
    private _updateVertexState;
    /** @internal */
    private _mountComponent;
    /**
     * Wraps JSX/Component for some vertex in a functional component that can call back once it has mounted.
     * @internal
     * @param ns
     * @private
     */
    private _generateComponent;
    /** @internal */
    render(): JSX.Element;
    /** @internal */
    componentWillUnmount(): void;
}
export {};
