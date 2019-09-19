"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var model_1 = require("../react-app/dist/swagger/model");
var React = __importStar(require("react"));
var server_1 = require("react-dom/server");
var utils_1 = require("./utils");
exports.ModelDefinition2 = function (props) {
    var fields = props.definition.properties.map(function (parameter) {
        return (<span key={parameter.name}>{'\t'}{parameter.name}:{parameter.type}{'\n'}</span>);
    });
    return (<>
            export interface {props.definition.name}
            {'{\n'} {fields}
            {'}'}
        </>);
};
var SwaggerGenerator = /** @class */ (function () {
    function SwaggerGenerator(config) {
        this._config = config;
    }
    SwaggerGenerator.prototype.generate = function () {
        var _this = this;
        var swaggerDoc = new model_1.SwaggerDoc(this._config.swaggerInputJson);
        swaggerDoc.definitions.forEach(function (swaggerDefinition) {
            var filePath = _this._config.modelFilesOutDir + "/" + utils_1.makeFileName(swaggerDefinition.name);
            var html = server_1.renderToString(<exports.ModelDefinition2 definition={swaggerDefinition}/>);
            var text = utils_1.html2text(html);
            _this.writeToFile(filePath, text);
            console.log(filePath);
        });
        swaggerDoc.classes.forEach(function (swaggerClass) {
            var filePath = _this._config.apiFilesOutDir + "/" + utils_1.makeFileName(swaggerClass.name);
            var html = ''; //renderToString(<ClassDefinition swaggerClass={swaggerClass}/>);
            var text = utils_1.html2text(html);
            _this.writeToFile(filePath, text);
            console.log(filePath);
        });
    };
    SwaggerGenerator.prototype.createDirectory = function (dir) {
        var modelDirs = dir.split('/');
        var first = modelDirs[0], rest = modelDirs.slice(1);
        rest.reduce(function (accum, subDir) {
            var newDir = accum + "/" + subDir;
            console.log('ensure dir ' + newDir.toString());
            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir);
            }
            return newDir;
        }, first);
    };
    SwaggerGenerator.prototype.writeToFile = function (fullPath, content) {
        fs.writeFile(fullPath, content, function (err) {
            //convert here
        });
    };
    return SwaggerGenerator;
}());
exports.SwaggerGenerator = SwaggerGenerator;
//# sourceMappingURL=swagger-generator.jsx.map