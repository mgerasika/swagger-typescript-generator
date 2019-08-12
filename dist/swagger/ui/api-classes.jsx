"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var diff_1 = __importDefault(require("./diff"));
var class_definition_1 = require("../ts-generator/class/class-definition");
var ApiClasses = function (props) {
    var renderCodegen = function (swaggerClass) {
        return (<class_definition_1.ClassDefinition swaggerClass={swaggerClass}></class_definition_1.ClassDefinition>);
    };
    var result = props.classes.map(function (def) {
        return <diff_1.default key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>;
    });
    return (<>
            <h6 className={'pl-3'}>Api:</h6>
            {result}
        </>);
};
exports.default = ApiClasses;
//# sourceMappingURL=api-classes.jsx.map