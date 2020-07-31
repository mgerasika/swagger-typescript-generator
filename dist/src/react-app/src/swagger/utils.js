"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = (s) => {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};
exports.lowerlize = (s) => {
    if (typeof s !== 'string')
        return '';
    return s.charAt(0).toLowerCase() + s.slice(1);
};
exports.html2text = (html) => {
    return html.replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&lt;/gm, '<')
        .replace(/&gt;/gm, '>')
        .replace(/&#x27;/gm, '\'');
};
exports.makeFileName = (name) => {
    let words = name.split(/(?=[A-Z])/).map((i) => i.toLowerCase());
    words = words.filter((f) => !['api', 'i'].includes(f));
    return `${words.join('-')}.ts`;
};
exports.sourceSymbol = Symbol('source');
exports.parentSymbol = Symbol('source');
exports.getModelName = (name) => {
    return `I${name}Model`;
};
exports.getJsType = (type) => {
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
        const parts = type.split('/');
        return exports.getModelName(`${parts[parts.length - 1]}`);
    }
    return type;
};
exports.Warning = '/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n';
exports.isModelByTypeName = (name) => {
    return !!name && (name[0] === 'I' && name.indexOf('Model') !== 0);
};
exports.getClassName = (key) => {
    const parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
    return parts.filter(f => f != 'api').map(s => exports.capitalize(s)).join('') + 'Api';
};
exports.getResponseIsArray = (schema) => {
    return schema && schema.type === 'array';
};
exports.getResponseType = (schema) => {
    let res = '';
    const responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
    if (responseType) {
        res = exports.getJsType(responseType);
    }
    if (!responseType) {
        res = schema.type;
    }
    if (!responseType) {
        const additionalProperties = schema.additionalProperties;
        if (additionalProperties && additionalProperties['type']) {
            res = exports.getJsType(additionalProperties['type']);
        }
    }
    return res;
};
//# sourceMappingURL=utils.js.map