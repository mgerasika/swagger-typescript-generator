import {ISwaggerComponents, ISwaggerDocConfig, ISwaggerUtils, SwaggerDoc} from "../react-app/src/main";

export interface INodeSwaggerConfigBase {
    swaggerDocConfig: ISwaggerDocConfig;
    createComponentsFactory?: (baseComponents: ISwaggerComponents) => ISwaggerComponents;
    createUtilsFactory?: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
    initDocumentFactory?: (baceDocument: SwaggerDoc) => SwaggerDoc;
}

export interface INodeSwaggerConfigForMultiFile extends INodeSwaggerConfigBase {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
}

export interface INodeSwaggerConfigForOneFile extends INodeSwaggerConfigBase {
    outDir: string;
}
