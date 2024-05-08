import { HierarchyLayoutModel } from "./model";
/**
 * @internal
 */
export declare abstract class HierarchyLayoutStage {
    protected model: HierarchyLayoutModel;
    constructor(model: HierarchyLayoutModel);
    abstract execute(currentRoot: any): any;
}
