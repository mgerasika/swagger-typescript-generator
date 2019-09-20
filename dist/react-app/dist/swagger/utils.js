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
    result = result.replace(/&#x27;/gm, "'");
    return result;
};
exports.makeFileName = function (name) {
    var words = name.split(/(?=[A-Z])/).map(function (i) { return i.toLowerCase(); });
    words = words.filter(function (f) { return !['api', 'i'].includes(f); });
    return words.join('-') + ".ts";
};
//# sourceMappingURL=utils.js.map