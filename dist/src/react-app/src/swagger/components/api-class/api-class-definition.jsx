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
const default_plugin_1 = require("../../common/default-plugin");
const utils_1 = require("../../utils");
exports.ApiClassDefinitionComponent = (props) => {
    // const pluginContext = useContext(SwaggerContext);
    // const plugin = pluginContext.plugin;
    const { swaggerClass } = props;
    return (<>
            {default_plugin_1.defaultPlugin.apiClassImport({ swaggerClass })}

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