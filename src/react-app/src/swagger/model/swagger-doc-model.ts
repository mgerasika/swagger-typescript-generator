import {SwaggerDefinitionModel} from './swagger-definition-model';
import {SwaggerClassModel} from './swagger-class';
import {ISwaggerPlugin} from "../common";

const sourceSymbol = Symbol('source');

export interface ISwaggerDocModelConfig {
    source: any;
    modelFolderPath: string;
    plugin:ISwaggerPlugin;
}

export class SwaggerDocModel {
    public definitions: SwaggerDefinitionModel[] = [];
    public classes: SwaggerClassModel[] = [];

    public constructor(config: ISwaggerDocModelConfig) {
        this.config = config;

        const {source} = config;
        this.definitions = Object.keys(source.definitions).reduce((accum: SwaggerDefinitionModel[], key) => {
            const obj = source.definitions[key];
            accum.push(new SwaggerDefinitionModel(key, obj));
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
