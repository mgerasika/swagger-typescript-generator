"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var SwaggerDefinitionModel = /** @class */ (function () {
    function SwaggerDefinitionModel(name, source) {
        this.type = '';
        this.name = '';
        this.fileName = "";
        this.properties = [];
        this.source = source;
        this.name = utils_1.getModelName(name);
        this.fileName = utils_1.makeFileName(name);
        this.type = utils_1.getJsType(source.type);
        this.properties = Object.keys(source.properties).reduce(function (accum2, key2) {
            var obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(key2, obj2));
            return accum2;
        }, []);
    }
    Object.defineProperty(SwaggerDefinitionModel.prototype, "source", {
        get: function () {
            return this[utils_1.sourceSymbol];
        },
        set: function (val) {
            this[utils_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDefinitionModel;
}());
exports.SwaggerDefinitionModel = SwaggerDefinitionModel;
var SwaggerDefinitionProperty = /** @class */ (function () {
    function SwaggerDefinitionProperty(name, source) {
        this.name = '';
        this.type = '';
        this.source = source;
        this.name = name;
        this.type = utils_1.getJsType(source.type);
    }
    Object.defineProperty(SwaggerDefinitionProperty.prototype, "source", {
        get: function () {
            return this[utils_1.sourceSymbol];
        },
        set: function (val) {
            this[utils_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDefinitionProperty;
}());
exports.SwaggerDefinitionProperty = SwaggerDefinitionProperty;
//# sourceMappingURL=swagger-definition-model.js.map