"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class SwaggerMethodModel {
    constructor(parent, httpMethod, source) {
        this.httpMethod = '';
        this.name = '';
        this.tags = '';
        this.parameters = [];
        this.parent = parent;
        this.source = source;
        this.name = utils_1.lowerlize(this.source.operationId);
        this.httpMethod = httpMethod;
        [this.tags] = this.source.tags;
        if (source.parameters) {
            this.parameters = source.parameters.map((obj) => {
                return new SwaggerMethodParameter(this, obj);
            });
        }
        this.responseIsVoid = true;
        if (source.responses && source.responses['200']) {
            this.responseIsVoid = false;
            const schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsArray = utils_1.getResponseIsArray(schema);
                this.responseType = utils_1.getResponseType(schema);
            }
        }
        this.isFileUpload = this.parameters.some(s => s.type === 'File');
    }
    get source() {
        return this[utils_1.sourceSymbol];
    }
    set source(val) {
        this[utils_1.sourceSymbol] = val;
    }
    get parent() {
        return this[utils_1.parentSymbol];
    }
    set parent(val) {
        this[utils_1.parentSymbol] = val;
    }
    getUrlInfo() {
        return {
            httpMethod: this.httpMethod,
            name: this.name,
            url: this.parent.url
        };
    }
}
exports.SwaggerMethodModel = SwaggerMethodModel;
class SwaggerMethodParameter {
    constructor(parent, source) {
        this.name = '';
        this.type = '';
        this.parent = parent;
        this.source = source;
        this.name = source.name;
        if (source['schema']) {
            this.isJsType = false;
            this.type = utils_1.getJsType(source['schema'].$ref);
            if (!this.type) {
                this.type = utils_1.getJsType(source['schema'].type);
            }
        }
        else {
            this.type = utils_1.getJsType(source.type);
            this.isJsType = true;
        }
        this.isBodyParameter = source.in === 'body';
        this.isPathParameter = source.in === 'path';
        this.isFormDataParameter = source.in === 'formData';
    }
    get source() {
        return this[utils_1.sourceSymbol];
    }
    set source(val) {
        this[utils_1.sourceSymbol] = val;
    }
    get parent() {
        return this[utils_1.parentSymbol];
    }
    set parent(val) {
        this[utils_1.parentSymbol] = val;
    }
}
exports.SwaggerMethodParameter = SwaggerMethodParameter;
//# sourceMappingURL=swagger-method.js.map