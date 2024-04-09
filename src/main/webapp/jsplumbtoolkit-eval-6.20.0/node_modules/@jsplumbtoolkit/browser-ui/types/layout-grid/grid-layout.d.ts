import { AbstractLayout, InternalLayoutOptions } from "../core/layout/abstract-layout";
import { CircularLayoutParameters } from "../layout-circular/circular-layout";
import { DataSource } from "../core/datasource";
import { GridLayoutParameters } from "./definitions";
/**
 * A layout that places elements into a grid, optionally with fixed number of rows or columns.
 * If you provide a fixed value for both rows and columns only the rows value will be honoured.
 *
 * Elements are placed such that they are centered in their cell, where the width and height of each
 * cell is fixed, and is determined by the maximum width/height of all the vertices in the layout. For
 * that reason if you have a dataset where the size of your vertices varies largely you may not get the
 * best results - there could be a lot of whitespace.
 * @public
 */
export declare class GridLayout extends AbstractLayout<GridLayoutParameters> {
    private cells;
    private readonly verticalAlignment;
    private readonly horizontalAlignment;
    private readonly orientation;
    private readonly rowCount;
    private readonly columnCount;
    private maxWidth;
    private maxHeight;
    getDefaultParameters(): CircularLayoutParameters;
    constructor(params: InternalLayoutOptions<GridLayoutParameters>);
    defaultMagnetized: boolean;
    type: "Grid";
    static type: string;
    canMagnetize(id: string): boolean;
    /**
     *
     * @param dataSource
     * @param parameters
     */
    begin(dataSource: DataSource, parameters: CircularLayoutParameters): void;
    end(dataSource: DataSource, parameters: CircularLayoutParameters, wasMagnetized: boolean): void;
    reset(): void;
    private _computePadding;
    step(dataSource: DataSource, parameters?: any): void;
}
