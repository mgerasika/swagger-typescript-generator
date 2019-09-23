"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const default_plugin_1 = require("../swagger/common/default-plugin");
exports.customPlugins = Object.assign(Object.assign({}, default_plugin_1.defaultPlugin), { apiClassImport: (Component, props) => {
        const newProps = Object.assign(Object.assign({}, props), { imports: [...props.imports] });
        return <>
            <Component {...newProps}/>
        </>;
    } });
//# sourceMappingURL=custom-plugins.jsx.map