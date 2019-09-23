import {ISwaggerConfig} from './swagger-config';
import * as fs from 'fs';
import {SwaggerClass, SwaggerDefinition, SwaggerDoc} from '../react-app/src/swagger/model';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {
    AllApiClassesExportComponent,
    AllModelsExportComponent,
    ApiClassDefinitionComponent,
    html2text,
    ISwaggerDocConfig,
    ModelDefinitionComponent
} from '../react-app/dist/swagger';

export class SwaggerGenerator {
    private _config: ISwaggerConfig;

    constructor(config: ISwaggerConfig) {
        this._config = config;
    }

    generate() {
        const swaggerConfig: ISwaggerDocConfig = {
            source: this._config.swaggerInputJson,
            apiFolderPath: '../api',
            modelFolderPath: '../model',
            plugin:this._config.plugin
        };
        const swaggerDoc: SwaggerDoc = new SwaggerDoc(swaggerConfig);
        swaggerDoc.definitions.forEach((swaggerDefinition: SwaggerDefinition) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.fileName}`;
            const html = renderToString(<ModelDefinitionComponent definition={swaggerDefinition}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.fileName}`;
            const html = renderToString(<ApiClassDefinitionComponent swaggerClass={swaggerClass}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        {
            const html = renderToString(<AllApiClassesExportComponent classes={swaggerDoc.classes}/>);
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
            console.error(err);
        });
    }
}
