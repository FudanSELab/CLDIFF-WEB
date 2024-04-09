import { PointXY } from "../ui-core/util/util";
import { Edge, Vertex } from "../core/model/graph";
import { ArrayAnchorSpec } from "../ui-core/common/anchor";
import { Connection } from "../ui-core/core/connector/connection-impl";
import { FullOverlaySpec } from "../ui-core/common/overlay";
import { ObjectAnchorSpec } from "./browser-ui-model";
/**
 * @public
 */
export interface ConnectorEditorActivateParams {
    /**
     * If true, show a button the user can use to delete the edge. Defaults to false.
     */
    deleteButton?: boolean;
    /**
     * Optional function allowing you to specify the location of the placeholder when the user
     * is dragging anchor. From 6.2.0 this is probably not of much use, as `snapToAnchors` defaults to
     * true and positions the placeholder above the anchor on which it would be dropped if the user were to
     * release the mouse button.
     * @param el
     * @param elxy
     * @param vertex
     */
    anchorPositionFinder?: (el: Element, elxy: PointXY, vertex: Vertex) => ArrayAnchorSpec | null;
    /**
     * Optional array of allowed positions for anchors to be relocated to
     */
    anchorPositions?: Array<ObjectAnchorSpec>;
    /**
     * Optional interceptor to invoke when the user presses the delete button. If the user wishes to go ahead
     * with the edge deletion, `doDelete` will be invoked.
     * @param edge
     * @param connection
     * @param doDelete
     */
    onMaybeDelete?: (edge: Edge, connection: Connection<Element>, doDelete: (data: Record<string, any>) => any) => any;
    /**
     * Optional array of overlays to decorate the edge with while it is being edited.
     */
    overlays?: Array<FullOverlaySpec>;
    /**
     * Defaults to true. While dragging an anchor, this flag ensures the editor positions the placeholder above
     * the anchor on which it would be dropped if the user were to release the mouse button. This behaviour is new in
     * 6.2.0 and the previous behaviour can be reinstated by setting this to false.
     */
    snapToAnchors?: boolean;
}
/**
 * @internal
 */
export interface ConnectorEditor {
    cleanup(): void;
    update(): void;
    reset(): void;
    activate<T extends ConnectorEditorActivateParams>(edge: Edge, connection: Connection<Element>, params?: T): void;
    deactivate(e?: Event): void;
    isActive(): boolean;
}
/**
 * @internal
 */
export interface ConstructableConnectorEditor {
    new (p: any): ConnectorEditor;
}
/**
 * @internal
 */
export interface ConnectorEditorFactory {
    create(type: string, p: any): ConnectorEditor;
    supports(type: string): boolean;
}
