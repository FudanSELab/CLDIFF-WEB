import { Node } from "@jsplumbtoolkit/browser-ui";
declare const _default: {
    set: string;
    name: string;
    types: {
        id: string;
        name: string;
        inputs: {
            id: string;
            label: string;
            type: string;
        }[];
        outputs: {
            id: string;
            label: string;
            type: string;
        }[];
        compute: (node: Node) => Promise<boolean>;
    }[];
};
export default _default;
