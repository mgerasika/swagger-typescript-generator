"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var SwaggerDefinitionModel = /** @class */ (function () {
    function SwaggerDefinitionModel(parent, name, source) {
        this.type = '';
        this.name = '';
        this.fileName = "";
        this.properties = [];
        this.parent = parent;
        this.source = source;
        this.name = utils_1.getModelName(name);
        this.fileName = utils_1.makeFileName(name);
        this.type = utils_1.getJsType(source.type);
        if (source.items) {
            this.type = utils_1.getResponseType(source);
        }
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
    Object.defineProperty(SwaggerDefinitionModel.prototype, "parent", {
        get: function () {
            return this[utils_1.parentSymbol];
        },
        set: function (val) {
            this[utils_1.parentSymbol] = val;
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
        this.isArray = false;
        this.source = source;
        this.name = name;
        this.type = utils_1.getJsType(source.type);
        if (source.items) {
            this.type = utils_1.getResponseType(source);
        }
        this.isArray = utils_1.getResponseIsArray(source);
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