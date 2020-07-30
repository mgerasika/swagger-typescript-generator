"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_definition_model_1 = require("./swagger-definition-model");
var swagger_class_1 = require("./swagger-class");
var common_1 = require("../common");
var sourceSymbol = Symbol('source');
var SwaggerDocModel = /** @class */ (function () {
    function SwaggerDocModel(config) {
        var _this = this;
        this.definitions = [];
        this.classes = [];
        this.utils = common_1.defaultUtils;
        this.config = config;
        this.utils = config.createCustomUtilsFactory(common_1.defaultUtils);
        var source = config.source;
        this.definitions = Object.keys(source.definitions).reduce(function (accum, key) {
            var obj = source.definitions[key];
            accum.push(new swagger_definition_model_1.SwaggerDefinitionModel(_this, key, obj));
            return accum;
        }, []);
        this.classes = Object.keys(source.paths).reduce(function (accum, key) {
            var obj = source.paths[key];
            accum.push(new swagger_class_1.SwaggerClassModel(_this, key, obj));
            return accum;
        }, []);
    }
    Object.defineProperty(SwaggerDocModel.prototype, "config", {
        get: function () {
            return this[sourceSymbol];
        },
        set: function (val) {
            this[sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerDocModel;
}());
exports.SwaggerDocModel = SwaggerDocModel;
//# sourceMappingURL=swagger-doc-model.js.map