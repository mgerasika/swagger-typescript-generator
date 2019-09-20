import { SwaggerMethod } from './swagger-method';
import { SwaggerDoc } from './swagger-doc';
export declare class SwaggerClass {
    name: string;
    url: string;
    fileName: string;
    methods: SwaggerMethod[];
    constructor(parent: SwaggerDoc, key: string, source: any);
    source: any;
    parent: SwaggerDoc;
}
