"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class RequestService {
    get(url) {
        return axios_1.default
            .get(url, {
            data: null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
        })
            .catch((error) => {
            return this.handleError(error.response);
        });
    }
    post(url, options) {
        return axios_1.default
            .post(url, options.body, {
            headers: options.headers
        })
            .catch((error) => {
            return this.handleError(error.response);
        });
    }
    put(url, options) {
        return axios_1.default.put(url, options.body, { headers: options.headers }).catch((error) => {
            return this.handleError(error.response);
        });
    }
    delete(url, options) {
        return axios_1.default
            .delete(url, Object.assign(Object.assign({}, options), { data: options && options.body ? options.body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
         }))
            .catch((error) => {
            return this.handleError(error.response);
        });
    }
    handleError(response) {
        return Promise.reject({
            message: 'Unknown error',
            response
        });
    }
}
exports.requestService = new RequestService();
//# sourceMappingURL=request-service.js.map