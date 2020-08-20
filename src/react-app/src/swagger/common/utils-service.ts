export interface IUtilsService {
    toQueryString:(query:object )=>string;
    combineUrlAndQuery:(url:string,query?:string) => string;
}

export class UtilsService implements IUtilsService {
    public toQueryString(query: object):string {
        return Object.keys(query).map((key:string)=>{
            const val = (query as any)[key];
            if(val !== undefined) {
                return `${key}=${val}`
            }
            return undefined;
        }).filter(f=>f).join('&')
    }

    public combineUrlAndQuery(url:string,query?:string): string {
        return query ? `${url}?${query}` : url;
    }
}
