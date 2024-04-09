import { PointXY, Size } from "../ui-core/util/util";
import { Edge } from "../core/model/graph";
import { Surface } from "../browser-ui/surface";
/**
 * @internal
 */
export declare function getAbsolutePosition(entry: Entry): PointXY;
/**
 * @internal
 */
export declare function setAbsolutePosition(entry: Entry, p: PointXY): number;
/**
 * @internal
 */
export declare type Entry = {
    el: any;
    connectorOffset: PointXY;
    connection: any;
    label: string;
    id: string;
    size: Size;
    connector: any;
    edge: Edge;
};
/**
 * Base interface for label manipulators
 * @public
 */
export interface LabelManipulatorParams {
    getLabel?: Function;
    surface: Surface;
}
/**
 * Params for the label spacer
 * @public
 */
export interface LabelSpacerParams extends LabelManipulatorParams {
    debug?: boolean;
    fireOnNewConnections?: boolean;
    fireAfterDrag?: boolean;
    padding?: PointXY;
}
/**
 * Params for the label dragger.
 * @public
 */
export interface LabelDragParams extends LabelManipulatorParams {
}
