import React from 'react';
import { SwaggerClassModel } from '../../model/swagger-class';
export interface IApiClassImportAdapterProps {
    swaggerClass: SwaggerClassModel;
}
interface IProps {
    swaggerClass: SwaggerClassModel;
    imports: string[];
}
export declare const ApiClassImportComponent: React.FC<IProps>;
export {};
