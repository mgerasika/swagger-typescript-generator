"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_typescript_generator_1 = require("swagger-typescript-generator");
class ApiUserApi {
    constructor(service) {
        this._requestService = service;
    }
    user_Get() {
        const url = `/api/User`;
        const params = [url];
        return this._requestService.get.apply(this._requestService, params);
    }
    user_Post(value) {
        const url = `/api/User`;
        const params = [url, value];
        return this._requestService.post.apply(this._requestService, params);
    }
}
exports.apiUserApi = new ApiUserApi(swagger_typescript_generator_1.requestService);
//# sourceMappingURL=user.js.map