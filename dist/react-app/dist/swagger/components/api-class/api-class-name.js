"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ApiClassNameComponent = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        "class ",
        props.swaggerClass.name));
};
//# sourceMappingURL=api-class-name.js.map