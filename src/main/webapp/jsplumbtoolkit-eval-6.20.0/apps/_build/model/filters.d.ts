import { Node } from "@jsplumbtoolkit/browser-ui";
declare const filters: {
    set: string;
    name: string;
    types: ({
        id: string;
        name: string;
        inputs: ({
            id: string;
            label: string;
            type: string;
            defaultValue?: undefined;
        } | {
            id: string;
            label: string;
            type: string;
            defaultValue: number;
        })[];
        outputs: {
            id: string;
            label: string;
            type: string;
        }[];
        compute: (node: Node) => Promise<boolean>;
    } | {
        id: string;
        name: string;
        inputs: ({
            id: string;
            label: string;
            type: string;
            defaultValue?: undefined;
        } | {
            id: string;
            label: string;
            type: string;
            defaultValue: string;
        })[];
        outputs: {
            id: string;
            label: string;
            type: string;
        }[];
        compute: (node: Node) => Promise<boolean>;
    })[];
};
export declare const FILTER_INSPECTORS: Record<string, any>;
export default filters;
