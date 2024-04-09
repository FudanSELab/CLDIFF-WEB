import { EdgeDefinition } from "../browser-ui-model";
/**
 * A mapping of some property to a set of appearance values.
 * @public
 */
export interface PropertyMapping<D> {
    property: string;
    mappings: Record<string, D>;
}
/**
 * A set of property mappings for edges.
 * @public
 */
export declare type EdgePropertyMappings = Array<PropertyMapping<EdgeDefinition>>;
/**
 * A set of property mappings - currently only edges are supported,
 * but future versions will support nodes, groups and ports
 * @public
 */
export interface PropertyMappings {
    edgeMappings: EdgePropertyMappings;
}
