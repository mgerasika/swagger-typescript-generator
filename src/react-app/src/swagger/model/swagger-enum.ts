import {SwaggerDocModel} from './swagger-doc-model';
import { parentSymbol, sourceSymbol} from '../utils';
import {SwaggerDefinitionModel} from "./swagger-definition-model";
import {SwaggerMethodParameter} from "./swagger-method";

export class SwaggerEnumModel {
    public keys: string[] = [];
    public name: string = '';
    public description?:string;
    public type?:string;
    public values?:string[];
    public namespace?:string[];

    public get doc() {
        return this.parent;
    }

    public get utils() {
        return this.parent.utils;
    }

    public constructor(parent: SwaggerDocModel, key: string, model:{modelDef?: SwaggerDefinitionModel,methodPropertyDef?:SwaggerMethodParameter}, source: any) {
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

    public get plugin() {
        return this.parent.config.plugin;
    }

    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): SwaggerDocModel {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }
}
