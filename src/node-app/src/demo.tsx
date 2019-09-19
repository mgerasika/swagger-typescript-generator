import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {HiComponent} from './hi';
import axios from 'axios';
import {ISwaggerConfig} from './swagger-config';
import {SwaggerGenerator} from './swagger-generator';
import * as path from "path";

export const html2text = (html) => {
    return html.replace(/<(?:.|\n)*?>/gm, '');
};

const body = renderToString(React.createElement(HiComponent));
console.log(body);

const textBody = html2text(body);
console.log(textBody);

const url = 'http://192.168.235.1:84/swagger/docs/v1';
axios.get(url)
    .then(response => {
        generate(response.data);
    })
    .catch(error => {
        console.log(error);
    });

const generate = (json: any) => {
    const parentDir = path.resolve(__dirname,'..');
    console.log('parentDir=' + parentDir)

    const config: ISwaggerConfig = {
        apiFilesOutDir: `${parentDir}/gen/api`,
        modelFilesOutDir: `${parentDir}/gen/model`,
        plugins: [],
        swaggerInputJson: json
    }
    console.log('config='+JSON.stringify(config,null,2));
    const swaggerGenerator = new SwaggerGenerator(config);
    // swaggerGenerator.generate();
}

