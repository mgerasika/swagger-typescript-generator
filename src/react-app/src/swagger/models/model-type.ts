import {ObjectEx} from "./object-ex";
import {ObjectPrivateProps} from "./swagger-base-private-props";
import {SwaggerModel} from "./swagger-model";
import {SwaggerEnum} from "./swagger-enum";
import {ISwaggerDocConfig} from "./swagger-doc-config";

type PrivateProps = {
    config: ISwaggerDocConfig;
    modelRef: SwaggerModel;
    enumRef: SwaggerEnum;
    type: string;
    arrayItemType: string | undefined;
} & ObjectPrivateProps;

export interface IModelType {
    isArray?: boolean;
    isEnum?: boolean;
    isJsType?: boolean;
    enumValues?: string[];
    type: string;
    arrayItemType?: string;
}

export class ModelType extends ObjectEx<PrivateProps> implements IModelType {
    isArray?: boolean;
    isEnum?: boolean;
    isJsType?: boolean;
    enumValues?: string[];

    constructor(config: ISwaggerDocConfig) {
        super();

        this.setPrivate('config', config);
    }

    get type() {
        if (this.getPrivate('type')) {
            return this.getPrivate('type');
        }
        if (this.enumRef) {
            return this.isArray ? `Array<${this.arrayItemType}>` : this.enumRef.getFullName;
        }
        if (this.modelRef) {
            return this.isArray ? `Array<${this.arrayItemType}>` : this.modelRef.name;
        }
        return '';
    }

    set type(val: string) {
        this.setPrivate('type', val);
    }

    get arrayItemType() {
        if(this.getPrivate('arrayItemType')){
            return this.getPrivate('arrayItemType');
        }
        if (this.enumRef && this.isArray) {
            return this.enumRef.getFullName;
        }
        if (this.modelRef && this.isArray) {
            return this.modelRef.name;
        }
        return '';
    }

    set arrayItemType(val: string | undefined) {
        this.setPrivate('arrayItemType', val);
    }

    get modelRef(): SwaggerModel | undefined {
        return this.getPrivate('modelRef');
    }

    set modelRef(val: SwaggerModel | undefined) {
        if (val) {
            // reset type and array item type when ref exist!
            this.type = '';
            this.arrayItemType = '';
        }
        this.setPrivate('modelRef', val);
    }

    get enumRef(): SwaggerEnum | undefined {
        return this.getPrivate('enumRef');
    }

    set enumRef(val: SwaggerEnum | undefined) {
        if (val) {
            // reset type and array item type when ref exist!
            this.type = '';
            this.arrayItemType = '';
        }
        this.setPrivate('enumRef', val);
    }

    get config(): ISwaggerDocConfig {
        return this.getPrivate('config');
    }

    toJSON() {
        const privateFields = this.config.showPrivateFieldsForDebug ? {
            enumRef: this.enumRef,
            modelRef: this.modelRef
        } : {};

        return {
            ...this,
            type: this.type,
            arrayItemType: this.arrayItemType,
            ...privateFields
        }
    }
}