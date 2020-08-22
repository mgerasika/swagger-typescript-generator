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
import {NodeSwaggerGeneratorBase} from "./node-swagger-generator-base";

const Path = require('path');

export class NodeSwaggerGeneratorForMultiFile extends NodeSwaggerGeneratorBase {
    private _config: INodeSwaggerConfigForMultiFile;

    constructor(config: INodeSwaggerConfigForMultiFile) {
        super();
        this._config = config;
    }

    generate() {
        const swaggerDoc = this.createSwaggerDoc(this._config);

        if (this._config.apiFilesOutDir) {
            this.deleteDirectory(this._config.apiFilesOutDir);
            this.createDirectory(this._config.apiFilesOutDir);
        }
        if (this._config.modelFilesOutDir) {
            this.deleteDirectory(this._config.modelFilesOutDir);
            this.createDirectory(this._config.modelFilesOutDir);
        }
        if (this._config.enumFilesOutDir) {
            this.deleteDirectory(this._config.enumFilesOutDir);
            this.createDirectory(this._config.enumFilesOutDir);
        }

        swaggerDoc.definitions.forEach((swaggerDefinition: SwaggerModel) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.fileName}`;
            const text = this.component2string(<SwaggerModelAdapter swaggerModel={swaggerDefinition}/>);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.fileName}`;
            const text = this.component2string(<SwaggerApiClassAdapter swaggerClass={swaggerClass}/>);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.enums.forEach((swaggerEnum: SwaggerEnum) => {
            const filePath = `${this._config.enumFilesOutDir}/${swaggerEnum.fileName}`;
            const text = this.component2string(<SwaggerEnumAdapter swaggerEnum={swaggerEnum}/>);
            this.writeToFile(filePath, text);
        });

        {
            const text = this.component2string(<SwaggerAllClassesExportAdapter doc={swaggerDoc}
                                                                               swaggerClasses={swaggerDoc.classes}/>);
            const filePath = `${this._config.apiFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const text = this.component2string(<SwaggerAllModelsExportAdapter doc={swaggerDoc}
                                                                              models={swaggerDoc.definitions}/>);
            const filePath = `${this._config.modelFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const text = this.component2string(<SwaggerAllEnumsExportAdapter doc={swaggerDoc}
                                                                             enums={swaggerDoc.enums}/>);
            const filePath = `${this._config.enumFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }
    }
}
