import {SwaggerPluginAction} from './swagger-plugins';
import * as React from 'react';
import {
    ApiClassImportComponent,
    IApiClassImportProps
} from '../components/api-class/api-class-import';

export interface ISwaggerComponents {
    apiClassImport: SwaggerPluginAction<IApiClassImportProps>;
}

export const defaultComponents: ISwaggerComponents = {
    apiClassImport: (Component:React.FC<any>, props: IApiClassImportProps) => {
        return (<Component {...props} />);
    }
};
