"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils");
exports.ApiClassImportAdapter = (props) => {
    const responseTypes = props.swaggerClass.methods.map((method) => {
        return method.responseType && utils_1.isModelByTypeName(method.responseType) ? method.responseType : undefined;
    });
    let parameterTypes = [];
    props.swaggerClass.methods.forEach((method) => {
        method.parameters.forEach((parameter) => {
            if (parameter.type && utils_1.isModelByTypeName(parameter.type)) {
                parameterTypes.push(parameter.type);
            }
        });
    });
    const unique = [...responseTypes, ...parameterTypes].reduce((it, key) => {
        if (key) {
            it[key] = key;
        }
        return it;
    }, {});
    const imports = [
        'import {AxiosPromise} from \'axios\'',
        'import {IRequestService, requestService} from \'swagger-typescript-generator\''
    ];
    const result = Object.keys(unique).filter((filter) => !!filter).join(',');
    if (result.length) {
        imports.push(`import {${result}} from \'${props.swaggerClass.parent.config.modelImportPath}\'`);
    }
    return (<>
            {props.swaggerClass.plugin.apiClassImport(exports.ApiClassImportComponent, {
        swaggerClass: props.swaggerClass,
        imports
    })}
        </>);
};
exports.ApiClassImportComponent = (props) => {
    const result = props.imports.map((val) => {
        return (<div key={val}>{val};{'\n'}</div>);
    });
    return (<>
            {result}
            {'\n'}
        </>);
};
//# sourceMappingURL=api-class-import.jsx.map