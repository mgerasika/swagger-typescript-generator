"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
exports.ModelDefinitionComponent = (props) => {
    const fields = props.definition.properties.map((parameter) => {
        const type = parameter.isArray ? `${parameter.type}[]` : parameter.type;
        return (<span key={parameter.name}>{'\t'}{parameter.name}:{type}{'\n'}</span>);
    });
    const types = props.definition.properties.map((parameter) => {
        return utils_1.isModelByTypeName(parameter.type) ? parameter.type : undefined;
    }).filter((filter) => !!filter && filter != props.definition.name).join(',');
    const imports = [];
    if (types.length) {
        imports.push(`import {${types}} from \'${props.definition.parent.config.modelImportPath}\'`);
    }
    const result = imports.map((val) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });
    return (<>
            {utils_1.Warning}
            {result}
            export interface {props.definition.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>);
};
//# sourceMappingURL=model-definition.jsx.map