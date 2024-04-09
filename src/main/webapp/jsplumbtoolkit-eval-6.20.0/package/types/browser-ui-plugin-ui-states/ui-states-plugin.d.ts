import { UIState } from './ui-state';
import { InternalSurfacePluginOptions, SurfacePlugin, SurfacePluginOptions } from "../browser-ui/plugins/surface-plugin";
import { SurfaceViewOptions } from "../browser-ui/surface-view-options";
import { Surface } from "../browser-ui/surface";
import { Path } from "../core/model/path";
import { JsPlumbToolkit } from "../core/toolkit";
/**
 * Options for the ui states plugin. Currently empty.
 */
export interface UiStatesPluginOptions extends SurfacePluginOptions {
}
export interface UIStatesSurfaceViewOptions extends SurfaceViewOptions {
    states?: Record<string, any>;
}
export declare class UiStatesBrowserUIModel {
    private surface;
    private _states;
    private model;
    private currentStates;
    private viewOptions;
    constructor(surface: Surface);
    getState(id: string): UIState;
    /**
     * Activates the UI state with the given ID on the objects contained in the given target. If target is not supplied, the state is
     * activated against the entire dataset.
     * @param stateId ID of the state to activate. States are defined inside a `states` member of your `view` definition.
     * @param target Set of objects to activate the state on. If null, the entire dataset (Nodes, Edges, Groups and Ports) is used. If you provide an Element here, a Selection is created that consists of the Node representing the element, plus all Edges to and from the given Node.
     * @public
     */
    activateState(stateId: string, target: Selection | Path | JsPlumbToolkit | Element): void;
    /**
     * Deactivates the UI state with the given ID on the objects contained in the given target. If target is not supplied, the state is
     * deactivated against the entire dataset.
     * @param stateId ID of the state to deactivate. States are defined inside a `states` member of your `view` definition.
     * @param target Set of objects to deactivate the state on. If null, the entire dataset (Nodes, Edges and Ports) is used.
     * @public
     */
    deactivateState(stateId: string, target: any): void;
    /**
     * Resets (clears) the UI state of all objects in the current dataset.
     */
    resetState(): void;
    private _getStateTarget;
}
export declare class UiStatesPlugin implements SurfacePlugin {
    static type: string;
    model: UiStatesBrowserUIModel;
    destroy(): void;
    initialise(surface: Surface, options: UiStatesPluginOptions & InternalSurfacePluginOptions): boolean;
    reset(): void;
    /**
     * Activates the UI state with the given ID on the objects contained in the given target. If target is not supplied, the state is
     * activated against the entire dataset.
     * @param stateId ID of the state to activate. States are defined inside a `states` member of your `view` definition.
     * @param target Set of objects to activate the state on. If null, the entire dataset (Nodes, Edges, Groups and Ports) is used. If you provide an Element here, a Selection is created that consists of the Node representing the element, plus all Edges to and from the given Node.
     * @public
     */
    activateState(stateId: string, target: Selection | Path | JsPlumbToolkit | Element): void;
    /**
     * Deactivates the UI state with the given ID on the objects contained in the given target. If target is not supplied, the state is
     * deactivated against the entire dataset.
     * @param stateId ID of the state to deactivate. States are defined inside a `states` member of your `view` definition.
     * @param target Set of objects to deactivate the state on. If null, the entire dataset (Nodes, Edges and Ports) is used.
     * @public
     */
    deactivateState(stateId: string, target: any): void;
    /**
     * Resets (clears) the UI state of all objects in the current dataset.
     */
    resetState(): void;
}
