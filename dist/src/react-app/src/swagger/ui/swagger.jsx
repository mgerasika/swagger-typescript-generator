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
var definitions_1 = require("./definitions");
var api_classes_1 = require("./api-classes");
var swagger_doc_1 = require("../model/swagger-doc");
var swagger_context_1 = require("../common/swagger-context");
var axios = require('axios');
exports.Swagger = function (props) {
    var _a = react_1.useState("http://192.168.235.1:84/swagger/docs/v1"), url = _a[0], setUrl = _a[1];
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
                <api_classes_1.ApiClasses classes={root.classes}/>

                <hr />
                <definitions_1.Definitions definitions={root.definitions}/>
            </>) : null;
    };
    var getContextValue = function () {
        return {
            plugins: props.plugins
        };
    };
    return (<div className={'p-2'}>
            <div className={'d-flex px-3 pt-1'}>
                <h5>Url&nbsp;to&nbsp;swagger.json:&nbsp;</h5>
                <input type={'text'} className={'w-100'} value={url} onChange={function (ev) { return setUrl(ev.target.value); }}/>
                <button onClick={onExploreClick}>explore</button>
            </div>
            <hr />

            <swagger_context_1.SwaggerContext.Provider value={getContextValue()}>
                {renderSwagger()}
            </swagger_context_1.SwaggerContext.Provider>
        </div>);
};
//# sourceMappingURL=swagger.jsx.map