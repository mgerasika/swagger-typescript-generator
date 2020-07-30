import * as React from 'react';
import axios from 'axios';
import {INodeSwaggerConfig} from './node-swagger-config';
import {SwaggerGenerator} from './swagger-generator';
import * as path from 'path';
import {defaultPlugin} from '../../dist/dist-react-app/swagger/common';

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
        modelImportPath: '../api-model',
        plugin: defaultPlugin as any,
        swaggerInputJson: json,
        createSwaggerUtilsFactory: (baseUtils) => baseUtils
    };
    const swaggerGenerator = new SwaggerGenerator(config);
    try {
        swaggerGenerator.generate();
    }
    catch (e) {
        console.log('generator error ' + e);
    }
};

