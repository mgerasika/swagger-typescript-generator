import {SwaggerDoc} from './swagger-doc';
import {SwaggerModel} from "./swagger-model";
import {SwaggerBase as SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerModelProperty} from "./swagger-model-property";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";
import {nameof} from "../utils";

export interface ISwaggerEnum {
    name: string;
    getFullName: string;
    description?: string;
    type?: string;
    enumValues?: string[];
    namespace?: string;
    fileName: string;
}

interface IModelProp {
    modelDef?: SwaggerModel,
    modelPropDef?: SwaggerModelProperty,
    methodPropertyDef?: SwaggerMethodParameter
}

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerDoc> {
}

export class SwaggerEnum extends SwaggerBase<SwaggerDoc, PrivateProps> implements ISwaggerEnum {
    public name: string = '';
    public description?: string;
    public type?: string;
    public namespace?: string;
    public enumValues?: string[];
    public fileName: string;
    public keys: string[];

    get getFullName() {
        return this.namespace ? `${this.namespace}.${this.name}` : this.name;
    }

    public constructor(parent: SwaggerDoc, key: string, model: IModelProp, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.keys = [];

        this.keys.push(key);
        const name = this.utils.getEnumName(key);
        this.name = name;
        this.fileName = this.utils.getEnumFileName(this, key);
        this.enumValues = this.utils.getEnumValues(source);

        if (!this.enumValues && model.methodPropertyDef) {
            this.enumValues = model.methodPropertyDef.modelType.enumValues ? model.methodPropertyDef.modelType.enumValues : [];
        }
        if (!this.enumValues && model.modelPropDef) {
            this.enumValues = model.modelPropDef.modelType.enumValues ? model.modelPropDef.modelType.enumValues : [];
        }
        this.description = source.description;
        this.type = source.type;
        if (model.modelDef) {
            this.namespace = model.modelDef.name;
        }
    }

    toJSON() {
        return {
            ...this,
            [nameof<this>('getFullName')]: this.getFullName
        }
    }

    public init() {
    }
}
