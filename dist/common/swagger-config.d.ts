import { ISwaggerPlugin } from '../../dist/dist-react-app/swagger/common';
import { ISwaggerUtils } from "../react-app/src/swagger/common/swagger-utils";
export interface ISwaggerConfig {
    plugin: ISwaggerPlugin;
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    modelImportPath: string;
    apiFilesOutDir: string;
    urlFileOutDir: string;
    createSwaggerUtilsFactory: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}
