import * as React from 'react';
import { Surface } from "@jsplumbtoolkit/browser-ui";
/**
 * Props for the controls component.
 * @public
 */
export interface ControlsComponentProps {
    /**
     * The surface to attach to.
     */
    surface: Surface;
    /**
     * Optional message for the alert that the clear button shows by default. Defaults to `Clear dataset?`.
     */
    clearMessage?: string;
    /**
     * Optional callback to invoke when the user presses the clear button. If you provide this, the component will not
     * show an alert and instead call this method, passing in a function you can invoke if you wish to continue with the clear operation.
     */
    onMaybeClear?: (doClear: () => void) => void;
}
export interface ControlsComponentState {
}
export declare class ControlsComponent extends React.Component<ControlsComponentProps, ControlsComponentState> {
    private clearMessage;
    private toolkit;
    private surface;
    private _container;
    private onMaybeClear;
    constructor(props: ControlsComponentProps);
    private reset;
    private panMode;
    private selectMode;
    private clear;
    render(): JSX.Element;
}
