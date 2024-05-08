import { ConnectorEditorOptions, EditorBase } from "../connector-editors/editor-base";
import { PointXY } from "../ui-core/util/util";
import { InternalSegmentedConnectorGeometry, SegmentConnectorSegment, SegmentedConnector } from "../ui-core/connector-segmented/segmented-connector";
import { Surface } from "../browser-ui/surface";
import { Connection } from "../ui-core/core/connector/connection-impl";
/**
 * CSS class added to all segment handles created by the segmented editor
 * @public
 */
export declare const CLASS_SEGMENTED_HANDLE: string;
/**
 * CSS class added to a drag handle by the segmented connector editor
 * @public
 */
export declare const CLASS_SEGMENTED_DRAG_HANDLE: string;
/**
 * CSS class added to a segment split handle by the segmented connector editor
 * @public
 */
export declare const CLASS_SEGMENTED_SPLIT_HANDLE: string;
/**
 * CSS class added to a delete handle by the segmented connector editor
 * @public
 */
export declare const CLASS_SEGMENTED_DELETE_HANDLE: string;
/**
 * CSS class added to an edge guideline by the segmented connector editor
 * @public
 */
export declare const CLASS_EDGE_GUIDELINE = "jtk-edge-guideline";
/** @internal */
export interface SegmentedEditorActivationParams {
}
/** @internal */
export interface SegmentedEditorOptions extends ConnectorEditorOptions {
}
declare type SegmentEditorInfo = {
    focus: SegmentConnectorSegment;
    previous: SegmentConnectorSegment;
    index: number;
    dragHandle: HTMLElement;
    splitButton: HTMLElement;
    deleteButton: HTMLElement;
    originalLocation: PointXY;
    midPoint: PointXY;
};
/** @internal */
export declare class SegmentedEditor extends EditorBase<SegmentedConnector> {
    static type: string;
    geometry: InternalSegmentedConnectorGeometry;
    segments: Array<SegmentConnectorSegment>;
    segmentHandles: Array<SegmentEditorInfo>;
    guideLine: SVGElement;
    splitListener: Function;
    deleteListener: Function;
    constructor(surface: Surface, params: SegmentedEditorOptions);
    _activate(conn: Connection<any>, params?: any): void;
    _clearHandles(excludeIndex?: number): void;
    _elementDragged(p: any): void;
    _elementDragging(p: any): void;
    _repaint(args?: any): void;
    private _maybeDrawGuideline;
    _update(args?: {
        segmentInfo?: SegmentEditorInfo;
    }): void;
    deactivate(e?: Event): void;
}
export {};
