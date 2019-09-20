import React from 'react';
import { SwaggerClass } from '../../model/swagger-class';
export interface IApiClassImportAdapterProps {
    swaggerClass: SwaggerClass;
}
interface IProps {
    swaggerClass: SwaggerClass;
    imports: string[];
}
export declare const ApiClassImportComponent: React.FC<IProps>;
export {};
