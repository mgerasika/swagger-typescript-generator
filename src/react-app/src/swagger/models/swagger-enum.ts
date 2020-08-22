import {SwaggerDoc} from './swagger-doc';
import {SwaggerModel} from "./swagger-model";
import {SwaggerBase as SwaggerBase} from "./swagger-base";
import {SwaggerMethodParameter} from "./swagger-method-parameter";
import {SwaggerModelProperty} from "./swagger-model-property";

export class SwaggerEnum extends SwaggerBase<SwaggerDoc> {
    public keys: string[] = [];
    public name: string = '';
    public fullName: string = '';
    public description?: string;
    public type?: string;
    public values?: string[];
    public namespace?: string;
    public fileName: string;

    public constructor(parent: SwaggerDoc, key: string, model: { modelDef?: SwaggerModel, modelPropDef?: SwaggerModelProperty, methodPropertyDef?: SwaggerMethodParameter }, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.keys.push(key);
        this.name = this.utils.getEnumName(this, key);
        this.fullName = this.name;
        this.fileName = this.utils.getEnumFileName(this, key);
        this.values = source.enum;

        if (!this.values && model.methodPropertyDef) {
            this.values = model.methodPropertyDef.enumValues ? model.methodPropertyDef.enumValues : [];
        }
        if (!this.values && model.modelPropDef) {
            this.values = model.modelPropDef.enumValues ? model.modelPropDef.enumValues : [];
        }
        this.description = source.description;
        this.type = source.type;
        if (model.modelDef) {
            this.namespace = model.modelDef.name;
            this.fullName = this.namespace + '.' + this.name;
        }
    }

    public init() {
    }
}
