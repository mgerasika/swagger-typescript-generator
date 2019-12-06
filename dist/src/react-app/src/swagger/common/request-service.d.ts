import { AxiosPromise } from 'axios';
export interface IRequestService {
    get(url: string): AxiosPromise;
    post(url: string, body: any): AxiosPromise;
    put(url: string, body: any): AxiosPromise;
    delete(url: string, body?: any): AxiosPromise;
}
declare class RequestService implements IRequestService {
    get(url: string): AxiosPromise;
    post(url: string, body: any): AxiosPromise;
    put(url: string, body: any): AxiosPromise;
    delete(url: string, body: any): AxiosPromise;
    handleError(response: any): Promise<never>;
}
export declare const requestService: RequestService;
export {};
