"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_generator_1 = require("../../web/src/swagger/common/swagger-generator");
const config = {
    apiFilesOutDir: 'gen/api',
    modelFilesOutDir: 'gen/model',
    plugins: [],
    swaggerInputJson: ''
};
const swaggerGenerator = new swagger_generator_1.SwaggerGenerator(config);
swaggerGenerator.generate();
//# sourceMappingURL=test.js.map