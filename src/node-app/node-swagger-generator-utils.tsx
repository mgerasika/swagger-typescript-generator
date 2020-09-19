import * as fs from 'fs';
import * as React from 'react';
import {ReactElement} from 'react';
import {INodeSwaggerConfigBase} from "./node-swagger-config";
import {defaultComponents, defaultUtils} from "../react-app/src/swagger/common";
import {SwaggerDoc} from "../react-app/src/swagger/models";
import {renderToString} from "react-dom/server";
import {html2text} from "../react-app/src/swagger/utils";
import {execSync} from "child_process";

const _ = require('lodash');
const Path = require('path');
const tscArgs = [
    '--module commonjs',
    '--noImplicitAny false',
    '--suppressImplicitAnyIndexErrors true',
    '--target ES5',
    '--moduleResolution node',
    '--removeComments true',
    '--lib es5,es6',
    '--sourceMap',
    '--declaration true',
    '--skipLibCheck'
];

class NodeSwaggerGeneratorUtils {
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
            swaggerDoc = _.clone(config.createDocumentFactory(swaggerDoc),true);
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

    public compileTsc(inputFile:string){
        const cmd = `npx tsc ${inputFile} ${tscArgs.join(" ")}`;
        try {
            execSync(cmd);
        }
        catch (ex) {
            console.error('execSync error ' + cmd + ' error = ' + ex);
        }
    }
}
export const nodeSwaggerGeneratorUtils = new NodeSwaggerGeneratorUtils();
