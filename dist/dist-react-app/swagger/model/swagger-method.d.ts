import { SwaggerClassModel } from './swagger-class';
import { IUrlInfo } from './url-info';
export declare class SwaggerMethodModel {
    httpMethod: string;
    name: string;
    tags: string;
    parameters: SwaggerMethodParameter[];
    responseIsVoid?: boolean;
    responseIsArray?: boolean;
    responseType?: string;
    isFileUpload?: boolean;
    constructor(parent: SwaggerClassModel, httpMethod: string, source: any);
    source: any;
    parent: SwaggerClassModel;
    getUrlInfo(): IUrlInfo;
}
export declare class SwaggerMethodParameter {
    name: string;
    type: string;
    isBodyParameter?: boolean;
    isPathParameter?: boolean;
    isFormDataParameter?: boolean;
    isJsType?: boolean;
    constructor(parent: SwaggerMethodModel, source: any);
    source: any;
    parent: SwaggerMethodModel;
}
