import { PrintHandler, Margins, Units, PageSize, PageDimensions, PageBounds } from "./jsplumbtoolkit-print";
import { Surface } from "../browser-ui/surface";
export * from './jsplumbtoolkit-print';
/**
 * Register a print handler for the given surface, optionally with the given id. An id will be generated if not
 * provided.
 * @param surface
 * @param id
 */
export declare function registerHandler(surface: Surface, id?: string): PrintHandler;
/**
 * Instructs the given handler to zoom its content to 1, and then report back how big the page needs to be to
 * render the entire dataset. Note that this method returns an array serialized as a string.
 * @param handlerId ID of the handler to scale.
 * @param margins Optional margins to use (in [top,right,bottom,left] format). Values here are expressed in whatever you specify for `units`,
 * which defaults to CENTIMETERS if you leave it empty.
 * @param units Optional units, defaults to CENTIMETERS.
 */
export declare function scaleToFullPage(handlerId: string, margins?: Margins, units?: Units): String;
/**
 * Instructs the given handler to zoom its content so that it would fit into a page of the given size. We currently know about
 * LETTER, A5, A4, A3, A2, A1, A0 and FULL (which is the same as calling `scaleToFullPage`). Note that this method returns an array serialized as a string.
 * @param handlerId ID of the handler to scale.
 * @param size PageSize to fit into.
 * @param margins Optional margins to use (in [top,right,bottom,left] format). Values here are expressed in whatever you specify for `units`,
 * which defaults to CENTIMETERS if you leave it empty.
 * @param units Optional units, defaults to CENTIMETERS.
 */
export declare function scaleToPageSize(handlerId: string, size: PageSize, margins?: Margins, units?: Units): String;
/**
 * Instructs the given handler to zoom its content so that it would fit into a page of the given dimensions. The values are in centimetres,
 * unless you specify in the third argument to the method that the dimensions are inches.
 * @param handlerId ID of the handler to scale.
 * @param dimensions PageDimensions to fit into.
 * @param margins Optional margins to use (in [top,right,bottom,left] format). Values here are expressed in whatever you specify for `units`,
 * which defaults to CENTIMETERS if you leave it empty.
 * @param units Optional units, defaults to CENTIMETERS.
 */
export declare function scaleToPageDimensions(handlerId: string, dimensions: PageDimensions, margins?: Margins, units?: Units): number;
/**
 * Instructs the given handler to zoom and pan its content so that it would fit into the given width and height (which
 * are pixel values). This is used when printing if we wish to fix to a specific page size like A4.
 * @param handlerId The ID of the handler to scale.
 * @param wh Width and height (in pixels) to zoom to
 * @param margins Optional margins in [top,right,bottom,left] format. In this method, these values are expressed as pixel values.
 * @param handlerId
 * @param wh
 * @param margins
 */
export declare function scaleToBounds(handlerId: string, wh: PageBounds, margins?: Margins): number;
/**
 * Returns whether or not the handler with the given id considers itself ready to print.
 * if no such handler is found we also return false; it is entirely possible that this call could be made
 * before the handler has been instantiated.
 * @param handlerId
 */
export declare function isReadyToPrint(handlerId: string): boolean;
