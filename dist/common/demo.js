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
var axios_1 = __importDefault(require("axios"));
var swagger_generator_1 = require("./swagger-generator");
var path = __importStar(require("path"));
var common_1 = require("../../dist/dist-react-app/swagger/common");
var url = 'https://petstore.swagger.io/v2/swagger.json';
axios_1.default.get(url)
    .then(function (response) {
    generate(response.data);
})
    .catch(function (error) {
    console.log('demo:' + error);
});
var generate = function (json) {
    var parentDir = path.resolve(__dirname, '..');
    console.log('parentDir=' + parentDir);
    var config = {
        apiFilesOutDir: parentDir + "/../gen/api",
        modelFilesOutDir: parentDir + "/../gen/api-model",
        urlFileOutDir: parentDir + "/../gen/api-model-url",
        modelImportPath: '../api-model',
        plugin: common_1.defaultPlugin,
        swaggerInputJson: json,
        createSwaggerUtilsFactory: function (baseUtils) { return baseUtils; }
    };
    var swaggerGenerator = new swagger_generator_1.SwaggerGenerator(config);
    try {
        swaggerGenerator.generate();
    }
    catch (e) {
        console.log('generator error ' + e);
    }
};
//# sourceMappingURL=demo.js.map