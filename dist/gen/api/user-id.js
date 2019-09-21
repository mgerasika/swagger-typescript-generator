"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("swagger-typescript-generator/dist");
var ApiUserId = /** @class */ (function () {
    function ApiUserId(requestService) {
        this.requestService = requestService;
    }
    ApiUserId.prototype.user_Get = function (id) {
        var url = "/api/User/" + id;
        var params = [url];
        return this.requestService.get.apply(this.requestService, params);
    };
    ApiUserId.prototype.user_Put = function (id, value) {
        var url = "/api/User/" + id;
        var params = [url, value];
        return this.requestService.put.apply(this.requestService, params);
    };
    ApiUserId.prototype.user_Delete = function (id) {
        var url = "/api/User/" + id;
        var params = [url];
        return this.requestService.delete.apply(this.requestService, params);
    };
    return ApiUserId;
}());
exports.apiUserId = new ApiUserId(dist_1.requestService);
//# sourceMappingURL=user-id.js.map