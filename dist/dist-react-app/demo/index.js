"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var custom_plugins_1 = require("./custom-plugins");
var _1 = require(".");
var custom_utils_1 = require("./custom-utils");
__export(require("./custom-plugins"));
__export(require("../demo/api-classes"));
__export(require("../demo/api-model-definitions"));
__export(require("../demo/diff"));
__export(require("./swagger-root"));
__export(require("./custom-utils"));
exports.SwaggerDemoComponent = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(_1.SwaggerRootComponent, { plugin: custom_plugins_1.customPlugins, createCustomUtilsFactory: custom_utils_1.createCustomUtilsFactory })));
};
//# sourceMappingURL=index.js.map