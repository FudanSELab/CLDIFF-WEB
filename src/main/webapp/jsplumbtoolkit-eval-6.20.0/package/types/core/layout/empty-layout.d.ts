import { AbstractLayout, InternalLayoutOptions, LayoutParameters } from "./abstract-layout";
import { Extents, PointXY, Size } from "../../ui-core/util/util";
import { DataSource } from "../datasource";
/**
 * A layout that has no opinions whatsoever about where nodes should be placed. Everything is placed at [0,0] and assumed
 * to have a width and height of 0. This layout is a placeholder.
 * @public
 */
export declare class EmptyLayout extends AbstractLayout<LayoutParameters> {
    static type: string;
    readonly type: string;
    constructor(options: InternalLayoutOptions<LayoutParameters>);
    getDefaultParameters(): Record<string, any>;
    layout(): void;
    refresh(): void;
    relayout(): void;
    getPositions(): Map<string, PointXY>;
    getPosition(id: string): PointXY;
    setPosition(id: string, x: number, y: number): Record<string, {
        original: PointXY;
        current: PointXY;
    }>;
    _getExtents(): Extents;
    getSize(id: string): Size;
    defaultMagnetized: boolean;
    begin(toolkit: DataSource, parameters: Record<string, any>): void;
    canMagnetize(id: string): boolean;
    end(toolkit: DataSource, parameters: Record<string, any>, wasMagnetized: boolean): void;
    reset(): void;
    step(toolkit: DataSource, parameters: Record<string, any>): void;
    getSizes(): Map<any, any>;
}
