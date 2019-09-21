"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("swagger-typescript-generator/dist");
var ApiUser = /** @class */ (function () {
    function ApiUser(requestService) {
        this.requestService = requestService;
    }
    ApiUser.prototype.user_Get = function () {
        var url = "/api/User";
        var params = [url];
        return this.requestService.get.apply(this.requestService, params);
    };
    ApiUser.prototype.user_Post = function (value) {
        var url = "/api/User";
        var params = [url, value];
        return this.requestService.post.apply(this.requestService, params);
    };
    return ApiUser;
}());
exports.apiUser = new ApiUser(dist_1.requestService);
//# sourceMappingURL=user.js.map