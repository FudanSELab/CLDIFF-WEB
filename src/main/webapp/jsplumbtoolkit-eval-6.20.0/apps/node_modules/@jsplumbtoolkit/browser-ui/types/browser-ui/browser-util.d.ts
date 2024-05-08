import { DataLoadOptions } from "../core/io";
export declare class xml {
    /**
     * Sets a node's text value.
     * @param node Element to set text on.
     * @param text Text to set.
     */
    static setNodeText(node: any, text: string): void;
    /**
     * Gets text from the given node.
     * @param node XML element.
     */
    static getNodeText(node: any): string;
    /**
     * Gets the first instance of the child with the given tag name, null if none found.
     * @param parent Element to retrieve child from.
     * @param name Child tag name to retrieve.
     */
    static getChild(parent: any, name: string): any;
    /**
     * Gets children of the given node (only direct children), returning an array of nodes (an empty array if none found).
     * @param parent Element to retrieve children from.
     * @param name Child tag names to retrieve.
     */
    static getChildren(parent: any, name: string): Array<any>;
    /**
     * Serializes the given XML node to a string, throwing an Error if something goes bad.
     * @param xmlNode XML element to serialize.
     * @returns Serialized XML element.
     */
    static xmlToString(xmlNode: any): string;
    /**
     * Creates an XML element.
     * @param name Tag name of the element to create.
     * @param attributes Optional map of attribute names and values.
     * @param text Optional text for the element.
     * @returns An XML element.
     */
    static createElement(name: string, attributes: any, text: string): any;
}
/**
 * Create a debounced version of the given function.
 * @param fn
 * @param timeout
 */
export declare function debounce(fn: Function, timeout: number): Function;
/**
 * Basic ajax function.
 * @param params
 */
export declare function ajax(params: DataLoadOptions): void;
