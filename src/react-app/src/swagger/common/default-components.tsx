import {SwaggerPluginAction} from './swagger-plugins';
import * as React from 'react';
import {ISwaggerApiClassImportComponentProps,} from '../components/api-class/swagger-api-class-import';
import {ISwaggerModelImportProps, ISwaggerModelProps} from "../components/model";
import {
    ISwaggerAllClassesExportProps,
    ISwaggerAllEnumsExportProps,
    ISwaggerAllModelsExportProps,
    ISwaggerAllUrlsProps,
    ISwaggerApiClassConstructorProps,
    ISwaggerApiClassFieldsProps,
    ISwaggerApiClassMethodProps,
    ISwaggerApiClassNameProps,
    ISwaggerApiClassProps,
    ISwaggerApiMethodArgumentsProps,
    ISwaggerApiMethodBodyProps,
    ISwaggerApiMethodProps,
    ISwaggerApiMethodReturnTypeProps,
    ISwaggerEnumProps
} from '../components';
import {ISwaggerApiClassInstanceProps} from '../components/api-class/swagger-api-class-instance';

export interface ISwaggerComponents {
    renderAllClassesExport: SwaggerPluginAction<ISwaggerAllClassesExportProps>;
    renderApiClass: SwaggerPluginAction<ISwaggerApiClassProps>;
    renderApiClassConstructor: SwaggerPluginAction<ISwaggerApiClassConstructorProps>;
    renderApiClassImport: SwaggerPluginAction<ISwaggerApiClassImportComponentProps>;
    renderApiClassFields: SwaggerPluginAction<ISwaggerApiClassFieldsProps>;
    renderApiClassMethod: SwaggerPluginAction<ISwaggerApiClassMethodProps>;
    renderApiClassName: SwaggerPluginAction<ISwaggerApiClassNameProps>;
    renderApiClassInstance: SwaggerPluginAction<ISwaggerApiClassInstanceProps>;

    renderApiMethodArguments: SwaggerPluginAction<ISwaggerApiMethodArgumentsProps>;
    renderApiMethodBody: SwaggerPluginAction<ISwaggerApiMethodBodyProps>;
    renderApiMethod: SwaggerPluginAction<ISwaggerApiMethodProps>;
    renderApiMethodReturnType: SwaggerPluginAction<ISwaggerApiMethodReturnTypeProps>;

    renderAllModelsExport: SwaggerPluginAction<ISwaggerAllModelsExportProps>;
    renderModelImport: SwaggerPluginAction<ISwaggerModelImportProps>;
    renderModel: SwaggerPluginAction<ISwaggerModelProps>;

    renderAllEnumsExport: SwaggerPluginAction<ISwaggerAllEnumsExportProps>;
    renderEnum: SwaggerPluginAction<ISwaggerEnumProps>;

    renderAllUrls: SwaggerPluginAction<ISwaggerAllUrlsProps>;
}

export const defaultComponents: ISwaggerComponents = {
    renderApiClassImport: (Component: React.FC<any>, props: ISwaggerApiClassImportComponentProps) => {
        return (<Component {...props} />);
    },
    renderAllClassesExport: (Component: React.FC<any>, props: ISwaggerAllClassesExportProps) => {
        return (<Component {...props} />);
    },
    renderApiClassConstructor: (Component: React.FC<any>, props: ISwaggerApiClassConstructorProps) => {
        return (<Component {...props} />);
    },
    renderApiClass: (Component: React.FC<any>, props: ISwaggerApiClassProps) => {
        return (<Component {...props} />);
    },
    renderApiClassFields: (Component: React.FC<any>, props: ISwaggerApiClassFieldsProps) => {
        return (<Component {...props} />);
    },
    renderApiClassMethod: (Component: React.FC<any>, props: ISwaggerApiClassMethodProps) => {
        return (<Component {...props} />);
    },
    renderApiClassName: (Component: React.FC<any>, props: ISwaggerApiClassNameProps) => {
        return (<Component {...props} />);
    },
    renderApiClassInstance: (Component: React.FC<any>, props: ISwaggerApiClassInstanceProps) => {
        return (<Component {...props} />);
    },

    renderApiMethodArguments: (Component: React.FC<any>, props: ISwaggerApiMethodArgumentsProps) => {
        return (<Component {...props} />);
    },
    renderApiMethodBody: (Component: React.FC<any>, props: ISwaggerApiMethodBodyProps) => {
        return (<Component {...props} />);
    },
    renderApiMethod: (Component: React.FC<any>, props: ISwaggerApiMethodProps) => {
        return (<Component {...props} />);
    },
    renderApiMethodReturnType: (Component: React.FC<any>, props: ISwaggerApiMethodReturnTypeProps) => {
        return (<Component {...props} />);
    },

    renderAllModelsExport: (Component: React.FC<any>, props: ISwaggerAllModelsExportProps) => {
        return (<Component {...props} />);
    },
    renderModelImport: (Component: React.FC<any>, props: ISwaggerModelImportProps) => {
        return (<Component {...props} />);
    },
    renderModel: (Component: React.FC<any>, props: ISwaggerModelProps) => {
        return (<Component {...props} />);
    },

    renderAllEnumsExport: (Component: React.FC<any>, props: ISwaggerAllEnumsExportProps) => {
        return (<Component {...props} />);
    },
    renderEnum: (Component: React.FC<any>, props: ISwaggerEnumProps) => {
        return (<Component {...props} />);
    },

    renderAllUrls: (Component: React.FC<any>, props: ISwaggerAllUrlsProps) => {
        return (<Component {...props} />);
    },
};
