"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var diff_1 = __importDefault(require("./diff"));
var class_definition_1 = require("../ts-generator/class/class-definition");
var ApiClasses = function (props) {
    var renderCodegen = function (swaggerClass) {
        return (react_1.default.createElement(class_definition_1.ClassDefinition, { swaggerClass: swaggerClass }));
    };
    var result = props.classes.map(function (def) {
        return react_1.default.createElement(diff_1.default, { key: def.name, obj1: def.source, obj2: def, obj3: renderCodegen(def) });
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h6", { className: 'pl-3' }, "Api:"),
        result));
};
exports.default = ApiClasses;
//# sourceMappingURL=api-classes.js.map