"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_typescript_generator_1 = require("swagger-typescript-generator");
class ApiUserIdApi {
    constructor(service) {
        this._requestService = service;
    }
    user_Get(id) {
        const url = `/api/User/${id}`;
        const params = [url];
        return this._requestService.get.apply(this._requestService, params);
    }
    user_Put(id, value) {
        const url = `/api/User/${id}`;
        const params = [url, value];
        return this._requestService.put.apply(this._requestService, params);
    }
    user_Delete(id) {
        const url = `/api/User/${id}`;
        const params = [url];
        return this._requestService.delete.apply(this._requestService, params);
    }
}
exports.apiUserIdApi = new ApiUserIdApi(swagger_typescript_generator_1.requestService);
//# sourceMappingURL=user-id.js.map