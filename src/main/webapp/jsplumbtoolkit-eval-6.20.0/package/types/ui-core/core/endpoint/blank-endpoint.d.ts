import { EndpointRepresentation } from "./endpoint-representation";
import { Endpoint } from "./endpoint";
import { BlankEndpointParams } from "../../common/endpoint";
export declare type ComputedBlankEndpoint = [number, number, number, number];
export declare class BlankEndpoint extends EndpointRepresentation<ComputedBlankEndpoint> {
    constructor(endpoint: Endpoint<any>, params?: BlankEndpointParams);
    static type: string;
    type: string;
}
