"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var SwaggerMethodModel = /** @class */ (function () {
    function SwaggerMethodModel(parent, httpMethod, source) {
        var _this = this;
        this.httpMethod = '';
        this.name = '';
        this.tags = '';
        this.parameters = [];
        this.parent = parent;
        this.source = source;
        this.name = utils_1.lowerlize(this.source.operationId);
        this.httpMethod = httpMethod;
        this.tags = this.source.tags[0];
        if (source.parameters) {
            this.parameters = source.parameters.map(function (obj) {
                return new SwaggerMethodParameter(_this, obj);
            });
        }
        this.responseIsVoid = true;
        if (source.responses && source.responses['200']) {
            this.responseIsVoid = false;
            var schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsArray = utils_1.getResponseIsArray(schema);
                this.responseType = utils_1.getResponseType(schema);
            }
        }
    }
    Object.defineProperty(SwaggerMethodModel.prototype, "source", {
        get: function () {
            return this[utils_1.sourceSymbol];
        },
        set: function (val) {
            this[utils_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerMethodModel.prototype, "parent", {
        get: function () {
            return this[utils_1.parentSymbol];
        },
        set: function (val) {
            this[utils_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    SwaggerMethodModel.prototype.getUrlInfo = function () {
        return {
            httpMethod: this.httpMethod,
            name: this.name,
            url: this.parent.url
        };
    };
    return SwaggerMethodModel;
}());
exports.SwaggerMethodModel = SwaggerMethodModel;
var SwaggerMethodParameter = /** @class */ (function () {
    function SwaggerMethodParameter(parent, source) {
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
    Object.defineProperty(SwaggerMethodParameter.prototype, "source", {
        get: function () {
            return this[utils_1.sourceSymbol];
        },
        set: function (val) {
            this[utils_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerMethodParameter.prototype, "parent", {
        get: function () {
            return this[utils_1.parentSymbol];
        },
        set: function (val) {
            this[utils_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerMethodParameter;
}());
exports.SwaggerMethodParameter = SwaggerMethodParameter;
//# sourceMappingURL=swagger-method.js.map