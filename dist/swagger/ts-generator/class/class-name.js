"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ClassName = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        "export class ",
        props.swaggerClass.name));
};
//# sourceMappingURL=class-name.js.map