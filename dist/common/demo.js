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
var components_1 = require("../react-app/dist/swagger/components");
var url = 'http://192.168.235.1:84/swagger/docs/v1';
axios_1.default.get(url)
    .then(function (response) {
    generate(response.data);
})
    .catch(function (error) {
    console.log(error);
});
var generate = function (json) {
    var parentDir = path.resolve(__dirname, '..');
    console.log('parentDir=' + parentDir);
    var config = {
        apiFilesOutDir: parentDir + "/gen/api",
        modelFilesOutDir: parentDir + "/gen/model",
        plugins: components_1.defaultPlugin,
        swaggerInputJson: json
    };
    var swaggerGenerator = new swagger_generator_1.SwaggerGenerator(config);
    swaggerGenerator.generate();
};
//# sourceMappingURL=demo.js.map