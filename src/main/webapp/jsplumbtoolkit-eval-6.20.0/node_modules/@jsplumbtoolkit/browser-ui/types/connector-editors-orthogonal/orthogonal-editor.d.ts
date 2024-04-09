import { InternalOrthogonalConnectorGeometry, OrthogonalConnector, OrthogonalSegment } from "../ui-core/connector-orthogonal/orthogonal-connector";
import { ConnectorEditorOptions, EditorBase } from "../connector-editors/editor-base";
import { Surface } from "../browser-ui/surface";
import { Connection } from "../ui-core/core/connector/connection-impl";
export declare const FLOWCHART_HANDLE_CLASS: string;
export declare const SEGMENT_DRAG_HANDLE: string;
export declare const SEGMENT_DRAG_HANDLE_VERTICAL_CLASS: string;
export declare const SEGMENT_DRAG_HANDLE_HORIZONTAL_CLASS: string;
/** @internal */
export interface OrthogonalEditorActivationParams {
}
/** @internal */
export declare type SegmentEditorInfo = {
    left?: number;
    top?: number;
    el: HTMLElement;
    geometry: OrthogonalSegment;
    vertical: boolean;
};
/** @internal */
export interface OrthogonalEditorOptions extends ConnectorEditorOptions {
}
/** @internal */
export declare class OrthogonalEditor extends EditorBase<OrthogonalConnector> {
    static type: string;
    segments: Array<OrthogonalSegment>;
    segmentHandles: Array<{
        geometry: OrthogonalSegment;
        el: HTMLElement;
    }>;
    geometry: InternalOrthogonalConnectorGeometry;
    constructor(surface: Surface, params: OrthogonalEditorOptions);
    _setHandlePosition(segmentInfo: {
        el: HTMLElement;
    }, mid: number[]): void;
    /**
     * Repaint the editor. This may or may not have come
     * about as the result of a call by this class to `repaintConnection` - if
     * `internalEditorRepaint` and/or `args` is set, then that is the case.
     * @override
     * @param args
     * @internal
     */
    _repaint(args?: any): void;
    /**
     * clear all handles, except, optionally, the one provided.
     * @param excludeHandle
     * @override
     */
    _clearHandles(excludeHandle?: HTMLElement): void;
    /**
     * Activates the editor, on the given connection.
     * @override
     * @param conn
     * @internal
     */
    _activate(conn: Connection<any>, params?: OrthogonalEditorActivationParams): void;
    _elementDragged(p: any): void;
    _elementDragging(p: any): void;
    /**
     * updates the current origin of the connector's SVG element (the location of its to left corner wrt
     * the origin of the jsplumb instance's container). Then updates the offset of the source and target points
     * from the origin of the SVG element. Finally, extracts the control point information from the connection,
     * either as geometry (if previously edited or set) or from the computed control points.
     * @override
     */
    _update(args?: {
        segmentInfo?: SegmentEditorInfo;
        segmentIndex?: number;
    }): void;
    /**
     * Trims any segments that are now of length zero, then
     * concatenates subsequent segments that are in the same axis.
     * then instructs the superclass to repaint (which will
     * result in this class redrawing all its handles)
     * @internal
     */
    private _trimConnection;
}
