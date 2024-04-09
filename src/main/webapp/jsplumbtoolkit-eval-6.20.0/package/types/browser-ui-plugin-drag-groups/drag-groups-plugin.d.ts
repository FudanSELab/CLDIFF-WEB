import { SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { jsPlumbToolkitDOMElement, Surface } from "../browser-ui/surface";
import { BrowserJsPlumbInstance, DragGroupSpec } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { ObjectData, Vertex, Node } from "../core/model/graph";
import { BrowserElement } from "../ui-core/browser-ui-renderer/util";
/**
 * Options for the drag groups plugin.
 * @public
 */
export interface DragGroupsPluginOptions extends SurfacePluginOptions {
    assignDragGroup: (v: Vertex) => DragGroupSpec;
}
/**
 * Provides the ability to assign elements to groups for dragging purposes: when a member of some group is dragged, the
 * other elements of the group can be dragged along with it.
 *
 * The core concept is of the "DragGroup", which is basically just a tag. Each member of a group can belong to the
 * group in one of two roles:
 *
 * - **active** The element, when dragged, causes all of the other members of the group to be dragged too.
 * - **passive** The element, when dragged, will not cause any of the other members of the group to be dragged. But when an active
 * member of the group is dragged, passive elements are dragged at the same time.
 *
 * When you configure this plugin you are required to provide an `assignDragGroup` function, whose signature is:
 *
 * assignDragGroup:(v:Vertex) => DragGroupSpec
 *
 * The return value `DragGroupSpec` may be either:
 *
 * - a string, in which case the element is added to the drag group with the given name in an active role
 * - an object containing `id` and `active` which you can specify the active/passive role
 * - null, in which case the element is not added to a drag group.
 *
 */
export declare class DragGroupsPlugin implements SurfacePlugin {
    static type: string;
    surface: Surface;
    jsplumb: BrowserJsPlumbInstance;
    private _pendingDragGroupAssignments;
    dragGroupAssigner: (v: Vertex) => DragGroupSpec;
    initialise(surface: Surface, options: DragGroupsPluginOptions): boolean;
    destroy(): void;
    reset(): void;
    /**
     * Runs each of the given objects through the code that automatically assigns them to a drag group. Since this
     * @param objects
     * @public
     */
    assignToDragGroup(...objects: Array<string | Node | ObjectData | jsPlumbToolkitDOMElement>): void;
    /**
      * Removes the given object(s) from any drag group they may belong to. You don't need to specify the name of the drag group
      * since an object may belong to only one at a time.
      * @param objects
      * @public
      */
    removeFromDragGroup(...objects: Array<string | Node | ObjectData | BrowserElement>): void;
    /**
     * Adds the given objects to the given drag group.
     * @param spec Spec for the drag group. If you supply a string, then all objects are added to the drag group with that name, and they
     * are marked "active". If you supply an object in the form { id:string, active?:boolean } then all the objects are added to the drag
     * group with the active state you provide.
     * @param objects Objects to add.
     * @public
     */
    addToDragGroup(spec: DragGroupSpec, ...objects: Array<string | Node | ObjectData | jsPlumbToolkitDOMElement>): void;
    /**
     * @internal
     * @param el
     * @param v
     */
    private _doAssignDragGroup;
    /**
     * @internal
     */
    private _assignPendingDragGroups;
}
