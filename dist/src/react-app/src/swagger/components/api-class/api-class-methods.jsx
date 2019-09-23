"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const api_method_definition_1 = require("../api-method/api-method-definition");
exports.ApiClassMethodsComponent = (props) => {
    const methods = props.swaggerClass.methods.map((method) => {
        return (<api_method_definition_1.ApiMethodDefinitionComponent key={method.name} swaggerMethod={method}/>);
    });
    return (<>
            {methods}
        </>);
};
//# sourceMappingURL=api-class-methods.jsx.map