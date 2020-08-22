import {privateSymbol} from "../utils";
import {SwaggerDoc} from "./swagger-doc";
import {ISwaggerDocConfig} from "./swagger-doc-config";

export class SwaggerBase<T> {
    constructor() {
        (this as any)[privateSymbol] = {};
    }

    toJSON() {
        if (this.doc.config.showPrivateFieldsForDebug) {
            return {
                PRIVATE: (this as any)[privateSymbol],
                ...this
            }
        }
        return this;
    }

    public get utils() {
        return this.doc.utils;
    }

    public get components() {
        return this.doc.components;
    }

    public get doc(): SwaggerDoc {
        return (this.parent as any).doc;
    }

    public get config(): ISwaggerDocConfig {
        return this.doc.config
    }

    public get source() {
        return this.getPrivateValue('source');
    }

    public set source(val) {
        this.setPrivateValue("source", val);
    }

    public get parent(): T {
        return this.getPrivateValue('parent');
    }

    public set parent(val) {
        this.setPrivateValue("parent", val);
    }

    public getPrivateValue(name: string): any {
        return (this as any)[privateSymbol][name];
    }

    public setPrivateValue(name: string, val: any) {
        (this as any)[privateSymbol][name] = val;
    }
}
