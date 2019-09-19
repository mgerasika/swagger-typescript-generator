"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var definitions_1 = __importDefault(require("./definitions"));
var api_classes_1 = __importDefault(require("./api-classes"));
var swagger_doc_1 = require("../model/swagger-doc");
var swagger_context_1 = require("../common/swagger-context");
var axios = require('axios');
var Swagger = function (props) {
    var _a = react_1.useState("http://192.168.1.72:84/swagger/docs/v1"), url = _a[0], setUrl = _a[1];
    var _b = react_1.useState(), root = _b[0], setRoot = _b[1];
    var loadSwagger = function () {
        axios.get(url, { headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000/' } })
            .then(function (response) {
            setRoot(new swagger_doc_1.SwaggerDoc(response.data));
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    var onExploreClick = function () {
        loadSwagger();
    };
    react_1.useEffect(function () {
        if (!root) {
            loadSwagger();
        }
    });
    var renderSwagger = function () {
        return root && root.definitions ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: 'd-flex w-100' },
                react_1.default.createElement("div", { className: 'col-4' },
                    react_1.default.createElement("h5", null, "Swagger")),
                react_1.default.createElement("div", { className: 'col-4' },
                    react_1.default.createElement("h5", null, "Transformed")),
                react_1.default.createElement("div", { className: 'col-4' },
                    react_1.default.createElement("h5", null, "Typescript"))),
            react_1.default.createElement("hr", null),
            react_1.default.createElement(api_classes_1.default, { classes: root.classes }),
            react_1.default.createElement("hr", null),
            react_1.default.createElement(definitions_1.default, { definitions: root.definitions }))) : null;
    };
    var getContextValue = function () {
        return {
            plugins: props.plugins
        };
    };
    return (react_1.default.createElement("div", { className: 'p-2' },
        react_1.default.createElement("div", { className: 'd-flex px-3 pt-1' },
            react_1.default.createElement("h5", null, "Url\u00A0to\u00A0swagger.json:\u00A0"),
            react_1.default.createElement("input", { type: 'text', className: 'w-100', value: url, onChange: function (ev) { return setUrl(ev.target.value); } }),
            react_1.default.createElement("button", { onClick: onExploreClick }, "explore")),
        react_1.default.createElement("hr", null),
        react_1.default.createElement(swagger_context_1.SwaggerContext.Provider, { value: getContextValue() }, renderSwagger())));
};
exports.default = Swagger;
//# sourceMappingURL=swagger.js.map