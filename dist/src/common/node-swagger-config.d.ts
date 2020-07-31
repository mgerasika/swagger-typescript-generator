import { ISwaggerPlugin, ISwaggerUtils } from '../../dist/dist-react-app/swagger/common';
export interface INodeSwaggerConfig {
    plugin: ISwaggerPlugin;
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    modelImportPath: string;
    apiFilesOutDir: string;
    urlFileOutDir: string;
    createSwaggerUtilsFactory: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}
