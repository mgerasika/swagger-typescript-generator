"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const api_model_definitions_1 = require("./api-model-definitions");
const api_classes_1 = require("./api-classes");
const swagger_doc_model_1 = require("../swagger/model/swagger-doc-model");
const custom_utils_1 = require("./custom-utils");
const axios = require('axios');
exports.SwaggerRootComponent = (props) => {
    const swaggerUrl = 'https://petstore.swagger.io/v2/swagger.json';
    const [url, setUrl] = react_1.useState(swaggerUrl);
    const [root, setRoot] = react_1.useState();
    const loadSwagger = () => {
        axios.get(url)
            .then((response) => {
            const config = {
                source: response.data,
                modelImportPath: '../api-model',
                plugin: props.plugin,
                createCustomUtilsFactory: custom_utils_1.createCustomUtilsFactory
            };
            setRoot(new swagger_doc_model_1.SwaggerDocModel(config));
        })
            .catch((error) => {
            console.log('load swagger error ' + error);
        });
    };
    const onExploreClick = () => {
        loadSwagger();
    };
    react_1.useEffect(() => {
        if (!root) {
            loadSwagger();
        }
    });
    const renderSwagger = () => {
        return root && root.definitions ? (<>
                <div className={'d-flex w-100'}>
                    <div className={'col-4'}>
                        <h5>Swagger</h5>
                    </div>
                    <div className={'col-4'}>
                        <h5>Transformed</h5>
                    </div>

                    <div className={'col-4'}>
                        <h5>Typescript</h5>
                    </div>
                </div>

                <hr />
                <api_classes_1.ApiClassesComponent classes={root.classes}/>

                <hr />
                <api_model_definitions_1.ApiModelDefinitionsComponent definitions={root.definitions}/>
            </>) : null;
    };
    return (<div className={'p-2'}>
            <div className={'d-flex px-3 pt-1'}>
                <h5>Url&nbsp;to&nbsp;swagger.json:&nbsp;</h5>
                <input type={'text'} className={'w-100'} value={url} onChange={(ev) => setUrl(ev.target.value)}/>
                <button onClick={onExploreClick}>explore</button>
            </div>
            <hr />

            {renderSwagger()}
        </div>);
};
//# sourceMappingURL=swagger-root.jsx.map