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
    var responseTypes = props.swaggerClass.methods.map(function (method) {
        return method.responseType;
    }).filter(function (filter) { return filter; });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        result,
        react_1.default.createElement("div", null,
            "import ",
            '{',
            " ",
            responseTypes.join(','),
            " ",
            '}',
            " from '",
            props.swaggerClass.parent.config.modelFolderPath,
            "';"),
        '\n\n'));
};
//# sourceMappingURL=api-class-import.js.map