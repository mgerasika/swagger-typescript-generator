/// <reference types="react" />
import { ISwaggerPlugin } from './default-plugin';
import { ISwaggerUtils } from "./swagger-utils";
export interface ISwaggerContextProps {
    plugin: ISwaggerPlugin;
    createSwaggerUtilsFactory?: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}
export declare const SwaggerContext: import("react").Context<ISwaggerContextProps>;
