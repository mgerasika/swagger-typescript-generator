import {SwaggerBase} from "./swagger-base";
import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";

export class SwaggerModelProperty extends SwaggerBase<SwaggerModel> {
    public name: string = '';
    public type: string = '';
    public arrayItemType?: string;
    public isArray?: boolean;
    public isEnum?: boolean;
    public required?: boolean;
    public isJsType: boolean;
    public enumValues?: string[];
    public maxNumber?: number;
    public minNumber?: number;
    public description?: string;

    public get enumModelRef(): SwaggerEnum {
        return this.getPrivateValue('enumModelRef') as SwaggerEnum;
    }

    public set enumModelRef(val: SwaggerEnum) {
        this.setPrivateValue('enumModelRef', val);
    }

    public get subModelRef(): SwaggerModel {
        return this.getPrivateValue('subModelRef') as SwaggerModel;
    }

    public set subModelRef(val: SwaggerModel) {
        this.setPrivateValue('subModelRef', val);
    }

    public constructor(parent: SwaggerModel, name: string, source: any, required?:boolean) {
        super();

        this.source = source;
        this.parent = parent;

        this.name = name;
        this.maxNumber = source.maximum !== undefined ? source.maximum : undefined;
        this.minNumber = source.minimum !== undefined ? source.minimum : undefined;
        this.description = source.description !== undefined ? source.description : undefined;
        this.isEnum = this.utils.isEnum(source) ? true : undefined;
        this.type = this.utils.getModelPropertyType(this, source);
        this.isJsType = this.utils.isJsType(this.type);
        this.isArray = this.utils.isArray(source) ? true : undefined;
        this.required = required;
        if (this.isEnum) {
            this.enumValues = this.utils.getEnumValues(source);
        }
    }

    public init() {
        if (this.isEnum) {
            this.initEnumRef();
        }
        if (!this.isEnum && !this.isJsType) {
            this.initModelRef();
        }
    }

    private initEnumRef(){
        const fullName = this.parent.name + "." + this.name + 'Enum';
        let enumRef = this.doc.enums.find(f => f.fullName === fullName);
        if (enumRef) {
            this.enumModelRef = enumRef;
            this.type = enumRef.fullName;
        } else {
            enumRef = this.doc.enums.find(f => f.fullName === this.name);
            if (enumRef) {
                this.enumModelRef = enumRef;
                this.type = enumRef.fullName;
            }
        }

        if (enumRef) {
            if(this.isArray) {
                this.arrayItemType = enumRef.fullName;
                this.type = `Array<${this.arrayItemType}>`;
            }
        }
        else {
            console.error('Enum not found [model property] = ' +this.name + ' [model name] = ' + this.parent.name);
        }
    }

    private initModelRef(){
        const modelRef = this.doc.definitions.find(f => f.name === this.type || f.name === this.arrayItemType);
        if (modelRef) {
            this.subModelRef = modelRef;
            this.type = modelRef.name;

            if(this.isArray) {
                this.arrayItemType = modelRef.name;
                this.type = `Array<${this.arrayItemType}>`;
            }
        } else {
            console.error('Model not found into swagger-def-model ' + this.type, this);
        }
    }
}
