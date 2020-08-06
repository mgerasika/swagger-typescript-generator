import {parentSymbol, privateSymbol, sourceSymbol} from "../utils";
import {SwaggerDocModel} from "./swagger-doc-model";

export class SwaggerModelBase<T> {
    constructor() {
        (this as any)[privateSymbol] = {};
    }

    toJSON() {
        if(this.doc.config.showPrivateFieldsForDebug) {
            return {
                PRIVATE: (this as any)[privateSymbol],
                ...this
            }
        }
        return this;
    }

    public get utils(){
        return this.doc.utils;
    }

    public get plugin() {
        return this.doc.config.plugin;
    }

    public get doc() :SwaggerDocModel{
        return (this.parent as any).doc;
    }
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): T {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }

    public getPrivateValue(name:string): any {
        return (this as any)[privateSymbol][name];
    }

    public setPrivateValue(name:string, val:any) {
        (this as any)[privateSymbol][name] = val;
    }
}
