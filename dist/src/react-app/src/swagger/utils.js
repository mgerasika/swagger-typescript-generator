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
    let result = html.replace(/<(?:.|\n)*?>/gm, '');
    result = result.replace(/&lt;/gm, '<');
    result = result.replace(/&gt;/gm, '>');
    result = result.replace(/&#x27;/gm, '\'');
    return result;
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
    if (type && type.indexOf('#') >= 0) {
        const parts = type.split('/');
        return exports.getModelName(`${parts[parts.length - 1]}`);
    }
    return type;
};
exports.isModelByTypeName = (name) => {
    return name[0] == 'I' && name.indexOf('Model') !== 0;
};
//# sourceMappingURL=utils.js.map