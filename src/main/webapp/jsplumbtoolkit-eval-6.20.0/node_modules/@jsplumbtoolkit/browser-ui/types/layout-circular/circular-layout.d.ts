import { AbstractLayout, InternalLayoutOptions, LayoutParameters } from "../core/layout/abstract-layout";
import { PointXY } from "../ui-core/util/util";
import { DataSource } from "../core/datasource";
/**
 * Parameters for the circular layout.
 * @public
 */
export interface CircularLayoutParameters extends LayoutParameters {
    /**
     * If true, the first node in the data set will be placed in the center of the circle. Defaults to false.
     */
    centerRoot?: boolean;
}
/**
 * A layout that places vertices in a circle, optionally with one at the center.
 * @public
 */
export declare class CircularLayout extends AbstractLayout<CircularLayoutParameters> {
    centerRoot: boolean;
    static type: string;
    readonly type: string;
    padding: PointXY;
    constructor(params: InternalLayoutOptions<CircularLayoutParameters>);
    getDefaultParameters(): CircularLayoutParameters;
    defaultMagnetized: boolean;
    begin(toolkit: DataSource, parameters: CircularLayoutParameters): void;
    canMagnetize(id: string): boolean;
    end(toolkit: DataSource, parameters: CircularLayoutParameters, wasMagnetized: boolean): void;
    reset(): void;
    step(toolkit: DataSource, parameters: CircularLayoutParameters): void;
}
