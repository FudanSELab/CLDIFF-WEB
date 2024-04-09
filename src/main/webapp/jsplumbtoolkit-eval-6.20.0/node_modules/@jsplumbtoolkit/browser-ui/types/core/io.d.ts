import { JsPlumbToolkit } from "./toolkit";
import { Port, ObjectData } from "./model/graph";
/**
 * @public
 */
export interface DataLoadOptions {
    type?: string;
    url: string;
    headers?: Record<string, any>;
    success: (r: any) => any;
    error?: (e: any, status?: any) => any;
    dataType?: string;
    data?: any;
}
/**
 * @public
 */
export declare type Parser = (data: any, toolkit: JsPlumbToolkit, parameters?: any) => any;
/**
 * @public
 */
export declare type Exporter = (toolkit: JsPlumbToolkit, parameters: any) => any;
/**
 * @internal
 */
export declare type EdgeProxy = {
    source: string;
    target: string;
    data?: any;
};
/**
 * @internal
 */
export declare type ToolkitDataset = {
    nodes?: Array<ObjectData>;
    groups?: Array<ObjectData>;
    ports?: Array<Port>;
    edges?: Array<EdgeProxy>;
};
export declare const JSON_DATATYPE = "json";
export declare const HIERARCHICAL_JSON_DATATYPE = "hierarchical-json";
export declare const LEGACY_JSON_DATATYPE = "legacy-json";
export declare function registerParser(name: string, p: Parser): void;
export declare function registerExporter(name: string, p: Exporter): void;
/**
 * list of managed operations.
 * @internal
 */
export declare enum ManagedOperations {
    removeGroup = "removeGroup",
    removeNode = "removeNode",
    removePort = "removePort",
    removeEdge = "removeEdge",
    addNode = "addNode",
    addGroup = "addGroup",
    addEdge = "addEdge",
    addPort = "addPort"
}
/**
 * @internal
 */
export declare type ManagedOperation = keyof typeof ManagedOperations;
export declare function parse(type: string, source: any, toolkit: JsPlumbToolkit, parameters: any): any;
/**
 * Internal method that handles data export, by looking for an exporter registered for the given `type`.
 * @param type Format to export the data in
 * @param toolkit Toolkit to export data from
 * @param parameters Optional parameters for the exporter.
 */
export declare function exportData(type: string, toolkit: JsPlumbToolkit, parameters: any): any;
/**
 * @internal
 * @param operation
 * @param dataset
 * @param dataType
 * @param obj
 * @param idFunction
 * @param toolkit
 */
export declare function manage(operation: ManagedOperation, dataset: any, dataType: string, obj: any, idFunction: Function, toolkit: JsPlumbToolkit): void;
