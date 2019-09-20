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
    result = result.replace(/&#x27;/gm, "'");
    return result;
};

export const makeFileName = (name: string) => {
    let words = name.split(/(?=[A-Z])/).map((i: string) => i.toLowerCase());
    words = words.filter((f: string) => !['api', 'i'].includes(f));
    return `${words.join('-')}.ts`;
};
