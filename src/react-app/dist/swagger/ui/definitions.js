"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var diff_1 = require("./diff");
var model_definition_1 = require("../ts-generator/definitions/model-definition");
exports.Definitions = function (props) {
    var renderCodegen = function (def) {
        return (react_1.default.createElement(model_definition_1.ModelDefinition, { definition: def }));
    };
    var result = props.definitions.map(function (def) {
        return react_1.default.createElement(diff_1.Diff, { key: def.name, obj1: def.source, obj2: def, obj3: renderCodegen(def) });
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h6", { className: 'pl-3' }, "Definitions:"),
        result));
};
//# sourceMappingURL=definitions.js.map