"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.css");
var swagger_demo_1 = require("./demo/swagger-demo");
exports.App = function () {
    return (<div>
            <swagger_demo_1.SwaggerDemo />
        </div>);
};
//# sourceMappingURL=App.jsx.map