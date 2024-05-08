/**
 * Reads an image into a file. You might use this in conjunction with a browser dialog that opens a file,
 * or in response to a natice drag/drop event.
 * @param file
 */
export declare function readImageFromFile(file: File): Promise<HTMLImageElement>;
/**
 * Gets an image as a data url.
 * @param img
 */
export declare function imageToDataURL(img: HTMLImageElement): string;
/**
 * Converts an image uri to a data uri. If the given image resides on the network and the appropriate cross
 * origin headers are not supported, this method will fail.
 *
 * @param URI URI to load and convert to a data URI. It may already be a data URI.
 */
export declare function imageURIToDataURL(URI: string): Promise<string>;
/**
 * Creates an Image from a URI.
 * @param URI Either a data:... URI or the location of an image somewhere on the network.
 * @return
 */
export declare function imageURLToImage(URI: string): Promise<HTMLImageElement>;
