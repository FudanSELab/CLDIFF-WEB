import { BeforeConnectInterceptor, BeforeStartConnectInterceptor, ObjectFactory, BeforeMoveConnectionInterceptor, BeforeDetachInterceptor, BeforeStartDetachInterceptor } from "./toolkit";
import { Vertex, Port, Node, Group, Edge, ObjectData, Graph } from "./model/graph";
import { FilterableDataset } from "./filterable-dataset";
import { DataModel } from "./datamodel/data-model";
import { ToolkitRenderer } from './renderer';
import { PointXY } from "../ui-core/util/util";
/**
 * @public
 */
export interface ObjectInfo<T> {
    type?: string;
    obj?: T;
    id?: string;
}
/**
 * @public
 */
export interface DataSource extends FilterableDataset {
    bind<T = any>(evt: string, handler: (p: T) => any, insertAtStart?: boolean): void;
    unbind(evt: string, handler: Function): void;
    setSuspendGraph(v: boolean): void;
    getNodes(): Array<Node>;
    getNode(id: string): Node;
    getNodeType(nodeData: ObjectData): string;
    getNodeId(node: ObjectData): string;
    getNodeCount(): number;
    getNodeAt(idx: number): Node;
    getPortType(port: ObjectData): string;
    addPort(node: string | Node, data: ObjectData, doNotFireEvent?: boolean): Port;
    getPortId(port: ObjectData): string;
    getEdgeCount(): number;
    getAllEdgesFor(obj: Vertex, filter?: Function): Array<Edge>;
    getEdge(edgeId: string): Edge;
    edgeFactory: ObjectFactory;
    addEdge(params: any, source?: any, doNotFireEvent?: boolean): Edge;
    edgeMoved(edge: Edge, obj: any, index: number): void;
    removeEdge(edge: Edge): void;
    setEdgeGeometry(edge: Edge, geometry: any, renderer: ToolkitRenderer<any>): void;
    getEdgeType(edgeData: ObjectData): string;
    getGroup(id: string): Group;
    addToGroup(vertex: Node | Group | string | ObjectData, group: Group, sourceGroup?: Group, position?: PointXY, source?: ToolkitRenderer<any>): boolean;
    removeFromGroup(node: Node | Group | string | ObjectData, doNotFireEvent?: boolean, targetGroup?: Group, source?: ToolkitRenderer<any>): Group;
    getGroupCount(): number;
    getGroupAt(idx: number): Group;
    getVertex(id: string): Vertex;
    eachVertex(fn: (idx: number, vertex: Vertex) => void): void;
    getObjectInfo<T>(obj: any): ObjectInfo<T>;
    beforeConnect: BeforeConnectInterceptor;
    beforeMoveConnection: BeforeMoveConnectionInterceptor;
    beforeStartConnect: BeforeStartConnectInterceptor;
    beforeDetach: BeforeDetachInterceptor;
    beforeStartDetach: BeforeStartDetachInterceptor;
    debugEnabled: boolean;
    getModel(): DataModel;
    batch(fn: Function): void;
    fire(evt: string, payload: any, args3?: any): void;
    getGraph(): Graph;
}
