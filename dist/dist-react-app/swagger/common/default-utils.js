"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var getModelName = function (name) {
    return "I" + name + "Model";
};
var getJsType = function (type) {
    if (type === 'integer') {
        return 'number';
    }
    if (type === 'array') {
        return 'Array';
    }
    if (type === 'file') {
        return 'File';
    }
    if (type && type.indexOf('#') >= 0) {
        var parts = type.split('/');
        return getModelName("" + parts[parts.length - 1]);
    }
    return type;
};
var getResponseType = function (schema) {
    var res = '';
    var responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
    if (responseType) {
        res = getJsType(responseType);
    }
    if (!responseType) {
        res = schema.type;
    }
    if (!responseType) {
        var additionalProperties = schema.additionalProperties;
        if (additionalProperties && additionalProperties['type']) {
            res = getJsType(additionalProperties['type']);
        }
    }
    return res;
};
var getResponseIsArray = function (schema) {
    return schema && schema.type === 'array';
};
var getFileName = function (name) {
    var words = name.split(/(?=[A-Z])/).map(function (i) { return i.toLowerCase(); });
    words = words.filter(function (f) { return !['api', 'i'].includes(f); });
    return words.join('-') + ".ts";
};
exports.defaultUtils = {
    getClassName: function (context, key) {
        var parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
        return parts.filter(function (f) { return f != 'api'; }).map(function (s) { return utils_1.capitalize(s); }).join('') + 'Api';
    },
    getClassFileName: function (context, name) { return getFileName(name); },
    getMethodName: function (context, name) { return utils_1.lowerlize(name); },
    getMethodParameterName: function (context, name) { return name; },
    getMethodResponseIsArray: function (context, schema) { return getResponseIsArray(schema); },
    getMethodResponseType: function (context, schema) { return getResponseType(schema); },
    getMethodParameterType: function (context, type) { return getJsType(type); },
    getModelName: function (context, name) { return getModelName(name); },
    getModelFileName: function (context, name) { return getFileName(name); },
    getModelType: function (context, schema) {
        if (schema.items) {
            return getResponseType(schema);
        }
        else {
            return getJsType(schema.type);
        }
    },
    getModelPropertyType: function (context, schema) {
        if (schema.items) {
            return getResponseType(schema);
        }
        else {
            return getJsType(schema.type);
        }
    },
    getModelPropertyResponseIsArray: function (context, name) { return getResponseIsArray(name); },
    isModelByTypeName: function (name) {
        return !!name && (name[0] === 'I' && name.indexOf('Model') !== 0);
    },
    getWarningMessage: function () { return '/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n'; }
};
//# sourceMappingURL=default-utils.js.map