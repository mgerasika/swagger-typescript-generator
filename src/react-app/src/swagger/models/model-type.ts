export interface IModelType {
    isArray?: boolean;
    type?: string;
    isEnum?: boolean;
    isJsType?: boolean;
    arrayItemType?:string;
    enumValues?: string[];
}