"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var diff_1 = __importDefault(require("./diff"));
var model_definition_1 = require("../ts-generator/definitions/model-definition");
var Definitions = function (props) {
    var renderCodegen = function (def) {
        return (<model_definition_1.ModelDefinition definition={def}></model_definition_1.ModelDefinition>);
    };
    var result = props.definitions.map(function (def) {
        return <diff_1.default key={def.name} obj1={def.source} obj2={def} obj3={renderCodegen(def)}/>;
    });
    return (<>
            <h6 className={'pl-3'}>Definitions:</h6>
            {result}
        </>);
};
exports.default = Definitions;
//# sourceMappingURL=definitions.jsx.map