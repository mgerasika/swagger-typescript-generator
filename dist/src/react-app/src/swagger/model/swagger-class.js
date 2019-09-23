"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_method_1 = require("./swagger-method");
const utils_1 = require("../utils");
class SwaggerClassModel {
    constructor(parent, key, source) {
        this.name = '';
        this.methods = [];
        this.parent = parent;
        this.source = source;
        // eslint-disable-next-line
        this.name = key.replace(/[\{\}]/g, '').split('/').map(s => utils_1.capitalize(s)).join('') + 'Api';
        this.url = key;
        this.fileName = utils_1.makeFileName(this.name);
        this.methods = Object.keys(source).reduce((accum2, key2) => {
            const obj2 = source[key2];
            accum2.push(new swagger_method_1.SwaggerMethodModel(this, key2, obj2));
            return accum2;
        }, []);
    }
    get plugin() {
        return this.parent.config.plugin;
    }
    get source() {
        return this[utils_1.sourceSymbol];
    }
    set source(val) {
        this[utils_1.sourceSymbol] = val;
    }
    get parent() {
        return this[utils_1.parentSymbol];
    }
    set parent(val) {
        this[utils_1.parentSymbol] = val;
    }
}
exports.SwaggerClassModel = SwaggerClassModel;
//# sourceMappingURL=swagger-class.js.map