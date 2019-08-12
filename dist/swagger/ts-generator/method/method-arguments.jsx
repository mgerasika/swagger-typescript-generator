"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.MethodArguments = function (props) {
    var result = props.swaggerMethod.parameters.map(function (parameter, index) {
        var isLastArgument = index !== props.swaggerMethod.parameters.length - 1;
        var separator = isLastArgument ? ',' : '';
        return (<span key={parameter.name}>{parameter.name}:{parameter.type}{separator}</span>);
    });
    return (<>{result}</>);
};
//# sourceMappingURL=method-arguments.jsx.map