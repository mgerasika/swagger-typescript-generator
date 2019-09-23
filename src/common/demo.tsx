import * as React from 'react';
import axios from 'axios';
import {ISwaggerConfig} from './swagger-config';
import {SwaggerGenerator} from './swagger-generator';
import * as path from 'path';
import {defaultPlugin} from '../react-app/dist/swagger/components';

const url = 'http://192.168.235.1:84/swagger/docs/v1';
axios.get(url)
    .then(response => {
        generate(response.data);
    })
    .catch(error => {
        console.log('axios ' + error);
    });

const generate = (json: any) => {
    const parentDir = path.resolve(__dirname, '..');
    console.log('parentDir=' + parentDir);

    const config: ISwaggerConfig = {
        apiFilesOutDir: `${parentDir}/gen/api`,
        modelFilesOutDir: `${parentDir}/gen/model`,
        plugin: defaultPlugin as any,
        swaggerInputJson: json
    };
    const swaggerGenerator = new SwaggerGenerator(config);
    swaggerGenerator.generate();
};

