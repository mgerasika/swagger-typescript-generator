import { ISwaggerPlugin } from '../../dist/dist-react-app/swagger/common';
export interface ISwaggerConfig {
    plugin: ISwaggerPlugin;
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    modelImportPath: string;
    apiFilesOutDir: string;
    urlFileOutDir: string;
}
