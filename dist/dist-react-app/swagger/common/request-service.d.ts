import { AxiosPromise } from 'axios';
export interface IRequestService {
    get(url: string): AxiosPromise;
    post<T>(url: string, body: T): AxiosPromise;
    put(url: string, body: any): AxiosPromise;
    delete(url: string, body?: any): AxiosPromise;
    upload(url: string, formData: FormData): AxiosPromise;
}
declare class RequestService implements IRequestService {
    get(url: string): AxiosPromise;
    post(url: string, body: any): AxiosPromise;
    put(url: string, body: any): AxiosPromise;
    delete(url: string, body: any): AxiosPromise;
    upload(url: string, formData: FormData): AxiosPromise;
    handleError(response: any): Promise<never>;
}
export declare const requestService: RequestService;
export {};
