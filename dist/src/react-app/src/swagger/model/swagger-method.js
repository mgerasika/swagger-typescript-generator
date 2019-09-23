"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const utils_2 = require("../utils");
class SwaggerMethodModel {
    constructor(parent, httpMethod, source) {
        this.httpMethod = '';
        this.name = '';
        this.tags = '';
        this.parameters = [];
        this.parent = parent;
        this.source = source;
        this.name = utils_2.lowerlize(this.source.operationId);
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
                this.responseIsArray = schema.type === 'array';
                const responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
                if (responseType) {
                    this.responseType = utils_1.getJsType(responseType);
                }
                else {
                    const additionalProperties = schema.additionalProperties;
                    if (additionalProperties && additionalProperties["type"]) {
                        this.responseType = utils_1.getJsType(additionalProperties["type"]);
                    }
                }
            }
        }
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