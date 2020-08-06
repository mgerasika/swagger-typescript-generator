import {parentSymbol, sourceSymbol} from "../utils";
import {SwaggerDocModel} from "./swagger-doc-model";

export class SwaggerModelBase<T> {
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
}
