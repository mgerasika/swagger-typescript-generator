import {SwaggerMethodModel} from './swagger-method';
import {SwaggerDocModel} from './swagger-doc-model';
import { parentSymbol, sourceSymbol} from '../utils';

export class SwaggerPathModel {
    public name: string = '';
    public url:string;
    public tag:string = '';
    public httpMethod:string = '';

    public get doc() {
        return this.parent;
    }

    public get utils() {
        return this.parent.utils;
    }

    public constructor(parent: SwaggerDocModel, key: string, source: any) {
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

    public get plugin() {
        return this.parent.config.plugin;
    }

    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public get parent(): SwaggerDocModel {
        return (this as any)[parentSymbol];
    }

    public set parent(val) {
        (this as any)[parentSymbol] = val;
    }
}
