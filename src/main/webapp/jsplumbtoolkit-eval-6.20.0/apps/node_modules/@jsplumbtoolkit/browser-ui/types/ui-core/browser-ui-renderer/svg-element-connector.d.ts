import { Extents } from "../util/util";
import { BrowserJsPlumbInstance } from "./browser-jsplumb-instance";
import { PaintStyle } from "../common/paint-style";
import { Connector } from "../common/connector";
export declare function paintSvgConnector(instance: BrowserJsPlumbInstance, connector: Connector, paintStyle: PaintStyle, extents?: Extents): void;
export declare function getConnectorElement(instance: BrowserJsPlumbInstance, c: Connector): SVGElement;
