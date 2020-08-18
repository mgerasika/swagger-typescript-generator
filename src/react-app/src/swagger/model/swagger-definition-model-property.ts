import {SwaggerModelBase} from "./swagger-model-base";
import {SwaggerDefinitionModel} from "./swagger-definition-model";
import {SwaggerEnumModel} from "./swagger-enum";
import {getIsEnumForDefinition, getIsJsType, getResponseIsArray} from "../common";

export class SwaggerDefinitionProperty  extends SwaggerModelBase<SwaggerDefinitionModel> {
    public name: string = '';
    public type: string = '';
    public isArray?: boolean;
    public isEnum?: boolean ;
    public required?: boolean;
    public isJsType:boolean;
    public enumValues?:[];

    public get enumModelRef():SwaggerEnumModel {
        return this.getPrivateValue('enumModelRef') as SwaggerEnumModel;
    }
    public set enumModelRef(val:SwaggerEnumModel) {
        this.setPrivateValue('enumModelRef',val) ;
    }

    public get subModelRef():SwaggerDefinitionModel {
        return this.getPrivateValue('subModelRef') as SwaggerDefinitionModel;
    }
    public set subModelRef(val:SwaggerDefinitionModel) {
        this.setPrivateValue('subModelRef',val) ;
    }

    public init(){
        if(this.isEnum) {
            const enumRef = this.doc.enums.find(f => f.keys.includes(this.name));
            if (enumRef) {
                this.enumModelRef = enumRef;
                this.type = enumRef.name;
            }
            else {
                console.error('Enum not found',this);
            }
        }
        if(!this.isEnum && !this.isJsType) {
            const modelRef = this.doc.definitions.find(f => f.name === this.type);
            if (modelRef) {
                this.subModelRef = modelRef;
                this.type = modelRef.name;
            }
            else {
                console.error('Model not found into swagger-def-model',this);
            }
        }
    }

    public constructor(parent:SwaggerDefinitionModel,name: string, source: any) {
        super();

        this.source = source;
        this.parent = parent;

        this.name = name;
        this.isEnum = getIsEnumForDefinition(source) ? true : undefined;
        this.type = this.utils.getModelPropertyType(this,source);
        this.isJsType = getIsJsType(this.type);
        this.isArray = getResponseIsArray(source) ? true : undefined;
        this.enumValues = source.enum ? source.enum : undefined;
    }
}
