import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {SwaggerBase} from "./swagger-base";
import {SwaggerMethod} from "./swagger-method";
import {SwaggerDoc} from "./swagger-doc";
import {SwaggerPath} from "./swagger-path";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";

export enum EParameterIn {
    query = 'query',
    body = 'body',
    path = 'path',
    formData = 'formData'
}

export interface ISwaggerMethodParameter {
    name:string;
    label:string;
    type: string;
    required?: boolean;
    in?:EParameterIn;
}
interface PrivateProps extends SwaggerBasePrivateProps<SwaggerMethod> {
    enumRef:SwaggerEnum;
    modelRef:SwaggerModel;
}
export class SwaggerMethodParameter extends SwaggerBase<SwaggerMethod,PrivateProps> implements ISwaggerMethodParameter {
    public label: string = '';
    public type: string = '';
    public in?: EParameterIn;
    public name:string = '';
    public required?: boolean;
    public isEnum?: boolean;
    public isJsType?: boolean;
    public isArray?: boolean;
    public arrayItemType?: string;

    public description?: string;
    public enumValues?: string[];

    public get enumRef(): SwaggerEnum {
        return this.getPrivate('enumRef') as SwaggerEnum;
    }

    public set enumRef(val: SwaggerEnum) {
        this.setPrivate('enumRef', val);
    }

    public get modelRef(): SwaggerModel {
        return this.getPrivate('modelRef') as SwaggerModel;
    }

    public set modelRef(val: SwaggerModel) {
        this.setPrivate('modelRef', val);
    }

    public constructor(parent: SwaggerMethod, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        const name = this.utils.getMethodParameterName(this, source.name);
        this.name = name;
        this.label = name;

        this.type = this.utils.getMethodParameterType(this, source);
        this.isJsType = this.utils.isJsType(this.type);
        this.isArray = this.utils.isArray(source) || undefined;
        if(this.isArray) {
            const type = this.utils.getArrayItemType(source);
            this.arrayItemType = type || undefined;
        }
        this.in = source.in ? source.in as EParameterIn : undefined;
        this.required = source.required || undefined;
        this.isEnum = this.utils.isEnum(source) || undefined;
        this.description = source.description || undefined;
        if (this.isEnum) {
            this.enumValues = this.utils.getEnumValues(source);
        }
    }

    public clone(){
        const res = new SwaggerMethodParameter(this.parent,this.source);
        this.copyTo(res);
        return res;
    }

    public init() {
        super.init();

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
