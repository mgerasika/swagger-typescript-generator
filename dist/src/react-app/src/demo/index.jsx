"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const custom_plugins_1 = require("./custom-plugins");
const _1 = require(".");
__export(require("./custom-plugins"));
__export(require("../demo/api-classes"));
__export(require("../demo/api-model-definitions"));
__export(require("../demo/diff"));
__export(require("./swagger-root"));
exports.SwaggerDemoComponent = () => {
    return (<div>
            <_1.SwaggerRootComponent plugin={custom_plugins_1.customPlugins}/>
        </div>);
};
//# sourceMappingURL=index.jsx.map