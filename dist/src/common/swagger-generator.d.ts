import { ISwaggerConfig } from './swagger-config';
import { SwaggerDefinition } from '../react-app/dist/swagger/model';
import * as React from 'react';
interface IProps {
    definition: SwaggerDefinition;
}
export declare const ModelDefinition2: React.FC<IProps>;
export declare class SwaggerGenerator {
    private _config;
    constructor(config: ISwaggerConfig);
    generate(): void;
    private createDirectory;
    private writeToFile;
}
export {};
