"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const api_method_return_type_1 = require("./api-method-return-type");
const api_method_arguments_1 = require("./api-method-arguments");
const api_method_body_1 = require("./api-method-body");
exports.ApiMethodDefinitionComponent = (props) => {
    return (<>
        {'\t'}public {props.swaggerMethod.name}(<api_method_arguments_1.ApiMethodArgumentsComponent swaggerMethod={props.swaggerMethod}/>):<api_method_return_type_1.ApiMethodReturnTypeComponent swaggerMethod={props.swaggerMethod}/>{'{\n'}
       <api_method_body_1.ApiMethodBodyComponent swaggerMethod={props.swaggerMethod}/>
        {'\t}\n'}
    </>);
};
//# sourceMappingURL=api-method-definition.jsx.map