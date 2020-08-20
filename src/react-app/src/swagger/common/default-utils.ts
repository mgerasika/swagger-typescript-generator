import {ISwaggerUtils} from "./swagger-utils";
import {capitalize, lowerlize} from "../utils";
import {SwaggerClass, SwaggerMethod, SwaggerMethodParameter, SwaggerModel, SwaggerModelProperty} from "../models";
import {SwaggerEnum} from "../models/swagger-enum";
import {SwaggerPath} from "../models/swagger-path";

const getModelName = (name: string) => {
    const newName = `${name}`.replace(/[\[\]\.]/g, '');
    return capitalize(newName);
};

const getMethodName = (name: string) => {
    return `${name}`.replace(/[\[\]\. ]/g, ' ').split(' ').map((x,idx)=> idx==0 ? lowerlize(x) : capitalize(x)).join('');
};

const getEnumName = (name: string) => {
    const newName =  `${name}`.replace(/[\[\]\.]/g, '');
    return  capitalize(`${newName}Enum`);
};

export const uniqueItems = <T>(items: T[], keyFn: (el: T) => any): T[] => {
    const uniqueEnums = items.reduce((it: any, el: any) => {
        const key = keyFn(el);
        if (key) {
            it[key] = el;
        }
        return it;
    }, {});
    return Object.values(uniqueEnums) as any;
}

const jsTypes = ['number', 'integer', 'boolean', 'string', 'array', 'file'];
export const getIsJsType = (name: string) => {
    return jsTypes.includes(name.toLowerCase());
}
const getJsType = (type: string,schema:any) => {
    if (type === 'integer') {
        return 'number';
    }
    if (type === 'array') {
        const itemType:string = schema && schema['items'] ? getJsType(schema['items'].type as string, schema['items']) : 'any';
        return `Array<${itemType}>`;
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

const getResponseType = (schema: any) => {
    let res: string = '';
    if (schema.$ref) {
        return getJsType(schema.$ref,schema)
    }
    if (schema['schema']) {
        const res = getJsType(schema['schema'].$ref,schema['schema']);
        if (res) {
            return res;
        }
        return getJsType(schema['schema'].type,schema['schema']);
    }
    const responseType = schema.items ? schema.items['$ref'] : schema['$ref'];
    if (responseType) {
        res = getJsType(responseType,schema);
    }
    if (!responseType) {
        const additionalProperties = schema.additionalProperties;
        if (additionalProperties && additionalProperties['type']) {
            if (additionalProperties['items']) {
                res = getJsType(additionalProperties['items'].$ref,additionalProperties['items'])
            } else {
                res = getJsType(additionalProperties['type'],additionalProperties);
            }
        }
    }
    if (!res) {
        res = getJsType(schema.type,schema);
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
    return schema && schema.items && schema.items.enum && schema.items.enum.length > 0 || schema && schema.enum ? true : false;
};

const getFileName = (name: string) => {
    name = name.replace(/[\[\]\.]/g, '');
    let words = name.split(/(?=[A-Z])/).map((i: string) => i.toLowerCase());
    words = words.filter((f: string) => !['api', 'i'].includes(f));
    return `${words.join('-')}.ts`;
}
export const defaultUtils: ISwaggerUtils = {
    getClassName: (context: SwaggerClass, key: string) => {
        const parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
        return parts.filter(f => f != 'api').map(s => capitalize(s)).join('') + 'Api';
    },
    getPathName: (context: SwaggerPath, key: string) => {
        const parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
        return parts.filter(f => f != 'api').map(s => capitalize(s)).join('') + 'Api';
    },
    getClassFileName: (context: SwaggerClass, name: string) => getFileName(name),
    getMethodName: (context: SwaggerMethod, name: string) => getMethodName(name),
    getMethodParameterName: (context: SwaggerMethodParameter, name: string) => name,
    getMethodResponseType: (context: SwaggerMethod, schema: any) => getResponseType(schema),
    getMethodParameterType: (context: SwaggerMethodParameter, schema: any) => {
        return getResponseType(schema);
    },

    getModelName: (context: SwaggerModel, name: string) => getModelName(name),
    getModelFileName: (context: SwaggerModel, name: string) => getFileName(name),
    getModelType: (context: SwaggerModel, schema: any) => {
        return getResponseType(schema);

    },
    getModelPropertyType: (context: SwaggerModelProperty, schema: any) => {
        return getResponseType(schema);
    },
    getWarningMessage: () => '/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n',
    getEnumName: (context: SwaggerEnum, name: string) => getEnumName(name),
    getEnumFileName: (context: SwaggerEnum, name: string) => getFileName(name),
}