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
        return bodyParameters.join(',');
    };
    var getMethodUrl = function () {
        var swaggerClass = props.swaggerMethod.parent;
        return swaggerClass.url.replace(/{/g, '${');
    };
    var getParams = function () {
        var postArguments = getHttpBodyArguments();
        return postArguments && postArguments.length ? "[url," + postArguments + "]" : "[url]";
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        '\t\t',
        "const url = `",
        getMethodUrl(),
        "`;",
        '\n',
        '\t\t',
        "const params = ",
        getParams(),
        ";",
        '\n',
        '\t\t',
        "return this.requestService.",
        props.swaggerMethod.httpMethod,
        ".apply(this.requestService,params);",
        '\n'));
};
//# sourceMappingURL=api-method-body.js.map