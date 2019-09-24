import {ISwaggerPlugin} from '../react-app/src/swagger/common';

export interface ISwaggerConfig {
    plugin: ISwaggerPlugin;
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    modelImportPath: string;
    apiFilesOutDir: string;
}
