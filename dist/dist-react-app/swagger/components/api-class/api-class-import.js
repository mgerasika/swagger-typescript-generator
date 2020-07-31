"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.ApiClassImportAdapter = function (props) {
    var responseTypes = props.swaggerClass.methods.map(function (method) {
        return method.responseType && props.swaggerClass.utils.isModelByTypeName(method.responseType) ? method.responseType : undefined;
    });
    var parameterTypes = [];
    props.swaggerClass.methods.forEach(function (method) {
        method.parameters.forEach(function (parameter) {
            if (parameter.type && props.swaggerClass.utils.isModelByTypeName(parameter.type)) {
                parameterTypes.push(parameter.type);
            }
        });
    });
    var unique = responseTypes.concat(parameterTypes).reduce(function (it, key) {
        if (key) {
            it[key] = key;
        }
        return it;
    }, {});
    var imports = [
        'import {AxiosPromise} from \'axios\'',
        'import {IRequestService, requestService} from \'swagger-typescript-generator\''
    ];
    var result = Object.keys(unique).filter(function (filter) { return !!filter; }).join(',');
    if (result.length) {
        imports.push("import {" + result + "} from '" + props.swaggerClass.parent.config.modelImportPath + "'");
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, props.swaggerClass.plugin.apiClassImport(exports.ApiClassImportComponent, {
        swaggerClass: props.swaggerClass,
        imports: imports
    })));
};
exports.ApiClassImportComponent = function (props) {
    var result = props.imports.map(function (val) {
        return (react_1.default.createElement("div", { key: val },
            val,
            ";",
            '\n'));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        result,
        '\n'));
};
//# sourceMappingURL=api-class-import.js.map