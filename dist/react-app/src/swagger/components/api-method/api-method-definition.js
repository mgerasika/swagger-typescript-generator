"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var api_method_return_type_1 = require("./api-method-return-type");
var api_method_arguments_1 = require("./api-method-arguments");
var api_method_body_1 = require("./api-method-body");
exports.ApiMethodDefinitionComponent = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        '\t',
        "public ",
        props.swaggerMethod.name,
        "(",
        react_1.default.createElement(api_method_arguments_1.ApiMethodArgumentsComponent, { swaggerMethod: props.swaggerMethod }),
        "):",
        react_1.default.createElement(api_method_return_type_1.ApiMethodReturnTypeComponent, { swaggerMethod: props.swaggerMethod }),
        '{\n',
        react_1.default.createElement(api_method_body_1.ApiMethodBodyComponent, { swaggerMethod: props.swaggerMethod }),
        '\t}\n'));
};
//# sourceMappingURL=api-method-definition.js.map