import {ISwaggerDocModelConfig} from '../../dist';

export interface INodeSwaggerConfig {
    modelFilesOutDir: string;
    apiFilesOutDir: string;
    urlFileOutDir: string;
    swaggerConfig:ISwaggerDocModelConfig;
}
