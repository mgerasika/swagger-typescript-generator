"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ApiMethodReturnTypeComponent = (props) => {
    if (props.swaggerMethod.responseIsVoid) {
        return (<>{'AxiosPromise<void>'}</>);
    }
    const arraySymbol = props.swaggerMethod.responseIsArray ? '[]' : '';
    return (<>{`AxiosPromise<${props.swaggerMethod.responseType}${arraySymbol}>`}</>);
};
//# sourceMappingURL=api-method-return-type.jsx.map