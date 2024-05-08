import { Surface } from "../browser-ui/surface";
export declare type Units = string;
export declare type PageSize = string;
export declare type PageDimensions = [number, number];
export declare type PageBounds = [number, number];
export declare type Margins = [number, number, number, number];
export declare class PrintHandler {
    surface: Surface;
    id: string;
    constructor(surface: Surface, id?: string);
    scaleToBounds(wh: PageBounds, margins?: Margins): number;
    scaleToPageDimensions(dimensions: PageDimensions, margins?: Margins, units?: Units): number;
    scaleToPageSize(size: PageSize, margins?: Margins, units?: Units): PageDimensions;
    scaleToFullPage(margins?: Margins, units?: Units): PageDimensions;
    isReadyToPrint(): boolean;
}
