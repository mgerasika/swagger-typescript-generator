import { SwaggerPluginAction } from './swagger-plugins';
import { IApiClassImportProps } from '../components/api-class/api-class-import';
export interface ISwaggerPlugin {
    apiClassImport: SwaggerPluginAction<IApiClassImportProps>;
}
export declare const defaultPlugin: ISwaggerPlugin;
