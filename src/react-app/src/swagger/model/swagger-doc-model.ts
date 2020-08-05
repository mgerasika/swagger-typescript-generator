import {SwaggerDefinitionModel} from './swagger-definition-model';
import {SwaggerClassModel} from './swagger-class';
import {defaultUtils, ISwaggerPlugin} from "../common";
import {ISwaggerUtils} from "../common/swagger-utils";
import {SwaggerEnumModel} from "./swagger-enum";
import {SwaggerPathModel} from "./swagger-path";

const sourceSymbol = Symbol('source');

export interface ISwaggerDocModelConfig {
    apiUrl:string;
    source: any;
    modelImportPath: string;
    enumImportPath: string;
    plugin:ISwaggerPlugin;
    createCustomUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
}

export class SwaggerDocModel {
    public definitions: SwaggerDefinitionModel[] = [];
    public classes: SwaggerClassModel[] = [];
    public paths: SwaggerPathModel[] = [];
    public enums: SwaggerEnumModel[] = [];
    public utils:ISwaggerUtils = defaultUtils;

    public constructor(config: ISwaggerDocModelConfig) {
        this.config = config;
        this.utils = config.createCustomUtilsFactory(defaultUtils);

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

        this.classes = source.tags.map((tag:any) => {
            const paths = this.paths.filter(f=>f.tag === tag.name);
            return new SwaggerClassModel(this, tag.name, tag, paths );
        }, []);

        this.definitions.forEach(def =>{
            def.properties.forEach( defProp =>{
                if(defProp.isEnum) {
                    const enumModel = new SwaggerEnumModel(this,defProp.name,def, defProp.source);
                    this.enums.push(enumModel);
                }
            })
        })

        this.paths.forEach(cl => cl.init());
        this.enums.forEach(cl => cl.init());
        this.definitions.forEach(def => def.init());
        this.classes.forEach(cl => cl.init());
    }

    public get config(): ISwaggerDocModelConfig {
        return (this as any)[sourceSymbol];
    }

    public set config(val: ISwaggerDocModelConfig) {
        (this as any)[sourceSymbol] = val;
    }
}
