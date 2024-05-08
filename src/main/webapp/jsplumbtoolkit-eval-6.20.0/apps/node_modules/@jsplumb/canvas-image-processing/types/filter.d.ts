/**
 * Invert the colors in an image.
 * @param image Image to invert
 * @param amount Amount to invert by, a number between 0 and 100. 100 is the default, which means to apply the inversion fully.
 */
export declare const filterInvert: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Apply a sepia filter to an image.
 * @param image Image to invert
 * @param amount Amount of sepia to apply. A value between 0 and 100, defaults to 100.
 */
export declare const filterSepia: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Apply a grayscale filter to an image (desaturates the image)
 * @param image Image to invert
 * @param amount Amount of desaturation, a value between 0 and 100. 100 is the default, and means full desaturation.
 */
export declare const filterGrayScale: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Apply saturation to an image.
 * @param image Image to invert
 * @param amount Amount of saturation, a value with a minimum of 0 but no specific upper limit. For values between 0 and 100,
 * the saturate filter is effectively the inverse of the grayscale filter. But the saturate filter supports values greater than 100,
 * allowing you to over-saturate an image. The default value is 50.
 */
export declare const filterSaturate: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Adjust the opacity of an image.
 * @param image Image to adjust
 * @param amount Amount of opacity (expressed as a percentage), a value between 0 and 100, defaulting to 50.
 */
export declare const filterOpacity: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Apply blur to an image.
 * @param image Image to adjust
 * @param radius Radius, in pixels, of the blur. Defaults to 10.
 */
export declare const filterBlur: (image: HTMLImageElement, radius?: number) => Promise<HTMLImageElement>;
/**
 * Rotates the hue component of an image.
 * @param image Image to adjust
 * @param rotation Rotation, in degrees, to apply. Defaults to 90.
 */
export declare const filterHueRotate: (image: HTMLImageElement, rotation?: number) => Promise<HTMLImageElement>;
/**
 * Adjusts the contrast of an image.
 * @param image Image to adjust
 * @param amount Amount of contrast to apply, a value between 0 and 100. Defaults to 200.
 */
export declare const filterContrast: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Adjusts the brightness of an image.
 * @param image Image to adjust
 * @param amount Amount of brightness to apply, a value between 0 and 100. Defaults to 200.
 */
export declare const filterBrightness: (image: HTMLImageElement, amount?: number) => Promise<HTMLImageElement>;
/**
 * Apply a tint to an image.
 * @param image Image to tint.
 * @param color Color to tint with.
 */
export declare function filterTint(image: HTMLImageElement, color: string): Promise<HTMLImageElement>;
