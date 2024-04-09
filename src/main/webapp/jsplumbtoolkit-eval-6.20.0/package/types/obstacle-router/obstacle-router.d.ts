import { LightweightRouter } from "../ui-core/core/router/lightweight-router";
import { Connection } from "../ui-core/core/connector/connection-impl";
interface ManagedPath {
}
export declare class ObstacleRouter<T extends {
    E: unknown;
}> extends LightweightRouter<T> {
    managedConnectionMap: Map<string, ManagedPath>;
    computePath(connection: Connection<any>, timestamp: string): void;
}
export {};
