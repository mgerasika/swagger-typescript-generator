import {ISwaggerConfig} from './swagger-config';
import * as fs from 'fs';
import {SwaggerClass, SwaggerDefinition, SwaggerDoc} from '../react-app/dist/swagger/model';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {SwaggerDefinitionProperty} from '../react-app/src/swagger/model';
import {ModelDefinition} from '../react-app/dist/swagger/ts-generator/definitions';

const html2text = (html: string) => {
    return html.replace(/<(?:.|\n)*?>/gm, '');
};

const makeFileName = (name: string) => {
    let words = name.split(/(?=[A-Z])/).map((i: string) => i.toLowerCase());
    words = words.filter((f: string) => !['api', 'i'].includes(f));
    return `${words.join('-')}.ts`;
};

interface IProps {
    definition: SwaggerDefinition;
}

export const ModelDefinition2: React.FC<IProps> = (props) => {
    const fields = props.definition.properties.map((parameter: SwaggerDefinitionProperty) => {
        return (<span key={parameter.name}>{'\t'}{parameter.name}:{parameter.type}{'\n'}</span>);
    });
    return (
        <>
            export interface {props.definition.name}
            {'{\n'} {fields}
            {'}'}
        </>
    );
};

export class SwaggerGenerator {
    private _config: ISwaggerConfig;

    constructor(config: ISwaggerConfig) {
        this._config = config;
    }

    generate() {
        const swaggerDoc: SwaggerDoc = new SwaggerDoc(this._config.swaggerInputJson);
        swaggerDoc.definitions.forEach((swaggerDefinition: SwaggerDefinition) => {
            const filePath = `${this._config.modelFilesOutDir}/${makeFileName(swaggerDefinition.name)}`;
            const html = renderToString(<ModelDefinition2 definition={swaggerDefinition}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${makeFileName(swaggerClass.name)}`;
            const html = '';//renderToString(<ClassDefinition swaggerClass={swaggerClass}/>);
            const text = html2text(html);
            this.writeToFile(filePath, text);
        });
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
            //convert here
        });
    }
}
