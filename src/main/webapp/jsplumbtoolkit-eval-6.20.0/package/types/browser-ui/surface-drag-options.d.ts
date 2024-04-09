import { DragOptions } from "../ui-core/browser-ui-renderer/browser-jsplumb-instance";
import { PointXY, Size } from "../ui-core/util/util";
/**
 * Options for element drag in a Surface.
 * @public
 */
export interface SurfaceDragOptions extends Omit<DragOptions, "grid"> {
    /**
     * Optional CSS3 selector identifying parts of nodes/groups that should not cause a drag to start.
     */
    filter?: string;
    /**
     * Optional function to use to constrain element dragging.
     * @param desiredLoc
     * @param dragEl
     * @param constrainRect
     * @param size
     */
    constrainFunction?: (desiredLoc: PointXY, dragEl: HTMLElement, constrainRect: Size, size: Size) => PointXY;
    /**
     * Defaults to true, meaning that when element dragging is occurring a class is added to the document body
     * and also to the surface container.
     */
    addHelperClasses?: boolean;
}
