/// <reference types="react" />
import { ISwaggerPlugin } from "./swagger-plugins";
export interface ISwaggerContextProps {
    plugins: ISwaggerPlugin[];
}
export declare const SwaggerContext: import("react").Context<ISwaggerContextProps>;
