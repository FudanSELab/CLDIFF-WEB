import { Overlay } from '../overlay/overlay';
import { JsPlumbInstance } from "../core";
import { Constructable } from "../../util/util";
import { Connection } from "../connector/connection-impl";
export declare const OverlayFactory: {
    get: <E>(instance: JsPlumbInstance, name: string, component: Connection<E>, params: any) => Overlay;
    register: (name: string, overlay: Constructable<Overlay>) => void;
};
