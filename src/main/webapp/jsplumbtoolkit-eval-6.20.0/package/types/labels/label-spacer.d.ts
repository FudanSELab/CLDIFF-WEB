import { Entry, LabelSpacerParams } from "./common";
import { LabelManipulator } from "./label-manipulator";
import { Magnetizer } from "../core/magnetizer";
import { PointXY } from "../ui-core/util/util";
export declare class LabelSpacer extends LabelManipulator {
    debug?: boolean;
    cache: Map<string, Entry>;
    dirtyCache: Map<String, boolean>;
    fireOnNewConnections?: boolean;
    fireAfterDrag?: boolean;
    magnetizer: Magnetizer<Element>;
    padding: PointXY;
    constructor(params: LabelSpacerParams);
    execute(): void;
    reset(): void;
}
