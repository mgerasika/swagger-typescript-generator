import * as fs from 'fs';
import * as React from 'react';
import {ReactElement} from 'react';
import {INodeSwaggerConfigBase} from "./node-swagger-config";
import {defaultComponents, defaultUtils} from "../react-app/src/swagger/common";
import {SwaggerDoc} from "../react-app/src/swagger/models";
import {renderToString} from "react-dom/server";
import {html2text} from "../react-app/src/swagger";

const Path = require('path');

export abstract class NodeSwaggerGeneratorBase {
    public deleteDirectory(urlToDir: string) {
        this.deleteDirectoryRecursive(urlToDir);
        console.log('delete directory success ' + urlToDir)
    }

    public component2string(component: ReactElement): string {
        const html = renderToString(component);
        const text = html2text(html);
        return text;
    }

    public createSwaggerDoc(config: INodeSwaggerConfigBase) {
        const utils = config.createUtilsFactory ? config.createUtilsFactory(defaultUtils) : defaultUtils;
        const components = config.createComponentsFactory ? config.createComponentsFactory(defaultComponents) : defaultComponents;
        let swaggerDoc = new SwaggerDoc(config.swaggerDocConfig, utils, components);
        if (config.createDocumentFactory) {
            swaggerDoc = config.createDocumentFactory(swaggerDoc);
            swaggerDoc.init();
        }
        return swaggerDoc;
    }

    private deleteDirectoryRecursive(urlToDir: string) {
        if (fs.existsSync(urlToDir)) {
            fs.readdirSync(urlToDir).forEach((file, index) => {
                const curPath = Path.join(urlToDir, file);
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    this.deleteDirectoryRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(urlToDir);
        }
    };

    public createDirectory(dir: string) {
        const modelDirs = dir.split('/');
        const [first, ...rest] = modelDirs;

        rest.reduce((accum: string, subDir: string) => {
            const newDir = `${accum}/${subDir}`;

            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir);
            }
            return newDir;
        }, first);

        console.log('create directory success ' + dir);
    }

    public writeToFile(fullPath: string, content: string) {
        fs.writeFileSync(fullPath, content, {
            encoding: 'utf8'
        });
        console.log('write to file success ' + fullPath);
    }
}
