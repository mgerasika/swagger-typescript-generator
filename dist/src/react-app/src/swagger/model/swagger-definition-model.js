"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class SwaggerDefinitionModel {
    constructor(name, source) {
        this.type = '';
        this.name = '';
        this.fileName = "";
        this.properties = [];
        this.source = source;
        this.name = `I${name}`;
        this.fileName = utils_1.makeFileName(name);
        this.type = utils_1.getJsType(source.type);
        this.properties = Object.keys(source.properties).reduce((accum2, key2) => {
            const obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(key2, obj2));
            return accum2;
        }, []);
    }
    get source() {
        return this[utils_1.sourceSymbol];
    }
    set source(val) {
        this[utils_1.sourceSymbol] = val;
    }
}
exports.SwaggerDefinitionModel = SwaggerDefinitionModel;
class SwaggerDefinitionProperty {
    constructor(name, source) {
        this.name = '';
        this.type = '';
        this.source = source;
        this.name = name;
        this.type = utils_1.getJsType(source.type);
    }
    get source() {
        return this[utils_1.sourceSymbol];
    }
    set source(val) {
        this[utils_1.sourceSymbol] = val;
    }
}
exports.SwaggerDefinitionProperty = SwaggerDefinitionProperty;
//# sourceMappingURL=swagger-definition-model.js.map