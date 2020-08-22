import {SwaggerClass} from './swagger-class';
import {IUrlInfo} from './url-info';
import {getResponseIsArray} from "../common";
import {SwaggerModel} from "./swagger-model";
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerPath} from "./swagger-path";

export class SwaggerMethod extends SwaggerBase<SwaggerClass> {
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public url: string = '';
    public parameters: SwaggerMethodParameter[] = [];
    public responseIsVoid?: boolean;
    public responseIsArray?: boolean;
    public responseType?: string;
    public isFileUpload?: boolean;
    public description?: string;

    public get responseModelRef(): SwaggerModel {
        return this.getPrivateValue('responseModelRef') as SwaggerModel;
    }

    public set responseModelRef(val: SwaggerModel) {
        this.setPrivateValue('responseModelRef', val);
    }

    public constructor(parent: SwaggerClass, httpMethod: string, path: SwaggerPath, source: any) {
        super();

        this.parent = parent;
        this.source = source;
        this.url = path.url;

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
                this.responseIsArray = getResponseIsArray(schema);
                this.responseType = this.utils.getMethodResponseType(this, schema);
            }
        }
        this.isFileUpload = this.parameters.some(s => s.type === 'File');
        if (source.summary) {
            this.description = source.summary;
        }
    }

    public init() {
        this.parameters.forEach(p => p.init());

        const responseModel = this.doc.definitions.find(f => f.name === this.responseType);
        if (responseModel) {
            this.responseModelRef = responseModel;
            this.responseType = responseModel.name;
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