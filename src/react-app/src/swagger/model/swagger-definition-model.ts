import {SwaggerDocModel} from './swagger-doc-model';
import {SwaggerModelBase} from "./swagger-model-base";
import {SwaggerDefinitionProperty} from "./swagger-definition-model-property";

export class SwaggerDefinitionModel extends SwaggerModelBase<SwaggerDocModel> {

    public type: string = '';
    public name: string = '';
    public fileName:string = "";
    public properties: SwaggerDefinitionProperty[] = [];

    public constructor(parent:SwaggerDocModel,name: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getModelName(this,name);
        this.fileName = this.utils.getModelFileName(this,name);
        this.type = this.utils.getModelType(this,source);

        const requiredArray = source.required || [];
        this.properties = Object.keys(source.properties).reduce((accum2: any, key2) => {
            const obj2 = source.properties[key2];
            const prop = new SwaggerDefinitionProperty(this,key2, obj2);
            prop.required = requiredArray.some((x:string) => x === prop.name) ? true : undefined;
            accum2.push(prop);
            return accum2;
        }, [])
    }

    public init(){
        this.properties.forEach(p=>p.init());
    }
}

