"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
exports.ApiUrlsComponent = (props) => {
    const urls = [];
    props.classes.forEach((def) => {
        def.methods.forEach((method) => {
            urls.push(method.getUrlInfo());
        });
    });
    const result = urls.map((def, index) => {
        const isLast = index === urls.length - 1;
        const renderComa = !isLast && ',';
        return (<span key={def.name}>{'\t'}{def.name}:'{def.url}'{renderComa}{'\n'}</span>);
    });
    return (<>
            {utils_1.Warning}
            export const API_URLS = {'{\n'} {result}
            {'};\n'}
        </>);
};
//# sourceMappingURL=index.jsx.map