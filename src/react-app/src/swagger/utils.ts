export const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const lowerlize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toLowerCase() + s.slice(1);
};

export const html2text = (html: string) => {
    let result = html.replace(/<(?:.|\n)*?>/gm, '');
    result = result.replace(/&lt;/gm, '<');
    result = result.replace(/&gt;/gm, '>');
    result = result.replace(/&#x27;/gm, '\'');
    return result;
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

export const isModelByTypeName = (name: string): boolean => {
    return name[0] == 'I' && name.indexOf('Model') !== 0;
};

export const getClassName = (key: string) => {
    return key.replace(/[\{\}]/g, '').replace(/[-_]/g, '/').split('/').map(s => capitalize(s)).join('') + 'Api';
};
