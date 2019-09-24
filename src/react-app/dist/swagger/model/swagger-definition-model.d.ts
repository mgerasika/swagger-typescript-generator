import { SwaggerDocModel } from './swagger-doc-model';
export declare class SwaggerDefinitionModel {
    source: any;
    parent: SwaggerDocModel;
    type: string;
    name: string;
    fileName: string;
    properties: SwaggerDefinitionProperty[];
    constructor(parent: SwaggerDocModel, name: string, source: any);
}
export declare class SwaggerDefinitionProperty {
    source: any;
    name: string;
    type: string;
    isArray: boolean;
    constructor(name: string, source: any);
}
