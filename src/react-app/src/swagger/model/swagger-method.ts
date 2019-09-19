import {getJsType, parentSymbol, sourceSymbol} from "./swagger-common";
import {SwaggerClass} from "./swagger-class";

export class SwaggerMethod {
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): SwaggerClass {
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
    public responseIsJsType?: boolean;
    public responseType?: string;

    public constructor(parent: SwaggerClass, httpMethod: string, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = this.source.operationId;
        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;

        if (source.parameters) {
            this.parameters = source.parameters.map((obj: any) => {
                return new SwaggerMethodParameter(this,obj);
            });
        }

        if (source.responses && source.responses['204']) {
            this.responseIsVoid = true;
        }
        if (source.responses && source.responses['200']) {
            const schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsJsType = false;
                this.responseIsArray = schema.type === 'array';
                const responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
                if (responseType) {
                    this.responseType = getJsType(responseType);
                }
            }
            else {
                this.responseIsJsType = true;
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

    public get parent(): SwaggerMethod {
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

    public constructor(parent: SwaggerMethod, source: any) {
        this.parent = parent;
        this.source = source;

        this.name = source.name;
        if (source['schema']) {
            this.isJsType = false;
            this.type = getJsType(source['schema'].$ref);
        } else {
            this.type = getJsType(source.type);
            this.isJsType = true;
        }
        this.isBodyParameter = source.in === 'body';
        this.isPathParameter = source.in === 'path';
    }
}
