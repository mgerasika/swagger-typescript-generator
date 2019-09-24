import React from 'react';
import { SwaggerClassModel } from '../../model/swagger-class';
interface IProps {
    swaggerClass: SwaggerClassModel;
}
export declare const ApiClassImportAdapter: React.FC<IProps>;
export interface IApiClassImportProps {
    swaggerClass: SwaggerClassModel;
    imports: string[];
}
export declare const ApiClassImportComponent: React.FC<IApiClassImportProps>;
export {};
