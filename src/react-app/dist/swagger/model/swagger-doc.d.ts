import { SwaggerDefinition } from './swagger-definition';
import { SwaggerClass } from './swagger-class';
export interface ISwaggerDocConfig {
    source: any;
    apiFolderPath: string;
    modelFolderPath: string;
}
export declare class SwaggerDoc {
    definitions: SwaggerDefinition[];
    classes: SwaggerClass[];
    constructor(config: ISwaggerDocConfig);
    config: ISwaggerDocConfig;
}
