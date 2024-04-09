import { Recado } from "../templates-2/core";
import { Surface } from "../browser-ui/surface";
/**
 * Simple component that was created for our demonstrations. We decided to include it in the Toolkit since it may of
 * some use to others.
 * @public
 */
export declare class ControlsComponent {
    templateRenderer: Recado;
    rootElement: HTMLElement;
    constructor(container: HTMLElement, surface: Surface, clearMessage?: string);
}
