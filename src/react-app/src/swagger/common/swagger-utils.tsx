import {SwaggerPluginAction} from './swagger-plugins';
import * as React from 'react';
import {
    ApiClassImportComponent,
    IApiClassImportProps
} from '../components/api-class/api-class-import';
import {
    SwaggerClassModel,
    SwaggerDefinitionModel,
    SwaggerDefinitionProperty,
    SwaggerMethodModel,
    SwaggerMethodParameter
} from "../model";

export interface ISwaggerUtils {
    getClassName: (context:SwaggerClassModel, name:string) => string;
    getClassFileName : (context:SwaggerClassModel,name: string) => string;
    getMethodName : (context:SwaggerMethodModel, name: string) => string;
    getMethodParameterName : (context:SwaggerMethodParameter, name: string) => string;
    getMethodResponseType : (context:SwaggerMethodModel, shema: any) => string;
    getMethodParameterType : (context:SwaggerMethodParameter,shema: any) => string;
    getWarningMessage : () => string;

    getModelName : (context:SwaggerDefinitionModel, name: string) => string;
    getModelFileName : (context:SwaggerDefinitionModel, name: string) => string;
    getModelType:(context:SwaggerDefinitionModel,schema:any) =>string;
    getModelPropertyType:(context:SwaggerDefinitionProperty,schema: any) => string;
    isModelByTypeName : (name: string|undefined) => boolean ;
}
