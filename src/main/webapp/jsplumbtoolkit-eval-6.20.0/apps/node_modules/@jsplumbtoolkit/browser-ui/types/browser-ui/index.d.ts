/**
 * This is the vanilla Toolkit package, which renders to HTML or SVG elements. This is the package to use when you want to use the
 * Toolkit in a webapp and you're not using a library integration. The various library integrations
 * such as Angular etc have a dependency on this package.
 *
 * @packageDocumentation
 */
import { Decorator } from "./decorators";
import { Constructable } from "../ui-core/util/util";
export { addWheelListener, removeWheelListener } from "./wheel-listener";
export * from "./constants";
export * from "./params";
export * from "./value-sources";
export * from "./background/background";
export * from './decorators';
export * from "./plugins/surface-plugin";
export * from "./fixed-layer";
export * from "./base-surface-layout-adapter";
export * from "./canvas-layout-adapter";
export * from "./group-layout-adapter";
export * from "./pan-zoom-options";
export * from "./pan-zoom";
export * from "./pinch-listener";
export * from './surface-decorator';
export * from './surface-wheel-options';
export * from './surface-drag-options';
export * from './surface-view-options';
export * from './surface-render-options';
export * from './surface-grid-profile';
export * from './surface-magnetize-profile';
export * from "./surface";
export * from "./ui-path";
export * from "./wheel-listener";
export * from './connector-editor';
export * from './browser-util';
export * from './browser-ui-instance';
export * from './magnetizer-dom';
export * from './browser-ui-model';
export * from './property-mappings/definitions';
/**
 * Register a new decorator.
 * @param name
 * @param dec
 * @public
 */
export declare function registerDecorator(name: string, dec: Constructable<Decorator>): void;
