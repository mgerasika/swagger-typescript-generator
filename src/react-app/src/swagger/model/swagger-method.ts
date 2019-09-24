import {getJsType, getResponseIsArray, getResponseType, parentSymbol, sourceSymbol} from '../utils';
import {SwaggerClassModel} from "./swagger-class";
import {lowerlize} from '../utils';

export class SwaggerMethodModel {
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

    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public parameters: SwaggerMethodParameter[] = [];

    public responseIsVoid?: boolean;
    public responseIsArray?: boolean;
    public responseType?: string;

    public constructor(parent: SwaggerClassModel, httpMethod: string, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = lowerlize(this.source.operationId);
        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;

        if (source.parameters) {
            this.parameters = source.parameters.map((obj: any) => {
                return new SwaggerMethodParameter(this,obj);
            });
        }

        this.responseIsVoid = true;
        if (source.responses && source.responses['200']) {
            this.responseIsVoid = false;
            const schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsArray = getResponseIsArray(schema);
                this.responseType = getResponseType(schema);
            }
        }
    }
}

export class SwaggerMethodParameter {
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

    public name: string = '';
    public type: string = '';
    public isBodyParameter?: boolean;
    public isPathParameter?: boolean;
    public isJsType?: boolean;

    public constructor(parent: SwaggerMethodModel, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = source.name;
        if (source['schema']) {
            this.isJsType = false;
            this.type = getJsType(source['schema'].$ref);
            if(!this.type) {
                this.type = getJsType(source['schema'].type)
            }
        } else {
            this.type = getJsType(source.type);
            this.isJsType = true;
        }
        this.isBodyParameter = source.in === 'body';
        this.isPathParameter = source.in === 'path';
    }
}
