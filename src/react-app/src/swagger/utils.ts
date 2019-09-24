export const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const lowerlize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toLowerCase() + s.slice(1);
};

export const html2text = (html: string) => {
    return html.replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&lt;/gm, '<')
        .replace(/&gt;/gm, '>')
        .replace(/&#x27;/gm, '\'');
};

export const makeFileName = (name: string) => {
    let words = name.split(/(?=[A-Z])/).map((i: string) => i.toLowerCase());
    words = words.filter((f: string) => !['api', 'i'].includes(f));
    return `${words.join('-')}.ts`;
};

export const sourceSymbol = Symbol('source');
export const parentSymbol = Symbol('source');

export const getModelName = (name: string) => {
    return `I${name}Model`;
};
export const getJsType = (type: string) => {
    if (type === 'integer') {
        return 'number';
    }
    if (type === 'array') {
        return 'Array';
    }
    if (type && type.indexOf('#') >= 0) {
        const parts = type.split('/');
        return getModelName(`${parts[parts.length - 1]}`);
    }
    return type;
};

export const Warning = '/* This code generated with swagger-typescript-generator. Don\'t modify this file because it will be rewriten. */\n';
export const isModelByTypeName = (name: string): boolean => {
    return name[0] == 'I' && name.indexOf('Model') !== 0;
};

export const getClassName = (key: string) => {
    const parts = key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/');
    return parts.filter(f => f != 'api').map(s => capitalize(s)).join('') + 'Api';
};

export const getResponseIsArray = (schema: any): boolean => {
    return schema && schema.type === 'array';
};
export const getResponseType = (schema: any): string => {
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
