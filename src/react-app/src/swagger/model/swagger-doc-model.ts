import {SwaggerDefinitionModel} from './swagger-definition-model';
import {SwaggerClassModel} from './swagger-class';
import {defaultComponents, defaultUtils, ISwaggerComponents, uniqueItems} from "../common";
import {ISwaggerUtils} from "../common/swagger-utils";
import {SwaggerEnumModel} from "./swagger-enum";
import {SwaggerPathModel} from "./swagger-path";
import {ISwaggerDocModelConfig} from "./swagger-doc-model-config";

const sourceSymbol = Symbol('source');

export class SwaggerDocModel {
    public definitions: SwaggerDefinitionModel[] = [];
    public classes: SwaggerClassModel[] = [];
    public paths: SwaggerPathModel[] = [];
    public enums: SwaggerEnumModel[] = [];
    public utils:ISwaggerUtils = defaultUtils;
    public components:ISwaggerComponents = defaultComponents;

    public constructor(config: ISwaggerDocModelConfig,utils:ISwaggerUtils,components:ISwaggerComponents) {
        this.config = config;
        this.utils = utils;
        this.components = components;

        const {source} = config;

        this.paths = Object.keys(source.paths).reduce((accum: SwaggerPathModel[], key) => {
            const obj = source.paths[key];
            accum.push(new SwaggerPathModel(this, key, obj));
            return accum;
        }, []);

        this.definitions = Object.keys(source.definitions).reduce((accum: SwaggerDefinitionModel[], key) => {
            const obj = source.definitions[key];
            accum.push(new SwaggerDefinitionModel(this,key, obj));
            return accum;
        }, []);

        if(source.tags) {
            this.classes = source.tags.map((tag: any) => {
                const paths = this.paths.filter(f => f.tag === tag.name);
                return new SwaggerClassModel(this, tag.name, tag, paths);
            }, []);
        }
        else {
            const tags = uniqueItems(this.paths, (p)=>p.tag).map(p=>p.tag);
            this.classes = tags.map((tag: string) => {
                const paths = this.paths.filter(f => f.tag === tag);
                const source = paths.map(p=>p.source);
                return new SwaggerClassModel(this, tag, source, paths);
            }, []);
        }

        // enums
        this.definitions.forEach(def =>{
            def.properties.forEach( defProp =>{
                if(defProp.isEnum) {
                    const enumModel = new SwaggerEnumModel(this,defProp.name, {modelDef:def}, defProp.source);
                    this.enums.push(enumModel);
                }
            })
        })

        this.classes.forEach(cl =>{
            cl.methods.forEach( meth =>{
               meth.parameters.forEach( par=>{
                   if(par.isEnum) {
                       const enumModel = new SwaggerEnumModel(this,par.name, {methodPropertyDef:par}, meth.source);
                       this.enums.push(enumModel);
                   }
               })
            })
        })
        // TODO optimize
        const uniqueEnums = uniqueItems(this.enums, (e)=> e.name + JSON.stringify(e.values));
        uniqueEnums.forEach(uniqueEnum =>{
            const similarEnums = this.enums.filter(f=>JSON.stringify(f.values) === JSON.stringify(uniqueEnum.values));
            uniqueEnum.keys.push(...similarEnums.map(m=>m.keys[0]))
            uniqueEnum.keys = uniqueItems(uniqueEnum.keys,k=>k);
        })
        this.enums = uniqueEnums;

        this.paths.forEach(cl => cl.init());
        this.enums.forEach(cl => cl.init());
        this.definitions.forEach(def => def.init());
        this.classes.forEach(cl => cl.init());
    }

    public get doc() :SwaggerDocModel{
        return this;
    }

    public get config(): ISwaggerDocModelConfig {
        return (this as any)[sourceSymbol];
    }

    public set config(val: ISwaggerDocModelConfig) {
        (this as any)[sourceSymbol] = val;
    }
}
