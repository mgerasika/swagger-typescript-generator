"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var diff_1 = require("./diff");
var model_definition_1 = require("../swagger/components/definitions/model-definition");
var definitions_1 = require("../swagger/components/definitions");
exports.ApiModelDefinitionsComponent = function (props) {
    var renderCodegen = function (def) {
        return (react_1.default.createElement(model_definition_1.ModelDefinitionComponent, { definition: def }));
    };
    var result = props.definitions.map(function (def) {
        return react_1.default.createElement(diff_1.DiffComponent, { key: def.name, obj1: def.source, obj2: def, obj3: renderCodegen(def) });
    });
    var renderAllModelsExport = react_1.default.createElement(definitions_1.AllModelsExportComponent, { definitions: props.definitions });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h5", { className: 'pl-3' }, "Definitions examble for index.ts:"),
        react_1.default.createElement(diff_1.DiffComponent, { key: 'index.ts', obj1: {}, obj2: {}, obj3: renderAllModelsExport }),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("h5", { className: 'pl-3' }, "Definitions:"),
        result));
};
//# sourceMappingURL=api-model-definitions.js.map