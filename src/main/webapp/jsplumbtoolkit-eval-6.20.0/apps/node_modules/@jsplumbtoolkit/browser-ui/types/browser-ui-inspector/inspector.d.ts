import { Surface } from "../browser-ui/surface";
import { Base, ObjectData } from "../core/model/graph";
import { EventManager } from "../ui-core/browser-ui-renderer/event-manager";
import { JsPlumbToolkit } from "../core/toolkit";
import { FieldInfo, InspectorOptions } from "./definitions";
import { OptimisticEventGenerator } from "../ui-core/util/event-generator";
export declare const CLASS_INSPECTOR_ACTIVE = "jtk-inspector-active";
export declare const CLASS_INSPECTOR_INACTIVE = "jtk-inspector-inactive";
export declare const CLASS_INSPECTOR = "jtk-inspector";
export declare const CLASS_NODE_INSPECTOR = "jtk-node-inspector";
export declare const CLASS_EDGE_INSPECTOR = "jtk-edge-inspector";
export declare const CLASS_EMPTY_INSPECTOR = "jtk-empty-inspector";
/**
 * Offers a simple means to inspect and change the values in some object or set of objects.
 */
export declare class Inspector extends OptimisticEventGenerator {
    container: HTMLElement;
    surface: Surface;
    toolkit: JsPlumbToolkit;
    eventManager: EventManager;
    _multipleSelections: boolean;
    protected _eventsSuspended: boolean;
    private _pendingUpdates;
    private autoCommit;
    private renderEmptyContainer;
    private refresh;
    private afterUpdate?;
    protected _resetting: boolean;
    protected _fieldMap: Map<string, FieldInfo>;
    current: Array<Base>;
    _currentCommonData: ObjectData;
    constructor(options: InspectorOptions);
    private _bindEvents;
    protected _recomputeCommonData(): void;
    /**
     * Write the changes to the toolkit.
     * @param updates
     * @internal
     */
    private _persistChanges;
    /**
     * Either write the changes to the toolkit or store them in the list of pending updates, depending on
     * the autoCommit flag.
     * @param updates
     * @internal
     */
    private _updateCurrent;
    reset(doNotRenderEmptyContainer: boolean): void;
    private _destroy;
    _remove(obj: Base): void;
    private _recomputeAndApply;
    private _edit;
    /**
     * For subclasses/wrapper classes to use.
     * @param key
     * @param value
     * @public
     */
    setValue(key: string, value: any): void;
    /**
     * Gets the current value for the given key, may be null.
     * @param key
     */
    getValue(key: string): string;
    onChange(fn: (data: ObjectData) => any): void;
    /**
     * Persist any pending updates to the toolkit, then clear the list of pending updates. Returns the count of
     * the number of changes made.
     * @public
     */
    persist(): number;
    /**
     * Returns whether or not there are unsaved changes.
     * @public
     */
    hasPendingChanges(): boolean;
}
