"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_common_1 = require("./swagger-common");
var utils_1 = require("../utils");
var SwaggerMethod = /** @class */ (function () {
    function SwaggerMethod(parent, httpMethod, source) {
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
        if (source.responses && source.responses['204']) {
            this.responseIsVoid = true;
        }
        if (source.responses && source.responses['200']) {
            var schema = source.responses['200'].schema;
            if (schema) {
                this.responseIsJsType = false;
                this.responseIsArray = schema.type === 'array';
                var responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
                if (responseType) {
                    this.responseType = swagger_common_1.getJsType(responseType);
                }
            }
            else {
                this.responseIsJsType = true;
            }
        }
    }
    Object.defineProperty(SwaggerMethod.prototype, "source", {
        get: function () {
            return this[swagger_common_1.sourceSymbol];
        },
        set: function (val) {
            this[swagger_common_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerMethod.prototype, "parent", {
        get: function () {
            return this[swagger_common_1.parentSymbol];
        },
        set: function (val) {
            this[swagger_common_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerMethod;
}());
exports.SwaggerMethod = SwaggerMethod;
var SwaggerMethodParameter = /** @class */ (function () {
    function SwaggerMethodParameter(parent, source) {
        this.name = '';
        this.type = '';
        this.parent = parent;
        this.source = source;
        this.name = source.name;
        if (source['schema']) {
            this.isJsType = false;
            this.type = swagger_common_1.getJsType(source['schema'].$ref);
        }
        else {
            this.type = swagger_common_1.getJsType(source.type);
            this.isJsType = true;
        }
        this.isBodyParameter = source.in === 'body';
        this.isPathParameter = source.in === 'path';
    }
    Object.defineProperty(SwaggerMethodParameter.prototype, "source", {
        get: function () {
            return this[swagger_common_1.sourceSymbol];
        },
        set: function (val) {
            this[swagger_common_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerMethodParameter.prototype, "parent", {
        get: function () {
            return this[swagger_common_1.parentSymbol];
        },
        set: function (val) {
            this[swagger_common_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerMethodParameter;
}());
exports.SwaggerMethodParameter = SwaggerMethodParameter;
//# sourceMappingURL=swagger-method.js.map