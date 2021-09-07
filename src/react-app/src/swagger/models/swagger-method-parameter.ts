import {SwaggerBase} from "./swagger-base";
import {SwaggerMethod} from "./swagger-method";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";
import {IModelType, ModelType} from "./model-type";

export enum EParameterIn {
    query = 'query',
    body = 'body',
    path = 'path',
    formData = 'formData'
}

export interface ISwaggerMethodParameter {
    name:string;
    label:string;
    modelType: IModelType;
    required?: boolean;
    in?:EParameterIn;
}
interface PrivateProps extends SwaggerBasePrivateProps<SwaggerMethod> {
}
export class SwaggerMethodParameter extends SwaggerBase<SwaggerMethod,PrivateProps> implements ISwaggerMethodParameter {
    public label: string = '';
    public in?: EParameterIn;
    public name:string = '';
    public required?: boolean;
    public modelType: ModelType;
    public description?: string;

    public constructor(parent: SwaggerMethod, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.modelType = new ModelType(this.config);
        const name = this.utils.getMethodParameterName(this, source.name);
        this.name = name;
        this.label = name;

        this.modelType.type = this.utils.getMethodParameterType(this, source);
        this.modelType.isJsType = this.utils.isJsType(this.modelType.type as string);
        this.modelType.isArray = this.utils.isArray(source) || undefined;
        if(this.modelType.isArray) {
            const type = this.utils.getArrayItemType(source);
            this.modelType.arrayItemType = type || undefined;
        }
        this.in = source.in ? source.in as EParameterIn : undefined;
        this.required = source.required || undefined;
        this.modelType.isEnum = this.utils.isEnum(source) || undefined;
        this.description = source.description || undefined;
        if (this.modelType.isEnum) {
            this.modelType.enumValues = this.utils.getEnumValues(source);
        }
    }

    public init() {
        super.init();

        if (!this.modelType.isJsType && !this.modelType.isEnum) {
            const modelRef = this.doc.models.find(modelItem => modelItem.name === this.modelType.type);
            if (modelRef) {
                this.modelType.modelRef = modelRef;

            } else {
                console.error("Model not found", this);
            }
        }

        if (this.modelType.isEnum) {
            const enumRef = this.doc.enums.find(enumItem => enumItem.keys.includes(this.name));
            if (enumRef) {
                this.modelType.enumRef = enumRef;
            } else {
                console.error("Model for enum not found (method parameter)" + this.name);
            }
        }
    }
}
