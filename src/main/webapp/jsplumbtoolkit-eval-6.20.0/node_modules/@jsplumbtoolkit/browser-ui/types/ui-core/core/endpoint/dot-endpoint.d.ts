import { EndpointRepresentation } from "./endpoint-representation";
import { Endpoint } from "./endpoint";
import { DotEndpointParams } from "../../common/endpoint";
export declare type ComputedDotEndpoint = [number, number, number, number, number];
export declare class DotEndpoint extends EndpointRepresentation<ComputedDotEndpoint> {
    radius: number;
    defaultOffset: number;
    defaultInnerRadius: number;
    constructor(endpoint: Endpoint<any>, params?: DotEndpointParams);
    static type: string;
    type: string;
}
