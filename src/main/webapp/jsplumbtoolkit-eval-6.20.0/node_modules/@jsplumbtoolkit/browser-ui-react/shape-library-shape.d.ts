import { ObjectData, ShapeLibraryImpl } from "@jsplumbtoolkit/browser-ui";
import * as React from 'react';
/**
 * Props for the ShapeComponent.
 * @public
 * @param obj Backing data for the vertex. Required.
 * @param shapeLibrary Shape library to use to render the shape. Required. The `type` value in `obj` will be used to
 * find the appropriate SVG to render.
 * @param showLabels If true, a label will be written on the shape (using an SVG text element)
 * @param labelProperty The name of the property that identifies some vertex's label. Defaults to "label".
 * @param labelStrokeWidth Optional stroke width to use for labels. Defaults to "0.25px".
 */
export interface ShapeComponentProps {
    obj: ObjectData;
    shapeLibrary: ShapeLibraryImpl<ObjectData>;
    showLabels?: boolean;
    labelProperty?: string;
    labelStrokeWidth?: string;
}
export interface ShapeComponentState {
}
/**
 * A component that renders an SVG shape.
 * @public
 *
 */
export declare class ShapeComponent extends React.Component<ShapeComponentProps, ShapeComponentState> {
    _container: SVGElement;
    private _doRender;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<ShapeComponentProps>, prevState: Readonly<ShapeComponentState>, snapshot?: any): void;
    render(): JSX.Element;
}
