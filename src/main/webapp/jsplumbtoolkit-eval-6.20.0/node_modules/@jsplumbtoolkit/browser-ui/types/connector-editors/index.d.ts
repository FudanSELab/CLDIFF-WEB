import { ConnectorEditorOptions } from "./editor-base";
import { ConnectorEditor, ConnectorEditorActivateParams } from "../browser-ui/connector-editor";
import { Surface } from "../browser-ui/surface";
import { Constructable } from "../ui-core/util/util";
import { Edge } from "../core/model/graph";
import { Connection } from "../ui-core/core/connector/connection-impl";
export declare const editors: Map<string, Constructable<ConnectorEditor>>;
export * from "./editor-base";
/**
 * Returns whether or not there is an edge editor registered for connectors of the given type.
 * @param type
 * @public
 */
export declare function isEdgeEditingSupported(type: string): boolean;
/**
 * Editor for edge paths. Currently support Bezier, StateMachine and Orthogonal connectors.
 */
export declare class EdgePathEditor {
    readonly surface: Surface;
    private options?;
    private _connectorEditors;
    activeMode: boolean;
    private _dataLoading;
    constructor(surface: Surface, options?: ConnectorEditorOptions);
    /**
     * Start editing the given edge or connection, optionally with the given edit parameters.
     * @param edgeOrConnection
     * @param params
     */
    startEditing<T extends ConnectorEditorActivateParams>(edgeOrConnection: Edge | Connection<Element>, params?: T): void;
    /**
     * Stop editing any connector paths.
     * @public
     */
    stopEditing(): void;
    /**
     * Clear the edits for the given connection, returning its path to the automatically computed path.
     * @param edgeOrConnection
     */
    clearEdits(edgeOrConnection: string | Edge | Connection<Element>): boolean;
    /**
     * Resolves a `Connection` from the given input, which can be an edge id, Edge, or Connection.
     * @param edgeOrConnection ID of an Edge, Edge, or Connection
     * @internal
     */
    private _resolveConnection;
    /**
     * Destroy the path editor - clears the internal map of editors and released held memory.
     */
    destroy(): void;
}
