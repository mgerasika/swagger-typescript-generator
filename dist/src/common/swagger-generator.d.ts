import { INodeSwaggerConfig } from './node-swagger-config';
export declare class SwaggerGenerator {
    private _config;
    constructor(config: INodeSwaggerConfig);
    generate(): void;
    private createDirectory;
    private writeToFile;
}
