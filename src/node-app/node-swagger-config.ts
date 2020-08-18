import {ISwaggerDocModelConfig} from "../react-app/src/swagger/model";

export interface INodeSwaggerConfig {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    enumFilesOutDir: string;
    urlFileOutDir: string;
    swaggerConfig:ISwaggerDocModelConfig;
}
