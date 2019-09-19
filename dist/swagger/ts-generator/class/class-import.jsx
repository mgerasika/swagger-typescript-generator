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
    var getProps = function () {
        return {
            swaggerClass: props.swaggerClass,
            imports: imports
        };
    };
    return (<>
            {use_plugin_1.usePlugin(swagger_plugins_1.ESwaggerPlugins.ClassImport, getProps())}
        </>);
};
exports.ClassImport = function (props) {
    var result = props.imports.map(function (val) {
        return (<div key={val}>{val};</div>);
    });
    return (<>
            {result}
            {'\n'}
        </>);
};
//# sourceMappingURL=class-import.jsx.map