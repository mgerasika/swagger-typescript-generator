import {SwaggerDefinition} from "./swagger-definition";
import {SwaggerClass} from "./swagger-class";

const sourceSymbol = Symbol("source");

export class SwaggerDoc {
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public definitions: SwaggerDefinition[] = [];
    public classes: SwaggerClass[] = [];

    public constructor(source: any) {
        this.source = source;

        this.definitions = Object.keys(this.source.definitions).reduce((accum: SwaggerDefinition[], key) => {
            const obj = this.source.definitions[key];
            accum.push(new SwaggerDefinition(key, obj));
            return accum;
        }, []);


        this.classes = Object.keys(this.source.paths).reduce((accum: SwaggerClass[], key) => {
            const obj = this.source.paths[key];
            accum.push(new SwaggerClass(this, key, obj));
            return accum;
        }, []);
    }
}
