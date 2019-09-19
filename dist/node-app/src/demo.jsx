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
var React = __importStar(require("react"));
var server_1 = require("react-dom/server");
var hi_1 = require("./hi");
var axios_1 = __importDefault(require("axios"));
var path = __importStar(require("path"));
var swagger_generator_1 = require("./swagger-generator");
var url = "http://192.168.235.1:84/swagger/docs/v1";
axios_1.default.get(url)
    .then(function (response) {
    generate(response.data);
})
    .catch(function (error) {
    console.log(error);
});
var generate = function (json) {
    var parentDir = path.resolve(__dirname, '..');
    console.log('parentDir' + parentDir);
    var config = {
        apiFilesOutDir: parentDir + "/gen/api",
        modelFilesOutDir: parentDir + "/gen/model",
        plugins: [],
        swaggerInputJson: json
    };
    var swaggerGenerator = new swagger_generator_1.SwaggerGenerator(config);
    swaggerGenerator.generate();
};
var body = server_1.renderToString(React.createElement(hi_1.HiComponent));
console.log(body);
//# sourceMappingURL=demo.jsx.map