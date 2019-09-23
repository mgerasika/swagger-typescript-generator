import { SwaggerPluginAction } from './swagger-plugins';
import { IApiClassImportAdapterProps } from '../components/api-class/api-class-import';
export interface ISwaggerPlugin {
    apiClassImport: SwaggerPluginAction<IApiClassImportAdapterProps>;
}
export declare const defaultPlugin: ISwaggerPlugin;
