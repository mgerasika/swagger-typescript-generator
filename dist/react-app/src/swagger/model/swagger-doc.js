"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_definition_1 = require("./swagger-definition");
var swagger_class_1 = require("./swagger-class");
var sourceSymbol = Symbol('source');
var SwaggerDoc = /** @class */ (function () {
    function SwaggerDoc(config) {
        var _this = this;
        this.definitions = [];
        this.classes = [];
        this.config = config;
        var source = config.source;
        this.definitions = Object.keys(source.definitions).reduce(function (accum, key) {
            var obj = source.definitions[key];
            accum.push(new swagger_definition_1.SwaggerDefinition(key, obj));
            return accum;
        }, []);
        this.classes = Object.keys(source.paths).reduce(function (accum, key) {
            var obj = source.paths[key];
            accum.push(new swagger_class_1.SwaggerClass(_this, key, obj));
            return accum;
        }, []);
    }
    Object.defineProperty(SwaggerDoc.prototype, "config", {
        get: function () {
            return this[sourceSymbol];
        },
        set: function (val) {
            this[sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDoc;
}());
exports.SwaggerDoc = SwaggerDoc;
//# sourceMappingURL=swagger-doc.js.map