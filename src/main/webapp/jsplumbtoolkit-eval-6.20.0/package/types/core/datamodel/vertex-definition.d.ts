/**
 * Base class for node, group and port definitions. This interface is shared by the model and the view.
 * @public
 */
export interface VertexDefinition {
    /**
     * Optional connection limit. Defaults to 1. A value of -1 means there is no limit.
     */
    maxConnections?: number;
    /**
     * Whether or not to allow edges from this vertex back to itself. Defaults to true.
     */
    allowLoopback?: boolean;
    /**
     * Whether or not to allow edges from a port back to the vertex it belongs to. Defaults to true.
     */
    allowVertexLoopback?: boolean;
}
/**
 * A node definition in a view.
 * @public
 */
export interface NodeDefinition extends VertexDefinition {
}
/**
 * A group definition in a view.
 * @public
 */
export interface GroupDefinition extends NodeDefinition {
}
/**
 * A port definition in a view.
 * @public
 */
export interface PortDefinition extends VertexDefinition {
}
