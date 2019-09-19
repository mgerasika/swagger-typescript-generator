"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.css");
var swagger_demo_1 = __importDefault(require("./demo/swagger-demo"));
var App = function () {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(swagger_demo_1.default, null)));
};
exports.default = App;
//# sourceMappingURL=App.js.map