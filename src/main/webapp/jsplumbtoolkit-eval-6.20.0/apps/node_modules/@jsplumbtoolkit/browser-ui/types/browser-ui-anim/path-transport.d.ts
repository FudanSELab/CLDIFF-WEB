import { ConnectionOverlayAnimator } from "./anim";
import { OptimisticEventGenerator } from "../ui-core/util/event-generator";
export declare type PathTransportListener = (s: string) => any;
export declare enum PathTransportState {
    STOPPED = "stopped",
    FINISHED = "finished",
    PAUSED = "paused",
    PLAYING = "playing"
}
export declare type CurrentState = PathTransportState;
export declare const EVENT_STATE = "state";
export declare class PathTransport extends OptimisticEventGenerator {
    components: Array<any>;
    params: any;
    pathExists: true;
    state: CurrentState;
    currentlyAnimatingConnection: ConnectionOverlayAnimator;
    constructor(components: Array<any>, params: any);
    setState(s: CurrentState): void;
    pause(): void;
    play(): void;
    cancel(): void;
}
