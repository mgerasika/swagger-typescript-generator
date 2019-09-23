export declare class SwaggerDefinitionModel {
    source: any;
    type: string;
    name: string;
    fileName: string;
    properties: SwaggerDefinitionProperty[];
    constructor(name: string, source: any);
}
export declare class SwaggerDefinitionProperty {
    source: any;
    name: string;
    type: string;
    constructor(name: string, source: any);
}
