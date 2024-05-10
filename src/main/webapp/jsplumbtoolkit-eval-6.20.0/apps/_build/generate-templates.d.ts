import { JsPlumbToolkit, UINodeDefinition } from "@jsplumbtoolkit/browser-ui";
import { ComputeFunction, ImageOperation } from "./definitions";
export declare function initialize(toolkit: JsPlumbToolkit): {
    uiDefinitions: Record<string, UINodeDefinition>;
    processors: Record<string, ComputeFunction>;
    nodeTypes: Record<string, ImageOperation>;
};
