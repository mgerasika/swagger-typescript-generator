"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("swagger-typescript-generator/dist");
var ApiRoles = /** @class */ (function () {
    function ApiRoles(requestService) {
        this.requestService = requestService;
    }
    ApiRoles.prototype.roles_Get = function () {
        var url = "/api/Roles";
        var params = [url];
        return this.requestService.get.apply(this.requestService, params);
    };
    ApiRoles.prototype.roles_Post = function (value) {
        var url = "/api/Roles";
        var params = [url, value];
        return this.requestService.post.apply(this.requestService, params);
    };
    return ApiRoles;
}());
exports.apiRoles = new ApiRoles(dist_1.requestService);
//# sourceMappingURL=roles.js.map