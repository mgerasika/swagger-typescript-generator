"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ApiClassImportComponent = function (props) {
    var result = props.imports.map(function (val) {
        return (react_1.default.createElement("div", { key: val },
            val,
            ";",
            '\n'));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        result,
        '\n'));
};
//# sourceMappingURL=api-class-import.js.map