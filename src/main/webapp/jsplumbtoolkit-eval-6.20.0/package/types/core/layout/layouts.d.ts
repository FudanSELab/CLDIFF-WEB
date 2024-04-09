import { AbstractLayout, InternalLayoutOptions } from "./abstract-layout";
import { Constructable } from "../../ui-core/util/util";
export declare const Layouts: {
    get: (name: string, params?: InternalLayoutOptions<any>) => AbstractLayout<any>;
    register: (name: string, layout: Constructable<AbstractLayout<any>>) => void;
};
