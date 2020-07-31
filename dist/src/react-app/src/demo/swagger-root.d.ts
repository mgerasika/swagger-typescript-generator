import React from 'react';
import { ISwaggerPlugin } from '../swagger/common/default-plugin';
import { ISwaggerUtils } from "../swagger/common/swagger-utils";
interface IProps {
    plugin: ISwaggerPlugin;
    createCustomUtilsFactory: (baseUtils: ISwaggerUtils) => ISwaggerUtils;
}
export declare const SwaggerRootComponent: React.FC<IProps>;
export {};
