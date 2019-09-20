import { SwaggerClass } from "./swagger-class";
export declare class SwaggerMethod {
    source: any;
    parent: SwaggerClass;
    httpMethod: string;
    name: string;
    tags: string;
    parameters: SwaggerMethodParameter[];
    responseIsVoid?: boolean;
    responseIsArray?: boolean;
    responseIsJsType?: boolean;
    responseType?: string;
    constructor(parent: SwaggerClass, httpMethod: string, source: any);
}
export declare class SwaggerMethodParameter {
    source: any;
    parent: SwaggerMethod;
    name: string;
    type: string;
    isBodyParameter?: boolean;
    isPathParameter?: boolean;
    isJsType?: boolean;
    constructor(parent: SwaggerMethod, source: any);
}
