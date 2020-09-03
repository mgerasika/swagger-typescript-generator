import {SwaggerDoc} from './swagger-doc';
import {SwaggerBase} from "./swagger-base";
import {SwaggerModelProperty} from "./swagger-model-property";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";

export interface ISwaggerModel{
    type: string;
    name: string;
    fileName: string;
    properties: SwaggerModelProperty[];
}

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerDoc> {
    originalName:string;
}

export class SwaggerModel extends SwaggerBase<SwaggerDoc,PrivateProps> implements ISwaggerModel{
    public type: string = '';
    public name: string = '';
    public fileName: string = "";
    public properties: SwaggerModelProperty[] = [];

    public constructor(parent: SwaggerDoc, name: string, source: any) {
        super();

        this.parent = parent;
        this.source = source;

        this.setPrivate('originalName',name)
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

    public clone(){
        const res = new SwaggerModel(this.parent,this.getPrivate('originalName'),this.source);
        this.copyTo(res);
        return res;
    }

    public init() {
        this.properties.forEach(p => p.init());
    }
}

