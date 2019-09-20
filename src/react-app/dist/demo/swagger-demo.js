"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var swagger_1 = require("../swagger/ui/swagger");
var custom_plugins_1 = require("./custom-plugins");
exports.SwaggerDemo = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(swagger_1.Swagger, { plugins: custom_plugins_1.customPlugins })));
};
//# sourceMappingURL=swagger-demo.js.map