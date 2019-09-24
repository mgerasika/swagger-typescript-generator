"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var RequestService = /** @class */ (function () {
    function RequestService() {
    }
    RequestService.prototype.get = function (url) {
        var _this = this;
        return axios_1.default
            .get(url, {
            data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
        })
            .catch(function (error) {
            return _this.handleError(error.response);
        });
    };
    RequestService.prototype.post = function (url, body) {
        var _this = this;
        return axios_1.default
            .post(url, body, {})
            .catch(function (error) {
            return _this.handleError(error.response);
        });
    };
    RequestService.prototype.put = function (url, body) {
        var _this = this;
        return axios_1.default.put(url, body).catch(function (error) {
            return _this.handleError(error.response);
        });
    };
    RequestService.prototype.delete = function (url, body) {
        var _this = this;
        return axios_1.default
            .delete(url, {
            data: body ? body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
        })
            .catch(function (error) {
            return _this.handleError(error.response);
        });
    };
    RequestService.prototype.handleError = function (response) {
        return Promise.reject({
            message: 'Unknown error',
            response: response
        });
    };
    return RequestService;
}());
exports.requestService = new RequestService();
//# sourceMappingURL=request-service.js.map