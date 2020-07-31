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
        if (props.swaggerMethod.isFileUpload) {
            bodyParameters.push('formData');
        }
        return bodyParameters.join(',');
    };
    const getFormDataScript = () => {
        const formDataParameters = props.swaggerMethod.parameters
            .filter((parameter) => parameter.isFormDataParameter)
            .map((parameter) => parameter);
        if (formDataParameters.length) {
            return (<>
                {'\t\t'}const formData = new FormData();{'\n'}
                {formDataParameters.map(param => <react_1.default.Fragment key={param.name}>{'\t\t'}formData.append('{param.name}',{param.name}){'\n'}</react_1.default.Fragment>)}
            </>);
        }
        return '';
    };
    const getMethodUrl = () => {
        const swaggerClass = props.swaggerMethod.parent;
        return swaggerClass.url.replace(/{/g, '${');
    };
    const getParams = () => {
        const postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? `[url,${postArguments}]` : `[url]`;
    };
    const methodName = props.swaggerMethod.isFileUpload ? 'upload' : props.swaggerMethod.httpMethod;
    return (<>
        {'\t\t'}const url = `{getMethodUrl()}`;{'\n'}
        {getFormDataScript()}
        {'\t\t'}const params = {getParams()};{'\n'}
        {'\t\t'}return this._requestService.{methodName}.apply(this._requestService,params);{'\n'}
    </>);
};
//# sourceMappingURL=api-method-body.jsx.map