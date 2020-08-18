import {ISwaggerDocModelConfig, SwaggerDocModel} from "../react-app/src/swagger/model";
import {ISwaggerComponents, ISwaggerUtils} from "../react-app/src/swagger/common";

export interface INodeSwaggerConfig {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
    urlFileOutDir: string;
    swaggerDocConfig: ISwaggerDocModelConfig;
    createComponentsFactory?: (baseComponents: ISwaggerComponents) => ISwaggerComponents;
    createUtilsFactory?: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
    createDocumentFactory?: (baceDocument: SwaggerDocModel) => SwaggerDocModel;
}
