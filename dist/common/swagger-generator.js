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
var React = __importStar(require("react"));
var server_1 = require("react-dom/server");
var swagger_1 = require("../../dist/dist-react-app/swagger");
var model_1 = require("../../dist/dist-react-app/swagger/model");
var SwaggerGenerator = /** @class */ (function () {
    function SwaggerGenerator(config) {
        this._config = config;
    }
    SwaggerGenerator.prototype.generate = function () {
        var _this = this;
        var swaggerConfig = {
            source: this._config.swaggerInputJson,
            modelImportPath: this._config.modelImportPath,
            plugin: this._config.plugin,
            createCustomUtilsFactory: function (baseUtils) { return baseUtils; }
        };
        if (this._config.apiFilesOutDir) {
            this.createDirectory(this._config.apiFilesOutDir);
        }
        if (this._config.modelFilesOutDir) {
            this.createDirectory(this._config.modelFilesOutDir);
        }
        if (this._config.urlFileOutDir) {
            this.createDirectory(this._config.urlFileOutDir);
        }
        var swaggerDoc = new model_1.SwaggerDocModel(swaggerConfig);
        swaggerDoc.definitions.forEach(function (swaggerDefinition) {
            var filePath = _this._config.modelFilesOutDir + "/" + swaggerDefinition.fileName;
            var html = server_1.renderToString(React.createElement(swagger_1.ModelDefinitionComponent, { definition: swaggerDefinition }));
            var text = swagger_1.html2text(html);
            _this.writeToFile(filePath, text);
        });
        swaggerDoc.classes.forEach(function (swaggerClass) {
            var filePath = _this._config.apiFilesOutDir + "/" + swaggerClass.fileName;
            var html = server_1.renderToString(React.createElement(swagger_1.ApiClassDefinitionComponent, { swaggerClass: swaggerClass }));
            var text = swagger_1.html2text(html);
            _this.writeToFile(filePath, text);
        });
        {
            var html = server_1.renderToString(React.createElement(swagger_1.ApiAllClassesExportComponent, { classes: swaggerDoc.classes }));
            var text = swagger_1.html2text(html);
            var filePath = this._config.apiFilesOutDir + "/index.ts";
            this.writeToFile(filePath, text);
        }
        {
            var html = server_1.renderToString(React.createElement(swagger_1.AllModelsExportComponent, { definitions: swaggerDoc.definitions }));
            var text = swagger_1.html2text(html);
            var filePath = this._config.modelFilesOutDir + "/index.ts";
            this.writeToFile(filePath, text);
        }
        {
            var html = server_1.renderToString(React.createElement(swagger_1.ApiUrlsComponent, { classes: swaggerDoc.classes }));
            var text = swagger_1.html2text(html);
            var filePath = this._config.urlFileOutDir + "/index.ts";
            this.writeToFile(filePath, text);
        }
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
            if (err) {
                console.error('error write to file ' + err);
            }
            else {
                console.log("write to file success: " + fullPath);
            }
        });
    };
    return SwaggerGenerator;
}());
exports.SwaggerGenerator = SwaggerGenerator;
//# sourceMappingURL=swagger-generator.js.map