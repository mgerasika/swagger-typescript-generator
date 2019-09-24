"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ApiMethodBodyComponent = (props) => {
    const getHttpBodyArguments = () => {
        const bodyParameters = props.swaggerMethod.parameters
            .filter((parameter) => parameter.isBodyParameter)
            .map((parameter) => {
            return parameter.name;
        });
        return bodyParameters.join(',');
    };
    const getMethodUrl = () => {
        const swaggerClass = props.swaggerMethod.parent;
        return swaggerClass.url.replace(/{/g, '${');
    };
    const getParams = () => {
        const postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? `[url,${postArguments}]` : `[url]`;
    };
    return (<>
        {'\t\t'}const url = `{getMethodUrl()}`;{'\n'}
        {'\t\t'}const params = {getParams()};{'\n'}
        {'\t\t'}return this._requestService.{props.swaggerMethod.httpMethod}.apply(this._requestService,params);{'\n'}
    </>);
};
//# sourceMappingURL=api-method-body.jsx.map