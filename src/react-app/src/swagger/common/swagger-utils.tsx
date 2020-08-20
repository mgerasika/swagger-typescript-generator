import * as React from 'react';
import {SwaggerClass, SwaggerMethod, SwaggerMethodParameter, SwaggerModel, SwaggerModelProperty} from "../models";
import {SwaggerEnum} from "../models/swagger-enum";
import {SwaggerPath} from "../models/swagger-path";

export interface ISwaggerUtils {
    getClassName: (context: SwaggerClass, name: string) => string;
    getClassFileName: (context: SwaggerClass, name: string) => string;
    getMethodName: (context: SwaggerMethod, name: string) => string;
    getMethodParameterName: (context: SwaggerMethodParameter, name: string) => string;
    getMethodResponseType: (context: SwaggerMethod, shema: any) => string;
    getMethodParameterType: (context: SwaggerMethodParameter, shema: any) => string;
    getWarningMessage: () => string;

    getModelName: (context: SwaggerModel, name: string) => string;
    getModelFileName: (context: SwaggerModel, name: string) => string;
    getModelType: (context: SwaggerModel, schema: any) => string;
    getModelPropertyType: (context: SwaggerModelProperty, schema: any) => string;

    getEnumName: (context: SwaggerEnum, name: string) => string;
    getEnumFileName: (context: SwaggerEnum, name: string) => string;
    getPathName: (context: SwaggerPath, name: string) => string;
}
