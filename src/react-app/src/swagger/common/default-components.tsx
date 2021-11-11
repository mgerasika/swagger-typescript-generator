import { SwaggerPluginAction } from './swagger-plugins';
import * as React from 'react';
import { ISwaggerApiClassImportComponentProps } from '../components/api-class/swagger-api-class-import';
import { ISwaggerModelImportProps, ISwaggerModelProps } from '../components/model';
import {
    ISwaggerAllClassesExportProps,
    ISwaggerAllEnumsExportProps,
    ISwaggerAllInOneFileProps,
    ISwaggerAllModelsExportProps,
    ISwaggerAllUrlsProps,
    ISwaggerApiClassConstructorProps,
    ISwaggerApiClassFieldsProps,
    ISwaggerApiClassMethodProps,
    ISwaggerApiClassNameProps,
    ISwaggerApiClassProps,
    ISwaggerApiMethodArgumentsProps,
    ISwaggerApiMethodBodyProps,
    ISwaggerApiMethodProps,
    ISwaggerApiMethodReturnTypeProps,
    ISwaggerEnumContentProps,
    ISwaggerEnumProps,
    ISwaggerWarningMessageProps,
} from '../components';
import { ISwaggerApiClassInstanceProps } from '../components/api-class/swagger-api-class-instance';
import { ISwaggerApiMethodNameProps } from '../components/api-method/swagger-api-method-name';
import { ISwaggerEnumFieldProps } from '../components/enum/swagger-enum-field';

export interface ISwaggerComponents {
    DEBUG_CUSTOMIZATION_NAME: string;
}

export const defaultComponents: ISwaggerComponents = {
    DEBUG_CUSTOMIZATION_NAME: '',
};
