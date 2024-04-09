import { LabelManipulatorParams } from "./common";
import { Surface } from "../browser-ui/surface";
import { JsPlumbToolkit } from "../core/toolkit";
import { BrowserJsPlumbInstance } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { Edge } from "../core/model/graph";
export declare abstract class LabelManipulator {
    surface: Surface;
    toolkit: JsPlumbToolkit;
    instance: BrowserJsPlumbInstance;
    getLabel: Function;
    protected constructor(params: LabelManipulatorParams);
    updateEdge(edge: Edge, label: any, loc: number): void;
}
