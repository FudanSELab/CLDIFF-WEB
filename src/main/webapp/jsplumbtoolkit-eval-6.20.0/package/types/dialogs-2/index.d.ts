import { DialogsBase, DialogsOptions } from "../dialogs-core/dialogs";
import { Recado } from "../templates-2/core";
/**
 * A set of Dialogs.
 * @public
 */
export declare class Dialogs extends DialogsBase {
    recado: Recado;
    constructor(params: DialogsOptions);
    protected render(templateId: string, data: Record<string, any>): any;
}
