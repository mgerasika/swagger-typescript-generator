"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var SwaggerDefinitionModel = /** @class */ (function () {
    function SwaggerDefinitionModel(parent, name, source) {
        var _this = this;
        this.type = '';
        this.name = '';
        this.fileName = "";
        this.properties = [];
        this.parent = parent;
        this.source = source;
        this.name = this.utils.getModelName(this, name);
        this.fileName = this.utils.getModelFileName(this, name);
        this.type = this.utils.getModelType(this, source);
        this.properties = Object.keys(source.properties).reduce(function (accum2, key2) {
            var obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(_this, key2, obj2));
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
    Object.defineProperty(SwaggerDefinitionModel.prototype, "utils", {
        get: function () {
            return this.parent.utils;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDefinitionModel;
}());
exports.SwaggerDefinitionModel = SwaggerDefinitionModel;
var SwaggerDefinitionProperty = /** @class */ (function () {
    function SwaggerDefinitionProperty(parent, name, source) {
        this.name = '';
        this.type = '';
        this.isArray = false;
        this.source = source;
        this.parent = parent;
        this.name = name;
        this.type = this.utils.getModelPropertyType(this, source);
        this.isArray = this.utils.getModelPropertyResponseIsArray(this, source);
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
    Object.defineProperty(SwaggerDefinitionProperty.prototype, "utils", {
        get: function () {
            return this.parent.utils;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerDefinitionProperty.prototype, "parent", {
        get: function () {
            return this[utils_1.parentSymbol];
        },
        set: function (val) {
            this[utils_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDefinitionProperty;
}());
exports.SwaggerDefinitionProperty = SwaggerDefinitionProperty;
//# sourceMappingURL=swagger-definition-model.js.map