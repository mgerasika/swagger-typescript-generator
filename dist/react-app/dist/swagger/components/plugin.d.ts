import { SwaggerPluginAction } from '../common/swagger-plugins';
import { IApiClassImportAdapterProps } from './api-class/api-class-import';
export interface ISwaggerPlugin {
    apiClassImport: SwaggerPluginAction<IApiClassImportAdapterProps>;
}
export declare const defaultPlugin: ISwaggerPlugin;
