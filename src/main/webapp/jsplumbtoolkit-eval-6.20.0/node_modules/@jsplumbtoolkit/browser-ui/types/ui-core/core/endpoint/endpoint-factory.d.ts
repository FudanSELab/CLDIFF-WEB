import { Endpoint } from "./endpoint";
import { Orientation } from "../factory/anchor-record-factory";
import { AnchorPlacement } from "../../common/anchor";
import { EndpointRepresentation } from "./endpoint-representation";
export declare const EndpointFactory: {
    get: (ep: Endpoint<any>, name: string, params: any) => EndpointRepresentation<any>;
    clone: <C>(epr: EndpointRepresentation<C>) => EndpointRepresentation<C>;
    compute: <T>(endpoint: EndpointRepresentation<T>, anchorPoint: AnchorPlacement, orientation: Orientation, endpointStyle: any) => T;
};
