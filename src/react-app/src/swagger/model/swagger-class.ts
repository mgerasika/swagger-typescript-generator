import {SwaggerMethodModel} from './swagger-method';
import {SwaggerDocModel} from './swagger-doc-model';
import {capitalize, makeFileName, sourceSymbol,parentSymbol} from '../utils';

export class SwaggerClassModel {
    public name: string = '';
    public url: string;
    public fileName: string;
    public methods: SwaggerMethodModel[] = [];

    public constructor(parent: SwaggerDocModel, key: string, source: any) {
        this.parent = parent;
        this.source = source;

        // eslint-disable-next-line
        this.name = key.replace(/[\{\}]/g, '').split('/').map(s => capitalize(s)).join('');
        this.url = key;
        this.fileName = makeFileName(this.name);

        this.methods = Object.keys(source).reduce((accum2: any, key2) => {
            const obj2 = source[key2];
            accum2.push(new SwaggerMethodModel(this, key2, obj2));
            return accum2;
        }, []);
    }

    public get plugin(){
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
