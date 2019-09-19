import { ReactNode } from "react";
export declare enum ESwaggerPlugins {
    ClassImport = "ClassImport"
}
export declare type SwaggerPluginAction = (props: any) => ReactNode;
export interface ISwaggerPlugin {
    pluginName: ESwaggerPlugins;
    componentFn: SwaggerPluginAction;
}
