"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_typescript_generator_1 = require("swagger-typescript-generator");
var ApiUserApi = /** @class */ (function () {
    function ApiUserApi(service) {
        this._requestService = service;
    }
    ApiUserApi.prototype.user_Get = function () {
        var url = "/api/User";
        var params = [url];
        return this._requestService.get.apply(this._requestService, params);
    };
    ApiUserApi.prototype.user_Post = function (value) {
        var url = "/api/User";
        var params = [url, value];
        return this._requestService.post.apply(this._requestService, params);
    };
    return ApiUserApi;
}());
exports.apiUserApi = new ApiUserApi(swagger_typescript_generator_1.requestService);
//# sourceMappingURL=user.js.map