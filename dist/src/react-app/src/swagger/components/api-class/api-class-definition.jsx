"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const api_class_fields_1 = require("./api-class-fields");
const api_class_constructor_1 = require("./api-class-constructor");
const api_class_methods_1 = require("./api-class-methods");
const api_class_name_1 = require("./api-class-name");
const utils_1 = require("../../utils");
const api_class_import_1 = require("./api-class-import");
exports.ApiClassDefinitionComponent = (props) => {
    const { swaggerClass } = props;
    return (<>
            {utils_1.Warning}
            <api_class_import_1.ApiClassImportAdapter swaggerClass={props.swaggerClass}/>

            <api_class_name_1.ApiClassNameComponent swaggerClass={props.swaggerClass}/>
            {'{\n'}
            <api_class_fields_1.ApiClassFieldsComponent swaggerClass={props.swaggerClass}/>
            <api_class_constructor_1.ApiClassConstructorComponent swaggerClass={props.swaggerClass}/>
            <api_class_methods_1.ApiClassMethodsComponent swaggerClass={props.swaggerClass}/>
            {'}\n'}
            <span>export const {utils_1.lowerlize(props.swaggerClass.name)} = new {props.swaggerClass.name}{'('}requestService{');\n'}</span>
        </>);
};
//# sourceMappingURL=api-class-definition.jsx.map