import { Node } from "@jsplumbtoolkit/browser-ui";
import { BaseVertexComponent, PropsWithContext } from "./base-vertex-component";
/**
 * Base component that your node components can extend, to get access to a few helper methods.  It is not imperative
 * that you extend this component.
 */
export declare class BaseNodeComponent<P extends PropsWithContext, S> extends BaseVertexComponent<P, S> {
    node: Node;
    constructor(props: P);
    /**
     * Removes the node that this component represents.
     */
    removeNode(): void;
    /**
     * Updates the node that this component represents.
     * @param data
     */
    updateNode(data: Record<string, any>): void;
}
