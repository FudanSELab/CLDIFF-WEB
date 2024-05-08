import { VanillaInspectorOptions } from "./definitions";
import { Inspector } from "./inspector";
import { CustomTagOptions } from "../templates-2/custom-tag";
/**
 * An inspector that renders to a nominated DOM element, using
 * the Toolkit's default template renderer. You have to provide
 * a `templateResolver` which, for a given object, can return a
 * template in the Toolkit's default template syntax.
 * @public
 */
export declare class VanillaInspector {
    private readonly toolkit;
    private readonly templateRenderer;
    private readonly emptyTemplateFn;
    private readonly templateResolver;
    private vertexTemplateCache;
    private edgeTemplateCache;
    private portTemplateCache;
    private _doCacheTemplates;
    protected readonly inspector: Inspector;
    constructor(options: VanillaInspectorOptions);
    protected registerTag(tagName: string, options: CustomTagOptions): void;
    private getPortTemplate;
    private getNodeTemplate;
    /**
     * getGroupTemplate uses the same logic as getNodeTemplate
     * @internal
     * @param obj
     */
    private getGroupTemplate;
    private getEdgeTemplate;
    private _renderTemplate;
    /**
     * For subclasses/wrapper classes to use.
     * @param key
     * @param value
     */
    setValue(key: string, value: string): void;
    /**
     * Persist any pending updates to the toolkit, then clear the list of pending updates. Returns the count of
     * the number of changes made.
     * @public
     */
    persist(): number;
    /**
     * Returns whether or not there are unsaved changes.
     * @public
     */
    hasPendingChanges(): boolean;
}
