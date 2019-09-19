"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var method_return_type_1 = require("./method-return-type");
var method_arguments_1 = require("./method-arguments");
var method_body_1 = require("./method-body");
exports.MethodDefinition = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        '\t',
        "public ",
        props.swaggerMethod.name,
        "(",
        react_1.default.createElement(method_arguments_1.MethodArguments, { swaggerMethod: props.swaggerMethod }),
        "):",
        react_1.default.createElement(method_return_type_1.MethodReturnType, { swaggerMethod: props.swaggerMethod }),
        '{\n',
        react_1.default.createElement(method_body_1.MethodBody, { swaggerMethod: props.swaggerMethod }),
        '\t}\n'));
};
//# sourceMappingURL=method-definition.js.map