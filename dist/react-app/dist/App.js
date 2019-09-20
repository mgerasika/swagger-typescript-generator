"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.css");
var demo_1 = require("./demo");
exports.App = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(demo_1.SwaggerDemoComponent, null)));
};
//# sourceMappingURL=App.js.map