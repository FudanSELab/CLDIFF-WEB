import { Group } from "@jsplumbtoolkit/browser-ui";
import { BaseVertexComponent, PropsWithContext } from "./base-vertex-component";
/**
 * Base component that your group components can extend, to get access to a few helper methods.  It is not imperative
 * that you extend this component.
 */
export declare class BaseGroupComponent<P extends PropsWithContext, S> extends BaseVertexComponent<P, S> {
    group: Group;
    constructor(props: P);
    /**
     * Removes the group that this component represents.
     */
    removeGroup(alsoRemoveChildNodes?: boolean): void;
    /**
     * Updates the group that this component represents.
     * @param data
     */
    updateGroup(data: Record<string, any>): void;
}
