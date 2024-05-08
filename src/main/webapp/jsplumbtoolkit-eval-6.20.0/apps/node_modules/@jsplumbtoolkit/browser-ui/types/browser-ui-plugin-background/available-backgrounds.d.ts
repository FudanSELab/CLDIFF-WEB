import { Constructable } from "../ui-core/util/util";
import { Background } from "../browser-ui/background/background";
/**
 *
 * background factory.
 *
 * @internal
 */
export declare const AvailableBackgrounds: {
    get: (name: string) => Constructable<Background>;
    register: (name: string, b: Constructable<Background>) => void;
};
