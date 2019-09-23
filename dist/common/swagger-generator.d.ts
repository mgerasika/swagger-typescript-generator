import { ISwaggerConfig } from './swagger-config';
export declare class SwaggerGenerator {
    private _config;
    constructor(config: ISwaggerConfig);
    generate(): void;
    private createDirectory;
    private writeToFile;
}
