import {ObjectPrivateProps} from "./swagger-base-private-props";
import { privateSymbol } from "./utils";

let UNIQUE_IDX = 0;
export abstract class ObjectEx<TPrivateProps extends ObjectPrivateProps> {

    constructor() {
        (this as any)[privateSymbol as any] = {};
        this.setPrivate('uniqueID',`id_${UNIQUE_IDX++}`)
    }

    init(){
    }

    getUniqueId(){
        return this.getPrivate('uniqueID')
    }

    // TODO fix typing
    public getPrivate(name: keyof TPrivateProps): any {
        return (this as any)[privateSymbol][name];
    }

    // TODO fix typing
    public setPrivate(name: keyof TPrivateProps, val: any) {
        (this as any)[privateSymbol][name] = val;
    }

}
