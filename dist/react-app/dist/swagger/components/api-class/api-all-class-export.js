"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../utils");
exports.ApiAllClassesExportComponent = function (props) {
    var exports = props.classes.map(function (def) {
        var name = def.fileName.split('.');
        return (react_1.default.createElement("span", { key: def.name },
            "export * from './",
            name[0],
            "'",
            '\n'));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        utils_1.Warning,
        exports));
};
//# sourceMappingURL=api-all-class-export.js.map