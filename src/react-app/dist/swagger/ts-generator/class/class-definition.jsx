"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var class_import_1 = require("./class-import");
var class_fields_1 = require("./class-fields");
var class_constructor_1 = require("./class-constructor");
var class_methods_1 = require("./class-methods");
var class_name_1 = require("./class-name");
exports.ClassDefinition = function (props) {
    return (<>
            <class_import_1.ClassImportAdapter swaggerClass={props.swaggerClass}/>
            <class_name_1.ClassName swaggerClass={props.swaggerClass}/>
            {'{\n'}
            <class_fields_1.ClassFields swaggerClass={props.swaggerClass}/>
            <class_constructor_1.ClassConstructor swaggerClass={props.swaggerClass}/>
            <class_methods_1.ClassMethods swaggerClass={props.swaggerClass}/>
            {'}'}
        </>);
};
//# sourceMappingURL=class-definition.jsx.map