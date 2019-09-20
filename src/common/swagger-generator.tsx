import {ISwaggerConfig} from './swagger-config';
import * as fs from 'fs';
import {SwaggerClass, SwaggerDefinition, SwaggerDoc} from '../react-app/dist/swagger/model';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {
    ApiClassDefinitionComponent,
    html2text,
    IRequestService,
    ModelDefinitionComponent
} from '../react-app/dist/swagger';

interface IProps {
    definition: SwaggerDefinition;
}

export class SwaggerGenerator {
    private _config: ISwaggerConfig;

    constructor(config: ISwaggerConfig) {
          this._config = config;
    }

    generate() {
        const swaggerDoc: SwaggerDoc = new SwaggerDoc(this._config.swaggerInputJson);
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
