import {
    getJsType,
    getModelName,
    getResponseIsArray,
    getResponseType,
    makeFileName,
    parentSymbol,
    sourceSymbol
} from '../utils';
import {SwaggerDocModel} from './swagger-doc-model';

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

    public type: string = '';
    public name: string = '';
    public fileName:string = "";
    public properties: SwaggerDefinitionProperty[] = [];

    public constructor(parent:SwaggerDocModel,name: string, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = getModelName(name);
        this.fileName = makeFileName(name);

        this.type = getJsType(source.type);
        if (source.items) {
            this.type = getResponseType(source);
        }

        this.properties = Object.keys(source.properties).reduce((accum2: any, key2) => {
            const obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(key2, obj2));
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

    public name: string = '';
    public type: string = '';
    public isArray: boolean = false;

    public constructor(name: string, source: any) {
        this.source = source;

        this.name = name;
        this.type = getJsType(source.type);
        if (source.items) {
            this.type = getResponseType(source);
        }
        this.isArray = getResponseIsArray(source);
    }
}
