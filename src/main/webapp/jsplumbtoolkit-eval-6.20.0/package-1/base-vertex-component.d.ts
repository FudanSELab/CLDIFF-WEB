import * as React from "react";
import { Surface, Node } from "@jsplumbtoolkit/browser-ui";
import { BrowserUIReact } from "./browser-ui-react";
export interface PropsWithContext {
    ctx?: Record<string, any>;
}
export type BaseVertexState = Record<string, any>;
export type BasePortState = BaseVertexState;
/**
 * Base class for port/group/node components. Internal.
 * @internal
 */
export declare class BaseVertexComponent<P extends PropsWithContext, S extends BaseVertexState, PS extends BasePortState = any> extends React.Component<P, S> {
    toolkit: BrowserUIReact;
    surface: Surface;
    vertex: Node;
    constructor(props: P);
    removeVertex(): void;
    componentWillUnmount(): void;
}
