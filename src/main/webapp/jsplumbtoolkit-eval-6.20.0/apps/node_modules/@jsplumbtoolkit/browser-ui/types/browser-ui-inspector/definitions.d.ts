import { Surface } from "../browser-ui/surface";
import { Base } from "../core/model/graph";
/**
 * Options for an inspector.
 * @public
 */
export interface InspectorOptions {
    /**
     * The element in which the inspector is drawn.
     * @public
     */
    container: HTMLElement;
    /**
     * The surface to attach to.
     */
    surface: Surface;
    /**
     * Optional css class(es) to set on the inspector - a space separated list.
     */
    cssClass?: string;
    /**
     * Whether or not to support multiple selections. Defaults to true.
     */
    multipleSelections?: boolean;
    /**
     * Optional callback to invoke after an update has occurred.
     */
    afterUpdate?: () => any;
    /**
     * Callback invoked when the inspector is cleared.
     * @private
     */
    renderEmptyContainer: () => void;
    /**
     * Callback invoked when a new object has started to be edited.
     * @param obj
     * @param cb
     */
    refresh: (obj: Base, cb: () => any) => void;
    /**
     * Whether or not to auto commit changes on blur/change events. Defaults to true.
     */
    autoCommit?: boolean;
}
/**
 * @internal
 */
export declare type FieldInfo = {
    field: HTMLElement;
    edited: boolean;
    common: boolean;
    commonValue: any;
    editedValue?: any;
    attribute: string;
};
/**
 * Options for the VanillaInspector, an instance of Inspector that uses the Toolkit's default templating mechanism to render
 * elements.
 * @public
 */
export interface VanillaInspectorOptions extends InspectorOptions {
    /**
     * Template to use in the inspector when there is nothing
     * selected. By default an empty `div` element is used.
     */
    emptyTemplate?: string;
    /**
     * Resolves templates for a given object.
     * @param obj
     */
    templateResolver: (obj: Base) => string;
    /**
     * By default the inspector will cache found templates, keyed by the type of the object and its category (there is a separate
     * cache for nodes, groups, edges and ports, and in each cache the key is the object's `type`). In some situations you may
     * not want to cache the template, for instance if your template has dynamic data that depends on the object that is
     * being inspected. If that's the case you can set this to false.
     */
    cacheTemplates?: boolean;
}
