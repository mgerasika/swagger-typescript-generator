import {SwaggerDoc} from './swagger-doc';
import {SwaggerBase} from "./swagger-base";

export class SwaggerPath extends SwaggerBase<SwaggerDoc> {
    public name: string = '';
    public url: string;
    public tag: string = '';
    public httpMethod: string = '';

    public constructor(parent: SwaggerDoc, key: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getPathName(this, key);
        this.url = key;
        Object.keys(source).forEach(f => {
            this.httpMethod = f;
            const el = source[f];
            this.tag = el.tags[0];
        })
    }

    public init() {
    }
}
