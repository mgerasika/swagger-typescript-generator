import * as React from 'react';
import axios from 'axios';
import {INodeSwaggerConfig} from './node-swagger-config';
import {NodeSwaggerGenerator} from './node-swagger-generator';
import * as path from 'path';
import {defaultPlugin} from "../react-app/src/main";

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


    const config: INodeSwaggerConfig = {
        apiFilesOutDir: `${parentDir}/../gen/api`,
        modelFilesOutDir: `${parentDir}/../gen/api-model`,
        urlFileOutDir: `${parentDir}/../gen/api-model-url`,
        enumFilesOutDir: `${parentDir}/../gen/api-enum`,
        createUtilsFactory: (baseUtils) => baseUtils,
        createDocumentFactory: (baseDocument) => baseDocument,
        swaggerDocConfig: {
            modelImportPath: '../api-model',
            enumImportPath: '../api-enum',
            apiUrl: url,
            plugin: defaultPlugin as any,
            source: json,
        }
    };
    const swaggerGenerator = new NodeSwaggerGenerator(config);
    try {
        swaggerGenerator.generate();
    } catch (e) {
        console.log('generator error ' + e);
    }
};

