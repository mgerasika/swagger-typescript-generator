export interface IRequestService<TOptions = any> {
    get<T>(url: string, options?: TOptions): Promise<T>;

    head<T>(url: string, options?: TOptions): Promise<T>;

    post<T, T2>(url: string, body?: T, options?: TOptions): Promise<T2>;

    put<T, T2>(url: string, body?: T, options?: TOptions): Promise<T2>;

    delete<T, T2>(url: string, body?: T, options?: TOptions): Promise<T2>;

    upload<T>(url: string, formData: FormData, options?: TOptions): Promise<T>;
}