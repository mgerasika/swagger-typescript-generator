"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    RequestService.prototype.post = function (url, options) {
        var _this = this;
        return axios_1.default
            .post(url, options.body, {
            headers: options.headers
        })
            .catch(function (error) {
            return _this.handleError(error.response);
        });
    };
    RequestService.prototype.put = function (url, options) {
        var _this = this;
        return axios_1.default.put(url, options.body, { headers: options.headers }).catch(function (error) {
            return _this.handleError(error.response);
        });
    };
    RequestService.prototype.delete = function (url, options) {
        var _this = this;
        return axios_1.default
            .delete(url, __assign(__assign({}, options), { data: options && options.body ? options.body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
         }))
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