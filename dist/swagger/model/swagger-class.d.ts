import { SwaggerMethod } from "./swagger-method";
import { SwaggerDoc } from "./swagger-doc";
export declare class SwaggerClass {
    source: any;
    parent: SwaggerDoc;
    name: string;
    url: string;
    methods: SwaggerMethod[];
    constructor(parent: SwaggerDoc, name: string, source: any);
}
