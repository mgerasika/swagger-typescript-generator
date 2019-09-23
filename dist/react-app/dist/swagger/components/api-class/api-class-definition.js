"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var api_class_fields_1 = require("./api-class-fields");
var api_class_constructor_1 = require("./api-class-constructor");
var api_class_methods_1 = require("./api-class-methods");
var api_class_name_1 = require("./api-class-name");
var utils_1 = require("../../utils");
var api_class_import_1 = require("./api-class-import");
exports.ApiClassDefinitionComponent = function (props) {
    // const pluginContext = useContext(SwaggerContext);
    // const plugin = pluginContext.plugin;
    var swaggerClass = props.swaggerClass;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(api_class_import_1.ApiClassImportAdapter, { swaggerClass: props.swaggerClass }),
        react_1.default.createElement(api_class_name_1.ApiClassNameComponent, { swaggerClass: props.swaggerClass }),
        '{\n',
        react_1.default.createElement(api_class_fields_1.ApiClassFieldsComponent, { swaggerClass: props.swaggerClass }),
        react_1.default.createElement(api_class_constructor_1.ApiClassConstructorComponent, { swaggerClass: props.swaggerClass }),
        react_1.default.createElement(api_class_methods_1.ApiClassMethodsComponent, { swaggerClass: props.swaggerClass }),
        '}\n',
        react_1.default.createElement("span", null,
            "export const ",
            utils_1.lowerlize(props.swaggerClass.name),
            " = new ",
            props.swaggerClass.name,
            '(',
            "requestService",
            ');\n')));
};
//# sourceMappingURL=api-class-definition.js.map