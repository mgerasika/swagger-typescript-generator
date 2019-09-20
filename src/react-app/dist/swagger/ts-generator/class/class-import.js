"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var swagger_plugins_1 = require("../../common/swagger-plugins");
var use_plugin_1 = require("../../common/use-plugin");
exports.ClassImportAdapter = function (props) {
    var imports = ['import axios, {AxiosError, AxiosPromise} from \'axios\';'];
    var result = use_plugin_1.usePlugin(swagger_plugins_1.ESwaggerPlugins.ClassImport, {
        swaggerClass: props.swaggerClass,
        imports: imports
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, result));
};
exports.ClassImport = function (props) {
    var result = props.imports.map(function (val) {
        return (react_1.default.createElement("div", { key: val },
            val,
            ";"));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        result,
        '\n'));
};
//# sourceMappingURL=class-import.js.map