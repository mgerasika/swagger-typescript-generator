import {getIsEnum, getIsJsType} from "../common";
import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethod} from "./swagger-method";

export class SwaggerMethodParameter extends SwaggerBase<SwaggerMethod> {
    public name: string = '';
    public type: string = '';
    public isBodyParameter?: boolean;
    public isPathParameter?: boolean;
    public isQueryParameter?: boolean;
    public isFormDataParameter?: boolean;
    public required?: boolean;
    public isEnum?: boolean;
    public isJsType?: boolean;
    public description?: string;
    public enumValues?: [];

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
        this.isJsType = getIsJsType(this.type);
        this.isBodyParameter = source.in === 'body' ? true : undefined;
        this.isPathParameter = source.in === 'path' ? true : undefined;
        this.isQueryParameter = source.in === 'query' ? true : undefined;
        this.isFormDataParameter = source.in === 'formData' ? true : undefined;
        this.required = source.required ? true : undefined;
        this.isEnum = getIsEnum(source) ? true : undefined;
        this.description = source.description ? source.description : undefined;
        this.enumValues = source.enum ? source.enum : undefined;
    }

    public init() {
        if (!this.isJsType && !this.isEnum) {
            const modelRef = this.doc.definitions.find(df => df.name === this.type);
            if (modelRef) {
                this.modelRef = modelRef;
                this.type = modelRef.name;
            } else {
                console.error("Model not found", this);
            }
        }

        if (this.isEnum) {
            const enumRef = this.doc.enums.find(df => df.keys.includes(this.name));
            if (enumRef) {
                this.enumRef = enumRef;
                this.type = enumRef.fullName;
            } else {
                console.error("Model for enum not found", this);
            }
        }
    }
}
