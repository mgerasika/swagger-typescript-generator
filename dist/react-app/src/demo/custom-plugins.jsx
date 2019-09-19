"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var class_import_1 = require("../swagger/ts-generator/class/class-import");
var swagger_plugins_1 = require("../swagger/common/swagger-plugins");
var ClassImportPlugin = function (props) {
    var getProps = function () {
        return __assign(__assign({}, props), { imports: __spreadArrays(props.imports, ['hello world!']) });
    };
    return (<>
            <class_import_1.ClassImport swaggerClass={props.swaggerClass} {...getProps()}/>
        </>);
};
exports.customPlugins = [
    {
        pluginName: swagger_plugins_1.ESwaggerPlugins.ClassImport,
        componentFn: function (props) {
            return (<ClassImportPlugin {...props}/>);
        }
    }
];
//# sourceMappingURL=custom-plugins.jsx.map