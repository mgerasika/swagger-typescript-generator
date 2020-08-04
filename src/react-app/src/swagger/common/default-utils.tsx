import {ISwaggerUtils} from "./swagger-utils";
import {capitalize, lowerlize} from "../utils";
import {
    SwaggerClassModel,
    SwaggerDefinitionModel,
    SwaggerDefinitionProperty,
    SwaggerMethodModel,
    SwaggerMethodParameter
} from "../model";

const getModelName = (name: string) => {
    return `I${name}Model`;
};


const getJsType = (type: string) => {
    if (type === 'integer') {
        return 'number';
    }
    if (type === 'array') {
        return 'Array';
    }
    if (type === 'file') {
        return 'File';
    }
    if (type && type.indexOf('#') >= 0) {
        const parts = type.split('/');
        return getModelName(`${parts[parts.length - 1]}`);
    }
    return type;
}

const getResponseType = (schema:any) => {
    let res: string = '';
    const responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
    if (responseType) {
        res = getJsType(responseType);
    }
    if (!responseType) {
        res = schema.type;
    }
    if (!responseType) {
        const additionalProperties = schema.additionalProperties;
        if (additionalProperties && additionalProperties['type']) {
            res = getJsType(additionalProperties['type']);
        }
    }
    return res;
};

export const getResponseIsArray = (schema: any): boolean => {
    return schema && schema.type === 'array';
};

export const getIsEnum = (schema: any): boolean => {
    return schema && schema.items && schema.items.enum && schema.items.enum.length > 0 || schema && schema.enum ? true : false;
};

export const getIsEnumForDefinition = (schema: any): boolean => {
    return schema && schema.enum && schema.enum.length ? true : false;
};

const getFileName = (name: string) => {
    let words = name.split(/(?=[A-Z])/).map((i: string) => i.toLowerCase());
    words = words.filter((f: string) => !['api', 'i'].includes(f));
    return `${words.join('-')}.ts`;
}
export const defaultUtils : ISwaggerUtils = {
    getClassName : (context:SwaggerClassModel, key: string) => {
        const parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
        return parts.filter(f => f != 'api').map(s => capitalize(s)).join('') + 'Api';
    },
    getClassFileName : (context:SwaggerClassModel, name: string) => getFileName(name),
    getMethodName : (context:SwaggerMethodModel, name: string) => lowerlize(name),
    getMethodParameterName : (context:SwaggerMethodParameter,name: string) => name,
    getMethodResponseType: (context:SwaggerMethodModel,schema:any) => getResponseType(schema),
    getMethodParameterType:(context:SwaggerMethodParameter,schema: any) => {
        if(schema['schema']) {
            const res = getJsType(schema['schema'].$ref);
            if (res) {
                return res;
            }
            return getJsType(schema['schema'].type);
        }
        else{
            return getJsType(schema.type);
        }
    },

    getModelName : (context:SwaggerDefinitionModel, name:string) => getModelName(name),
    getModelFileName : (context:SwaggerDefinitionModel, name: string) => getFileName(name),
    getModelType:(context:SwaggerDefinitionModel,schema: any) => {
        if (schema.items) {
            return getResponseType(schema);
        }
        else {
            return getJsType(schema.type)
        }
    },
    getModelPropertyType:(context:SwaggerDefinitionProperty,schema: any) => {
        if (schema.items) {
            return getResponseType(schema);
        }
        else {
            return getJsType(schema.type)
        }
    },

    isModelByTypeName : (name: string|undefined): boolean => {
        return !!name && (name[0] === 'I' && name.indexOf('Model') !== 0);
    },
    getWarningMessage:() =>'/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n'
}