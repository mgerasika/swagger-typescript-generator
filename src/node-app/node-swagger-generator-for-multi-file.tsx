import {INodeSwaggerConfigForMultiFile} from './node-swagger-config';
import * as React from 'react';
import {
    SwaggerAllClassesExportAdapter,
    SwaggerAllEnumsExportAdapter,
    SwaggerAllModelsExportAdapter,
    SwaggerApiClassAdapter,
    SwaggerClass,
    SwaggerEnum,
    SwaggerEnumAdapter,
    SwaggerModel,
    SwaggerModelAdapter,
} from "../react-app/src/main";
import {nodeSwaggerGeneratorUtils} from "./node-swagger-generator-utils";
const Path = require('path');

export class NodeSwaggerGeneratorForMultiFile {
    private _config: INodeSwaggerConfigForMultiFile;

    constructor(config: INodeSwaggerConfigForMultiFile) {
        this._config = config;
    }

    generate() {
        const swaggerDoc = nodeSwaggerGeneratorUtils.createSwaggerDoc(this._config);

        if (this._config.apiFilesOutDir) {
            nodeSwaggerGeneratorUtils.deleteDirectory(this._config.apiFilesOutDir);
            nodeSwaggerGeneratorUtils.createDirectory(this._config.apiFilesOutDir);
        }
        if (this._config.modelFilesOutDir) {
            nodeSwaggerGeneratorUtils.deleteDirectory(this._config.modelFilesOutDir);
            nodeSwaggerGeneratorUtils.createDirectory(this._config.modelFilesOutDir);
        }
        if (this._config.enumFilesOutDir) {
            nodeSwaggerGeneratorUtils.deleteDirectory(this._config.enumFilesOutDir);
            nodeSwaggerGeneratorUtils.createDirectory(this._config.enumFilesOutDir);
        }

        swaggerDoc.models.forEach((swaggerDefinition: SwaggerModel) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.fileName}`;
            const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerModelAdapter swaggerModel={swaggerDefinition}/>);
            nodeSwaggerGeneratorUtils.writeToFile(filePath, text);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.fileName}`;
            const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerApiClassAdapter swaggerClass={swaggerClass}/>);
            nodeSwaggerGeneratorUtils.writeToFile(filePath, text);
        });

        swaggerDoc.enums.forEach((swaggerEnum: SwaggerEnum) => {
            const filePath = `${this._config.enumFilesOutDir}/${swaggerEnum.fileName}`;
            const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerEnumAdapter swaggerEnum={swaggerEnum}/>);
            nodeSwaggerGeneratorUtils.writeToFile(filePath, text);
        });

        {
            const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerAllClassesExportAdapter doc={swaggerDoc}
                                                                               swaggerClasses={swaggerDoc.classes}/>);
            const filePath = `${this._config.apiFilesOutDir}/index.ts`;
            nodeSwaggerGeneratorUtils.writeToFile(filePath, text);
        }

        {
            const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerAllModelsExportAdapter doc={swaggerDoc}
                                                                              models={swaggerDoc.models}/>);
            const filePath = `${this._config.modelFilesOutDir}/index.ts`;
            nodeSwaggerGeneratorUtils.writeToFile(filePath, text);
        }

        {
            const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerAllEnumsExportAdapter doc={swaggerDoc}
                                                                             enums={swaggerDoc.enums}/>);
            const filePath = `${this._config.enumFilesOutDir}/index.ts`;
            nodeSwaggerGeneratorUtils.writeToFile(filePath, text);
        }
    }
}
