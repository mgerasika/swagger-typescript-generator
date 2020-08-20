import {INodeSwaggerConfig} from './node-swagger-config';
import * as fs from 'fs';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
const Path = require('path');
import {
    defaultComponents,
    defaultUtils,
    html2text,
    SwaggerAllClassesExportAdapter,
    SwaggerAllEnumsExportAdapter,
    SwaggerAllModelsExportAdapter,
    SwaggerAllUrlsComponent,
    SwaggerApiClassAdapter,
    SwaggerClass,
    SwaggerDoc,
    SwaggerEnum,
    SwaggerEnumAdapter,
    SwaggerModel,
    SwaggerModelAdapter,
} from "../react-app/src/main";

export class NodeSwaggerGenerator {
    private _config: INodeSwaggerConfig;

    constructor(config: INodeSwaggerConfig) {
        this._config = config;
    }

    generate() {
        if(this._config.apiFilesOutDir) {
            this.deleteFolderRecursive(this._config.apiFilesOutDir);
            this.createDirectory(this._config.apiFilesOutDir);
        }
        if(this._config.modelFilesOutDir) {
            this.deleteFolderRecursive(this._config.modelFilesOutDir);
            this.createDirectory(this._config.modelFilesOutDir);
        }
        if(this._config.urlFileOutDir) {
            this.deleteFolderRecursive(this._config.urlFileOutDir);
            this.createDirectory(this._config.urlFileOutDir);
        }
        if(this._config.enumFilesOutDir) {
            this.deleteFolderRecursive(this._config.enumFilesOutDir);
            this.createDirectory(this._config.enumFilesOutDir);
        }
        const utils = this._config.createUtilsFactory ? this._config.createUtilsFactory(defaultUtils) : defaultUtils;
        const components = this._config.createComponentsFactory ? this._config.createComponentsFactory(defaultComponents) : defaultComponents;
        let swaggerDoc = new SwaggerDoc(this._config.swaggerDocConfig, utils,components);
        if(this._config.createDocumentFactory) {
            swaggerDoc = this._config.createDocumentFactory(swaggerDoc);
            swaggerDoc.init();
        }
        swaggerDoc.definitions.forEach((swaggerDefinition: SwaggerModel) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.fileName}`;
            const html = renderToString(<SwaggerModelAdapter swaggerModel={swaggerDefinition}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.fileName}`;
            const html = renderToString(<SwaggerApiClassAdapter swaggerClass={swaggerClass}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.enums.forEach((swaggerEnum: SwaggerEnum) => {
            const filePath = `${this._config.enumFilesOutDir}/${swaggerEnum.fileName}`;
            const html = renderToString(<SwaggerEnumAdapter swaggerEnum={swaggerEnum}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        {
            const html = renderToString(<SwaggerAllClassesExportAdapter doc={swaggerDoc} swaggerClasses={swaggerDoc.classes}/>);
            const text = html2text(html);
            const filePath = `${this._config.apiFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const html = renderToString(<SwaggerAllModelsExportAdapter  doc={swaggerDoc} models={swaggerDoc.definitions}/>);
            const text = html2text(html);
            const filePath = `${this._config.modelFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const html = renderToString(<SwaggerAllEnumsExportAdapter doc={swaggerDoc} enums={swaggerDoc.enums}/>);
            const text = html2text(html);
            const filePath = `${this._config.enumFilesOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }

        {
            const html = renderToString(<SwaggerAllUrlsComponent doc={swaggerDoc} classes={swaggerDoc.classes}/>);
            const text = html2text(html);
            const filePath = `${this._config.urlFileOutDir}/index.ts`;
            this.writeToFile(filePath, text);
        }
    }

    public deleteFolderRecursive (urlToDir:string) {
        if (fs.existsSync(urlToDir)) {
            fs.readdirSync(urlToDir).forEach((file, index) => {
                const curPath = Path.join(urlToDir, file);
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    this.deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(urlToDir);
        }
    };

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
        fs.writeFileSync(fullPath,content,{
            encoding: 'utf8'
        });
        // bug!!! added strange lines of code
        // fs.writeFile(fullPath, content, (err: any) => {
        //     if(err) {
        //         console.error(`write to file error: ${fullPath}`,content);
        //     }
        //     else {
        //         console.log(`write to file success: ${fullPath}`, content);
        //     }
        // });
    }
}
