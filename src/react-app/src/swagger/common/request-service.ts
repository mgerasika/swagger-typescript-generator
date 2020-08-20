
export interface IRequestService {
    get<T>(url: string): Promise<T>;

    post<T,T2>(url: string, body: T): Promise<T2>;

    put<T,T2>(url: string, body: T): Promise<T2>;

    delete<T,T2>(url: string, body?: T): Promise<T2>;

    upload<T>(url: string, formData: FormData): Promise<T>;
}

