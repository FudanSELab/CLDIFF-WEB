import { WheelOptions } from "./pan-zoom-options";
export interface SurfaceWheelOptions extends Omit<WheelOptions, 'filter'> {
    /**
     * Optional CSS 3 selector to check if the wheel should be enabled for the current event target.
     */
    filter?: string;
}
