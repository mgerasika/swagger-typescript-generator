import { SwaggerDocModel } from './swagger-doc-model';
export declare class SwaggerDefinitionModel {
    source: any;
    parent: SwaggerDocModel;
    readonly utils: import("..").ISwaggerUtils;
    type: string;
    name: string;
    fileName: string;
    properties: SwaggerDefinitionProperty[];
    constructor(parent: SwaggerDocModel, name: string, source: any);
}
export declare class SwaggerDefinitionProperty {
    source: any;
    readonly utils: import("..").ISwaggerUtils;
    name: string;
    type: string;
    isArray: boolean;
    parent: SwaggerDefinitionModel;
    constructor(parent: SwaggerDefinitionModel, name: string, source: any);
}
