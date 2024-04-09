import { JsPlumbInstance } from "../core";
import { Connection } from '../connector/connection-impl';
import { GroupManager } from "./group-manager";
import { AnchorSpec } from "../../common/anchor";
import { PointXY } from "../../util/util";
import { EndpointSpec } from "../../common/endpoint";
import { Group } from "../../../core/model/graph";
export interface GroupOptions {
    droppable?: boolean;
    enabled?: boolean;
    orphan?: boolean;
    constrain?: boolean;
    proxied?: boolean;
    ghost?: boolean;
    revert?: boolean;
    prune?: boolean;
    dropOverride?: boolean;
    anchor?: AnchorSpec;
    endpoint?: EndpointSpec;
    elastic?: boolean;
}
export declare class UINode<E> {
    instance: JsPlumbInstance;
    el: E;
    id: string;
    uiGroup: UIGroup<E>;
    constructor(instance: JsPlumbInstance, el: E, id: string);
}
export declare class UIGroup<E = any> extends UINode<E> {
    instance: JsPlumbInstance;
    group: Group;
    children: Array<UINode<E>>;
    collapsed: boolean;
    droppable: boolean;
    enabled: boolean;
    orphan: boolean;
    constrain: boolean;
    proxied: boolean;
    ghost: boolean;
    revert: boolean;
    prune: boolean;
    dropOverride: boolean;
    elastic: boolean;
    contentArea: E;
    anchor: AnchorSpec;
    endpoint: EndpointSpec;
    readonly connections: {
        source: Array<Connection<E>>;
        target: Array<Connection<E>>;
        internal: Array<Connection<E>>;
    };
    manager: GroupManager<E>;
    constructor(instance: JsPlumbInstance, group: Group, el: E, options: GroupOptions);
    overrideDrop(el: any, targetGroup: UIGroup<E>): boolean;
    getAnchor(conn: Connection<E>, endpointIndex: number): AnchorSpec;
    getEndpoint(conn: Connection<E>, endpointIndex: number): EndpointSpec;
    add(_el: E, id: string, doNotFireEvent?: boolean): void;
    private resolveNode;
    remove(el: E, manipulateUI?: boolean, doNotFireEvent?: boolean, doNotUpdateConnections?: boolean, targetGroup?: UIGroup<E>): void;
    private _doRemove;
    removeAll(manipulateDOM?: boolean, doNotFireEvent?: boolean): void;
    orphanAll(): Record<string, PointXY>;
    addGroup(group: UIGroup<E>): boolean;
    removeGroup(group: UIGroup<E>): void;
    getGroups(): Array<UIGroup<E>>;
    getNodes(): Array<UINode<E>>;
    get collapseParent(): UIGroup<E>;
}
