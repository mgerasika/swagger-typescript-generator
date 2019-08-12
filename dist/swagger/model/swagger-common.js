"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceSymbol = Symbol("source");
exports.parentSymbol = Symbol("source");
exports.getJsType = function (type) {
    if (type === 'integer') {
        return 'number';
    }
    if (type && type.indexOf('#') >= 0) {
        var parts = type.split('/');
        return "I" + parts[parts.length - 1];
    }
    return type;
};
//# sourceMappingURL=swagger-common.js.map