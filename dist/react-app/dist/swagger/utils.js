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
    return html.replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&lt;/gm, '<')
        .replace(/&gt;/gm, '>')
        .replace(/&#x27;/gm, '\'');
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
exports.Warning = '/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n';
exports.isModelByTypeName = function (name) {
    return name[0] == 'I' && name.indexOf('Model') !== 0;
};
exports.getClassName = function (key) {
    var parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
    return parts.filter(function (f) { return f != 'api'; }).map(function (s) { return exports.capitalize(s); }).join('') + 'Api';
};
exports.getResponseIsArray = function (schema) {
    return schema && schema.type === 'array';
};
exports.getResponseType = function (schema) {
    var res = '';
    var responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
    if (responseType) {
        res = exports.getJsType(responseType);
    }
    if (!responseType) {
        res = schema.type;
    }
    if (!responseType) {
        var additionalProperties = schema.additionalProperties;
        if (additionalProperties && additionalProperties['type']) {
            res = exports.getJsType(additionalProperties['type']);
        }
    }
    return res;
};
//# sourceMappingURL=utils.js.map