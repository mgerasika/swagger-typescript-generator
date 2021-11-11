export interface ISwaggerDocConfig {
    apiUrl: string;
    source: any;
    modelImportPath?: string;
    enumImportPath?: string;
    showPrivateFieldsForDebug?: boolean;
    showComments?: boolean;
}