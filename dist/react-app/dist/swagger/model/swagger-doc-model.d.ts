import { SwaggerDefinitionModel } from './swagger-definition-model';
import { SwaggerClassModel } from './swagger-class';
import { ISwaggerPlugin } from "../common";
export interface ISwaggerDocModelConfig {
    source: any;
    modelImportPath: string;
    plugin: ISwaggerPlugin;
}
export declare class SwaggerDocModel {
    definitions: SwaggerDefinitionModel[];
    classes: SwaggerClassModel[];
    constructor(config: ISwaggerDocModelConfig);
    config: ISwaggerDocModelConfig;
}
