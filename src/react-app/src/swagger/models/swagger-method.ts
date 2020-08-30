import {SwaggerClass} from './swagger-class';
import {IUrlInfo} from './url-info';
import {SwaggerModel} from "./swagger-model";
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerPath} from "./swagger-path";
import {SwaggerDoc} from "./swagger-doc";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";

export interface ISwaggerMethod{
    httpMethod: string;
    name: string;
    tags: string;
    url: string;
    parameters: SwaggerMethodParameter[];

}

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerClass> {
    responseModelRef:SwaggerModel;
    path:SwaggerPath;
}

export class SwaggerMethod extends SwaggerBase<SwaggerClass,PrivateProps> {
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public url: string = '';
    public parameters: SwaggerMethodParameter[] = [];

    // TODO combine to one type
    public responseIsVoid?: boolean;
    public responseIsArray?: boolean;
    public responseType?: string;
    public responseIsEnum?: boolean;
    public responseIsJsType?: boolean;
    public responseArrayItemType?:string;

    public isFileUpload?: boolean;
    public description?: string;

    public get responseModelRef(): SwaggerModel {
        return this.getPrivate('responseModelRef') as SwaggerModel;
    }

    public set responseModelRef(val: SwaggerModel) {
        this.setPrivate('responseModelRef', val);
    }

    public constructor(parent: SwaggerClass, httpMethod: string, path: SwaggerPath, source: any) {
        super();

        this.parent = parent;
        this.source = source;
        this.url = path.url;
        this.setPrivate('path',path);
        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;
        this.name = this.utils.getMethodName(this, this.source.operationId);

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
                this.responseIsArray = this.utils.isArray(schema);
                this.responseType = this.utils.getMethodResponseType(this, schema);
            }
        }
        if(this.responseType) {
            this.responseIsJsType = this.utils.isJsType(this.responseType);
        }
        this.responseIsEnum = this.utils.isEnum(source) ? true : undefined;

        this.isFileUpload = this.parameters.some(s => s.type === 'File');
        if (source.summary) {
            this.description = source.summary;
        }
    }

    public clone(){
        const res = new SwaggerMethod(this.parent,this.httpMethod,this.getPrivate('path'),this.source);
        this.copyTo(res);
        return res;
    }

    public init() {
        this.parameters.forEach(p => p.init());

        if (!this.responseIsJsType && !this.responseIsEnum && this.responseType) {
            const responseModel = this.doc.definitions.find(f => f.name === this.responseType);
            if (responseModel) {
                this.responseModelRef = responseModel;
                this.responseType = responseModel.name;
            }
            else {
                console.error('ResponseModelRef not found ' + this.name, this);
            }
        }
    }

    public getUrlInfo(): IUrlInfo {
        return {
            httpMethod: this.httpMethod,
            name: this.name,
            url: this.url
        };
    }

}