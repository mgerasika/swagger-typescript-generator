import {SwaggerDoc} from './swagger-doc';
import {SwaggerBase} from "./swagger-base";
import {uniqueItems} from "../common";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";

export interface ISwaggerPath{

}
interface PrivateProps extends SwaggerBasePrivateProps<SwaggerDoc> {
}
export class SwaggerPath extends SwaggerBase<SwaggerDoc,PrivateProps> implements ISwaggerPath{
    public name: string = '';
    public url: string;
    public tags: string[] = [];
    public httpMethods: string[] = [];

    public constructor(parent: SwaggerDoc, key: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getPathName(this, key);
        this.url = key;

        Object.keys(source).forEach(key => {
            const el = source[key];

            this.httpMethods.push(key);
            this.tags.push(el.tags);
        })
        this.tags = uniqueItems((this.tags as any).flat(), it => it );
    }

    public init() {
    }
}
