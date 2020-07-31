"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_method_1 = require("./swagger-method");
var utils_1 = require("../utils");
var SwaggerClassModel = /** @class */ (function () {
    function SwaggerClassModel(parent, key, source) {
        var _this = this;
        this.name = '';
        this.methods = [];
        this.parent = parent;
        this.source = source;
        // eslint-disable-next-line
        this.name = this.utils.getClassName(this, key);
        this.url = key;
        this.fileName = this.utils.getClassFileName(this, this.name);
        this.methods = Object.keys(source).reduce(function (accum2, key2) {
            var obj2 = source[key2];
            accum2.push(new swagger_method_1.SwaggerMethodModel(_this, key2, obj2));
            return accum2;
        }, []);
    }
    Object.defineProperty(SwaggerClassModel.prototype, "utils", {
        get: function () {
            return this.parent.utils;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerClassModel.prototype, "plugin", {
        get: function () {
            return this.parent.config.plugin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerClassModel.prototype, "source", {
        get: function () {
            return this[utils_1.sourceSymbol];
        },
        set: function (val) {
            this[utils_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerClassModel.prototype, "parent", {
        get: function () {
            return this[utils_1.parentSymbol];
        },
        set: function (val) {
            this[utils_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerClassModel;
}());
exports.SwaggerClassModel = SwaggerClassModel;
//# sourceMappingURL=swagger-class.js.map