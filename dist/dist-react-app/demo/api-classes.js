"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var diff_1 = require("./diff");
var api_class_1 = require("../swagger/components/api-class");
var api_all_class_export_1 = require("../swagger/components/api-class/api-all-class-export");
var urls_1 = require("../swagger/components/urls");
exports.ApiClassesComponent = function (props) {
    var renderCodegen = function (swaggerClass) {
        return (react_1.default.createElement(api_class_1.ApiClassDefinitionComponent, { swaggerClass: swaggerClass }));
    };
    var result = props.classes.map(function (def) {
        return react_1.default.createElement(diff_1.DiffComponent, { key: def.fileName, obj1: def.source, obj2: def, obj3: renderCodegen(def) });
    });
    var renderAllClassesExport = react_1.default.createElement(api_all_class_export_1.ApiAllClassesExportComponent, { classes: props.classes });
    var renderAllUrlsExport = react_1.default.createElement(urls_1.ApiUrlsComponent, { classes: props.classes });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h5", { className: 'pl-3' }, "Api examble for index.ts:"),
        react_1.default.createElement(diff_1.DiffComponent, { key: 'index.ts', obj1: {}, obj2: {}, obj3: renderAllClassesExport }),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("h5", { className: 'pl-3' }, "Urls for all apis:"),
        react_1.default.createElement(diff_1.DiffComponent, { key: 'index.ts', obj1: {}, obj2: {}, obj3: renderAllUrlsExport }),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("h5", { className: 'pl-3' }, "Api:"),
        result));
};
//# sourceMappingURL=api-classes.js.map