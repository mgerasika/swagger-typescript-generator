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
exports.sourceSymbol = Symbol('source');
exports.parentSymbol = Symbol('source');
//# sourceMappingURL=utils.js.map