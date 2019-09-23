import {getJsType, makeFileName, sourceSymbol} from '../utils';

export class SwaggerDefinitionModel {
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public type: string = '';
    public name: string = '';
    public fileName:string = "";
    public properties: SwaggerDefinitionProperty[] = [];

    public constructor(name: string, source: any) {
        this.source = source;

        this.name = `I${name}`;
        this.fileName = makeFileName(name);
        this.type = getJsType(source.type);

        this.properties = Object.keys(source.properties).reduce((accum2: any, key2) => {
            const obj2 = source.properties[key2];
            accum2.push(new SwaggerDefinitionProperty(key2, obj2));
            return accum2;
        }, [])
    }
}

export class SwaggerDefinitionProperty {
    public get source() {
        return (this as any)[sourceSymbol];
    }

    public set source(val) {
        (this as any)[sourceSymbol] = val;
    }

    public name: string = '';
    public type: string = '';

    public constructor(name: string, source: any) {
        this.source = source;

        this.name = name;
        this.type = getJsType(source.type);
    }
}
