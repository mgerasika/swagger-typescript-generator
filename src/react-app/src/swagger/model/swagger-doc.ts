import {SwaggerDefinition} from './swagger-definition';
import {SwaggerClass} from './swagger-class';

const sourceSymbol = Symbol('source');

export interface ISwaggerDocConfig {
    source: any;
    apiFolderPath: string;
    modelFolderPath: string;
}

export class SwaggerDoc {
    public definitions: SwaggerDefinition[] = [];
    public classes: SwaggerClass[] = [];

    public constructor(config: ISwaggerDocConfig) {
        this.config = config;

        const {source} = config;
        this.definitions = Object.keys(source.definitions).reduce((accum: SwaggerDefinition[], key) => {
            const obj = source.definitions[key];
            accum.push(new SwaggerDefinition(key, obj));
            return accum;
        }, []);


        this.classes = Object.keys(source.paths).reduce((accum: SwaggerClass[], key) => {
            const obj = source.paths[key];
            accum.push(new SwaggerClass(this, key, obj));
            return accum;
        }, []);
    }

    public get config(): ISwaggerDocConfig {
        return (this as any)[sourceSymbol];
    }

    public set config(val: ISwaggerDocConfig) {
        (this as any)[sourceSymbol] = val;
    }
}
