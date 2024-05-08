import { PathTransport, PathTransportListener } from './path-transport';
import { Connection } from "../ui-core/core/connector/connection-impl";
import { OverlaySpec } from "../ui-core/common/overlay";
import { EventGenerator, OptimisticEventGenerator } from "../ui-core/util/event-generator";
import { Surface } from "../browser-ui/surface";
import { Edge, Group, Vertex, Node } from "../core/model/graph";
import { Path } from "../core/model/path";
/**
 * The css classes that are used when animating an overlay along some path.
 * @public
 */
export declare enum AnimationClasses {
    VERTEX_SOURCE = "jtk-animate-source",
    VERTEX_TARGET = "jtk-animate-target",
    NODE_TRAVERSING = "jtk-animate-node-traversing",
    EDGE_TRAVERSING = "jtk-animate-edge-traversing",
    NODE_TRAVERSABLE = "jtk-animate-node-traversable",
    EDGE_TRAVERSABLE = "jtk-animate-edge-traversable",
    EDGE_TRAVERSED = "jtk-animate-edge-traversed",
    NODE_TRAVERSED = "jtk-animate-node-traversed"
}
/**
 * The phases of an overlay path animation.
 * @public
 */
export declare enum AnimationPhases {
    INITIALIZED = "INITIALIZED",
    TRAVERSING_START = "TRAVERSING_START",
    TRAVERSING_EDGE = "TRAVERSING_EDGE",
    TRAVERSING_END = "TRAVERSING_END",
    CANCELLED = "CANCELLED",
    FINISHED = "FINISHED"
}
export declare type AnimationPhase = keyof typeof AnimationPhases;
export declare enum AnimationEvents {
    EVENT_START_OVERLAY_ANIMATION = "startOverlayAnimation",
    EVENT_END_OVERLAY_ANIMATION = "endOverlayAnimation",
    EVENT_START_NODE_TRAVERSAL = "startNodeTraversal",
    EVENT_END_NODE_TRAVERSAL = "endNodeTraversal"
}
export declare type AnimationEvent = keyof typeof AnimationEvents;
/**
 * The type defining the object that is passed to all events fired by the `tracePath` method.
 */
export declare type AnimationEventCallbackParams = {
    connection: Connection<Element>;
    harness: ConnectionOverlayAnimator;
    element?: Element;
};
/**
 * Options for animating an overlay along an edge
 */
export interface OverlayAnimationOptions {
    /**
     * Defaults to true, meaning traverse from the source to the target.
     */
    forwards?: boolean;
    /**
     * How long, in milliseconds, to dwell on the source before beginning to move. Defaults to 350ms.
     */
    dwell?: number;
    /**
     * How fast to travel, in pixels per second. Defaults to 100.
     */
    speed?: number;
    /**
     * Time between frames. Defaults to 30ms.
     */
    rate?: number;
    /**
     * Optional set of event listeners.
     */
    events?: Record<string, (p: AnimationEventCallbackParams) => any>;
    /**
     * If true, the animation starts in a paused state.
     */
    paused?: boolean;
}
/**
 * Definition of the control surface for a specific segment in the tracePath method.
 */
export declare type ConnectionOverlayAnimator = {
    eventGenerator: EventGenerator;
    play: () => any;
    pause: () => any;
    cancel: () => any;
    connection: Connection<Element>;
};
/**
 * SurfaceAnimator offers a few methods for animating parts of a Surface widget:
 *
 * - animateToPosition animates some vertex to a new position
 * - tracePath  animates an overlay along the path from some vertex to some other vertex
 * - traceEdge animates an overlay along one edge
 */
export declare class SurfaceAnimator extends OptimisticEventGenerator {
    surface: Surface;
    constructor(surface: Surface);
    /**
     * Animate the given vertex to the given [x,y] location.
     * @param el
     * @param x
     * @param y
     * @param animateOptions
     */
    animateToPosition(el: Node | Group | string | Element, x: number, y: number, animateOptions?: {
        duration?: number;
        start?: Function;
        step?: Function;
        complete?: Function;
    }): void;
    /**
     * Traces an overlay along an edge.
     * @param params Overlay tracing options
     * @param params.edge Edge, or edge id, to trace the overlay along
     * @param params.overlay Definition of the overlay to trace along the edge.
     */
    traceEdge(params: {
        edge: Edge | string;
        overlay: OverlaySpec;
        options?: OverlayAnimationOptions;
        start?: Function;
        complete?: Function;
    }): void;
    /**
     * Traces an overlay along a path.
     * @param params Path tracing options
     * @param params.path The path to trace. Provide this, or provide `source` and `target`
     * @param params.overlay Definition of the overlay to trace along the path
     * @param params.source Source vertex to trace Path from. Provide this and `target`, or `path`.
     * @param params.target Target vertex to trace Path to. Provide this and `source`, or `path`.
     * @param params.options Options for the animation.
     * @param params.paused If true, the animation will start in a paused state.
     * @param params.listener Optional listener for events.
     */
    tracePath(params: {
        path?: Path;
        source?: Vertex | string;
        target: Vertex | string;
        options?: OverlayAnimationOptions;
        overlay: OverlaySpec;
        paused?: boolean;
        listener?: PathTransportListener;
    }): PathTransport;
}
