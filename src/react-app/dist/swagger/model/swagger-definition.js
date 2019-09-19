"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_common_1 = require("./swagger-common");
var SwaggerDefinition = /** @class */ (function () {
    function SwaggerDefinition(name, source) {
        this.type = '';
        this.name = '';
        this.properties = [];
        this.source = source;
        this.name = "I" + name;
        this.type = swagger_common_1.getJsType(source.type);
        this.properties = Object.keys(source.properties).reduce(function (accum2, key2) {
            var obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(key2, obj2));
            return accum2;
        }, []);
    }
    Object.defineProperty(SwaggerDefinition.prototype, "source", {
        get: function () {
            return this[swagger_common_1.sourceSymbol];
        },
        set: function (val) {
            this[swagger_common_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDefinition;
}());
exports.SwaggerDefinition = SwaggerDefinition;
var SwaggerDefinitionProperty = /** @class */ (function () {
    function SwaggerDefinitionProperty(name, source) {
        this.name = '';
        this.type = '';
        this.source = source;
        this.name = name;
        this.type = swagger_common_1.getJsType(source.type);
    }
    Object.defineProperty(SwaggerDefinitionProperty.prototype, "source", {
        get: function () {
            return this[swagger_common_1.sourceSymbol];
        },
        set: function (val) {
            this[swagger_common_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDefinitionProperty;
}());
exports.SwaggerDefinitionProperty = SwaggerDefinitionProperty;
//# sourceMappingURL=swagger-definition.js.map