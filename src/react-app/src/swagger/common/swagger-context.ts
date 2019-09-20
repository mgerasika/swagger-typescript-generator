import {createContext} from "react";
import {defaultPlugin, ISwaggerPlugin} from '../components/plugin';

export interface ISwaggerContextProps {
    plugin: ISwaggerPlugin;
}

export const SwaggerContext = createContext<ISwaggerContextProps>({plugin: defaultPlugin});
