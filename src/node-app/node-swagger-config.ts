import {ISwaggerDocModelConfig, SwaggerDocModel} from "../react-app/src/swagger/model";
import {ISwaggerUtils} from "../react-app/src/swagger/common";

export interface INodeSwaggerConfig {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
    urlFileOutDir: string;
    swaggerDocConfig:ISwaggerDocModelConfig;
    createUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
    createDocumentFactory:(baceDocument:SwaggerDocModel) => SwaggerDocModel;
}
