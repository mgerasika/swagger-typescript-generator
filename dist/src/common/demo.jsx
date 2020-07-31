"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const swagger_generator_1 = require("./swagger-generator");
const path = __importStar(require("path"));
const common_1 = require("../../dist/dist-react-app/swagger/common");
const url = 'https://petstore.swagger.io/v2/swagger.json';
axios_1.default.get(url)
    .then(response => {
    generate(response.data);
})
    .catch(error => {
    console.log('demo:' + error);
});
const generate = (json) => {
    const parentDir = path.resolve(__dirname, '..');
    console.log('parentDir=' + parentDir);
    const config = {
        apiFilesOutDir: `${parentDir}/../gen/api`,
        modelFilesOutDir: `${parentDir}/../gen/api-model`,
        urlFileOutDir: `${parentDir}/../gen/api-model-url`,
        modelImportPath: '../api-model',
        plugin: common_1.defaultPlugin,
        swaggerInputJson: json,
        createSwaggerUtilsFactory: (baseUtils) => baseUtils
    };
    const swaggerGenerator = new swagger_generator_1.SwaggerGenerator(config);
    try {
        swaggerGenerator.generate();
    }
    catch (e) {
        console.log('generator error ' + e);
    }
};
//# sourceMappingURL=demo.jsx.map