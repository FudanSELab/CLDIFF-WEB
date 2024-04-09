import * as React from 'react';
import { EdgePropertyMappings, Inspector } from "@jsplumbtoolkit/browser-ui";
/**
 * Props for the EdgeTypePickerComponent
 * @public
 */
export interface EdgeTypePickerComponentProps {
    /**
     * Set of mappings to render and to allow selection from
     */
    edgeMappings: EdgePropertyMappings;
    /**
     * Inspector to interact with to get/set values
     */
    inspector: Inspector;
    /**
     * Name of the property to get/set in the edge data
     */
    propertyName: string;
}
export interface EdgeTypePickerComponentState {
}
/**
 * A helper component to support the selection of an edge type from a set of
 * edge property mappings.
 * @public
 */
export declare class EdgeTypePickerComponent extends React.Component<EdgeTypePickerComponentProps, EdgeTypePickerComponentState> {
    edgeMappings: EdgePropertyMappings;
    inspector: Inspector;
    propertyName: string;
    _container: HTMLElement;
    private edgeTypePicker;
    constructor(props: EdgeTypePickerComponentProps);
    render(): JSX.Element;
    componentDidMount(): void;
}
