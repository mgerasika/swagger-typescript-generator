import * as React from 'react';
import axios from 'axios';
import {INodeSwaggerConfigForMultiFile} from './node-swagger-config';
import * as path from 'path';
import {NodeSwaggerGeneratorForMultiFile} from "./node-swagger-generator-for-multi-file";

const url = 'https://petstore.swagger.io/v2/swagger.json';
axios.get(url)
    .then(response => {
        generate(response.data);
    })
    .catch(error => {
        console.log('demo:' + error);
    });

const generate = (json: any) => {
    const parentDir = path.resolve(__dirname, '..');
    console.log('parentDir=' + parentDir);


    const config: INodeSwaggerConfigForMultiFile = {
        apiFilesOutDir: `${parentDir}/../gen/api`,
        modelFilesOutDir: `${parentDir}/../gen/api-model`,
        enumFilesOutDir: `${parentDir}/../gen/api-enum`,
        createComponentsFactory: (baseComponents) => baseComponents,
        createUtilsFactory: (baseUtils) => baseUtils,
        createDocumentFactory: (baseDocument) => baseDocument,
        swaggerDocConfig: {
            modelImportPath: '../api-model',
            enumImportPath: '../api-enum',
            apiUrl: url,
            source: json,
        }
    };
    const swaggerGenerator = new NodeSwaggerGeneratorForMultiFile(config);
    try {
        swaggerGenerator.generate();
    } catch (e) {
        console.log('generator error ' + e);
    }
};

