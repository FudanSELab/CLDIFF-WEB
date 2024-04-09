import { Edge, Group, Port, Node } from "../core/model/graph";
import { JsPlumbToolkit } from "../core/toolkit";
/**
 * @internal
 */
export declare type Token = {
    token: string;
    context: string;
};
/**
 * @internal
 */
export declare type Tokenizer = (s: string) => Array<Token>;
/**
 * @internal
 */
export declare function WhitespaceReplacingTokenizer(value: string): Array<Token>;
/**
 * @internal
 */
export declare function DefaultSearchTokenizer(value: string): Array<Token>;
/**
 * @internal
 */
export declare type Sorter = (a: HasScore, b: HasScore) => number;
export declare type SearchDocumentIdFunction = (doc: any) => string;
export interface HasScore {
    score: number;
}
export interface Hit extends HasScore {
    document: any;
    contexts: Array<string>;
}
/**
 * Options for the search index.
 * @public
 */
export interface jsPlumbToolkitSearchIndexOptions {
    /**
     * Optional list of fields to index. By default this is empty, meaning all fields (minus any `exclusions`) will
     * be indexed.
     */
    fields?: Array<string>;
    /**
     * Optional limit for the number of result a search should return. Defaults to 10.
     */
    limit?: number;
    /**
     * Optional list of field names to omit from the documents stored for each node. This means that any field in this
     * list will not be indexed.
     */
    exclusions?: Array<string>;
    /**
     * Whether or not the search index should ignore case. By default this is false.
     */
    caseSensitive?: boolean;
    /**
     * @internal
     */
    idFunction?: SearchDocumentIdFunction;
    /**
     * Function to use for sorting. Only "by score" is currently supported.
     * @internal
     */
    sorter?: Sorter;
    /**
     * The tokenizer to use to split each field up into its parts.
     * @internal
     */
    tokenizer?: Tokenizer;
    /**
     * The tokenizer to use to split a search term up into multiple matches. Not currently supported.
     * @internal
     */
    searchTokenizer?: Tokenizer;
}
export interface IndexDocument extends HasScore {
    document: any;
}
/**
 * @internal
 */
export interface IndexEntry {
    index: number;
    children: any;
    documentIds: any;
    key: string;
}
/**
 * @internal
 */
declare class DatasetIndex {
    fields: Array<string>;
    root: IndexEntry;
    tokenizer: Tokenizer;
    searchTokenizer: Tokenizer;
    limit: number;
    exclusions: Array<string>;
    caseSensitive: boolean;
    idFunction: SearchDocumentIdFunction;
    sorter: Sorter;
    private _nodeIdx;
    private _makeNode;
    private _documentMap;
    private _documentList;
    private _documentCount;
    private _nodeMap;
    constructor(options?: jsPlumbToolkitSearchIndexOptions);
    private _storeNodeReferenceForDocument;
    private _addToken;
    private removeExclusions;
    add(doc: any): void;
    addAll(...docs: Array<any>): void;
    reindex(doc: any): void;
    remove(doc: any): void;
    clear(): void;
    getDocumentCount(): number;
    getDocumentList(): Array<IndexDocument>;
    getDocument(id: string): IndexDocument;
    search(q: string, searchLimit?: number): Array<Hit>;
}
/**
 * Results from a text search
 * @public
 */
export declare type jsPlumbToolkitSearchResults = {
    nodes: Array<Node>;
    groups: Array<Group>;
    edges: Array<Edge>;
    ports: Array<Port>;
};
/**
 * @internal
 */
export declare class Index {
    instance: JsPlumbToolkit;
    nodeIndex: DatasetIndex;
    groupIndex: DatasetIndex;
    edgeIndex: DatasetIndex;
    portIndex: DatasetIndex;
    constructor(instance: JsPlumbToolkit, options?: jsPlumbToolkitSearchIndexOptions);
    private _indexNode;
    private _indexGroup;
    private _indexEdge;
    search(value: string): jsPlumbToolkitSearchResults;
}
export {};
