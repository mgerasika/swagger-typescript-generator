import {SwaggerPluginAction} from '../common/swagger-plugins';
import * as React from 'react';
import {ApiClassImportComponent, IApiClassImportAdapterProps} from './api-class/api-class-import';

export interface ISwaggerPlugin {
    apiClassImport: SwaggerPluginAction<IApiClassImportAdapterProps>;
}

export const defaultPlugin: ISwaggerPlugin = {
    apiClassImport: (props: IApiClassImportAdapterProps) => {
        const imports = [
            'import axios, {AxiosError, AxiosPromise} from \'axios\'',
            'import {IRequestService, requestService} from \'swagger-typescript-generator/dist\''];

        return (<ApiClassImportComponent {...props} imports={imports}/>);
    }
};
