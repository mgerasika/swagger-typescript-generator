import {SwaggerClass} from './swagger-class';
import {IUrlInfo} from './url-info';
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerPath} from "./swagger-path";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";
import {ModelType} from "./model-type";

export interface ISwaggerMethod {
    httpMethod: string;
    name: string;
    tags: string;
    url: string;
    parameters: SwaggerMethodParameter[];
}

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerClass> {
}

export class SwaggerMethod extends SwaggerBase<SwaggerClass, PrivateProps> {
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public url: string = '';
    public parameters: SwaggerMethodParameter[] = [];

    public responseIsVoid?: boolean;
    public isFileUpload?: boolean;
    public description?: string;
    public responseModelType: ModelType;

    public constructor(parent: SwaggerClass, httpMethod: string, path: SwaggerPath, source: any) {
        super();

        this.parent = parent;
        this.source = source;
        this.url = path.url;
        this.httpMethod = httpMethod;
        this.tags = this.source.tags?.lenght ? this.source.tags[0] : '';
        this.name = this.utils.getMethodName(this, this.source.operationId);

        if (source.parameters) {
            this.parameters = source.parameters.map((obj: any) => {
                return new SwaggerMethodParameter(this, obj);
            });
        }

        this.responseIsVoid = true;
        this.responseModelType = new ModelType(this.config);
        if (source.responses && source.responses['200']) {
            const schema = source.responses['200'].schema || source.responses['200'].content['application/json'];
            if (schema) {
                this.responseIsVoid = false;
                this.responseModelType.isArray = this.utils.isArray(schema);
                this.responseModelType.arrayItemType = this.utils.getArrayItemType(schema);
                this.responseModelType.type = this.utils.getMethodResponseType(this, schema);
            }
        }
        if (this.responseModelType.type) {
            this.responseModelType.isJsType = this.utils.isJsType(this.responseModelType.type);
        }
        this.responseModelType.isEnum = this.utils.isEnum(source) ? true : undefined;
        if (this.responseModelType.isEnum) {
            this.responseModelType.enumValues = this.utils.getEnumValues(source);
        }

        this.isFileUpload = this.parameters.some(s => s.modelType.type === 'File');
        if (source.summary) {
            this.description = source.summary;
        }
    }

    public init() {
        this.parameters.forEach(p => p.init());

        if (!this.responseIsVoid) {
            if (!this.responseModelType.isJsType && !this.responseModelType.isEnum) {
                const modelRef = this.doc.models.find(modelItem => modelItem.name === this.responseModelType.type);
                if (modelRef) {
                    this.responseModelType.modelRef = modelRef;
                } else {
                    console.error("Model not found response method", this);
                }
            }

            if (this.responseModelType.isEnum) {
                const enumRef = this.doc.enums.find(enumItem => enumItem.keys.includes(this.name));
                if (enumRef) {
                    this.responseModelType.enumRef = enumRef;
                } else {
                    console.error("Model for enum not found (response method)" + this.name);
                }
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