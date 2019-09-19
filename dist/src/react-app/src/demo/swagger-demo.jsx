"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var swagger_1 = require("../swagger/ui/swagger");
var custom_plugins_1 = require("./custom-plugins");
exports.SwaggerDemo = function () {
    return (<div>
            <swagger_1.Swagger plugins={custom_plugins_1.customPlugins}/>
        </div>);
};
//# sourceMappingURL=swagger-demo.jsx.map