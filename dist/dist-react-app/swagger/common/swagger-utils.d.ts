import { SwaggerClassModel, SwaggerDefinitionModel, SwaggerDefinitionProperty, SwaggerMethodModel, SwaggerMethodParameter } from "../model";
export interface ISwaggerUtils {
    getClassName: (context: SwaggerClassModel, name: string) => string;
    getClassFileName: (context: SwaggerClassModel, name: string) => string;
    getMethodName: (context: SwaggerMethodModel, name: string) => string;
    getMethodParameterName: (context: SwaggerMethodParameter, name: string) => string;
    getMethodResponseType: (context: SwaggerMethodModel, shema: any) => string;
    getMethodResponseIsArray: (context: SwaggerMethodModel, shema: any) => boolean;
    getMethodParameterType: (context: SwaggerMethodParameter, shema: any) => string;
    getWarningMessage: () => string;
    getModelName: (context: SwaggerDefinitionModel, name: string) => string;
    getModelFileName: (context: SwaggerDefinitionModel, name: string) => string;
    getModelType: (context: SwaggerDefinitionModel, schema: any) => string;
    getModelPropertyType: (context: SwaggerDefinitionProperty, schema: any) => string;
    getModelPropertyResponseIsArray: (context: SwaggerDefinitionProperty, name: string) => boolean;
    isModelByTypeName: (name: string | undefined) => boolean;
}
