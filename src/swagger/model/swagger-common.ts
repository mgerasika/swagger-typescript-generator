export const sourceSymbol = Symbol("source");
export const parentSymbol = Symbol("source");

export const getJsType = (type: string) => {
    if (type === 'integer') {
        return 'number';
    }
    if (type && type.indexOf('#') >= 0) {
        const parts = type.split('/');
        return `I${parts[parts.length - 1]}`;
    }
    return type;
}
