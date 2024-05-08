/**
 * Extracts the contents of the given canvas to an Image.
 * @param canvas
 * @param type Type of image (eg image/png, image/jpeg). Defaults to PNG.
 * @param quality When exporting JPG, this defines the quality of the output.
 */
export declare function canvasToImage(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<HTMLImageElement>;
/**
 * Sets the contents of a canvas element to the image represented by the given data URL.
 * @param canvas Canvas to draw into
 * @param url  URL to load. Maybe a data URL or an http[s]:// url.
 * @return a Promise that resolves to `true` once the image has been drawn into the canvas.
 */
export declare function setCanvasImageFromURL(canvas: HTMLCanvasElement, url: string, width?: number, height?: number): Promise<boolean>;
/**
 * Sets an image on a given canvas, setting the width/height of the canvas and scaling the image to fit. You do not need
 * to use this method if you don't wish to scale the canvas. You can just use the canvas's `drawImage` method instead.
 * @param canvas Canvas to draw into
 * @param img Image to draw
 * @param width Optional width for canvas. If null, the image width will be used.
 * @param height Optional height for canvas. If null, the image height will be used.
 * @param bgFill Color to use as background fill, defaults to white. You'll see a background fill if your image's dimensions are
 * in a different aspect ratio that defined by the width/height properties you provide.
 * @return true if successful, false if not.
 */
export declare function setCanvasImageFromImage(canvas: HTMLCanvasElement, width: number, height: number, img: HTMLImageElement, bgFill?: string): boolean;
/**
 * Draw the given image into the given canvas, scaling the canvas so that the whole image fits.
 * @param canvas
 * @param img
 */
export declare function drawScaledImage(canvas: HTMLCanvasElement, img: HTMLImageElement): void;
/**
 * Create a canvas which is the size of the given image. Does not draw the image into it.
 * @public
 * @param img
 */
export declare function createCanvas(img: HTMLImageElement): HTMLCanvasElement;
