"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.MethodReturnType = function (props) {
    if (props.swaggerMethod.responseIsVoid) {
        return (<>{'AxiosPromise<void>'}</>);
    }
    return (<>{"AxiosPromise<" + props.swaggerMethod.responseType + ">"}</>);
};
//# sourceMappingURL=method-return-type.jsx.map