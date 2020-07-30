import {SwaggerPluginAction} from './swagger-plugins';
import * as React from 'react';
import {
    ApiClassImportComponent,
    IApiClassImportProps
} from '../components/api-class/api-class-import';

export interface ISwaggerUtils {
    getClassName: (name:string) => string;
}
