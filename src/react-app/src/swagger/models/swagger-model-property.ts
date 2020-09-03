import {SwaggerBase} from "./swagger-base";
import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {SwaggerBasePrivateProps} from "./swagger-base-private-props";
import {IModelType} from "./model-type";

interface PrivateProps extends SwaggerBasePrivateProps<SwaggerModel> {
    enumModelRef:SwaggerEnum;
    subModelRef:SwaggerModel;
    originalName:string;
}
export class SwaggerModelProperty extends SwaggerBase<SwaggerModel,PrivateProps> {
    public name: string = '';

    public modelType:IModelType;
    public required?: boolean;
    public maxNumber?: number;
    public minNumber?: number;
    public description?: string;

    public get enumModelRef(): SwaggerEnum {
        return this.getPrivate('enumModelRef') as SwaggerEnum;
    }

    public set enumModelRef(val: SwaggerEnum) {
        this.setPrivate('enumModelRef', val);
    }

    public get subModelRef(): SwaggerModel {
        return this.getPrivate('subModelRef') as SwaggerModel;
    }

    public set subModelRef(val: SwaggerModel) {
        this.setPrivate('subModelRef', val);
    }

    public constructor(parent: SwaggerModel, name: string, source: any, required?:boolean) {
        super();

        this.modelType = {};
        this.source = source;
        this.parent = parent;

        this.setPrivate('originalName',name)
        this.name = name;
        this.maxNumber = source.maximum !== undefined ? source.maximum : undefined;
        this.minNumber = source.minimum !== undefined ? source.minimum : undefined;
        this.description = source.description !== undefined ? source.description : undefined;
        this.modelType.isEnum = this.utils.isEnum(source) ? true : undefined;
        this.modelType.type = this.utils.getModelPropertyType(this, source);
        this.modelType.isJsType = this.utils.isJsType(this.modelType.type);
        this.modelType.isArray = this.utils.isArray(source) ? true : undefined;
        this.required = required;
        if (this.modelType.isEnum) {
            this.modelType.enumValues = this.utils.getEnumValues(source);
        }
        if(this.modelType.isArray) {
            const type = this.utils.getArrayItemType(source);
            this.modelType.arrayItemType = type || undefined;
        }
    }

    public clone(){
        const res = new SwaggerModelProperty(this.parent,this.getPrivate('originalName'),this.source,this.required);
        this.copyTo(res);
        return res;
    }

    public init() {
        if (this.modelType.isEnum) {
            this.initEnumRef();
        }
        if (!this.modelType.isEnum && !this.modelType.isJsType) {
            this.initModelRef();
        }
    }

    private initEnumRef(){
        const fullName = this.parent.name + "." + this.name + 'Enum';
        let enumRef = this.doc.enums.find(f => f.fullName === fullName);
        if (enumRef) {
            this.enumModelRef = enumRef;
            this.modelType.type = enumRef.fullName;
        } else {
            enumRef = this.doc.enums.find(f => f.fullName === this.name);
            if (enumRef) {
                this.enumModelRef = enumRef;
                this.modelType.type = enumRef.fullName;
            }
        }

        if (enumRef) {
            if(this.modelType.isArray) {
                this.modelType.arrayItemType = enumRef.fullName;
                this.modelType.type = `Array<${this.modelType.arrayItemType}>`;
            }
        }
        else {
            console.error('Enum not found [model property] = ' +this.name + ' [model name] = ' + this.parent.name);
        }
    }

    private initModelRef(){
        const modelRef = this.doc.definitions.find(f => f.name === this.modelType.type || f.name === this.modelType.arrayItemType);
        if (modelRef) {
            this.subModelRef = modelRef;
            this.modelType.type = modelRef.name;

            if(this.modelType.isArray) {
                this.modelType.arrayItemType = modelRef.name;
                this.modelType.type = `Array<${this.modelType.arrayItemType}>`;
            }
        } else {
            console.error('Model not found into swagger-def-model ' + this.modelType.type, this);
        }
    }
}
