import {INodeSwaggerConfigForOneFile} from './node-swagger-config';
import * as React from 'react';
import {SwaggerAllInOneFileAdapter,} from "../react-app/src/main";
import {NodeSwaggerGeneratorBase} from "./node-swagger-generator-base";

const Path = require('path');

export class NodeSwaggerGeneratorForSingleFile extends NodeSwaggerGeneratorBase{
    private _config: INodeSwaggerConfigForOneFile;

    constructor(config: INodeSwaggerConfigForOneFile) {
        super();
        this._config = config;
    }

    generate() {
        const swaggerDoc = this.createSwaggerDoc(this._config);

        if(this._config.outDir) {
            this.deleteDirectory(this._config.outDir);
            this.createDirectory(this._config.outDir);
        }

        const text = this.component2string(<SwaggerAllInOneFileAdapter doc={swaggerDoc}/>);
        this.writeToFile(`${this._config.outDir}/index.ts`, text);
    }
}
