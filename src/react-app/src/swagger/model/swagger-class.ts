import {SwaggerMethodModel} from './swagger-method';
import {SwaggerDocModel} from './swagger-doc-model';
import { parentSymbol, sourceSymbol} from '../utils';
import {SwaggerPathModel} from "./swagger-path";

export class SwaggerClassModel {
    public name: string = '';
    public fileName: string;
    public tag:string = "";
    public methods: SwaggerMethodModel[] = [];

    public get doc() {
        return this.parent;
    }

    public get utils() {
        return this.parent.utils;
    }

    public constructor(parent: SwaggerDocModel, name: string, source: any, paths:SwaggerPathModel[]) {
        this.parent = parent;
        this.source = source;
        this.tag = name;
        this.name = this.utils.getClassName(this,name);
        this.fileName = this.utils.getClassFileName(this,this.name);

        this.methods = paths.map( obj2 => {
            return new SwaggerMethodModel(this, obj2.httpMethod, obj2.source[obj2.httpMethod]);
        });
    }

    public init(){
        this.methods.forEach(m=>m.init());
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
