/**
 * CSS class assigned to handles used to modify a bezier curve
 * @public
 */
import { ConnectorEditorOptions, EditorBase } from "../connector-editors/editor-base";
import { BezierConnectorBase, BezierConnectorGeometry } from "../ui-core/connector-bezier/abstract-bezier-connector";
import { PointXY, Size } from "../ui-core/util/util";
import { Surface } from "../browser-ui/surface";
import { Connection } from "../ui-core/core/connector/connection-impl";
/**
 * CSS class added to all handles used by this editor.
 * @public
 */
export declare const CLASS_BEZIER_HANDLE = "jtk-bezier-handle";
/** @internal */
export declare const DUAL = "dual";
/** @internal */
export declare const SINGLE = "single";
/** @internal */
export declare type BezierEditorMode = typeof DUAL | typeof SINGLE;
/** @internal */
export interface BezierEditorOptions extends ConnectorEditorOptions {
}
/** @internal */
export declare class BezierEditor extends EditorBase<BezierConnectorBase> {
    static type: string;
    private mode;
    private center;
    private cp;
    private cp1;
    private cp2;
    private originalCp1;
    private originalCp2;
    private origin;
    private flipY;
    private sp;
    private tp;
    /** @internal */
    sourceMidpoints: Array<any>;
    /** @internal */
    targetMidpoints: Array<any>;
    /** @internal */
    sourceFace: any;
    /** @internal */
    targetFace: any;
    /** @internal */
    sourceCenter: PointXY;
    /** @internal */
    targetCenter: PointXY;
    /** @internal */
    sourceEdgeSupported: any;
    /** @internal */
    targetEdgeSupported: any;
    /** @internal */
    noEdits: boolean;
    /** @internal */
    nodeQuadrant: any;
    /** @internal */
    h1: any;
    /** @internal */
    h2: any;
    /** @internal */
    h3: any;
    /** @internal */
    h4: any;
    /** @internal */
    l1: any;
    /** @internal */
    l2: any;
    /** @internal */
    lockHandles: boolean;
    /** @internal */
    h1Size: Size;
    /** @internal */
    h2Size: Size;
    /** @internal */
    h3Size: Size;
    /** @internal */
    h4Size: Size;
    /** @internal */
    geometry: BezierConnectorGeometry;
    /** @internal */
    constructor(surface: Surface, params: BezierEditorOptions);
    private getPosition;
    private getSize;
    private _updateOrigin;
    private _updateConnectorInfo;
    private _updateQuadrants;
    private _updateHandlePositions;
    private _setGeometry;
    private _updateGuidelines;
    private _makeGuideline;
    private _updateGuideline;
    /** @internal */
    _activate(conn: Connection<any>, params?: {
        mode?: BezierEditorMode;
        guidelines?: boolean;
    }): void;
    /** @internal */
    _elementDragged(p: any): void;
    /** @internal */
    _elementDragging(p: any): void;
    /** @internal */
    _clearHandles(): void;
    /** @internal */
    _repaint(args?: any): void;
    /** @internal */
    _update(): void;
    /** @internal */
    exportGeometry(): BezierConnectorGeometry;
}
/** @internal */
export declare class StateMachineEditor extends BezierEditor {
    /** @internal */
    static type: string;
    /** @internal */
    constructor(surface: Surface, params: any);
}
