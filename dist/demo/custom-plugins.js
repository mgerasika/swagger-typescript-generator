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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var class_import_1 = require("../swagger/ts-generator/class/class-import");
var swagger_plugins_1 = require("../swagger/common/swagger-plugins");
var ClassImportPlugin = function (props) {
    var getProps = function () {
        return __assign({}, props, { imports: props.imports.concat(['hello world!']) });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(class_import_1.ClassImport, __assign({ swaggerClass: props.swaggerClass }, getProps()))));
};
exports.customPlugins = [
    {
        pluginName: swagger_plugins_1.ESwaggerPlugins.ClassImport,
        componentFn: function (props) {
            return (react_1.default.createElement(ClassImportPlugin, __assign({}, props)));
        }
    }
];
//# sourceMappingURL=custom-plugins.js.map