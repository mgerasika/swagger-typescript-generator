"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../utils");
exports.ApiUrlsComponent = function (props) {
    var urls = [];
    props.classes.forEach(function (def) {
        def.methods.forEach(function (method) {
            urls.push(method.getUrlInfo());
        });
    });
    var result = urls.map(function (def, index) {
        var isLast = index === urls.length - 1;
        var renderComa = !isLast && ',';
        return (react_1.default.createElement("span", { key: def.name },
            '\t',
            def.name,
            ":'",
            def.url,
            "'",
            renderComa,
            '\n'));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        utils_1.Warning,
        "export const API_URLS = ",
        '{\n',
        " ",
        result,
        '};\n'));
};
//# sourceMappingURL=index.js.map