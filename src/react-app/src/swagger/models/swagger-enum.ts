import {SwaggerDoc} from './swagger-doc';
import {SwaggerModel} from "./swagger-model";
import {SwaggerBase as SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerModelProperty} from "./swagger-model-property";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";

export interface ISwaggerEnum {
    name: string;
    fullName: string;
    description?: string;
    type?: string;
    enumValues?: string[];
    namespace?: string;
    fileName: string;
}
interface IModelProp {
    modelDef?: SwaggerModel, modelPropDef?: SwaggerModelProperty, methodPropertyDef?: SwaggerMethodParameter
}
interface PrivateProps extends SwaggerBasePrivateProps<SwaggerDoc>{
    key:string;
    model:IModelProp;
}
export class SwaggerEnum extends SwaggerBase<SwaggerDoc,PrivateProps> implements ISwaggerEnum{
    public keys: string[] = [];
    public name: string = '';
    public fullName: string = '';
    public description?: string;
    public type?: string;
    public enumValues?: string[];
    public namespace?: string;
    public fileName: string;

    public constructor(parent: SwaggerDoc, key: string, model: IModelProp, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.setPrivate('key',key);
        this.setPrivate('model',model);

        this.keys.push(key);
        this.name = this.utils.getEnumName(this, key);
        this.fullName = this.name;
        this.fileName = this.utils.getEnumFileName(this, key);
        this.enumValues = this.utils.getEnumValues(source);

        if (!this.enumValues && model.methodPropertyDef) {
            this.enumValues = model.methodPropertyDef.enumValues ? model.methodPropertyDef.enumValues : [];
        }
        if (!this.enumValues && model.modelPropDef) {
            this.enumValues = model.modelPropDef.enumValues ? model.modelPropDef.enumValues : [];
        }
        this.description = source.description;
        this.type = source.type;
        if (model.modelDef) {
            this.namespace = model.modelDef.name;
            this.fullName = `${this.namespace}.${this.name}`;
        }
    }

    public clone(){
        const res = new SwaggerEnum(this.parent,this.getPrivate('key'),this.getPrivate('model'),this.source);
        this.copyTo(res);
        return res;
    }

    public init() {
    }
}
