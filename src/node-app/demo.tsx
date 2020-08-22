import * as React from 'react';
import axios from 'axios';
import { INodeSwaggerConfigForOneFile} from './node-swagger-config';
import * as path from 'path';
import {NodeSwaggerGeneratorForSingleFile} from "./node-swagger-generator-for-single-file";

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


    const config: INodeSwaggerConfigForOneFile = {
        outDir: `${parentDir}/../gen`,
        createComponentsFactory: (baseComponents) => baseComponents,
        createUtilsFactory: (baseUtils) => baseUtils,
        createDocumentFactory: (baseDocument) => baseDocument,
        swaggerDocConfig: {
            apiUrl: url,
            source: json,
        }
    };
    const swaggerGenerator = new NodeSwaggerGeneratorForSingleFile(config);
    try {
        swaggerGenerator.generate();
    } catch (e) {
        console.log('generator error ' + e);
    }
};

