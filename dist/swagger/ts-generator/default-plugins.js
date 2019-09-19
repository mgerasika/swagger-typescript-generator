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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_plugins_1 = require("../common/swagger-plugins");
var class_import_1 = require("./class/class-import");
var React = __importStar(require("react"));
exports.defaultPlugins = [
    {
        pluginName: swagger_plugins_1.ESwaggerPlugins.ClassImport,
        componentFn: function (props) {
            return (React.createElement(class_import_1.ClassImport, __assign({}, props)));
        }
    }
];
//# sourceMappingURL=default-plugins.js.map