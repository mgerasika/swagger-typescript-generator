import {INodeSwaggerConfig} from './node-swagger-config';
import * as fs from 'fs';
import {ISwaggerPlugin,ISwaggerUtils} from '../../dist/dist-react-app/swagger/common';

import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {
    AllModelsExportComponent,
    ApiAllClassesExportComponent,
    ApiClassDefinitionComponent,
    ApiUrlsComponent,
    html2text,
    ModelDefinitionComponent,
} from '../../dist/dist-react-app/swagger';
import {
    ISwaggerDocModelConfig,
    SwaggerClassModel,
    SwaggerDefinitionModel,
    SwaggerDocModel
} from '../../dist/dist-react-app/swagger/model';


export class SwaggerGenerator {
    private _config: INodeSwaggerConfig;

    constructor(config: INodeSwaggerConfig) {
        this._config = config;
    }

    generate() {
        const swaggerConfig: ISwaggerDocModelConfig = {
            source: this._config.swaggerInputJson,
            modelImportPath: this._config.modelImportPath,
            plugin: this._config.plugin as any,
            createCustomUtilsFactory: (baseUtils:ISwaggerUtils)=> baseUtils
        };

        if(this._config.apiFilesOutDir) {
            this.createDirectory(this._config.apiFilesOutDir);
        }
        if(this._config.modelFilesOutDir) {
            this.createDirectory(this._config.modelFilesOutDir);
        }
        if(this._config.urlFileOutDir) {
            this.createDirectory(this._config.urlFileOutDir);
        }
        const swaggerDoc: SwaggerDocModel = new SwaggerDocModel(swaggerConfig);
        swaggerDoc.definitions.forEach((swaggerDefinition: SwaggerDefinitionModel) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.fileName}`;
            const html = renderToString(<ModelDefinitionComponent definition={swaggerDefinition}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClassModel) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.fileName}`;
            const html = renderToString(<ApiClassDefinitionComponent swaggerClass={swaggerClass}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        {
            const html = renderToString(<ApiAllClassesExportComponent classes={swaggerDoc.classes}/>);
            const text = html2text(html);
            const filePath = `${this._config.apiFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const html = renderToString(<AllModelsExportComponent definitions={swaggerDoc.definitions}/>);
            const text = html2text(html);
            const filePath = `${this._config.modelFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const html = renderToString(<ApiUrlsComponent classes={swaggerDoc.classes}/>);
            const text = html2text(html);
            const filePath = `${this._config.urlFileOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }
    }

    private createDirectory(dir: string) {
        const modelDirs = dir.split('/');
        const [first, ...rest] = modelDirs;

        rest.reduce((accum: string, subDir: string) => {
            const newDir = `${accum}/${subDir}`;
            console.log('ensure dir ' + newDir.toString());
            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir);
            }
            return newDir;
        }, first);
    }

    private writeToFile(fullPath: string, content: string) {
        fs.writeFile(fullPath, content, (err: any) => {
            if(err) {
                console.error('error write to file ' + err);
            }
            else {
                console.log(`write to file success: ${fullPath}`);
            }
        });
    }
}
