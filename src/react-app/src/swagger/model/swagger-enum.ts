import {SwaggerDocModel} from './swagger-doc-model';
import {SwaggerDefinitionModel} from "./swagger-definition-model";
import {SwaggerModelBase} from "./swagger-model-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";

export class SwaggerEnumModel extends SwaggerModelBase<SwaggerDocModel>{
    public keys: string[] = [];
    public name: string = '';
    public description?:string;
    public type?:string;
    public values?:string[];
    public namespace?:string[];

    public constructor(parent: SwaggerDocModel, key: string, model:{modelDef?: SwaggerDefinitionModel,methodPropertyDef?:SwaggerMethodParameter}, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.keys.push(key);
        this.name =  this.utils.getEnumName(this,key);
        this.values = source.enum;
        if(!this.values && model.methodPropertyDef) {
            this.values = model.methodPropertyDef.enumValues ? model.methodPropertyDef.enumValues : [];
        }
        this.description = source.description;
        this.type = source.type;
        //this.namespace = [modelDef.name];
    }

    public init(){
    }
}
