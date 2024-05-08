import { EdgePropertyMappings } from "../browser-ui/property-mappings/definitions";
import { JsPlumbToolkit } from "../core/toolkit";
/**
 * Helper class that renders a set of edge styles to the DOM and offers a callback method for when one is selected
 * via a mouse click.
 *
 * This was created as part of the demonstration applications for version 6.2.0 of the Toolkit and since it seemed useful
 * for other applications we're shipping it in the Toolkit package.
 *
 * @public
 */
export declare class EdgeTypePicker {
    private toolkit;
    private container;
    private mappings;
    private currentValue;
    private onSelect;
    private eventManager;
    private jsplumb;
    constructor(toolkit: JsPlumbToolkit, container: HTMLElement, mappings: EdgePropertyMappings, currentValue: string, onSelect: (value: string) => any);
    private entryMap;
    render(property: string): void;
    select(value: string): void;
}
