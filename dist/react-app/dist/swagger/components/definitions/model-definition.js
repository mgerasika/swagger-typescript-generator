"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../utils");
exports.ModelDefinitionComponent = function (props) {
    var fields = props.definition.properties.map(function (parameter) {
        var type = parameter.isArray ? parameter.type + "[]" : parameter.type;
        return (react_1.default.createElement("span", { key: parameter.name },
            '\t',
            parameter.name,
            ":",
            type,
            '\n'));
    });
    var types = props.definition.properties.map(function (parameter) {
        return utils_1.isModelByTypeName(parameter.type) ? parameter.type : undefined;
    }).filter(function (filter) { return !!filter && filter != props.definition.name; }).join(',');
    var imports = [];
    if (types.length) {
        imports.push("import {" + types + "} from '" + props.definition.parent.config.modelImportPath + "'");
    }
    var result = imports.map(function (val) {
        return (react_1.default.createElement("div", { key: val },
            val,
            ";",
            '\n'));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        utils_1.Warning,
        result,
        "export interface ",
        props.definition.name,
        '{',
        " ",
        '\n',
        fields,
        '}'));
};
//# sourceMappingURL=model-definition.js.map