import {SwaggerMethodModel} from './swagger-method';
import {SwaggerDocModel} from './swagger-doc-model';
import { parentSymbol, sourceSymbol} from '../utils';
import {SwaggerPathModel} from "./swagger-path";
import {SwaggerModelBase} from "./swagger-model-base";

export class SwaggerClassModel extends SwaggerModelBase<SwaggerDocModel>{
    public name: string = '';
    public fileName: string;
    public tag:string = "";
    public methods: SwaggerMethodModel[] = [];

    public constructor(parent: SwaggerDocModel, name: string, source: any, paths:SwaggerPathModel[]) {
        super();

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
}
