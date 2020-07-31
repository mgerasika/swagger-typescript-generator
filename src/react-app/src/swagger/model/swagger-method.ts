import {parentSymbol, sourceSymbol} from '../utils';
import {SwaggerClassModel} from './swagger-class';
import {IUrlInfo} from './url-info';

export class SwaggerMethodModel {
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public parameters: SwaggerMethodParameter[] = [];
    public responseIsVoid?: boolean;
    public responseIsArray?: boolean;
    public responseType?: string;
    public isFileUpload?: boolean;

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
                this.responseIsArray = this.utils.getMethodResponseIsArray(this,schema);
                this.responseType = this.utils.getMethodResponseType(this,schema);
            }
        }
        this.isFileUpload = this.parameters.some(s=>s.type === 'File');
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
    public isFormDataParameter?: boolean;
    public isJsType?: boolean;

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
        this.isBodyParameter = source.in === 'body';
        this.isPathParameter = source.in === 'path';
        this.isFormDataParameter = source.in === 'formData';
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
