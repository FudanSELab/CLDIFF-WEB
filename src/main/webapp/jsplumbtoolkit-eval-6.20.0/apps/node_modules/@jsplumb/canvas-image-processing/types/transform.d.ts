import { AXIS_X, AXIS_X_AND_Y, AXIS_Y } from "./definitions";
/**
 * Flip the given image on either the horizontal or vertical axis, or both.
 * @param img Image to flip
 * @param axis Axis to flip on.
 */
export declare function mirrorImage(img: HTMLImageElement, axis: typeof AXIS_X | typeof AXIS_Y | typeof AXIS_X_AND_Y): Promise<HTMLImageElement>;
/**
 * Apply a threshold operation to some image.
 * @param image
 * @param threshold
 * @param value
 */
export declare function imageThreshold(image: HTMLImageElement, threshold: number, value?: number): Promise<HTMLImageElement>;
/**
 * Crop a section of an image.
 * @param image Image to crop
 * @param x Start position of crop in x axis
 * @param y Start position of crop in y axis
 * @param w Width of crop
 * @param h Height of crop
 */
export declare function cropImage(image: HTMLImageElement, x: number, y: number, w: number, h: number): Promise<HTMLImageElement>;
/**
 * Overlay an image onto some oher image
 * @param image1 Base image
 * @param image2 Image to overlay.
 * @param x Optional origin X for the overlay. Defaults to 0.
 * @param y Optional origin XY for the overlay. Defaults to 0.
 */
export declare function overlayImage(image1: HTMLImageElement, image2: HTMLImageElement, x?: number, y?: number): Promise<HTMLImageElement>;
/**
 * Use an image as a mask to clip some other image.
 * @param image Image to clip
 * @param mask Image to use as a mask.
 */
export declare function clipImage(image: HTMLImageElement, mask: HTMLImageElement): Promise<HTMLImageElement>;
/**
 * Blend two images with a given composite mode, the default being `multiply`
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation for allowed blend modes.
 * @param image1 First image to blend - `destination` when using an applicable mode
 * @param image2 Second image to blend - `source` when using an applicable mode
 * @param blendMode Mode to use for blending. Defaults to `multiply`.
 */
export declare function blendImages(image1: HTMLImageElement, image2: HTMLImageElement, blendMode?: GlobalCompositeOperation): Promise<HTMLImageElement>;
/**
 * Resize the image to the given width and height.
 * @param image
 * @param width
 * @param height
 */
export declare function resizeImage(image: HTMLImageElement, width: number, height: number): Promise<HTMLImageElement>;
