import * as React from "react";
import { BasePortState, PropsWithContext } from "./base-vertex-component";
import { Surface, JsPlumbToolkit, Port, Node, Group } from "@jsplumbtoolkit/browser-ui";
export interface BasePortProps extends PropsWithContext {
    toolkit: JsPlumbToolkit;
    surface: Surface;
    vertex: Node | Group;
}
/**
 * Base class for components that render Ports. Your port components can extend this to get access to a few helper methods.
 * You are expected to supply a `parent`
 */
export declare class BasePortComponent<P extends BasePortProps, S extends BasePortState> extends React.Component<P, S> {
    toolkit: JsPlumbToolkit;
    surface: Surface;
    vertex: Node | Group;
    constructor(props: any);
    /**
     * Gets the port that this component represents.
     */
    getPort(): Port;
    /**
     * Returns the ID of the port. This is the ID of the port on its node, not the unique id of the port
     * across the entire graph.
     */
    getPortId(): string;
    /**
     * Removes the port that this component represents.
     */
    removePort(): boolean;
    /**
     * Updates the port that this component represents.
     * @param data
     */
    updatePort(data: Record<string, any>): void;
}
