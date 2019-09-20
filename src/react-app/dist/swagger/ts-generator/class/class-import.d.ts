import React from 'react';
import { SwaggerClass } from '../../model/swagger-class';
interface IAdapterProps {
    swaggerClass: SwaggerClass;
}
export declare const ClassImportAdapter: React.FC<IAdapterProps>;
interface IProps {
    swaggerClass: SwaggerClass;
    imports: string[];
}
export declare const ClassImport: React.FC<IProps>;
export {};
