import { SwaggerDefinitionModel } from './swagger-definition-model';
import { SwaggerClassModel } from './swagger-class';
import { ISwaggerPlugin } from "../common";
import { ISwaggerUtils } from "../common/swagger-utils";
export interface ISwaggerDocModelConfig {
    source: any;
    modelImportPath: string;
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}
export declare class SwaggerDocModel {
    definitions: SwaggerDefinitionModel[];
    classes: SwaggerClassModel[];
    utils: ISwaggerUtils;
    constructor(config: ISwaggerDocModelConfig);
    config: ISwaggerDocModelConfig;
}
