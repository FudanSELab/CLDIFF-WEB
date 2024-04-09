import { EdgePropertyMappings } from "../browser-ui/property-mappings/definitions";
import { ObjectData } from "../core/model/graph";
import { JsPlumbToolkit } from "../core/toolkit";
export * from './edge-type-picker';
export declare function createEdgeTypePickerTag(toolkit: JsPlumbToolkit, propertyName: string, edgeMappings: EdgePropertyMappings, onSelect: (v: string) => any): {
    template: string;
    rendered: (el: HTMLElement, data: ObjectData) => void;
};
