"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var swagger_context_1 = require("./swagger-context");
var default_plugins_1 = require("../ts-generator/default-plugins");
exports.usePlugin = function (pluginName, props) {
    var context = react_1.useContext(swagger_context_1.SwaggerContext);
    var plugin = context.plugins.find(function (plugin) { return plugin.pluginName === pluginName; });
    if (plugin) {
        return plugin.componentFn(props);
    }
    else {
        var defaultPlugin = default_plugins_1.defaultPlugins.find(function (plugin) { return plugin.pluginName === pluginName; });
        if (defaultPlugin) {
            return defaultPlugin.componentFn(props);
        }
    }
};
//# sourceMappingURL=use-plugin.js.map