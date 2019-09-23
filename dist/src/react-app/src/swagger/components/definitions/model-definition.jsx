"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ModelDefinitionComponent = (props) => {
    const fields = props.definition.properties.map((parameter) => {
        return (<span key={parameter.name}>{'\t'}{parameter.name}:{parameter.type}{'\n'}</span>);
    });
    return (<>
            export interface {props.definition.name}
            {'{'} {'\n'}{fields}
            {'}'}
        </>);
};
//# sourceMappingURL=model-definition.jsx.map