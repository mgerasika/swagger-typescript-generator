import {SwaggerMethodModel} from './swagger-method';
import {SwaggerDocModel} from './swagger-doc-model';
import { parentSymbol, sourceSymbol} from '../utils';
import {SwaggerModelBase} from "./swagger-model-base";

export class SwaggerPathModel extends SwaggerModelBase<SwaggerDocModel>{
    public name: string = '';
    public url:string;
    public tag:string = '';
    public httpMethod:string = '';

    public constructor(parent: SwaggerDocModel, key: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getPathName(this,key);
        this.url = key;
        Object.keys(source).forEach(f=>{
            this.httpMethod = f;
            const el = source[f];
            this.tag = el.tags[0];
        })
    }

    public init(){
    }
}
