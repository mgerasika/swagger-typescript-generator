import {ISwaggerPlugin} from "../../swagger/common/swagger-plugins";
import {ISwaggerConfig} from "./swagger-config";
import {element} from "prop-types";
import {renderToString} from "react-dom/server";
import * as fs from 'fs';
import * as path from 'path';
import {SwaggerDoc} from "../../swagger/model/swagger-doc";
import {SwaggerClass} from "../../swagger/model/swagger-class";
import {SwaggerDefinition} from "../../swagger/model/swagger-definition";
import {logService} from "./log-service";

export class SwaggerGenerator {
    private _config: ISwaggerConfig;

    constructor(config: ISwaggerConfig) {
        this._config = config;
    }

    generate() {
        const swaggerDoc: SwaggerDoc = new SwaggerDoc(this._config.swaggerInputJson);
        swaggerDoc.definitions.forEach((swaggerDefinition: SwaggerDefinition) => {
            const filePath = `${this._config.modelFilesOutDir}/${swaggerDefinition.name}.ts`;
            this.writeToFile(filePath, 'definition content');

            logService.log(filePath);
        });

        swaggerDoc.classes.forEach((swaggerClass: SwaggerClass) => {
            const filePath = `${this._config.apiFilesOutDir}/${swaggerClass.name}.ts`;
            this.writeToFile(filePath, 'api content');


            logService.log(filePath);
        })
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
        });
    }
}
