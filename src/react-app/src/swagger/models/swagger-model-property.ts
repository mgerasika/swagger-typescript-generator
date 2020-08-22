import {SwaggerBase} from "./swagger-base";
import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {getIsEnumForDefinition, getIsJsType, getResponseIsArray} from "../common";

export class SwaggerModelProperty extends SwaggerBase<SwaggerModel> {
    public name: string = '';
    public type: string = '';
    public arrayItemType?: string;
    public isArray?: boolean;
    public isEnum?: boolean;
    public required?: boolean;
    public isJsType: boolean;
    public enumValues?: [];
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

    public init() {
        if (this.isEnum) {
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
                    this.arrayItemType = this.type;
                    this.type = `Array<${this.type}>`;
                }
            }
            else {
                console.error('Enum not found [model property] = ' +this.name + ' [model name] = ' + this.parent.name);
            }
        }
        if (!this.isEnum && !this.isJsType) {
            const modelRef = this.doc.definitions.find(f => f.name === this.type || f.name === this.arrayItemType);
            if (modelRef) {
                this.subModelRef = modelRef;
                this.type = modelRef.name;

                if(this.isArray) {
                    this.arrayItemType = this.type;
                    this.type = `Array<${this.type}>`;
                }
            } else {
                console.error('Model not found into swagger-def-model ' + this.type, this);
            }
        }
    }

    public constructor(parent: SwaggerModel, name: string, source: any) {
        super();

        this.source = source;
        this.parent = parent;

        this.name = name;
        this.maxNumber = source.maximum !== undefined ? source.maximum : undefined;
        this.minNumber = source.minimum !== undefined ? source.minimum : undefined;
        this.description = source.description !== undefined ? source.description : undefined;
        this.isEnum = getIsEnumForDefinition(source) ? true : undefined;
        this.type = this.utils.getModelPropertyType(this, source);
        this.isJsType = getIsJsType(this.type);
        this.isArray = getResponseIsArray(source) ? true : undefined;
        if (this.isEnum) {
            if (source.enum) {
                this.enumValues = source.enum;
            } else if (source.items?.enum) {
                this.enumValues = source.items.enum;
            }
        }
    }
}
