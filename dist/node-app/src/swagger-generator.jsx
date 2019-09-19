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
var swagger_doc_1 = require("../../swagger/model/swagger-doc");
var log_service_1 = require("./log-service");
var SwaggerGenerator = /** @class */ (function () {
    function SwaggerGenerator(config) {
        this._config = config;
    }
    SwaggerGenerator.prototype.generate = function () {
        var _this = this;
        var swaggerDoc = new swagger_doc_1.SwaggerDoc(this._config.swaggerInputJson);
        swaggerDoc.definitions.forEach(function (swaggerDefinition) {
            var filePath = _this._config.modelFilesOutDir + "/" + swaggerDefinition.name + ".ts";
            _this.writeToFile(filePath, 'definition content');
            log_service_1.logService.log(filePath);
        });
        swaggerDoc.classes.forEach(function (swaggerClass) {
            var filePath = _this._config.apiFilesOutDir + "/" + swaggerClass.name + ".ts";
            _this.writeToFile(filePath, 'api content');
            log_service_1.logService.log(filePath);
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