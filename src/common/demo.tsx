import * as React from 'react';
import axios from 'axios';
import {ISwaggerConfig} from './swagger-config';
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

    const config: ISwaggerConfig = {
        apiFilesOutDir: `${parentDir}/gen/api`,
        modelFilesOutDir: `${parentDir}/gen/model`,
        urlFileOutDir: `${parentDir}/gen/model`,
        modelImportPath: '../api-model',
        plugin: defaultPlugin as any,
        swaggerInputJson: json
    };
    const swaggerGenerator = new SwaggerGenerator(config);
    try {
        swaggerGenerator.generate();
    }
    catch (e) {
        console.log('generator error ' + e);
    }
};

