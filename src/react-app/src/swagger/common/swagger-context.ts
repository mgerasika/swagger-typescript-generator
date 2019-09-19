import {createContext} from "react";
import {ISwaggerPlugin} from "./swagger-plugins";

export interface ISwaggerContextProps {
    plugins: ISwaggerPlugin[];
}

export const SwaggerContext = createContext<ISwaggerContextProps>({plugins: []});
