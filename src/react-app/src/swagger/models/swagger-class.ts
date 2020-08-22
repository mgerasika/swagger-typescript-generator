import {SwaggerMethod} from './swagger-method';
import {SwaggerDoc as SwaggerDoc} from './swagger-doc';
import {SwaggerPath} from "./swagger-path";
import {SwaggerBase} from "./swagger-base";

export class SwaggerClass extends SwaggerBase<SwaggerDoc> {
    public name: string = '';
    public fileName: string;
    public tag: string = "";
    public methods: SwaggerMethod[] = [];

    public constructor(parent: SwaggerDoc, name: string, source: any, paths: SwaggerPath[]) {
        super();

        this.parent = parent;
        this.source = source;
        this.tag = name;
        this.name = this.utils.getClassName(this, name);
        this.fileName = this.utils.getClassFileName(this, this.name);

        this.methods = paths.map(obj2 => {
            return new SwaggerMethod(this, obj2.httpMethod, obj2, obj2.source[obj2.httpMethod]);
        });
    }

    public init() {
        this.methods.forEach(m => m.init());
    }
}
