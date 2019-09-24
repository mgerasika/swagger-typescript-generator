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
const common_1 = require("../react-app/dist/swagger/common");
const url = 'http://192.168.235.1:84/swagger/docs/v1';
axios_1.default.get(url)
    .then(response => {
    generate(response.data);
})
    .catch(error => {
    console.log('axios ' + error);
});
const generate = (json) => {
    const parentDir = path.resolve(__dirname, '..');
    console.log('parentDir=' + parentDir);
    const config = {
        apiFilesOutDir: `${parentDir}/gen/api`,
        modelFilesOutDir: `${parentDir}/gen/model`,
        modelImportPath: '../api-model',
        plugin: common_1.defaultPlugin,
        swaggerInputJson: json
    };
    const swaggerGenerator = new swagger_generator_1.SwaggerGenerator(config);
    swaggerGenerator.generate();
};
//# sourceMappingURL=demo.jsx.map