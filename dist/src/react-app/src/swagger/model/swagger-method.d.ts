import { SwaggerClassModel } from "./swagger-class";
export declare class SwaggerMethodModel {
    source: any;
    parent: SwaggerClassModel;
    httpMethod: string;
    name: string;
    tags: string;
    parameters: SwaggerMethodParameter[];
    responseIsVoid?: boolean;
    responseIsArray?: boolean;
    responseIsJsType?: boolean;
    responseType?: string;
    constructor(parent: SwaggerClassModel, httpMethod: string, source: any);
}
export declare class SwaggerMethodParameter {
    source: any;
    parent: SwaggerMethodModel;
    name: string;
    type: string;
    isBodyParameter?: boolean;
    isPathParameter?: boolean;
    isJsType?: boolean;
    constructor(parent: SwaggerMethodModel, source: any);
}
