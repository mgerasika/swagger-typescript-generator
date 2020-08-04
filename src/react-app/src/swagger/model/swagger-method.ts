import {parentSymbol, sourceSymbol} from '../utils';
import {SwaggerClassModel} from './swagger-class';
import {IUrlInfo} from './url-info';
import {getResponseIsArray, getIsEnum} from "../common";
import {SwaggerDefinitionModel} from "./swagger-definition-model";

export class SwaggerMethodModel {
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public parameters: SwaggerMethodParameter[] = [];
    public responseIsVoid?: boolean;
    public responseIsArray?: boolean;
    public responseType?: string;
    public isFileUpload?: boolean;
    public description?:string;

    public get doc() {
        return this.parent.doc;
    }

    public get utils() {
        return this.parent.utils;
    }

    public constructor(parent: SwaggerClassModel, httpMethod: string, source: any) {
        this.parent = parent;
        this.source = source;

        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;
        this.name = this.utils.getMethodName(this,this.source.operationId);

        if (source.parameters) {
            this.parameters = source.parameters.map((obj: any) => {
                return new SwaggerMethodParameter(this, obj);
            });
        }

        this.responseIsVoid = true;
        if (source.responses && source.responses['200']) {
            this.responseIsVoid = false;
            const schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsArray = getResponseIsArray(schema);
                this.responseType = this.utils.getMethodResponseType(this,schema);
            }
        }
        this.isFileUpload = this.parameters.some(s=>s.type === 'File');
        if(source.summary) {
            this.description = source.summary;
        }
    }

    public init(){
        this.parameters.forEach(p=>p.init());
    }

    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): SwaggerClassModel {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }

    public getUrlInfo(): IUrlInfo {
        return {
            httpMethod: this.httpMethod,
            name: this.name,
            url: this.parent.url
        };
    }

}

export class SwaggerMethodParameter {
    public name: string = '';
    public type: string = '';
    public isBodyParameter?: boolean;
    public isPathParameter?: boolean;
    public isQueryParameter?: boolean;
    public isFormDataParameter?: boolean;
    public required?: boolean;
    public isEnum?: boolean;
    public isJsType?: boolean;
    public description?:string;
    public modelRef?:SwaggerDefinitionModel;
    public enumValues?:[];

    public get doc() {
        return this.parent.doc;
    }

    public get utils() {
        return this.parent.utils;
    }

    public constructor(parent: SwaggerMethodModel, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = this.utils.getMethodParameterName(this,source.name);
        if (source['schema']) {
            this.isJsType = false;
            this.type = this.utils.getMethodParameterType(this,source['schema'].$ref);
            if (!this.type) {
                this.type = this.utils.getMethodParameterType(this,source['schema'].type);
            }
        } else {
            this.type = this.utils.getMethodParameterType(this,source.type);
            this.isJsType = true;
        }
        this.isBodyParameter = source.in === 'body'  ? true : undefined;
        this.isPathParameter = source.in === 'path' ? true : undefined;
        this.isQueryParameter = source.in === 'query' ? true : undefined;
        this.isFormDataParameter = source.in === 'formData' ? true : undefined;
        this.required = source.required ? true : undefined;
        this.isEnum =  getIsEnum(source) ? true : undefined;
        this.description = source.description ? source.description : undefined;
        this.enumValues = source.enum ? source.enum : undefined;
    }

    public init(){
        const def = this.doc.definitions.find(df =>df.name === this.type);
        if(def) {
            this.modelRef = def;
        }
    }

    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): SwaggerMethodModel {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }
}
