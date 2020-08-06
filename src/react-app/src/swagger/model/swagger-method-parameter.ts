import {getResponseIsArray, getIsEnum, getIsJsType} from "../common";
import {SwaggerDefinitionModel} from "./swagger-definition-model";
import {SwaggerEnumModel} from "./swagger-enum";
import {SwaggerModelBase} from "./swagger-model-base";
import {SwaggerMethodModel} from "./swagger-method";

export class SwaggerMethodParameter extends SwaggerModelBase<SwaggerMethodModel>{
    public name: string = '';
    public type: string = '';
    public isBodyParameter?: boolean;
    public isPathParameter?: boolean;
    public isQueryParameter?: boolean;
    public isFormDataParameter?: boolean;
    public required?: boolean;
    public isEnum?: boolean;
    public isJsType?: boolean;
    public description?:string;
    public enumValues?:[];

    public get enumRef():SwaggerEnumModel {
        return this.getPrivateValue('enumRef') as SwaggerEnumModel;
    }
    public set enumRef(val:SwaggerEnumModel) {
        this.setPrivateValue('enumRef',val) ;
    }

    public get modelRef():SwaggerDefinitionModel {
        return this.getPrivateValue('modelRef') as SwaggerDefinitionModel;
    }
    public set modelRef(val:SwaggerDefinitionModel) {
        this.setPrivateValue('modelRef',val) ;
    }

    public constructor(parent: SwaggerMethodModel, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getMethodParameterName(this,source.name);
        this.type = this.utils.getMethodParameterType(this,source);
        this.isJsType = getIsJsType(this.type);
        this.isBodyParameter = source.in === 'body'  ? true : undefined;
        this.isPathParameter = source.in === 'path' ? true : undefined;
        this.isQueryParameter = source.in === 'query' ? true : undefined;
        this.isFormDataParameter = source.in === 'formData' ? true : undefined;
        this.required = source.required ? true : undefined;
        this.isEnum =  getIsEnum(source) ? true : undefined;
        this.description = source.description ? source.description : undefined;
        this.enumValues = source.enum ? source.enum : undefined;
    }

    public init(){
        if(!this.isJsType && !this.isEnum) {
            const modelRef = this.doc.definitions.find(df => df.name === this.type);
            if (modelRef) {
                this.modelRef = modelRef;
                this.type = modelRef.name;
            }
            else{
                console.error("Model not found",this);
            }
        }

        if(this.isEnum) {
            const enumRef = this.doc.enums.find(df => df.keys.includes(this.name));
            if (enumRef) {
                this.enumRef = enumRef;
                this.type = enumRef.name;
            }
            else {
                console.error("Model for enum not found",this);
            }
        }
    }
}
