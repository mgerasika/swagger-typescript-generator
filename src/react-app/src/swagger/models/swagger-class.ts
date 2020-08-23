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

        this.methods = (paths.map(path => {
            return path.httpMethods.map(httpMethod => {
                return new SwaggerMethod(this, httpMethod, path, path.source[httpMethod]);
            })
        }) as any).flat();
    }

    public init() {
        this.methods.forEach(m => m.init());
    }
}
