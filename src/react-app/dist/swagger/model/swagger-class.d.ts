import { SwaggerMethodModel } from './swagger-method';
import { SwaggerDocModel } from './swagger-doc-model';
export declare class SwaggerClassModel {
    name: string;
    url: string;
    fileName: string;
    methods: SwaggerMethodModel[];
    constructor(parent: SwaggerDocModel, key: string, source: any);
    readonly plugin: import("..").ISwaggerPlugin;
    source: any;
    parent: SwaggerDocModel;
}
