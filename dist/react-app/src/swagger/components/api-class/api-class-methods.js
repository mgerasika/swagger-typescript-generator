"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var api_method_definition_1 = require("../api-method/api-method-definition");
exports.ApiClassMethodsComponent = function (props) {
    var methods = props.swaggerClass.methods.map(function (method) {
        return (react_1.default.createElement(api_method_definition_1.ApiMethodDefinitionComponent, { key: method.name, swaggerMethod: method }));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, methods));
};
//# sourceMappingURL=api-class-methods.js.map