"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var method_definition_1 = require("../method/method-definition");
exports.ClassMethods = function (props) {
    var methods = props.swaggerClass.methods.map(function (method) {
        return (react_1.default.createElement(method_definition_1.MethodDefinition, { key: method.name, swaggerMethod: method }));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null, methods));
};
//# sourceMappingURL=class-methods.js.map