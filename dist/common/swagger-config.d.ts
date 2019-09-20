import { ISwaggerPlugin } from '../react-app/src/swagger/components';
export interface ISwaggerConfig {
    plugins: ISwaggerPlugin;
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    apiFilesOutDir: string;
}
