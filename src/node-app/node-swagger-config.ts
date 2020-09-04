import {ISwaggerComponents, ISwaggerDocConfig, ISwaggerUtils, SwaggerDoc} from "../react-app/src/main";

export interface INodeSwaggerConfigBase {
    swaggerDocConfig: ISwaggerDocConfig;
    initComponentsFactory?: (baseComponents: ISwaggerComponents) => ISwaggerComponents;
    initUtilsFactory?: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
    initDocumentFactory?: (baseDocument: SwaggerDoc) => SwaggerDoc;
}

export interface INodeSwaggerConfigForMultiFile extends INodeSwaggerConfigBase {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
}

export interface INodeSwaggerConfigForOneFile extends INodeSwaggerConfigBase {
    outDir: string;
}
