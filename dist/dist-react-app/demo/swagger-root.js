"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var api_model_definitions_1 = require("./api-model-definitions");
var api_classes_1 = require("./api-classes");
var swagger_doc_model_1 = require("../swagger/model/swagger-doc-model");
var custom_utils_1 = require("./custom-utils");
var axios = require('axios');
exports.SwaggerRootComponent = function (props) {
    var swaggerUrl = 'https://petstore.swagger.io/v2/swagger.json';
    var _a = react_1.useState(swaggerUrl), url = _a[0], setUrl = _a[1];
    var _b = react_1.useState(), root = _b[0], setRoot = _b[1];
    var loadSwagger = function () {
        axios.get(url)
            .then(function (response) {
            var config = {
                source: response.data,
                modelImportPath: '../api-model',
                plugin: props.plugin,
                createCustomUtilsFactory: custom_utils_1.createCustomUtilsFactory
            };
            setRoot(new swagger_doc_model_1.SwaggerDocModel(config));
        })
            .catch(function (error) {
            console.error('load swagger error ' + error);
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
            react_1.default.createElement(api_classes_1.ApiClassesComponent, { classes: root.classes }),
            react_1.default.createElement("hr", null),
            react_1.default.createElement(api_model_definitions_1.ApiModelDefinitionsComponent, { definitions: root.definitions }))) : null;
    };
    return (react_1.default.createElement("div", { className: 'p-2' },
        react_1.default.createElement("div", { className: 'd-flex px-3 pt-1' },
            react_1.default.createElement("h5", null, "Url\u00A0to\u00A0swagger.json:\u00A0"),
            react_1.default.createElement("input", { type: 'text', className: 'w-100', value: url, onChange: function (ev) { return setUrl(ev.target.value); } }),
            react_1.default.createElement("button", { onClick: onExploreClick }, "explore")),
        react_1.default.createElement("hr", null),
        renderSwagger()));
};
//# sourceMappingURL=swagger-root.js.map