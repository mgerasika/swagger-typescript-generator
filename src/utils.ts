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

export const privateSymbol = Symbol('private');
export const nameof = <T>(name: keyof T) => name;
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