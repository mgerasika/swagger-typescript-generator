"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ApiMethodArgumentsComponent = (props) => {
    const result = props.swaggerMethod.parameters.map((parameter, index) => {
        const isLastArgument = index !== props.swaggerMethod.parameters.length - 1;
        const separator = isLastArgument ? ',' : '';
        return (<span key={parameter.name}>{parameter.name}:{parameter.type}{separator}</span>);
    });
    return (<>{result}</>);
};
//# sourceMappingURL=api-method-arguments.jsx.map