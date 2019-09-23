"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = function (s) {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
exports.lowerlize = function (s) {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toLowerCase() + s.slice(1);
};
exports.html2text = function (html) {
    var result = html.replace(/<(?:.|\n)*?>/gm, '');
    result = result.replace(/&lt;/gm, '<');
    result = result.replace(/&gt;/gm, '>');
    result = result.replace(/&#x27;/gm, '\'');
    return result;
};
exports.makeFileName = function (name) {
    var words = name.split(/(?=[A-Z])/).map(function (i) { return i.toLowerCase(); });
    words = words.filter(function (f) { return !['api', 'i'].includes(f); });
    return words.join('-') + ".ts";
};
exports.sourceSymbol = Symbol('source');
exports.parentSymbol = Symbol('source');
exports.getModelName = function (name) {
    return "I" + name + "Model";
};
exports.getJsType = function (type) {
    if (type === 'integer') {
        return 'number';
    }
    if (type === 'array') {
        return 'Array';
    }
    if (type && type.indexOf('#') >= 0) {
        var parts = type.split('/');
        return exports.getModelName("" + parts[parts.length - 1]);
    }
    return type;
};
exports.isModelByTypeName = function (name) {
    return name[0] == 'I' && name.indexOf('Model') !== 0;
};
exports.getClassName = function (key) {
    return key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/').map(function (s) { return exports.capitalize(s); }).join('') + 'Api';
};
//# sourceMappingURL=utils.js.map