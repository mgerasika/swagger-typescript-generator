import {ISwaggerConfig} from "./swagger-config";
import {SwaggerGenerator} from "./swagger-generator";
import axios from 'axios';
import * as path from "path";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {HiComponent} from './hi';
const ReactJSDOM = require('react-jsdom');
export * from './log-service';
export * from './swagger-config';
export * from './swagger-generator';
export * from './hi';

// const url = "http://192.168.235.1:84/swagger/docs/v1";
//
// axios.get(url)
//     .then(response => {
//         generate(response.data);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//
// const generate = (json: any) => {
//     const parentDir = path.resolve(__dirname,'..');
//     console.log('parentDir' + parentDir)
//
//     const config: ISwaggerConfig = {
//         apiFilesOutDir: `${parentDir}/gen/api`,
//         modelFilesOutDir: `${parentDir}/gen/model`,
//         plugins: [],
//         swaggerInputJson: json
//     }
//     const swaggerGenerator = new SwaggerGenerator(config);
//     swaggerGenerator.generate();
// }

const body = renderToString(React.createElement(HiComponent));
console.log(body)

