import {INodeSwaggerConfigForOneFile} from './node-swagger-config';
import * as React from 'react';
import {SwaggerAllInOneFileAdapter,} from "../react-app/src/main";
import { nodeSwaggerGeneratorUtils} from "./node-swagger-generator-utils";

const Path = require('path');

export class NodeSwaggerGeneratorForSingleFile {
    private _config: INodeSwaggerConfigForOneFile;

    constructor(config: INodeSwaggerConfigForOneFile) {
        this._config = config;
    }

    generate() {
        const swaggerDoc = nodeSwaggerGeneratorUtils.createSwaggerDoc(this._config);

        if (this._config.outDir) {
            nodeSwaggerGeneratorUtils.deleteDirectory(this._config.outDir);
            nodeSwaggerGeneratorUtils.createDirectory(this._config.outDir);
        }

        const text = nodeSwaggerGeneratorUtils.component2string(<SwaggerAllInOneFileAdapter doc={swaggerDoc}/>);
        const fileUrl = `${this._config.outDir}/index.ts`;
        nodeSwaggerGeneratorUtils.writeToFile(fileUrl, text);
    }
}
