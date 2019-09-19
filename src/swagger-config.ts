import {createContext} from "react";
import {ISwaggerPlugin} from './react-app/src/swagger/common';

export interface ISwaggerConfig {
    plugins: ISwaggerPlugin[];
    swaggerInputJson: Object;
    modelFilesOutDir: string;
    apiFilesOutDir: string;
}
