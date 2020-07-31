"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
exports.ApiAllClassesExportComponent = (props) => {
    const exports = props.classes.map((def) => {
        const name = def.fileName.split('.');
        return (<span key={def.name}>export * from './{name[0]}'{'\n'}</span>);
    });
    return (<>
            {utils_1.Warning}
            {exports}
        </>);
};
//# sourceMappingURL=api-all-class-export.jsx.map