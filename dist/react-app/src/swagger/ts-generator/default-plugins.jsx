"use strict";
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
            return (<class_import_1.ClassImport {...props}/>);
        }
    }
];
//# sourceMappingURL=default-plugins.jsx.map