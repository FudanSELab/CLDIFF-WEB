import { TypeDescriptor } from "../ui-core/core/type-descriptors";
import { JsPlumbInstance } from "../ui-core/core/core";
import { DataSource } from "../core/datasource";
import { FilterableDataset } from "../core/filterable-dataset";
import { Surface } from "../browser-ui/surface";
export declare class UIState {
    id: string;
    state: Record<string, TypeDescriptor>;
    jsplumb: JsPlumbInstance;
    constructor(id: string, state: Record<string, TypeDescriptor>, jsplumb: JsPlumbInstance);
    private _portStateOperation;
    activate(target: FilterableDataset, renderer: Surface, datasource: DataSource): void;
    deactivate(target: FilterableDataset, renderer: Surface, dataSource: DataSource): void;
}
