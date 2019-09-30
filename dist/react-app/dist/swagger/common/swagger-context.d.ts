/// <reference types="react" />
import { ISwaggerPlugin } from './default-plugin';
export interface ISwaggerContextProps {
    plugin: ISwaggerPlugin;
}
export declare const SwaggerContext: import("react").Context<ISwaggerContextProps>;
