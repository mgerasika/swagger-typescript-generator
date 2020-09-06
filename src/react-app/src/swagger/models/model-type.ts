import {ObjectEx} from "./object-ex";
import {ObjectPrivateProps} from "./swagger-base-private-props";
import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {ISwaggerDocConfig} from "./swagger-doc-config";

type PrivateProps = {
    config:ISwaggerDocConfig;
    modelRef: SwaggerModel;
    enumRef: SwaggerEnum;
    type: string;
    arrayItemType: string | undefined;
} & ObjectPrivateProps;

export class ModelType extends ObjectEx<PrivateProps> {
    isArray?: boolean;
    isEnum?: boolean;
    isJsType?: boolean;
    enumValues?: string[];

    constructor(config:ISwaggerDocConfig) {
        super();

        this.setPrivate('config', config);
    }
    get type() {
        if (this.enumRef) {
            return this.isArray ? `Array<${this.arrayItemType}>` : this.enumRef.getFullName;
        }
        if (this.modelRef) {
            return this.isArray ? `Array<${this.arrayItemType}>` : this.modelRef.name;
        }
        return this.getPrivate('type');
    }

    set type(val: string) {
        this.setPrivate('type', val);
    }

    get arrayItemType() {
        if (this.enumRef && this.isArray) {
            return this.enumRef.getFullName;
        }
        if (this.modelRef && this.isArray) {
            return this.modelRef.name;
        }
        return this.getPrivate('arrayItemType');
    }

    set arrayItemType(val: string | undefined) {
        this.setPrivate('arrayItemType', val);
    }

    get modelRef():SwaggerModel |undefined{
        return this.getPrivate('modelRef');
    }

    set modelRef(val: SwaggerModel|undefined) {
        this.setPrivate('modelRef', val);
    }

    get enumRef():SwaggerEnum | undefined {
        return this.getPrivate('enumRef');
    }

    set enumRef(val: SwaggerEnum | undefined) {
        this.setPrivate('enumRef', val);
    }

    get config():ISwaggerDocConfig {
        return this.getPrivate('config');
    }

    toJSON() {
        const privateFields = this.config.showPrivateFieldsForDebug ? {
            enumRef:this.enumRef,
            modelRef:this.modelRef
        } : {};

        return {
            ...this,
            type: this.type,
            arrayItemType: this.arrayItemType,
            ...privateFields
        }
    }
}