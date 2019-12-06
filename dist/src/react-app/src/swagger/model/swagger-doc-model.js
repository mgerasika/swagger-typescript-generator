"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_definition_model_1 = require("./swagger-definition-model");
const swagger_class_1 = require("./swagger-class");
const sourceSymbol = Symbol('source');
class SwaggerDocModel {
    constructor(config) {
        this.definitions = [];
        this.classes = [];
        this.config = config;
        const { source } = config;
        this.definitions = Object.keys(source.definitions).reduce((accum, key) => {
            const obj = source.definitions[key];
            accum.push(new swagger_definition_model_1.SwaggerDefinitionModel(this, key, obj));
            return accum;
        }, []);
        this.classes = Object.keys(source.paths).reduce((accum, key) => {
            const obj = source.paths[key];
            accum.push(new swagger_class_1.SwaggerClassModel(this, key, obj));
            return accum;
        }, []);
    }
    get config() {
        return this[sourceSymbol];
    }
    set config(val) {
        this[sourceSymbol] = val;
    }
}
exports.SwaggerDocModel = SwaggerDocModel;
//# sourceMappingURL=swagger-doc-model.js.map