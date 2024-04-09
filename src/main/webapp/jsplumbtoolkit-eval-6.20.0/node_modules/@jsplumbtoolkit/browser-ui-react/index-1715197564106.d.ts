/**
 * Provides integration with React (17+). This package has a dependency on @jsplumbtoolkit/browser-ui.
 *
 * For a detailed discussion of this package, see https://docs.jsplumbtoolkit.com/toolkit/6.x/lib/react-integration.
 *
 * @packageDocumentation
 */
export * from './base-vertex-component';
export * from './base-node-component';
export * from './base-group-component';
export * from './base-port-component';
export * from './jsplumbtoolkit-miniview';
export * from './jsplumbtoolkit-surface';
export * from './browser-ui-react';
export * from './drag-drop';
export * from './shape-library-palette';
export * from './shape-library-shape';
export * from './edge-type-picker';
export * from './controls-component';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "jtk-endpoint": {
                "data-jtk-port-type"?: string;
                "data-jtk-port"?: string;
                "data-jtk-anchor-x"?: number;
                "data-jtk-anchor-y"?: number;
                "data-jtk-offset-x"?: number;
                "data-jtk-offset-y"?: number;
                "data-jtk-orientation-x"?: number;
                "data-jtk-orientation-y"?: number;
                "data-jtk-edge-type"?: string;
                "data-jtk-source"?: string;
                "data-jtk-target"?: string;
            };
        }
    }
}
