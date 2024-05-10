import { VanillaInspector, isNode } from "@jsplumbtoolkit/browser-ui";
import { INPUT_INSPECTORS } from "./model/inputs";
import { FILTER_INSPECTORS } from './model/filters';
import { TRANSFORM_INSPECTORS } from './model/transforms';
import { BASIC_INSPECTORS } from './model/basic';
const handlers = {
    input: INPUT_INSPECTORS,
    filter: FILTER_INSPECTORS,
    transform: TRANSFORM_INSPECTORS,
    basic: BASIC_INSPECTORS
};
export class ImageInspector extends VanillaInspector {
    model;
    constructor(container, surface, model) {
        super({
            container,
            surface,
            templateResolver: (obj) => {
                if (isNode(obj)) {
                    return this._renderNodeTemplate(obj);
                }
                return '';
            },
            cacheTemplates: false,
            renderEmptyContainer: () => `<h1>SELECT SOMETHING INNIT</h1>`,
            refresh: (obj, cb) => null
        });
        this.model = model;
    }
    _renderNodeTemplate(obj) {
        console.log('render node template');
        // entrance for right bar
        console.log(obj);
        const [set, type] = obj.type.split(".");
        try {
            return handlers[set][type].template(obj);
        }
        catch (e) {
            return `<div/>`;
        }
    }
}
