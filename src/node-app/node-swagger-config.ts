import {ISwaggerDocConfig, SwaggerDoc,ISwaggerComponents, ISwaggerUtils} from "../react-app/src/main";

export interface INodeSwaggerConfig {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
    urlFileOutDir: string;
    swaggerDocConfig: ISwaggerDocConfig;
    createComponentsFactory?: (baseComponents: ISwaggerComponents) => ISwaggerComponents;
    createUtilsFactory?: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
    createDocumentFactory?: (baceDocument: SwaggerDoc) => SwaggerDoc;
}
