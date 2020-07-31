import {
    parentSymbol,
    sourceSymbol
} from '../utils';
import {SwaggerDocModel} from './swagger-doc-model';
import {SwaggerClassModel} from "./swagger-class";

export class SwaggerDefinitionModel {
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): SwaggerDocModel {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }

    public get utils(){
        return this.parent.utils;
    }

    public type: string = '';
    public name: string = '';
    public fileName:string = "";
    public properties: SwaggerDefinitionProperty[] = [];

    public constructor(parent:SwaggerDocModel,name: string, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = this.utils.getModelName(this,name);
        this.fileName = this.utils.getModelFileName(this,name);
        this.type = this.utils.getModelType(this,source);

        this.properties = Object.keys(source.properties).reduce((accum2: any, key2) => {
            const obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(this,key2, obj2));
            return accum2;
        }, [])
    }
}

export class SwaggerDefinitionProperty {
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get utils(){
        return this.parent.utils;
    }

    public name: string = '';
    public type: string = '';
    public isArray: boolean = false;
    public get parent(): SwaggerDefinitionModel {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }

    public constructor(parent:SwaggerDefinitionModel,name: string, source: any) {
        this.source = source;
        this.parent = parent;

        this.name = name;
        this.type = this.utils.getModelPropertyType(this,source);
        this.isArray = this.utils.getModelPropertyResponseIsArray(this,source);
    }
}
