import {
    ISwaggerDocConfig,
    ISwaggerUtils,
    SwaggerDoc,
} from '../react-app/src/main';

export interface INodeSwaggerConfigBase {
    swaggerDocConfig: ISwaggerDocConfig;
}

export interface INodeSwaggerConfigForMultiFile extends INodeSwaggerConfigBase {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
}

export interface INodeSwaggerConfigForOneFile extends INodeSwaggerConfigBase {
    outDir: string;
}
