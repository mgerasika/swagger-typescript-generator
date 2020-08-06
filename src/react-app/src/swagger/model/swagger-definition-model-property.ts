import {SwaggerModelBase} from "./swagger-model-base";
import {SwaggerDefinitionModel} from "./swagger-definition-model";
import {SwaggerEnumModel} from "./swagger-enum";
import {getIsEnumForDefinition, getResponseIsArray} from "../common";

export class SwaggerDefinitionProperty  extends SwaggerModelBase<SwaggerDefinitionModel> {
    public name: string = '';
    public type: string = '';
    public isArray?: boolean;
    public isEnum?: boolean ;
    public required?: boolean;
    public enumValues?:[];

    public get enumModelRef():SwaggerEnumModel {
        return this.getPrivateValue('enumModelRef') as SwaggerEnumModel;
    }
    public set enumModelRef(val:SwaggerEnumModel) {
        this.setPrivateValue('enumModelRef',val) ;
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
    }

    public constructor(parent:SwaggerDefinitionModel,name: string, source: any) {
        super();

        this.source = source;
        this.parent = parent;

        this.name = name;
        this.isEnum = getIsEnumForDefinition(source) ? true : undefined;
        this.type = this.utils.getModelPropertyType(this,source);
        this.isArray = getResponseIsArray(source) ? true : undefined;
        this.enumValues = source.enum ? source.enum : undefined;
    }
}
