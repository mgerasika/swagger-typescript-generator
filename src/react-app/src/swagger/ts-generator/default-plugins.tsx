import {ESwaggerPlugins, ISwaggerPlugin} from "../common/swagger-plugins";
import {ClassImport} from "./class/class-import";
import * as React from "react";

export const defaultPlugins: ISwaggerPlugin[] = [
    {
        pluginName: ESwaggerPlugins.ClassImport,
        componentFn: (props: any) => {
            return (<ClassImport {...props}/>)
        }
    }
];
