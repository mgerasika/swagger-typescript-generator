import {SwaggerClass} from './swagger-class';
import {IUrlInfo} from './url-info';
import {SwaggerModel} from "./swagger-model";
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerPath} from "./swagger-path";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";
import {IModelType} from "./model-type";
import {SwaggerEnum} from "./swagger-enum";

export interface ISwaggerMethod {
    httpMethod: string;
    name: string;
    tags: string;
    url: string;
    parameters: SwaggerMethodParameter[];

}

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerClass> {
    responseModelRef: SwaggerModel;
    responseEnumRef: SwaggerEnum;
    path: SwaggerPath;
}

export class SwaggerMethod extends SwaggerBase<SwaggerClass, PrivateProps> {
    public httpMethod: string = '';
    public name: string = '';
    public tags: string = '';
    public url: string = '';
    public parameters: SwaggerMethodParameter[] = [];

    // TODO combine to one type
    public responseIsVoid?: boolean;

    public isFileUpload?: boolean;
    public description?: string;
    public responseModelType: IModelType;

    public get responseModelRef(): SwaggerModel {
        return this.getPrivate('responseModelRef') as SwaggerModel;
    }

    public set responseModelRef(val: SwaggerModel) {
        this.setPrivate('responseModelRef', val);
    }

    public get responseEnumRef(): SwaggerEnum {
        return this.getPrivate('responseEnumRef') as SwaggerEnum;
    }

    public set responseEnumRef(val: SwaggerEnum) {
        this.setPrivate('responseEnumRef', val);
    }

    public constructor(parent: SwaggerClass, httpMethod: string, path: SwaggerPath, source: any) {
        super();

        this.parent = parent;
        this.source = source;
        this.url = path.url;
        this.setPrivate('path', path);
        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;
        this.name = this.utils.getMethodName(this, this.source.operationId);

        if (source.parameters) {
            this.parameters = source.parameters.map((obj: any) => {
                return new SwaggerMethodParameter(this, obj);
            });
        }

        this.responseIsVoid = true;
        this.responseModelType = {};
        if (source.responses && source.responses['200']) {
            const schema = source.responses['200'].schema;
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
        if(this.responseModelType.isEnum) {
            this.responseModelType.enumValues = this.utils.getEnumValues(source);
        }

        this.isFileUpload = this.parameters.some(s => s.modelType.type === 'File');
        if (source.summary) {
            this.description = source.summary;
        }
    }

    public clone() {
        const res = new SwaggerMethod(this.parent, this.httpMethod, this.getPrivate('path'), this.source);
        this.copyTo(res);
        return res;
    }

    public init() {
        this.parameters.forEach(p => p.init());

        if(!this.responseIsVoid) {
            if (!this.responseModelType.isJsType && !this.responseModelType.isEnum ) {
                const modelRef = this.doc.definitions.find(modelItem => modelItem.name === this.responseModelType.type);
                if (modelRef) {
                    this.responseModelRef = modelRef;
                    this.responseModelType.type = modelRef.name;

                    if (this.responseModelType.isArray) {
                        this.responseModelType.arrayItemType = modelRef.name;
                        this.responseModelType.type = `Array<${this.responseModelType.arrayItemType}>`;
                    }
                } else {
                    console.error("Model not found response method", this);
                }
            }

            if (this.responseModelType.isEnum) {
                const enumRef = this.doc.enums.find(enumItem => enumItem.keys.includes(this.name));
                if (enumRef) {
                    this.responseEnumRef = enumRef;
                    this.responseModelType.type = enumRef.fullName;

                    if (this.responseModelType.isArray) {
                        this.responseModelType.arrayItemType = enumRef.fullName;
                        this.responseModelType.type = `Array<${this.responseModelType.arrayItemType}>`;
                    }
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