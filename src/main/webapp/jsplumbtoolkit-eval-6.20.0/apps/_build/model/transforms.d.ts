import { Node } from "@jsplumbtoolkit/browser-ui";
export declare const TRANSFORM_MIRROR = "mirror";
export declare const TRANSFORM_BLEND = "blend";
export declare const TRANSFORM_CLIP = "clip";
export declare const TRANSFORM_CROP = "crop";
export declare const TRANSFORM_RESIZE = "resize";
export declare const TRANSFORM_OVERLAY = "overlay";
export declare const TRANSFORM_THRESHOLD = "threshold";
declare const _default: {
    set: string;
    name: string;
    types: {
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
    }[];
};
export default _default;
export declare const TRANSFORM_INSPECTORS: Record<string, any>;
