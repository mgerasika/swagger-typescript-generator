"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ApiMethodBodyComponent = function (props) {
    var getHttpBodyArguments = function () {
        var bodyParameters = props.swaggerMethod.parameters
            .filter(function (parameter) { return parameter.isBodyParameter; })
            .map(function (parameter) {
            return parameter.name;
        });
        if (props.swaggerMethod.isFileUpload) {
            bodyParameters.push('formData');
        }
        return bodyParameters.join(',');
    };
    var getFormDataScript = function () {
        var formDataParameters = props.swaggerMethod.parameters
            .filter(function (parameter) { return parameter.isFormDataParameter; })
            .map(function (parameter) { return parameter; });
        if (formDataParameters.length) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                '\t\t',
                "const formData = new FormData();",
                '\n',
                formDataParameters.map(function (param) { return react_1.default.createElement(react_1.default.Fragment, null,
                    '\t\t',
                    "formData.append('",
                    param.name,
                    "',",
                    param.name,
                    ")",
                    '\n'); })));
        }
        return '';
    };
    var getMethodUrl = function () {
        var swaggerClass = props.swaggerMethod.parent;
        return swaggerClass.url.replace(/{/g, '${');
    };
    var getParams = function () {
        var postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? "[url," + postArguments + "]" : "[url]";
    };
    var methodName = props.swaggerMethod.isFileUpload ? 'upload' : props.swaggerMethod.httpMethod;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        '\t\t',
        "const url = `",
        getMethodUrl(),
        "`;",
        '\n',
        getFormDataScript(),
        '\t\t',
        "const params = ",
        getParams(),
        ";",
        '\n',
        '\t\t',
        "return this._requestService.",
        methodName,
        ".apply(this._requestService,params);",
        '\n'));
};
//# sourceMappingURL=api-method-body.js.map