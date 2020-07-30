import {SwaggerDefinitionModel} from './swagger-definition-model';
import {SwaggerClassModel} from './swagger-class';
import {defaultUtils, ISwaggerPlugin} from "../common";
import {ISwaggerUtils} from "../common/swagger-utils";

const sourceSymbol = Symbol('source');

export interface ISwaggerDocModelConfig {
    source: any;
    modelImportPath: string;
    plugin:ISwaggerPlugin;
    createCustomUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
}

export class SwaggerDocModel {
    public definitions: SwaggerDefinitionModel[] = [];
    public classes: SwaggerClassModel[] = [];
    public utils:ISwaggerUtils = defaultUtils;

    public constructor(config: ISwaggerDocModelConfig) {
        this.config = config;
        this.utils = config.createCustomUtilsFactory(defaultUtils);

        const {source} = config;
        this.definitions = Object.keys(source.definitions).reduce((accum: SwaggerDefinitionModel[], key) => {
            const obj = source.definitions[key];
            accum.push(new SwaggerDefinitionModel(this,key, obj));
            return accum;
        }, []);


        this.classes = Object.keys(source.paths).reduce((accum: SwaggerClassModel[], key) => {
            const obj = source.paths[key];
            accum.push(new SwaggerClassModel(this, key, obj));
            return accum;
        }, []);
    }

    public get config(): ISwaggerDocModelConfig {
        return (this as any)[sourceSymbol];
    }

    public set config(val: ISwaggerDocModelConfig) {
        (this as any)[sourceSymbol] = val;
    }
}
