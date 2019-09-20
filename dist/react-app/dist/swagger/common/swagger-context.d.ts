/// <reference types="react" />
import { ISwaggerPlugin } from '../components/plugin';
export interface ISwaggerContextProps {
    plugin: ISwaggerPlugin;
}
export declare const SwaggerContext: import("react").Context<ISwaggerContextProps>;
