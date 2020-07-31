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
    post(url, body) {
        return axios_1.default
            .post(url, body, {})
            .catch((error) => {
            return this.handleError(error.response);
        });
    }
    put(url, body) {
        return axios_1.default.put(url, body).catch((error) => {
            return this.handleError(error.response);
        });
    }
    delete(url, body) {
        return axios_1.default
            .delete(url, {
            data: body ? body : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
        })
            .catch((error) => {
            return this.handleError(error.response);
        });
    }
    upload(url, formData) {
        return axios_1.default
            .post(url, {
            data: formData ? formData : null // This is workaround for setting "content-type": https://github.com/axios/axios/issues/86
        })
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