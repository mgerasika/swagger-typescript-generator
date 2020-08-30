import {privateSymbol} from "../utils";
import {SwaggerDoc} from "./swagger-doc";
import {ISwaggerDocConfig} from "./swagger-doc-config";
import {ObjectPrivateProps, SwaggerBasePrivateProps} from "./swagger-base-private-props";

let UNIQUE_IDX = 0;
export abstract class ObjectEx<TPrivateProps extends ObjectPrivateProps> {
    [propertyName:string] : any;

    constructor() {
        this[privateSymbol as any] = {};
        this.setPrivate('uniqueID',`id_${UNIQUE_IDX++}`)
    }

    init(){
    }

    abstract clone():ObjectEx<TPrivateProps>;

    getUniqueId(){
        return this.getPrivate('uniqueID')
    }

    copyTo(to:ObjectEx<TPrivateProps>) {
       this.copyInternal(this,to);
       this.copyInternal(this[privateSymbol as any],to[privateSymbol as any])
    }

    // TODO all fields that start from _ not copied(ref)!!!
    copyInternal(from:ObjectEx<TPrivateProps>,to:ObjectEx<TPrivateProps>) {
        Object.keys(from).forEach(key =>{
            const value = from[key];
            if(key.startsWith('_')) {
                to[key] = value;
            }
            else if(value && value.clone) {
                to[key] = value.clone();
            }
            if(value instanceof Array) {
                to[key] = value.map( item => {
                    if(item && item.clone) {
                        return item.clone();
                    }
                    else {
                        return item;
                    }
                });
            }
            else {
                to[key] = value;
            }
        })
    }

    toJSON() {
        let result = this;
        if (this.doc.config.showPrivateFieldsForDebug) {
            result = {
                PRIVATE: (this as any)[privateSymbol],
                ...result
            }
        }
        return result;
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
