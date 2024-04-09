export * from "./bezier-editor";
/**
 * Register the bezier/state machines editors with the connector editors modules. In
 * certain setups, for instance a React app, you need to do this in order to
 * ensure the editor code is included.
 */
export declare function initializeBezierConnectorEditors(): void;
