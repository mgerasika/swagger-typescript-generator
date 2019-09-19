"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_common_1 = require("./swagger-common");
var swagger_method_1 = require("./swagger-method");
var SwaggerClass = /** @class */ (function () {
    function SwaggerClass(parent, name, source) {
        var _this = this;
        this.name = '';
        this.methods = [];
        this.parent = parent;
        this.source = source;
        // eslint-disable-next-line
        this.name = name.replace(/[\{\}\/]/g, '');
        this.url = name;
        this.methods = Object.keys(source).reduce(function (accum2, key2) {
            var obj2 = source[key2];
            accum2.push(new swagger_method_1.SwaggerMethod(_this, key2, obj2));
            return accum2;
        }, []);
    }
    Object.defineProperty(SwaggerClass.prototype, "source", {
        get: function () {
            return this[swagger_common_1.sourceSymbol];
        },
        set: function (val) {
            this[swagger_common_1.sourceSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SwaggerClass.prototype, "parent", {
        get: function () {
            return this[swagger_common_1.parentSymbol];
        },
        set: function (val) {
            this[swagger_common_1.parentSymbol] = val;
        },
        enumerable: true,
        configurable: true
    });
    return SwaggerClass;
}());
exports.SwaggerClass = SwaggerClass;
//# sourceMappingURL=swagger-class.js.map