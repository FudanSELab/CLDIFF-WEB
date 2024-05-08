import { PropertyMappings } from "./definitions";
import { Surface } from "../surface";
import { ObjectData } from "../../core/model/graph";
export declare class PropertyMapper {
    private surface;
    private _$_edgeMappings;
    private _$_originalEdgeTypeFunction;
    constructor(surface: Surface, mappings: PropertyMappings);
    computeTypes(o: ObjectData): string;
    private _$_init;
}
