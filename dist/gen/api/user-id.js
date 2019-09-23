"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_typescript_generator_1 = require("swagger-typescript-generator");
var ApiUserIdApi = /** @class */ (function () {
    function ApiUserIdApi(service) {
        this._requestService = service;
    }
    ApiUserIdApi.prototype.user_Get = function (id) {
        var url = "/api/User/" + id;
        var params = [url];
        return this._requestService.get.apply(this._requestService, params);
    };
    ApiUserIdApi.prototype.user_Put = function (id, value) {
        var url = "/api/User/" + id;
        var params = [url, value];
        return this._requestService.put.apply(this._requestService, params);
    };
    ApiUserIdApi.prototype.user_Delete = function (id) {
        var url = "/api/User/" + id;
        var params = [url];
        return this._requestService.delete.apply(this._requestService, params);
    };
    return ApiUserIdApi;
}());
exports.apiUserIdApi = new ApiUserIdApi(swagger_typescript_generator_1.requestService);
//# sourceMappingURL=user-id.js.map