"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var default_plugin_1 = require("../swagger/common/default-plugin");
exports.customPlugins = __assign({}, default_plugin_1.defaultPlugin, { apiClassImport: function (Component, props) {
        var newProps = __assign({}, props, { imports: props.imports.slice() });
        return react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Component, __assign({}, newProps)));
    } });
//# sourceMappingURL=custom-plugins.js.map