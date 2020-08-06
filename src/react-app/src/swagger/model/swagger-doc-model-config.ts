import { ISwaggerPlugin} from "../common";
import {ISwaggerUtils} from "../common/swagger-utils";

const sourceSymbol = Symbol('source');

export interface ISwaggerDocModelConfig {
    apiUrl:string;
    source: any;
    modelImportPath: string;
    enumImportPath: string;
    plugin:ISwaggerPlugin;
    showPrivateFieldsForDebug?:boolean;
    createCustomUtilsFactory:(baseUtils:ISwaggerUtils) => ISwaggerUtils;
}