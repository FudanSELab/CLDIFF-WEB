import { GroupDefinition, NodeDefinition, PortDefinition } from "./vertex-definition";
import { JsPlumbToolkit } from "../toolkit";
/**
 * Base interface a for data model.
 * @internal
 */
export interface DataModelDefinition {
    nodes?: Record<string, NodeDefinition>;
    groups?: Record<string, GroupDefinition>;
    ports?: Record<string, PortDefinition>;
}
/**
 * @internal
 */
export declare class DataModel {
    private toolkit;
    private nodeDefinitions;
    private groupDefinitions;
    private portDefinitions;
    constructor(toolkit: JsPlumbToolkit, def?: DataModelDefinition);
    getNodeDefinition(type: string): NodeDefinition;
    getGroupDefinition(type: string): GroupDefinition;
    getPortDefinition(type: string): PortDefinition;
}
