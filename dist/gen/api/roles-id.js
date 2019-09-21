"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dist_1 = require("swagger-typescript-generator/dist");
var ApiRolesId = /** @class */ (function () {
    function ApiRolesId(requestService) {
        this.requestService = requestService;
    }
    ApiRolesId.prototype.roles_Get = function (id) {
        var url = "/api/Roles/" + id;
        var params = [url];
        return this.requestService.get.apply(this.requestService, params);
    };
    ApiRolesId.prototype.roles_Put = function (id, value) {
        var url = "/api/Roles/" + id;
        var params = [url, value];
        return this.requestService.put.apply(this.requestService, params);
    };
    ApiRolesId.prototype.roles_Delete = function (id) {
        var url = "/api/Roles/" + id;
        var params = [url];
        return this.requestService.delete.apply(this.requestService, params);
    };
    return ApiRolesId;
}());
exports.apiRolesId = new ApiRolesId(dist_1.requestService);
//# sourceMappingURL=roles-id.js.map