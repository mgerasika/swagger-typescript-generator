import { SwaggerDefinition } from "./swagger-definition";
import { SwaggerClass } from "./swagger-class";
export declare class SwaggerDoc {
    source: any;
    definitions: SwaggerDefinition[];
    classes: SwaggerClass[];
    constructor(source: any);
}
