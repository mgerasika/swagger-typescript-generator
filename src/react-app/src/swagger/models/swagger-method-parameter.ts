import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethod} from "./swagger-method";

export enum EParameterType {
    query = 'query',
    body = 'body',
    path = 'path',
    formData = 'formData'
}

export interface ISwaggerMethodParameter {
    name: string;
    type: string;
    required?: boolean;
    parameterType?:EParameterType;
}

export class SwaggerMethodParameter extends SwaggerBase<SwaggerMethod> implements ISwaggerMethodParameter {
    public name: string = '';
    public type: string = '';
    public parameterType?: EParameterType;

    public required?: boolean;
    public isEnum?: boolean;
    public isJsType?: boolean;
    public isArray?: boolean;
    public arrayItemType?: string;

    public description?: string;
    public enumValues?: string[];

    public get enumRef(): SwaggerEnum {
        return this.getPrivateValue('enumRef') as SwaggerEnum;
    }

    public set enumRef(val: SwaggerEnum) {
        this.setPrivateValue('enumRef', val);
    }

    public get modelRef(): SwaggerModel {
        return this.getPrivateValue('modelRef') as SwaggerModel;
    }

    public set modelRef(val: SwaggerModel) {
        this.setPrivateValue('modelRef', val);
    }

    public constructor(parent: SwaggerMethod, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getMethodParameterName(this, source.name);
        this.type = this.utils.getMethodParameterType(this, source);
        this.isJsType = this.utils.isJsType(this.type);
        this.isArray = this.utils.isArray(source) ? true : undefined;

        this.parameterType = source.in ? source.in as EParameterType : undefined;
        this.required = source.required ? true : undefined;
        this.isEnum = this.utils.isEnum(source) ? true : undefined;
        this.description = source.description ? source.description : undefined;
        if (this.isEnum) {
            this.enumValues = this.utils.getEnumValues(source);
        }
    }

    public init() {
        if (!this.isJsType && !this.isEnum) {
            const modelRef = this.doc.definitions.find(modelItem => modelItem.name === this.type);
            if (modelRef) {
                this.modelRef = modelRef;
                this.type = modelRef.name;

                if (this.isArray) {
                    this.arrayItemType = modelRef.name;
                    this.type = `Array<${this.arrayItemType}>`;
                }
            } else {
                console.error("Model not found", this);
            }
        }

        if (this.isEnum) {
            const enumRef = this.doc.enums.find(enumItem => enumItem.keys.includes(this.name));
            if (enumRef) {
                this.enumRef = enumRef;
                this.type = enumRef.fullName;

                if (this.isArray) {
                    this.arrayItemType = enumRef.fullName;
                    this.type = `Array<${this.arrayItemType}>`;
                }
            } else {
                console.error("Model for enum not found (method parameter)" + this.name);
            }
        }
    }
}
