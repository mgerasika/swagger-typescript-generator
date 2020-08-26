import {SwaggerDoc} from './swagger-doc';
import {SwaggerBase} from "./swagger-base";
import {SwaggerModelProperty} from "./swagger-model-property";

export class SwaggerModel extends SwaggerBase<SwaggerDoc> {

    public type: string = '';
    public name: string = '';
    public fileName: string = "";
    public properties: SwaggerModelProperty[] = [];

    public constructor(parent: SwaggerDoc, name: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.name = this.utils.getModelName(this, name);
        this.fileName = this.utils.getModelFileName(this, name);
        this.type = this.utils.getModelType(this, source);

        const requiredArray = source.required || [];
        this.properties = Object.keys(source.properties).map(( propertyName) => {
            const property = source.properties[propertyName];
            const required = requiredArray.some((x: string) => x === propertyName) ? true : undefined;;
            return new SwaggerModelProperty(this, propertyName, property, required);
        })
    }

    public init() {
        this.properties.forEach(p => p.init());
    }
}

