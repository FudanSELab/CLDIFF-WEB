export declare const EVENT_AFTER_LAYOUT_REFRESH = "afterLayoutRefresh";
export declare const EVENT_CANVAS_CLICK = "canvasClick";
export declare const EVENT_CANVAS_DBL_CLICK = "canvasDblClick";
export declare const EVENT_CONNECTION_EDIT = "connectionEdit";
export declare const EVENT_GROUP_RESIZE = "group:resize";
export declare const EVENT_GROUP_RELAYOUT = "group:relayout";
export declare const EVENT_LASSO_END = "lasso:end";
export declare const EVENT_NODE_VISIBILITY = "node:visibility";
export declare const EVENT_NODE_RENDERED = "node:render";
export declare const EVENT_OBJECT_REPAINTED = "objectRepainted";
export declare const EVENT_PAN = "pan";
export declare const EVENT_RELAYOUT = "relayout";
export declare const EVENT_RESIZE = "resize";
export declare const EVENT_ROTATE = "rotate";
export declare const EVENT_SURFACE_MODE_CHANGED = "modeChanged";
export declare const EVENT_STATE_RESTORED = "state:restore";
export declare const EVENT_DIRECT_RENDER_RELAYOUT = "directRender:relayout";
export declare const EVENT_RENDER_START = "render:start";
export declare const EVENT_RENDER_END = "render:end";
/**
 * @internal
 */
export declare const EVENT_INTERNAL_VERTEX_UPDATED = "internal.vertex:updated";
export declare const ATTRIBUTE_OFFSET_X = "data-jtk-offset-x";
export declare const ATTRIBUTE_OFFSET_Y = "data-jtk-offset-y";
export declare const ATTRIBUTE_ANCHOR_X = "data-jtk-anchor-x";
export declare const ATTRIBUTE_ANCHOR_Y = "data-jtk-anchor-y";
export declare const ATTRIBUTE_ORIENTATION_X = "data-jtk-orientation-x";
export declare const ATTRIBUTE_ORIENTATION_Y = "data-jtk-orientation-y";
export declare const ATTRIBUTE_NODE = "jtk-node";
export declare const ATTRIBUTE_PORT = "jtk-port";
export declare const ATTRIBUTE_SURFACE_GROUP = "jtk-group";
export declare const ATTRIBUTE_PORT_ID = "port-id";
export declare const ATTRIBUTE_IS_SOURCE = "is-source";
export declare const ATTRIBUTE_IS_TARGET = "is-target";
export declare const ATTRIBUTE_PORT_TYPE = "port-type";
export declare const ATTRIBUTE_JTK_NODE_ID = "jtk-node-id";
export declare const ATTRIBUTE_MINIVIEW_TYPE = "jtk-miniview-type";
/**
 * Used to indicate that the given element is the place to which connections for the given port should be attached in the UI.
 * Don't confuse this with ATTRIBUTE_JTK_PORT_ID.
 * @public
 */
export declare const ATTRIBUTE_JTK_PORT = "data-jtk-port";
/**
 * Used to indicate what the port id should be for connections from/to this element. It does not necessarily mean that the
 * connection will be attached to an element that has this attribute - it is possible to have 'logical' ports on some vertex,
 * whose edges appear in the UI attached to the vertex, rather than some element inside the vertex. If you want to specify
 * that some element is the place to which connections for a given port should be attached, use ATTRIBUTE_JTK_PORT (`data-jtk-port`)
 * @public
 */
export declare const ATTRIBUTE_JTK_PORT_ID = "data-jtk-port-id";
export declare const ATTRIBUTE_JTK_PORT_TYPE = "data-jtk-port-type";
export declare const ATTRIBUTE_JTK_EDGE_TYPE = "data-jtk-edge-type";
export declare const ATTRIBUTE_JTK_SOURCE = "data-jtk-source";
export declare const ATTRIBUTE_JTK_TARGET = "data-jtk-target";
export declare const ATTRIBUTE_JTK_SOURCE_PORT_ID = "data-jtk-source-port-id";
export declare const ATTRIBUTE_JTK_TARGET_PORT_ID = "data-jtk-target-port-id";
export declare const ATTRIBUTE_JTK_SOURCE_PORT = "data-jtk-source-port";
export declare const ATTRIBUTE_JTK_TARGET_PORT = "data-jtk-target-port";
export declare const ATTRIBUTE_JTK_SOURCE_PORT_TYPE = "data-jtk-source-port-type";
export declare const ATTRIBUTE_JTK_TARGET_PORT_TYPE = "data-jtk-target-port-type";
export declare const ATTRIBUTE_JTK_ENDPOINT = "data-jtk-endpoint";
export declare const ELEMENT_JTK_ENDPOINT = "jtk-endpoint";
export declare const CLASS_SURFACE = "jtk-surface";
export declare const CLASS_SURFACE_DIRECT = "jtk-surface-direct-render";
export declare const CLASS_SURFACE_TOUCH_DEVICE = "jtk-surface-touch-device";
export declare const CLASS_SURFACE_POINTER_DEVICE = "jtk-surface-pointer-device";
export declare const CLASS_SURFACE_NO_PAN = "jtk-surface-nopan";
export declare const CLASS_SURFACE_CANVAS = "jtk-surface-canvas";
export declare const CLASS_SURFACE_PAN = "jtk-surface-pan";
export declare const CLASS_SURFACE_PAN_LEFT = "jtk-surface-pan-left";
export declare const CLASS_SURFACE_PAN_TOP = "jtk-surface-pan-top";
export declare const CLASS_SURFACE_PAN_RIGHT = "jtk-surface-pan-right";
export declare const CLASS_SURFACE_PAN_BOTTOM = "jtk-surface-pan-bottom";
export declare const CLASS_SURFACE_PAN_ACTIVE = "jtk-surface-pan-active";
export declare const CLASS_SURFACE_SELECTED_ELEMENT = "jtk-surface-selected-element";
export declare const CLASS_SURFACE_SELECTED_CONNECTION = "jtk-surface-selected-connection";
export declare const CLASS_SURFACE_PANNING = "jtk-surface-panning";
export declare const CLASS_SURFACE_ELEMENT_DRAGGING = "jtk-surface-element-dragging";
export declare const CLASS_SURFACE_EDGE_DRAGGING = "jtk-surface-edge-dragging";
export declare const CLASS_LASSO = "jtk-lasso";
export declare const CLASS_LASSO_SELECT_DEFEAT = "jtk-lasso-select-defeat";
export declare const CLASS_LASSO_MASK = "jtk-lasso-mask";
export declare const CLASS_LASSO_MASK_LEFT = "jtk-lasso-mask-left";
export declare const CLASS_LASSO_MASK_TOP = "jtk-lasso-mask-top";
export declare const CLASS_LASSO_MASK_RIGHT = "jtk-lasso-mask-right";
export declare const CLASS_LASSO_MASK_BOTTOM = "jtk-lasso-mask-bottom";
export declare const CLASS_MINIVIEW = "jtk-miniview";
export declare const CLASS_MINIVIEW_CANVAS = "jtk-miniview-canvas";
export declare const CLASS_MINIVIEW_PANNER = "jtk-miniview-panner";
export declare const CLASS_MINIVIEW_ELEMENT = "jtk-miniview-element";
export declare const CLASS_MINIVIEW_GROUP_ELEMENT = "jtk-miniview-group-element";
export declare const CLASS_MINIVIEW_PANNING = "jtk-miniview-panning";
export declare const CLASS_MINIVIEW_COLLAPSE = "jtk-miniview-collapse";
export declare const CLASS_MINIVIEW_COLLAPSED = "jtk-miniview-collapsed";
export declare const CLASS_MINIVIEW_CLICK_TO_CENTER = "jtk-miniview-click-to-center";
export declare const CLASS_MOST_RECENTLY_DRAGGED = "jtk-most-recently-dragged";
export declare const CLASS_DRAG_SELECT_DEFEAT = "jtk-drag-select-defeat";
export declare const CLASS_NODE = "jtk-node";
export declare const CLASS_PORT = "jtk-port";
export declare const CLASS_GROUP = "jtk-group";
export declare const CLASS_SELECT_DEFEAT = "jtk-drag-select-defeat";
export declare const Constants: {
    click: string;
    start: string;
    stop: string;
    default: string;
    drop: string;
    disabled: string;
    pan: string;
    select: string;
    drag: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
    width: string;
    height: string;
    leftmin: string;
    leftmax: string;
    topmin: string;
    topmax: string;
    min: string;
    max: string;
    nominalSize: string;
    px: string;
    onepx: string;
    nopx: string;
    em: string;
    absolute: string;
    relative: string;
    none: string;
    block: string;
    hidden: string;
    div: string;
    id: string;
    plusEquals: string;
    minusEquals: string;
    dot: string;
    transform: string;
    transformOrigin: string;
    surfaceNodeDragScope: string;
    mistletoeLayoutType: string;
    surfaceType: string;
    jtkStatePrefix: string;
    msgCannotSaveState: string;
    msgCannotRestoreState: string;
};
