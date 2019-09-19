"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html2text = function (html) {
    return html.replace(/<(?:.|\n)*?>/gm, '');
};
exports.makeFileName = function (name) {
    var words = name.split(/(?=[A-Z])/).map(function (i) { return i.toLowerCase(); });
    words = words.filter(function (f) { return !['api', 'i'].includes(f); });
    return words.join('-') + ".ts";
};
//# sourceMappingURL=utils.js.map