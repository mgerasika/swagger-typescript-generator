"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const model_1 = require("../react-app/src/swagger/model");
const React = __importStar(require("react"));
const server_1 = require("react-dom/server");
const swagger_1 = require("../react-app/dist/swagger");
class SwaggerGenerator {
    constructor(config) {
        this._config = config;
    }
    generate() {
        const swaggerConfig = {
            source: this._config.swaggerInputJson,
            apiFolderPath: '../api',
            modelFolderPath: '../model',
            plugin: this._config.plugin
        };
        const swaggerDoc = new model_1.SwaggerDoc(swaggerConfig);
        swaggerDoc.definitions.forEach((swaggerDefinition) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.fileName}`;
            const html = server_1.renderToString(<swagger_1.ModelDefinitionComponent definition={swaggerDefinition}/>);
            const text = swagger_1.html2text(html);
            this.writeToFile(filePath, text);
        });
        swaggerDoc.classes.forEach((swaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.fileName}`;
            const html = server_1.renderToString(<swagger_1.ApiClassDefinitionComponent swaggerClass={swaggerClass}/>);
            const text = swagger_1.html2text(html);
            this.writeToFile(filePath, text);
        });
        {
            const html = server_1.renderToString(<swagger_1.AllApiClassesExportComponent classes={swaggerDoc.classes}/>);
            const text = swagger_1.html2text(html);
            const filePath = `${this._config.apiFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }
        {
            const html = server_1.renderToString(<swagger_1.AllModelsExportComponent definitions={swaggerDoc.definitions}/>);
            const text = swagger_1.html2text(html);
            const filePath = `${this._config.modelFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }
    }
    createDirectory(dir) {
        const modelDirs = dir.split('/');
        const [first, ...rest] = modelDirs;
        rest.reduce((accum, subDir) => {
            const newDir = `${accum}/${subDir}`;
            console.log('ensure dir ' + newDir.toString());
            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir);
            }
            return newDir;
        }, first);
    }
    writeToFile(fullPath, content) {
        fs.writeFile(fullPath, content, (err) => {
            console.error(err);
        });
    }
}
exports.SwaggerGenerator = SwaggerGenerator;
//# sourceMappingURL=swagger-generator.jsx.map