import { RouterOptions } from "./common";
import { PointXY } from "../ui-core/util/util";
/**
 * @internal
 */
export interface DirectRouterOptions extends RouterOptions {
}
/**
 * @internal
 * @param options
 */
export declare function directRouter(options: DirectRouterOptions): Record<string, Array<PointXY>>;
