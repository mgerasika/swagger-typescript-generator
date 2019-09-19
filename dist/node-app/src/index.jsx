"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var server_1 = require("react-dom/server");
var hi_1 = require("./hi");
var ReactJSDOM = require('react-jsdom');
__export(require("./log-service"));
__export(require("./swagger-generator"));
__export(require("./hi"));
// const url = "http://192.168.1.72:84/swagger/docs/v1";
//
// axios.get(url)
//     .then(response => {
//         generate(response.data);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//
// const generate = (json: any) => {
//     const parentDir = path.resolve(__dirname,'..');
//     console.log('parentDir' + parentDir)
//
//     const config: ISwaggerConfig = {
//         apiFilesOutDir: `${parentDir}/gen/api`,
//         modelFilesOutDir: `${parentDir}/gen/model`,
//         plugins: [],
//         swaggerInputJson: json
//     }
//     const swaggerGenerator = new SwaggerGenerator(config);
//     swaggerGenerator.generate();
// }
var body = server_1.renderToString(React.createElement(hi_1.HiComponent));
console.log(body);
//# sourceMappingURL=index.jsx.map