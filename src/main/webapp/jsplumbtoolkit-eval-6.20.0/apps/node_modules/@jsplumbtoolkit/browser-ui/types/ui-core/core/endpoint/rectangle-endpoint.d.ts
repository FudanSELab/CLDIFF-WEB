import { Endpoint } from "./endpoint";
import { RectangleEndpointParams } from "../../common/endpoint";
import { EndpointRepresentation } from "./endpoint-representation";
export declare type ComputedRectangleEndpoint = [number, number, number, number];
export declare class RectangleEndpoint extends EndpointRepresentation<ComputedRectangleEndpoint> {
    width: number;
    height: number;
    constructor(endpoint: Endpoint<any>, params?: RectangleEndpointParams);
    static type: string;
    type: string;
    static _getParams(ep: RectangleEndpoint): Record<string, any>;
}
