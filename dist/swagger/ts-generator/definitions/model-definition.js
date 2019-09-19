"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ModelDefinition = function (props) {
    var fields = props.definition.properties.map(function (parameter) {
        return (react_1.default.createElement("span", { key: parameter.name },
            '\t',
            parameter.name,
            ":",
            parameter.type,
            '\n'));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        "export interface ",
        props.definition.name,
        '{',
        " ",
        fields,
        '}'));
};
//# sourceMappingURL=model-definition.js.map