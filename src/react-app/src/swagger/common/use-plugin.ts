import {useContext} from "react";
import {ESwaggerPlugins, ISwaggerPlugin} from "./swagger-plugins";
import {ISwaggerContextProps, SwaggerContext} from "./swagger-context";
import {defaultPlugins} from "../ts-generator/default-plugins";

export const usePlugin = (pluginName: ESwaggerPlugins, props: any) => {
    const context = useContext<ISwaggerContextProps>(SwaggerContext);
    const plugin: ISwaggerPlugin = context.plugins.find((plugin: ISwaggerPlugin) => plugin.pluginName === pluginName) as ISwaggerPlugin;
    if (plugin) {
        return plugin.componentFn(props);
    }
    else {
        const defaultPlugin: ISwaggerPlugin = defaultPlugins.find((plugin: ISwaggerPlugin) => plugin.pluginName === pluginName) as ISwaggerPlugin;
        if (defaultPlugin) {
            return defaultPlugin.componentFn(props);
        }
    }
}
