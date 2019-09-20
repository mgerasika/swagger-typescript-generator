"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ApiMethodArgumentsComponent = function (props) {
    var result = props.swaggerMethod.parameters.map(function (parameter, index) {
        var isLastArgument = index !== props.swaggerMethod.parameters.length - 1;
        var separator = isLastArgument ? ',' : '';
        return (react_1.default.createElement("span", { key: parameter.name },
            parameter.name,
            ":",
            parameter.type,
            separator));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, result));
};
//# sourceMappingURL=api-method-arguments.js.map