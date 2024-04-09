import { Surface } from "./surface";
import { Path } from "../core/model/path";
/**
 * A wrapper around the Toolkit's path object, which offers a few DOM specific methods.
 */
export declare class UIPath {
    path: Path;
    private surface;
    /**
     * @param path Underlying path object.
     * @param surface The surface that constructed this path.
     */
    constructor(path: Path, surface: Surface);
    /**
     * Gets the count of vertices in the path.
     */
    getVertexCount(): number;
    /**
     * Gets the total number of edges in the path.
     */
    getEdgeCount(): number;
    /**
     * Sets the visible state of all vertices and edges in the path
     * @param val
     */
    setVisible(val: boolean): void;
    /**
     * Adds a CSS class to the elements representing the vertices in the path
     * @param clazz
     */
    addVertexClass(clazz: string): void;
    /**
     * Removes a CSS class from the elements representing the vertices in the path
     * @param clazz
     */
    removeVertexClass(clazz: string): void;
    /**
     * Adds a CSS class to the elements representing the edges in the path
     * @param clazz
     */
    addEdgeClass(clazz: string): void;
    /**
     * Removes a CSS class from the elements representing the edges in the path
     * @param clazz
     */
    removeEdgeClass(clazz: string): void;
    /**
     * Adds a CSS class to the elements representing the vertices and edges in the path
     * @param clazz
     */
    addClass(clazz: string): void;
    /**
     * Removes a CSS class from the elements representing the vertices and edges in the path
     * @param clazz
     */
    removeClass(clazz: string): void;
}
